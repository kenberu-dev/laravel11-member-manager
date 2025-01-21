<?php

use App\Models\Office;
use App\Models\User;

test('ログインページにアクセスできるか？', function () {
    $response = $this->get('/login');

    $response->assertOK();
});

test('ログインできるか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([
                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $response = $this->post('/login', [
        'email' => 'test@example.com',
        'password' => 'password123',
    ]);

    $response->assertRedirect('/dashboard');
    $this->assertAuthenticatedAs($user);
});

test('間違ったメールアドレスではログインできないか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([
                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $response = $this->post('/login', [
        'email' => 'wrongtest@example.com',
        'password' => 'password123',
    ]);

    $this->assertGuest();
});

test('間違ったパスワードではログインできないか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([
                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $response = $this->post('/login', [
        'email' => 'test@example.com',
        'password' => 'wrongpassword123',
    ]);

    $this->assertGuest();
});
