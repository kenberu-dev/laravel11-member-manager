<?php

namespace Database\Factories;

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

        return [
            'name' => fake()->name(),
            'sex' => fake()->randomElement(['男性', '女性', 'その他']),
            'office_id' => $officeId,
            'status' => fake()->randomElement(['見学','体験','利用意思獲得','利用中', '利用中止', '利用終了']),
            'characteristics' => fake()->randomElement(['抑うつ病', '統合失調症', '自閉スペクトラム症', '注意欠如・多動症']),
            'notes' => fake()->realText(100),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
