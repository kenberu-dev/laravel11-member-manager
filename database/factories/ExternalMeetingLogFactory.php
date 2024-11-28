<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExternalMeetingLog>
 */
class ExternalMeetingLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $officeId = fake()->randomElement(\App\Models\Office::pluck('id')->toArray());

        $userId = fake()->randomElement(\App\Models\User::where('office_id', '=', $officeId)->pluck('id')->toArray());

        $externalId = fake()->randomElement(\App\Models\External::where('office_id', '=', $officeId)->pluck('id')->toArray());

        $createdAt = fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d');

        $title = fake()->randomElement(['テストタイトル']) . '-' . $createdAt;


        return [
            'title' => $title,
            'user_id' => $userId,
            'external_id' => $externalId,
            'meeting_log' => fake()->realText(200),
            'created_at' => $createdAt,
        ];
    }
}
