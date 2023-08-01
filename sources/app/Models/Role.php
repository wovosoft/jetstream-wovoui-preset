<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Role
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RolePermission> $permissionAssignments
 * @property-read int|null $permission_assignments_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Role extends Model
{
    use HasFactory;

    public function permissions(): HasManyThrough
    {
        return $this->hasManyThrough(
            Permission::class,
            RolePermission::class,
            "role_id",
            "id",
            "id",
            "permission_id"
        );
    }

    public function permissionAssignments(): HasMany
    {
        return $this->hasMany(RolePermission::class);
    }

    /**
     * @throws \Throwable
     */
    public function syncPermissions(array $permissions): bool
    {
        return DB::transaction(function () use ($permissions) {
            $presentIds = [];
            collect($permissions)->each(function (string $permission) use (&$presentIds) {
                $presentIds[] = RolePermission::assign($this, $permission)?->id;
            });

            $this->permissionAssignments()
                ->whereNotIn("id", $presentIds)
                ->delete();


            return true;
        });
    }
}
