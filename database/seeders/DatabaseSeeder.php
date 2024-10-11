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
        Office::factory()->count(10)->hasUsers(10)->create();

        User::factory()->create([
            'name' => 'ケンベル',
            'email' => 'kenberu@example.com',
            'password' => bcrypt('12345678'),
            'office_id' => 1,
            'is_admin' => true,
            'is_global_admin' => true,
            'email_verified_at' => time(),
        ]);

        User::factory()->create([
            'name' => 'Hiroshi Akutsu',
            'email' => 'hakutsu@example.com',
            'password' => bcrypt('12345678'),
            'office_id' => 1,
            'is_admin' => true,
            'is_global_admin' => false,
            'email_verified_at' => time(),
        ]);

        User::factory()->create([
            'name' => '山田 太郎',
            'email' => 'tyamada@example.com',
            'password' => bcrypt('12345678'),
            'office_id' => 1,
            'is_admin' => false,
            'is_global_admin' => false,
            'email_verified_at' => time(),
        ]);
        Member::factory()->count(50)->hasMeetingLogs(20)->create();

        Message::factory()->count(20000)->create();
    }
}
