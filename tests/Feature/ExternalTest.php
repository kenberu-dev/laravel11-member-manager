<?php

use App\Models\External;
use App\Models\Office;
use App\Models\User;

use function Pest\Laravel\delete;

test('外部対応一覧画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('external.index'));
    $response->assertOK();
});

test('外部対応詳細画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('external.show', $external->id));
    $response->assertOK();
});

test('外部対応登録画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('external.create'));
    $response->assertOK();
});

test('同じ事業所に所属する外部対応者情報を登録できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $data = [
        'company_name' => '株式会社テスト',
        'manager_name' => 'テスト',
        'office_id' => $office->id,
        'status' => '見学',
        'address' => 'テスト',
        'phone_number' => '0801112222',
        'email' => 'test@example.com',
        'notes' => 'テスト',
    ];

    $response = $this->post(route('external.store'), $data);
    $response->assertRedirect(route('external.index'));
});

test('違う事業所に所属する外部対応者情報を登録できないか？', function () {
    $office = Office::factory()->count(2)->create();
    $user = User::factory()->create(['office_id' => $office[0]->id]);

    $this->actingAs($user);

    $data = [
        'company_name' => '株式会社テスト',
        'manager_name' => 'テスト',
        'office_id' => $office[1]->id,
        'status' => '見学',
        'address' => 'テスト',
        'phone_number' => '0801112222',
        'email' => 'test@example.com',
        'notes' => 'テスト',
    ];

    $response = $this->post(route('external.store'), $data);
    $response->assertStatus(403);
});

test('必須項目を入力しなかった場合登録できないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $data = [
        'company_name' => null,
        'manager_name' => null,
        'office_id' => $office->id,
        'status' => null,
        'address' => null,
        'phone_number' => null,
        'email' => null,
        'notes' => null,
    ];

    $response = $this->post(route('external.store'), $data);
    $response->assertStatus(302);
    $response->assertSessionHasErrors([
        'company_name', 'status', 
    ]);
});

test('任意項目を入力しなかった場合登録できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $data = [
        'company_name' => '株式会社テスト',
        'manager_name' => null,
        'office_id' => $office->id,
        'status' => '見学',
        'address' => null,
        'phone_number' => null,
        'email' => null,
        'notes' => null,
    ];

    $response = $this->post(route('external.store'), $data);
    $response->assertRedirect(route('external.index'));
});

test('同じ事業所に所属する外部対応者情報を編集できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $data = [
        'company_name' => '株式会社編集テスト',
        'manager_name' => '編集されたテスト',
        'office_id' => $office->id,
        'status' => '見学',
        'address' => '編集されたテスト',
        'phone_number' => '0904445555',
        'email' => 'test@example.com',
        'notes' => '編集されたテスト',
    ];

    $response = $this->put(route('external.update', $external->id), $data);
    $response->assertRedirect(route('external.index'));
});

test('違う事業所に所属する外部対応者情報を編集できないか？', function () {
    $office = Office::factory()->count(2)->create();
    $user = User::factory()->create([
        'office_id' => $office[0]->id,
    ]);
    $external = External::factory()->create([
        'office_id' => $office[1]->id,
    ]);

    $this->actingAs($user);

    $data = [
        'company_name' => '株式会社編集テスト',
        'manager_name' => '編集されたテスト',
        'office_id' => $office[1]->id,
        'status' => '見学',
        'address' => '編集されたテスト',
        'phone_number' => '0904445555',
        'email' => 'test@example.com',
        'notes' => '編集されたテスト',
    ];

    $response = $this->put(route('external.update', $external->id), $data);
    $response->assertStatus(403);
});

test('必須項目を入力しなかった場合編集できないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $data = [
        'company_name' => null,
        'manager_name' => '編集されたテスト',
        'office_id' => $office->id,
        'status' => null,
        'address' => '編集されたテスト',
        'phone_number' => '0904445555',
        'email' => 'test@example.com',
        'notes' => '編集されたテスト',
    ];

    $response = $this->put(route('external.update', $external->id), $data);
    $response->assertStatus(302);
    $response->assertSessionHasErrors([
        'company_name', 'status',
    ]);
});

test('任意項目を入力しなかった場合編集できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $data = [
        'company_name' => '株式会社編集テスト',
        'manager_name' => null,
        'office_id' => $office->id,
        'status' => '見学',
        'address' => null,
        'phone_number' => null,
        'email' => null,
        'notes' => null,
    ];

    $response = $this->put(route('external.update', $external->id), $data);
    $response->assertRedirect(route('external.index'));
});

test('管理者ユーザーが外部対応情報を削除できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create([
        'is_admin' => true,
    ]);
    $external = External::factory()->create();

    $this->actingAs($user);

    $response = delete(route('external.destroy', $external->id));
    $response->assertRedirect(route('external.index'));
});

test('一般ユーザーは外部対応情報を削除できないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $response = delete(route('external.destroy', $external->id));
    $response->assertStatus(403);
});
