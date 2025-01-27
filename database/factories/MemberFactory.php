<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $officeId = fake()->randomElement(\App\Models\Office::pluck('id')->toArray());

        $createdAt = fake()->dateTimeBetween('-3 month', 'now');
        $startedAt = new Carbon(fake()->dateTimeBetween($createdAt, '+3 month'));
        $endDate = $startedAt->copy()->addMonth(3);

        return [
            'name' => fake()->name(),
            'sex' => fake()->randomElement(['男性', '女性', 'その他']),
            'office_id' => $officeId,
            'status' => fake()->randomElement(['見学','体験','利用意思獲得','利用中','定着中']),
            'characteristics' => fake()->randomElement(['抑うつ病', '注意欠如・多動症', 'なし', 'その他']),
            'document_url' => 'https://drive.google.com/drive/folders/1xUxgJTMX6gOFJdGRG3m1P-uPJj9kUfqJ',
            'beneficiary_number' => fake()->numerify('##########'),
            'started_at' => $startedAt,
            'update_limit' => fake()->dateTimeBetween($startedAt, $endDate),
            'notes' => fake()->realText(100),
            'created_at' => $createdAt
        ];
    }
}
