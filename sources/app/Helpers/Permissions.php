<?php

namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;

class Permissions
{
    //view should read=fix later
    public static array $cruds = ["create", "view", "update", "delete"];

    public static function register(string|array $who): void
    {
        if (is_array($who)) {
            foreach ($who as $permission) {
                Gate::define($permission, function (User $user) use ($permission) {
                    return in_array($permission, $user->getPermissions());
                });
            }
            return;
        }

        foreach (self::$cruds as $curd) {
            Gate::define("$curd-$who", function (User $user) use ($who, $curd) {
                return in_array("$curd-$who", $user->getPermissions());
            });
        }
    }
}
