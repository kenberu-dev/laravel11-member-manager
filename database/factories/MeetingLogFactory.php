<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeetingLog>
 */
class MeetingLogFactory extends Factory
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

        $memberId = fake()->randomElement(\App\Models\Member::where('office_id', '=', $officeId)->pluck('id')->toArray());

        $createdAt = fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d');

        $title = fake()->randomElement(['テストタイトル']) . '-' . $createdAt;


        return [
            'title' => $title,
            'user_id' => $userId,
            'member_id' => $memberId,
            'condition' => fake()->randomElement([1, 2, 3, 4, 5]),
            'meeting_log' => fake()->realText(200),
            'created_at' => $createdAt,
        ];
    }
}
