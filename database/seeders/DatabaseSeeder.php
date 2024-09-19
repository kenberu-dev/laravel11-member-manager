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
            'name' => 'Kenberu',
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

        Member::factory()->count(50)->create();

        MeetingLog::factory()->count(200)->create();

        Message::factory()->count(20000)->create();
        $messages = Message::orderBy('created_at')->get();

        $ids = $messages
                    ->groupBy('meeting_logs_id')
                    ->map(function ($groupedMessages) {
                        return[
                            'meeting_logs_id' => $groupedMessages->first()->meeting_logs_id,
                            'last_message_id' => $groupedMessages->last()->id,
                        ];
                    })->values()->toArray();
       foreach($ids as $id) {
            MeetingLog::where('id', '=', $id["meeting_logs_id"])
                ->firstOrFail()
                ->update(['last_message_id' => $id["last_message_id"]]);
        }
    }
}
