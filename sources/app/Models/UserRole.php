<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\UserRole
 *
 * @property int $id
 * @property int $user_id
 * @property int $role_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Role $role
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserRole whereUserId($value)
 * @mixin \Eloquent
 */
class UserRole extends Model
{
    use HasFactory;

    protected $fillable = ['role_id', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * @throws \Throwable
     */
    public static function assign(int|string|User $user, int|string|Role $role): static
    {
        return DB::transaction(function () use ($role, $user) {
            if (is_int($role)) {
                $role = Role::query()->findOrFail($role);
            } elseif (is_string($role)) {
                $role = Role::query()->whereName($role)->firstOrFail();
            }

            if (is_int($user)) {
                $user = User::query()->findOrFail($user);
            } elseif (is_string($user)) {
                $user = User::query()->whereName($user)->firstOrFail();
            }

            $data = [
                "role_id" => $role->id,
                "user_id" => $user->id
            ];

            $ur = UserRole::where($data)->first();

            if (!$ur) {
                $ur = UserRole::create($data);
            }

            return $ur;
        });
    }
}
