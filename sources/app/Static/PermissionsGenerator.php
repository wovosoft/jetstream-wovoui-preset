<?php

namespace App\Static;

use App\Models\Permission;
use App\Models\Role;

class PermissionsGenerator
{
    public static array $roles = [
        "Admin",
        "Chairman",
        "Managing Director",
        "Deputy Managing Director",

        "Divisional Office",
        "CRM/RM Office",
        "Branch Manager",
        "Divisional Audit Officer",
        "Regional Audit Officer",
    ];

    public static array $permissions = [
        "users",
        "roles",
        "permissions",
    ];

    public static array $directPermissions = [

    ];

    /**
     * @throws \Throwable
     */
    public static function run(): void
    {
        foreach (static::$roles as $role) {
            $r = new Role();
            $r->name = $role;
            $r->saveOrFail();
        }

        collect(static::$permissions)->mapWithKeys(function (string $permission) {
            return [
                $permission => [
                    "create",
                    "update",
                    "delete",
                    "view",
                ],
            ];
        })->each(function ($actions, $permission) {
            foreach ($actions as $action) {
                $name = join("-", [$action, $permission]);
                if (!Permission::where('name', '=', $name)->exists()) {
                    Permission::create([
                        "name" => $name,
                    ]);
                }
            }
        });

        foreach (static::$directPermissions as $directPermission) {
            if (!Permission::where('name', '=', $directPermission)->exists()) {
                Permission::create([
                    "name" => $directPermission,
                ]);
            }
        }

    }
}
