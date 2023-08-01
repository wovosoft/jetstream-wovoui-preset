<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use App\Static\PermissionsGenerator;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     * @throws \Throwable
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        PermissionsGenerator::run();

        Role::query()
            ->where('name', '=', 'Admin')
            ->first()
            ->syncPermissions(
                Permission::query()->pluck('name')->toArray()
            );

        $admin = User::factory()->create([
            'name'     => 'Test User',
            'email'    => 'test@test.test',
            'password' => bcrypt('test@test.test'),
        ]);

        $admin->syncRoles(['Admin']);

    }
}
