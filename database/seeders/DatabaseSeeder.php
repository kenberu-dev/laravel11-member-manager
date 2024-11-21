<?php

namespace Database\Seeders;

use App\Models\MeetingLog;
use App\Models\Member;
use App\Models\Message;
use App\Models\Office;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Office::factory()->count(10)->hasMembers(80)->create();

        User::factory()->create([
            'name' => 'グローバルアドミン',
            'email' => 'gadmin@example.com',
            'password' => bcrypt('meemane.gadmin'),
            'office_id' => 1,
            'is_admin' => true,
            'is_global_admin' => true,
            'email_verified_at' => time(),
        ]);

        User::factory()->create([
            'name' => 'アドミン',
            'email' => 'admin@example.com',
            'password' => bcrypt('meemane.admin'),
            'office_id' => 1,
            'is_admin' => true,
            'is_global_admin' => false,
            'email_verified_at' => time(),
        ]);

        User::factory()->create([
            'name' => 'ユーザー',
            'email' => 'user@example.com',
            'password' => bcrypt('meemane.user'),
            'office_id' => 1,
            'is_admin' => false,
            'is_global_admin' => false,
            'email_verified_at' => time(),
        ]);
        User::factory()->count(50)->create();

        MeetingLog::factory()->count(1500)->create();

        Message::factory()->count(25000)->create();
    }
}
