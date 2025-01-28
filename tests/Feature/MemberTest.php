<?php

use App\Models\Member;
use App\Models\Office;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('利用者情報一覧ページにアクセスできるか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $member = Member::factory()->create();

    $this->actingAs($user);
    $response = $this->get(route('member.index'));

    $response->assertOK();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Member/Index')
        ->has('members')
        ->etc()
        );
});

test('利用者情報詳細ページにアクセスできるか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $member = Member::factory()->create();

    $this->actingAs($user);
    $response = $this->get(route('member.show', $member->id));

    $response->assertOK();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Member/Show')
        ->where('member.id', $member->id)
        ->etc()
        );
});

test('利用者情報登録ページにアクセスできるか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $this->actingAs($user);
    $response = $this->get(route('member.create'));

    $response->assertOK();
});

test('同じ事業所に所属する利用者情報を登録できるか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $this->actingAs($user);

    $data = [
        'name' => 'テスト',
        'sex' => '男',
        'office_id' => $office->id,
        'characteristics' => 'なし',
        'status' => '利用中',
        'beneficiary_number' => 7185541395,
        'document_url' => 'https://drive.google.com/drive/folders/1YbrR7_zJXO1MHAMydxXZaSmkIurKQu0q',
        'started_at' => '2024-01-21',
        'update_limit' => '2024-01-21',
        'note' => 'テスト',
    ];

    $response = $this->post(route('member.store'), $data);
    $response->assertRedirect(route('member.index'));
});

test('任意項目を入力しなくても利用者情報を登録することができるか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $this->actingAs($user);

    $data = [
        'name' => 'テスト',
        'sex' => '男',
        'office_id' => $office->id,
        'characteristics' => 'なし',
        'status' => '利用中',
        'beneficiary_number' => null,
        'document_url' => null,
        'started_at' => null,
        'update_limit' => null,
        'note' => 'テスト',
    ];

    $response = $this->post(route('member.store'), $data);
    $response->assertRedirect(route('member.index'));
});

test('違う事業所に所属する利用者情報を登録できるか？', function () {
    $offices = Office::factory()->count(2)->create();

    $user = User::factory()->create([
                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $offices[0]->id,
            ]);

    $this->actingAs($user);

    $data = [
        'name' => 'テスト',
        'sex' => '男',
        'office_id' => $offices[1]->id,
        'characteristics' => 'なし',
        'status' => '利用中',
        'beneficiary_number' => null,
        'document_url' => null,
        'started_at' => null,
        'update_limit' => null,
        'note' => 'テスト',
    ];

    $response = $this->post(route('member.store'), $data);
    $response->assertStatus(403);
});

test('利用者編集ページにアクセスできるか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $member = Member::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('member.edit', $member->id));
    $response->assertOK();
});

test('同じ事業所に所属する利用者情報を編集できるか？', function () {
    $office = Office::factory()->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office->id,
            ]);

    $member = Member::factory()->create();

    $this->actingAs($user);

    $data = [
        'name' => 'テストのテスト',
        'sex' => '女',
        'office_id' => $office->id,
        'characteristics' => 'なし',
        'status' => '利用中止',
        'beneficiary_number' => '3333331000',
        'document_url' => 'https://drive.google.com/drive/folders/1YbrR7_zJXO1MHAMydxXZaSmkIurKQu0q',
        'started_at' => '2024-01-21',
        'update_limit' => '2024-01-21',
        'note' => 'テスト',
    ];

    $response = $this->put(route('member.update', $member->id), $data);
    $response->assertRedirect(route('member.index'));
});

test('違う事業所に所属する利用者情報を編集できるか？', function () {
    $office = Office::factory()->count(2)->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office[0]->id,
            ]);

    $member = Member::factory()->create();


    $this->actingAs($user);

    $data = [
        'name' => 'テストのテスト',
        'sex' => '女',
        'office_id' => $office[1]->id,
        'characteristics' => 'なし',
        'status' => '利用中止',
        'beneficiary_number' => '3333331000',
        'document_url' => 'https://drive.google.com/drive/folders/1YbrR7_zJXO1MHAMydxXZaSmkIurKQu0q',
        'started_at' => '2024-01-21',
        'update_limit' => '2024-01-21',
        'note' => 'テスト',
    ];

    $response = $this->put(route('member.update', $member->id),$data);
    $response->assertStatus(403);
});

test('管理者ユーザーが利用者情報を削除できるか？', function () {
    $office = Office::factory()->count(2)->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office[0]->id,
                'is_admin' => true,
            ]);

    $member = Member::factory()->create();

    $this->actingAs($user);

    $response = $this->delete(route('member.destroy', $member->id));
    $response->assertRedirect(route('member.index'));
});

test('一般ユーザーが利用者情報を削除できないか？', function () {
    $office = Office::factory()->count(2)->create();

    $user = User::factory()->create([

                'email' => 'test@example.com',
                'password' => bcrypt('password123'),
                'office_id' => $office[0]->id,
            ]);

    $member = Member::factory()->create();

    $this->actingAs($user);

    $response = $this->delete(route('member.destroy', $member->id));
    $response->assertStatus(403);
});
