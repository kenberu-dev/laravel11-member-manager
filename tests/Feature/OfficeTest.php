<?php

use App\Models\Office;
use App\Models\User;

test('最上位管理者ユーザーが、事業所一覧ページにアクセスできるか？', function () {
    Office::factory()->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
    ]);

    $this->actingAs($gadmin);

    $response = $this->get(route('office.index'));
    $response->assertOK();
});

test('管理者ユーザーが、事業所一覧ページにアクセスできないか？', function () {
    Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $response = $this->get(route('office.index'));
    $response->assertStatus(400);
});

test('一般ユーザーが、事業所一覧ページにアクセスできないか？', function () {
    Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('office.index'));
    $response->assertStatus(400);
});

test('最上位管理者ユーザーが、事業所詳細ページにアクセスできるか？', function () {
    $office = Office::factory()->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
    ]);

    $this->actingAs($gadmin);

    $response = $this->get(route('office.show', $office->id));
    $response->assertOK();
});

test('管理者ユーザーが、事業所詳細ページにアクセスできないか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $response = $this->get(route('office.show', $office->id));
    $response->assertStatus(400);
});

test('一般ユーザーが、事業所詳細ページにアクセスできないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('office.show', $office->id));
    $response->assertStatus(400);
});

test('最上位管理者ユーザーが、事業所登録ページにアクセスできるか？', function () {
    Office::factory()->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
    ]);

    $this->actingAs($gadmin);

    $response = $this->get(route('office.create'));
    $response->assertOK();
});

test('管理者ユーザーが、事業所登録ページにアクセスできないか？', function () {
    Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $response = $this->get(route('office.create'));
    $response->assertStatus(400);
});

test('一般ユーザーが、事業所登録ページにアクセスできないか？', function () {
    Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('office.create'));
    $response->assertStatus(400);
});

test('最上位管理者ユーザーが、事業所情報を登録できるか？', function () {
    Office::factory()->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
    ]);

    $this->actingAs($gadmin);

    $data = [
        'name' => 'テスト',
        'zip_code' => '000-0000',
        'address' => 'テスト',
        'phone_number' => '000-0000-0000',
    ];

    $response = $this->post(route('office.store'), $data);
    $response->assertRedirect(route('office.index'));
});

test('管理者ユーザーが、事業所情報を登録できないか？', function () {
    Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $data = [
        'name' => 'テスト',
        'zip_code' => '000-0000',
        'address' => 'テスト',
        'phone_number' => '000-0000-0000',
    ];

    $response = $this->post(route('office.store'), $data);
    $response->assertStatus(400);
});

test('一般ユーザーが、事業所情報を登録できないか？', function () {
    Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $data = [
        'name' => 'テスト',
        'zip_code' => '000-0000',
        'address' => 'テスト',
        'phone_number' => '000-0000-0000',
    ];

    $response = $this->post(route('office.store'), $data);
    $response->assertStatus(400);
});

test('必須項目を入力しない場合、事業所情報を登録できないか？', function () {
    Office::factory()->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
    ]);

    $this->actingAs($gadmin);

    $data = [
        'name' => null,
        'zip_code' => null,
        'address' => null,
        'phone_number' => '000-0000-0000',
    ];

    $response = $this->post(route('office.store'), $data);
    $response->assertSessionHasErrors([
        'name', 'zip_code', 'address'
    ]);
});

test('任意項目を入力しない場合、事業所情報を登録できるか？', function () {
    Office::factory()->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
    ]);

    $this->actingAs($gadmin);

    $data = [
        'name' => 'テスト',
        'zip_code' => '000-0000',
        'address' => 'テスト',
        'phone_number' => null,
    ];


    $response = $this->post(route('office.store'), $data);
    $response->assertRedirect(route('office.index'));
});
