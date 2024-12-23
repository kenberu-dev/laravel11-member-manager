<?php

namespace Database\Factories;

use App\Models\Office;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\External>
 */
class ExternalFactory extends Factory
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

        return [
            'company_name' => fake()->company(),
            'manager_name' => fake()->name(),
            'office_id' => $officeId,
            'status' => "見学",
            'address' => fake()->address(),
            'phone_number' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'notes' => fake()->realText(100),
            'created_at' => $createdAt,
        ];
    }
}
