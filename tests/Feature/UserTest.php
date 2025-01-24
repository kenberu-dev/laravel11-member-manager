<?php

use App\Models\Office;
use App\Models\User;

test('管理者ユーザーが、従業員情報一覧ページにアクセスできるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $response = $this->get(route('user.index'));
    $response->assertOK();
});

test('一般ユーザーが、従業員情報一覧ページにアクセスできないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('user.index'));
    $response->assertStatus(400);
});

test('管理者ユーザーが、従業員詳細情報にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $user = User::factory()->create();

    $this->actingAs($admin);

    $response = $this->get(route('user.show', $user->id));
    $response->assertOK();
});

test('一般ユーザーが、従業員詳細情報にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $users = User::factory()->count(2)->create();

    $this->actingAs($users[0]);

    $response = $this->get(route('user.show', $users[1]->id));
    $response->assertStatus(400);
});

test('管理者ユーザーが、従業員登録情報にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $response = $this->get(route('user.create'));
    $response->assertOK();
});

test('一般ユーザーが、従業員登録情報にアクセスできないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('user.create'));
    $response->assertStatus(400);
});

test('同じ事業所に所属する従業員情報を登録できるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $data = [
        'name' => 'テスト',
        'avatar' => null,
        'email' => 'test@example.com',
        'office_id' => $office->id,
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'is_admin' => false,
    ];

    $response = $this->post(route('user.store'), $data);
    $response->assertRedirect(route('user.index'));
});

test('違う事業所に所属する従業員情報を登録できないか？', function () {
    $offices = Office::factory()->count(2)->create();
    $admin = User::factory()->create([
        'office_id' => $offices[0]->id,
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $data = [
        'name' => 'テスト',
        'avatar' => null,
        'email' => 'test@example.com',
        'office_id' => $offices[1]->id,
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'is_admin' => false,
    ];

    $response = $this->post(route('user.store'), $data);
    $response->assertStatus(400);
});

test('一般ユーザーが、従業員情報を登録できないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user);

    $data = [
        'name' => 'テスト',
        'avatar' => null,
        'email' => 'test@example.com',
        'office_id' => $office->id,
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'is_admin' => false,
    ];

    $response = $this->post(route('user.store'), $data);
    $response->assertRedirect(route('user.index'));
});

test('任意項目を入力しなくても従業員情報を登録できるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $data = [
        'name' => 'テスト',
        'avatar' => null,
        'email' => 'test@example.com',
        'office_id' => $office->id,
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'is_admin' => null,
    ];

    $response = $this->post(route('user.store'), $data);
    $response->assertRedirect(route('user.index'));
});

test('必須項目を入力しない場合従業員情報を登録できないか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin);

    $data = [
        'name' => null,
        'avatar' => null,
        'email' => null,
        'office_id' => null,
        'password' => null,
        'password_confirmation' => null,
        'is_admin' => false,
    ];

    $response = $this->post(route('user.store'), $data);
    $response->assertStatus(302);
    $response->assertSessionHasErrors([
        'name', 'email', 'office_id', 'password',
    ]);
});

test('管理者ユーザーが、利用者編集ページにアクセスできるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $user = User::factory()->create();

    $this->actingAs($admin);

    $response = $this->get(route('user.edit', $user->id));
    $response->assertOK();
});

test('一般ユーザーが、利用者編集ページにアクセスできるか？', function () {
    $office = Office::factory()->create();
    $users = User::factory()->count(2)->create();

    $this->actingAs($users[0]);

    $response = $this->get(route('user.edit', $users[1]->id));
    $response->assertStatus(400);
});

test('管理者ユーザーが、同じ事業所に所属する利用者情報を編集できるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $user = User::factory()->create();

    $this->actingAs($admin);

    $data = [
        'name' => '編集されたテスト',
        'avatar' => null,
        'email' => 'edittest@example.com',
        'office_id' => $office->id,
        'password' => 'edit-password',
        'password_confirmation' => 'edit-password',
        'is_admin' => true,
    ];

    $response = $this->put(route('user.update', $user->id), $data);
    $response->assertRedirect(route('user.index'));
});

test('管理者ユーザーが、違う事業所に所属する利用者情報を編集できないか？', function () {
    $offices = Office::factory()->count(2)->create();
    $admin = User::factory()->create([
        'office_id' => $offices[0]->id,
        'is_admin' => true,
    ]);
    $user = User::factory()->create([
        'office_id' => $offices[1]->id,
    ]);

    $this->actingAs($admin);

    $data = [
        'name' => '編集されたテスト',
        'avatar' => null,
        'email' => 'edittest@example.com',
        'office_id' => $offices[1]->id,
        'password' => 'edit-password',
        'password_confirmation' => 'edit-password',
        'is_admin' => true,
    ];

    $response = $this->put(route('user.update', $user->id), $data);
    $response->assertStatus(400);
});

test('一般ユーザーが、従業員情報を編集できないか？', function () {
    $office = Office::factory()->create();
    $users = User::factory()->count(2)->create();

    $this->actingAs($users[0]);

    $data = [
        'name' => '編集されたテスト',
        'avatar' => null,
        'email' => 'edittest@example.com',
        'office_id' => $office->id,
        'password' => 'edit-password',
        'password_confirmation' => 'edit-password',
        'is_admin' => true,
    ];

    $response = $this->post(route('user.update', $users[1]->id), $data);
    $response->assertStatus(400);
});

test('管理者ユーザーが従業員アーカイブ一覧ページにアクセスできるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $user = User::factory()->create();

    $this->actingAs($admin);

    $response = $this->get(route('user.indexArchived'));
    $response->assertOK();
});

test('一般ユーザーが従業員アーカイブ一覧ページにアクセスできないか？', function () {
    $office = Office::factory()->create();
    $users = User::factory()->count(2)->create();

    $this->actingAs($users[0]);

    $response = $this->get(route('user.indexArchived'));
    $response->assertStatus(400);
});

test('管理者ユーザーが従業員情報をアーカイブできるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $user = User::factory()->create();

    $this->actingAs($admin);

    $response = $this->post(route('user.archive', $user->id));
    $response->assertRedirect(route('user.index'));
});

test('一般ユーザーが従業員情報をアーカイブできないか？', function () {
    $office = Office::factory()->create();
    $users = User::factory()->count(2)->create();

    $this->actingAs($users[0]);

    $response = $this->post(route('user.archive', $users[1]->id));
    $response->assertStatus(400);
});

test('管理者ユーザーが利用者情報を削除できるか？', function () {
    $office = Office::factory()->create();
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $user = User::factory()->create();

    $this->actingAs($admin);

    $response = $this->delete(route('user.destroy', $user->id));
    $response->assertRedirect(route('user.indexArchived'));
});

test('一般ユーザーは利用者情報を削除できないか？', function () {
    $office = Office::factory()->create();
    $users = User::factory()->count(2)->create();

    $this->actingAs($users[0]);

    $response = $this->delete(route('user.destroy', $users[1]->id));
    $response->assertStatus(400);
});
