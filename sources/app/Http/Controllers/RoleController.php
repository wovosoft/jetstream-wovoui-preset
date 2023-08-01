<?php

namespace App\Http\Controllers;

use App\Helpers\ColorVariants;
use App\Helpers\Util;
use App\Http\Requests\StoreRoleRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Static\Permissions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\Messages;

class RoleController extends Controller
{
    public static function routes()
    {
        Route::prefix("roles")
            ->name("roles.")
            ->controller(static::class)
            ->group(function () {
                Route::get("/", "index")
                    ->can(Permissions::VIEW_ROLES)
                    ->name("index");

                Route::put("/store", "store")
                    ->middleware("canAny:" . implode(",", [
                            Permissions::CREATE_ROLES,
                            Permissions::UPDATE_ROLES
                        ]))
                    ->name("store");

                Route::delete("/delete/{role}", "destroy")
                    ->can(Permissions::DELETE_ROLES)
                    ->name("destroy");
            });
    }

    /**
     * @throws \Throwable
     */
    public function store(StoreRoleRequest $request): RedirectResponse
    {
        return DB::transaction(function () use ($request) {
            $role = Role::query()
                ->findOrNew($request->input("id"))
                ->forceFill([
                    "name" => $request->validated('name'),
                ]);

            $role->saveOrFail();
            $role->syncPermissions($request->validated("permissions"));


            return back()->with("notification", Messages::success([
                "variant" => ColorVariants::Primary
            ]));
        });
    }

    public function index(Request $request): Response
    {
        $items = Role::query()
            ->when($request->input("query"), function (Builder $builder, string $query) {
                $builder->where("name", Util::getLike(), "%$query%");
            })
            ->with(["permissions"])
            ->paginate(
                perPage: $request->input("per_page") ?? 15
            )
            ->appends($request->input());

        return Inertia::render("Users/Roles", [
            "title"        => "Roles List",
            "items"        => $items,
            "store_url"    => route("roles.store"),
            "delete_route" => "roles.destroy",
            "permissions"  => Permission::get()->pluck('name')
        ]);
    }

    /**
     * @throws \Throwable
     */
    public function destroy(Role $role): RedirectResponse
    {
        return DB::transaction(function () use ($role) {
            $role->deleteOrFail();
            return back()->with("notification", Messages::success([
                "variant" => ColorVariants::Primary
            ]));
        });
    }
}
