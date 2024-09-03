<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Office>
 */
class OfficeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'ITスクール'. fake()->city(),
            'zip_code' => fake()->postcode(),
            'address' => fake()->address(),
            'phone_number' => fake()->phoneNumber(),
            'created_at' =>fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
