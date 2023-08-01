<?php

namespace App\Traits;

use App\Models\Role;
use App\Models\UserRole;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\DB;

trait HasRoles
{
    public function getPermissions(): array
    {
        //roles should be loaded by default with auth user.
        //manually load in user : with(['roles.permissions'])
        $permissions = cache()->rememberForever('permissions_of_user_' . auth()->id(), function () {
            return $this
                ->roles
                ->pluck("permissions")
                ->filter(fn($i) => count($i))
                ->first();
        });

        if (!$permissions) {
            return [];
        }

        return collect($permissions)->pluck('name')->toArray();
    }

    public function permissions(): Attribute
    {
        return Attribute::get(fn() => $this->getPermissions());
    }

    public function roles(): HasManyThrough
    {
        return $this->hasManyThrough(
            Role::class,
            UserRole::class,
            'user_id',
            'id',
            'id',
            'role_id',
        );
    }

    public function roleAssignments(): HasMany
    {
        return $this->hasMany(UserRole::class);
    }

    /**
     * @throws \Throwable
     */
    public function syncRoles(array $roles = [])
    {
        return DB::transaction(function () use ($roles) {
            $presentIds = [];
            collect($roles)->each(function (string $role) use (&$presentIds) {
                $presentIds[] = UserRole::assign($this, $role)?->id;
            });

            $this->roleAssignments()
                ->whereNotIn("id", $presentIds)
                ->delete();

            return true;
        });
    }

    public function hasRole(string $role): bool
    {
        $roles = $this->roles->map(fn($r) => $r->name)->toArray();

        if (empty($roles)) {
            return false;
        }

        return in_array($role, $roles);
    }

    public function hasAnyRole(array $roles): bool
    {
        if (empty($roles)) {
            return false;
        }

        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }

        return false;
    }
}
