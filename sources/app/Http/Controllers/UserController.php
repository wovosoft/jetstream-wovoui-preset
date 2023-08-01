<?php

namespace App\Http\Controllers;

use App\Helpers\ColorVariants;
use App\Http\Requests\StoreUserRequest;
use App\Models\Role;
use App\Models\User;
use App\Static\Permissions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\Messages;

class UserController extends Controller
{
    public static function routes()
    {
        Route::prefix("users")
            ->name("users.")
            ->controller(static::class)
            ->group(function () {
                Route::get("/", "index")
                    ->middleware("can:" . Permissions::VIEW_USERS)
                    ->name("index");

                Route::put("/store", "store")
                    ->middleware("canAny:" . Permissions::CREATE_USERS . "," . Permissions::UPDATE_USERS)
                    ->name("store");

                Route::delete("/delete/{user}", "destroy")
                    ->can(Permissions::DELETE_USERS)
                    ->name("destroy");
            });
    }

    /**
     * @throws \Throwable
     */
    public function store(StoreUserRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $user = User::query()->findOrNew($request->input("id"));

            $user->forceFill($request->only([
                'name',
                'email',
            ]));


            if ($request->validated("password")) {
                $user->password = bcrypt($request->validated("password"));
            }
            $user->saveOrFail();
            $user->syncRoles($request->validated("roles"));
            return back()->with("notification", Messages::success([
                "variant" => ColorVariants::Primary,
            ]));
        });
    }

    public function index(Request $request): Response
    {

        $items = User::query()
            ->when($request->input('query'), function (Builder $builder, string $query) {
                if (!is_numeric($query)) {
                    $builder
                        ->where('name', 'ilike', "%$query%")
                        ->orWhere('email', 'ilike', "%$query%");
                }
            })
            ->when($request->input('role'), function (Builder $builder, string $role) {
                $builder->whereHas("roles", function (Builder $roles) use ($role) {
                    $roles->where('name', 'ilike', $role);
                });
            })
            ->select([
                'users.id', 'users.name', 'users.email', 'users.created_at', 'users.updated_at',
            ])
            ->with([
                "roles:roles.id,roles.name"
            ])
            ->paginate(
                perPage: $request->input("per_page") ?? 15
            )
            ->appends($request->input());

        return Inertia::render("Users/Index", [
            "title"        => "Users List",
            "items"        => $items,
            "store_url"    => route("users.store"),
            "delete_route" => "users.destroy",
            "roles"        => Role::pluck('name'),
        ]);
    }

    /**
     * @throws \Throwable
     */
    public function destroy(User $user): RedirectResponse
    {
        return DB::transaction(function () use ($user) {
            $user->deleteOrFail();
            return back()->with("notification", Messages::success([
                "variant" => ColorVariants::Primary,
            ]));
        });
    }
}
