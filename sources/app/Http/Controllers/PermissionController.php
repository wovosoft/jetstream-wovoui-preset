<?php

namespace App\Http\Controllers;

use App\Helpers\ColorVariants;
use App\Helpers\Util;
use App\Models\Permission;
use App\Static\Permissions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\Messages;

class PermissionController extends Controller
{
    public static function routes()
    {
        Route::prefix("permissions")
            ->name("permissions.")
            ->controller(static::class)
            ->group(function () {
                Route::get("/", "index")
                    ->can(Permissions::VIEW_PERMISSIONS)
                    ->name("index");

                Route::put("/store", "store")
                    ->middleware("canAny:" . implode(",", [
                            Permissions::CREATE_PERMISSIONS,
                            Permissions::UPDATE_PERMISSIONS,
                        ]))
                    ->name("store");

                Route::delete("/delete/{permission}", "destroy")
                    ->can(Permissions::DELETE_PERMISSIONS)
                    ->name("destroy");
            });

    }

    /**
     * @throws \Throwable
     */
    public function store(Request $request): RedirectResponse
    {
        return DB::transaction(function () use ($request) {
            $request->validate([
                "name" => ["string", "required"],
            ]);

            Permission::query()
                ->findOrNew($request->input("id"))
                ->forceFill([
                    "name" => $request->input('name'),
                ])
                ->saveOrFail();

            return back()->with("notification", Messages::success([
                "variant" => ColorVariants::Primary,
            ]));
        });
    }

    public function index(Request $request): Response
    {
        $items = Permission::query()
            ->when($request->input("query"), function (Builder $builder, string $query) {
                $builder->where("name", Util::getLike(), "%" . $query . "%");
            })
            ->paginate(
                perPage: $request->input("per_page") ?? 15
            )
            ->appends($request->input());

        return Inertia::render("Users/Permissions", [
            "title"        => "Permissions List",
            "items"        => $items,
            "store_url"    => route("permissions.store"),
            "delete_route" => "permissions.destroy",
        ]);
    }

    /**
     * @throws \Throwable
     */
    public function destroy(Permission $permission): RedirectResponse
    {
        return DB::transaction(function () use ($permission) {
            $permission->deleteOrFail();
            return back()->with("notification", Messages::success([
                "variant" => ColorVariants::Primary,
            ]));
        });
    }
}
