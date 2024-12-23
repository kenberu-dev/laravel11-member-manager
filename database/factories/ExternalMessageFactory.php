<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class ExternalMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'message' => fake()->realText(100),
            'sender_id' => fake()->randomElement(\App\Models\User::pluck('id')->toArray()),
            'meeting_logs_id' => fake()->randomElement(\App\Models\ExternalMeetingLog::pluck('id')->toArray()),
            'created_at' =>fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
