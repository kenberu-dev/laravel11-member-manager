<?php

namespace Database\Seeders;

use App\Models\External;
use App\Models\ExternalMeetingLog;
use App\Models\ExternalMessage;
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
        $offices = Office::factory()->count(10)->create();

        $gadmin = User::factory()->create([
                    'name' => 'グローバルアドミン',
                    'email' => 'gadmin@example.com',
                    'password' => bcrypt('meemane.gadmin'),
                    'office_id' => 1,
                    'is_admin' => true,
                    'is_global_admin' => true,
                    'email_verified_at' => time(),
                ]);

        $admin = User::factory()->create([
                    'name' => 'アドミン',
                    'email' => 'admin@example.com',
                    'password' => bcrypt('meemane.admin'),
                    'office_id' => 1,
                    'is_admin' => true,
                    'is_global_admin' => false,
                    'email_verified_at' => time(),
                ]);

        $user = User::factory()->create([
                    'name' => 'ユーザー',
                    'email' => 'user@example.com',
                    'password' => bcrypt('meemane.user'),
                    'office_id' => 1,
                    'is_admin' => false,
                    'is_global_admin' => false,
                    'email_verified_at' => time(),
                ]);

        foreach ($offices as $office) {
            $users = User::factory()
                    ->count(10)
                    ->create([
                        'office_id' => $office->id,
                    ]);
            
            $members = Member::factory()
                        ->count(10)
                        ->create([
                            'office_id' => $office->id,
                        ]);

            $externals = External::factory()
                            ->count(10)
                            ->create([
                                'office_id' => $office->id,
                            ]);
            
            foreach($members as $member) {
                MeetingLog::factory()
                    ->count(10)
                    ->create([
                        'user_id' => $users->random()->id,
                        'member_id' => $member->id,
                    ]);
            }

            foreach($externals as $external) {
                ExternalMeetingLog::factory()
                    ->count(10)
                    ->create([
                        'user_id' => $users->random()->id,
                        'external_id' => $external->id,
                    ]);
            }
        }

        $members = Member::where('office_id', '=', 1)->get();
        $externals = External::where('office_id', '=', 1)->get();

        
        MeetingLog::factory()
            ->count(10)
            ->create([
                'member_id' => $members->random()->id,
                'user_id' => $gadmin->id,
            ])->each(function ($meetingLog) use ($members) {
                $meetingLog->update(['member_id' => $members->random()->id]);
            });

        MeetingLog::factory()
            ->count(10)
            ->create([
                'member_id' => $members->random()->id,
                'user_id' => $admin->id,
            ])->each(function ($meetingLog) use ($members) {
                $meetingLog->update(['member_id' => $members->random()->id]);
            });

        MeetingLog::factory()
            ->count(10)
            ->create([
                'member_id' => $members->random()->id,
                'user_id' => $user->id,
            ])->each(function ($meetingLog) use ($members) {
                $meetingLog->update(['member_id' => $members->random()->id]);
            });

        ExternalMeetingLog::factory()
            ->count(10)
            ->create([
                'external_id' => $externals->random()->id,
                'user_id' => $gadmin->id,
            ])->each(function ($meetingLog) use ($externals) {
                $meetingLog->update(['external_id' => $externals->random()->id]);
            });

        ExternalMeetingLog::factory()
            ->count(10)
            ->create([
                'external_id' => $externals->random()->id,
                'user_id' => $admin->id,
            ])->each(function ($meetingLog) use ($externals) {
                $meetingLog->update(['external_id' => $externals->random()->id]);
            });
    

        ExternalMeetingLog::factory()
            ->count(10)
            ->create([
                'external_id' => $externals->random()->id,
                'user_id' => $user->id,
            ])->each(function ($meetingLog) use ($externals) {
                $meetingLog->update(['external_id' => $externals->random()->id]);
            });
            
        Message::factory()->count(2500)->create();
        ExternalMessage::factory()->count(2500)->create();
    }
}
