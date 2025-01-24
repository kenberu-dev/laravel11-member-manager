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

test('最上位管理者ユーザーが、事業所編集ページにアクセスできるか？', function () {
    $office = Office::factory()->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
    ]);

    $this->actingAs($gadmin);

    $response = $this->get(route('office.edit', $office->id));
    $response->assertOK();
});

test('管理者ユーザーが、事業所編集ページにアクセスできないか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $response = $this->get(route('office.edit', $office->id));
    $response->assertStatus(400);
});

test('一般ユーザーが、事業所編集ページにアクセスできないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('office.edit', $office->id));
    $response->assertStatus(400);
});

test('最上位管理者ユーザーが、事業所情報を編集できるか？', function () {
    $office = Office::factory()->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
    ]);

    $this->actingAs($gadmin);

    $data = [
        'name' => '編集されたテスト',
        'zip_code' => '222-1111',
        'address' => '編集されたテスト',
        'phone_number' => '000-111-2222',
    ];

    $response = $this->put(route('office.update', $office->id), $data);
    $response->assertRedirect(route('office.index'));
});

test('管理者ユーザーが、事業所情報を編集できないか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $data = [
        'name' => '編集されたテスト',
        'zip_code' => '222-1111',
        'address' => '編集されたテスト',
        'phone_number' => '000-111-2222',
    ];

    $response = $this->put(route('office.update', $office->id), $data);
    $response->assertStatus(400);
});

test('一般ユーザーが、事業所情報を編集できないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $data = [
        'name' => '編集されたテスト',
        'zip_code' => '222-1111',
        'address' => '編集されたテスト',
        'phone_number' => '000-111-2222',
    ];

    $response = $this->put(route('office.update', $office->id), $data);
    $response->assertStatus(400);
});

test('必須項目を入力しない場合、事業所情報を編集できないか？', function () {
    $office = Office::factory()->create();
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

    $response = $this->put(route('office.update', $office->id), $data);
    $response->assertSessionHasErrors([
        'name', 'zip_code', 'address'
    ]);
});

test('任意項目を入力しない場合、事業所情報を編集できるか？', function () {
    $office = Office::factory()->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
    ]);

    $this->actingAs($gadmin);
    $data = [
        'name' => '編集されたテスト',
        'zip_code' => '222-1111',
        'address' => '編集されたテスト',
        'phone_number' => null,
    ];


    $response = $this->put(route('office.update', $office->id), $data);
    $response->assertRedirect(route('office.index'));
});

test('最上位管理者ユーザーが、事業所をアーカイブできるか？', function () {
    $offices = Office::factory()->count(2)->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
        'office_id' => $offices[0]->id,
    ]);

    $this->actingAs($gadmin);

    $response = $this->post(route('office.archive', $offices[1]->id));
    $response->assertRedirect(route('office.index'));
});

test('管理者ユーザーが、事業所をアーカイブできないか？', function () {
    $offices = Office::factory()->count(2)->create();
    $admin = User::factory()->create([
        'is_admin' => true,
        'office_id' => $offices[0]->id,
    ]);

    $this->actingAs($admin);

    $response = $this->post(route('office.archive', $offices[1]->id));
    $response->assertStatus(400);
});

test('一般ユーザーが、事業所をアーカイブできないか？', function () {
    $offices = Office::factory()->count(2)->create();
    $user = User::factory()->create([
        'office_id' => $offices[0]->id,
    ]);

    $this->actingAs($user);

    $response = $this->post(route('office.archive', $offices[1]->id));
    $response->assertStatus(400);
});

test('最上位管理者ユーザーが、事業所情報を削除できるか？', function () {
    $offices = Office::factory()->count(2)->create();
    $gadmin = User::factory()->create([
        'is_global_admin' => true,
        'office_id' => $offices[0]->id,
    ]);

    $this->actingAs($gadmin);

    $response = $this->delete(route('office.destroy', $offices[1]->id));
    $response->assertRedirect(route('office.index'));
});

test('管理者ユーザーが、事業所情報を削除できるか？', function () {
    $offices = Office::factory()->count(2)->create();
    $admin = User::factory()->create([
        'is_admin' => true,
        'office_id' => $offices[0]->id,
    ]);

    $this->actingAs($admin);

    $response = $this->delete(route('office.destroy', $offices[1]->id));
    $response->assertStatus(400);
});

test('一般ユーザーが、事業所情報を削除できるか？', function () {
    $offices = Office::factory()->count(2)->create();
    $user = User::factory()->create([
        'office_id' => $offices[0]->id,
    ]);

    $this->actingAs($user);

    $response = $this->delete(route('office.destroy', $offices[1]->id));
    $response->assertStatus(400);
});