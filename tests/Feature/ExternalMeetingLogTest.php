<?php

use App\Models\External;
use App\Models\ExternalMeetingLog;
use App\Models\Office;
use App\Models\User;

test('外部対応の面談記録一覧画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('external.meetinglog.index'));
    $response->assertOK();
});

test('外部対応の面談記録詳細画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();
    $meetingLog = ExternalMeetingLog::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('external.meetinglog.show', $meetingLog->id));
    $response->assertOK();
});

test('外部対応の面談記録登録画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('external.meetinglog.create'));
    $response->assertOK();
});

test('同じ事業所に所属する外部対応者の面談記録を登録できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $data = [
        'title' => 'テストタイトル',
        'user_id' => $user->id,
        'external_id' => $external->id,
        'meeting_log' => 'テスト',
    ];

    $response = $this->post(route('external.meetinglog.store'), $data);
    $response->assertRedirect(route('external.meetinglog.index'));
});

test('違う事業所に所属する外部対応者の面談記録を登録できないか？', function () {
    $office = Office::factory()->count(2)->create();
    $user = User::factory()->create([
        'office_id' => $office[0]->id,
    ]);

    $external = External::factory()->create([
        'office_id' => $office[1]->id,
    ]);

    $this->actingAs($user);

    $data = [
        'title' => 'テストタイトル',
        'user_id' => $user->id,
        'external_id' => $external->id,
        'meeting_log' => 'テスト',
    ];

    $response = $this->post(route('external.meetinglog.store'), $data);
    $response->assertStatus(400);
});

test('必須項目を入力しなかった場合登録できないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();

    $this->actingAs($user);

    $data = [
        'title' => null,
        'user_id' => null,
        'external_id' => null,
        'meeting_log' => null,
    ];

    $response = $this->post(route('external.meetinglog.store'), $data);
    $response->assertSessionHasErrors([
        'title', 'user_id', 'external_id', 'meeting_log',
    ]);
});

test('同じ事業所に所属する外部対応の面談記録を編集できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create();
    $external = External::factory()->create();
    $meetingLog = ExternalMeetingLog::factory()->create();

    $this->actingAs($user);

    $data = [
        'title' => '編集されたテスト',
        'user_id' => $user->id,
        'external_id' => $external->id,
        'meeting_log' => '編集されたテスト',
    ];

    $response = $this->put(route('external.meetinglog.update', $external->id), $data);
    $response->assertRedirect(route('external.meetinglog.index'));
});
