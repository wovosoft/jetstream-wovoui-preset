<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\RolePermission
 *
 * @property int $id
 * @property int $role_id
 * @property int $permission_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Permission $permission
 * @property-read \App\Models\Role $role
 * @method static \Illuminate\Database\Eloquent\Builder|RolePermission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RolePermission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RolePermission query()
 * @method static \Illuminate\Database\Eloquent\Builder|RolePermission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RolePermission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RolePermission wherePermissionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RolePermission whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RolePermission whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RolePermission extends Model
{
    use HasFactory;

    protected $fillable = ['role_id', 'permission_id'];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function permission(): BelongsTo
    {
        return $this->belongsTo(Permission::class);
    }

    /**
     * @throws \Throwable
     */
    public static function assign(int|string|Role $role, int|string|Permission $permission): static
    {
        return DB::transaction(function () use ($role, $permission) {
            if (is_int($role)) {
                $role = Role::query()->findOrFail($role);
            } elseif (is_string($role)) {
                $role = Role::query()->whereName($role)->firstOrFail();
            }

            if (is_int($permission)) {
                $permission = Permission::query()->findOrFail($permission);
            } elseif (is_string($permission)) {
                $permission = Permission::query()->whereName($permission)->firstOrFail();
            }

            $data = [
                "role_id" => $role->id,
                "permission_id" => $permission->id
            ];

            $rp = RolePermission::where($data)->first();

            if (!$rp) {
                $rp = RolePermission::create($data);
            }

            return $rp;
        });
    }
}
