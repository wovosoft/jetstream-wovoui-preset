<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Helpers\Permissions;
use App\Static\PermissionsGenerator;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        foreach (PermissionsGenerator::$permissions as $group) {
            Permissions::register($group);
        }

        //register direct permissions
        Permissions::register(PermissionsGenerator::$directPermissions);
    }
}
