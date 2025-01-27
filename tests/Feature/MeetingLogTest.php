<?php

use App\Models\MeetingLog;
use App\Models\Member;
use App\Models\Office;
use App\Models\User;

test('面談記録一覧画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create(['office_id' => $office->id]);
    $member = Member::factory()->create(['office_id' => $office->id]);
    $meetingLog = MeetingLog::factory()->create([
        'user_id' => $user->id,
        'member_id' => $member->id,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('meetinglog.index'));

    $response->assertOK();
});

test('面談記録詳細画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create(['office_id' => $office->id]);
    $member = Member::factory()->create(['office_id' => $office->id]);
    $meetingLog = MeetingLog::factory()->create([
        'user_id' => $user->id,
        'member_id' => $member->id,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('meetinglog.show', $meetingLog->id));

    $response->assertOK();
});

test('面談記録登録画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create(['office_id' => $office->id]);
    $member = Member::factory()->create(['office_id' => $office->id]);

    $this->actingAs($user);

    $response = $this->get(route('meetinglog.create'));
    $response->assertOK();
});

test('同じ事業所に所属する利用者の面談記録を登録できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create(['office_id' => $office->id]);
    $member = Member::factory()->create(['office_id' => $office->id]);

    $this->actingAs($user);

    $data = [
        'title' => 'テストタイトル',
        'member_id' => $member->id,
        'user_id' => $user->id,
        'condition' => 3,
        'meeting_log' => 'テストです',
    ];

    $response = $this->post(route('meetinglog.store'), $data);
    $response->assertRedirect(route('meetinglog.index'));
});

test('違う事業所に所属する利用者の面談記録を登録できるか？', function () {
    $office = Office::factory()->count(2)->create();
    $user = User::factory()->create(['office_id' => $office[0]->id]);
    $member = Member::factory()->create(['office_id' => $office[1]->id]);

    $this->actingAs($user);

    $data = [
        'title' => 'テストタイトル',
        'member_id' => $member->id,
        'user_id' => $user->id,
        'condition' => 3,
        'meeting_log' => 'テストです',
    ];

    $response = $this->post(route('meetinglog.store'), $data);
    $response->assertStatus(400);
});

test('必須項目を入力しなかった場合、面談記録を登録できないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create(['office_id' => $office->id]);
    $member = Member::factory()->create(['office_id' => $office->id]);

    $this->actingAs($user);

    $data = [
        'title' => null,
        'member_id' => null,
        'user_id' => null,
        'condition' => null,
        'meeting_log' => null,
    ];

    $response = $this->post(route('meetinglog.store'), $data);
    $response->assertStatus(302);
    $response->assertSessionHasErrors([
        'title', 'member_id', 'user_id', 'condition', 'meeting_log',
    ]);
});

test('面談記録編集画面にアクセスできるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create(['office_id' => $office->id]);
    $member = Member::factory()->create(['office_id' => $office->id]);
    $meetingLog = MeetingLog::factory()->create(['user_id' => $user->id, 'member_id' => $member->id]);

    $this->actingAs($user);

    $response = $this->get(route('meetinglog.edit', $meetingLog->id));
    $response->assertOK();
});

test('同じ事業所に所属する利用者の面談記録を編集できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create(['office_id' => $office->id]);
    $member = Member::factory()->create(['office_id' => $office->id]);
    $meetingLog = MeetingLog::factory()->create(['user_id' => $user->id, 'member_id' => $member->id]);

    $this->actingAs($user);

    $data = [
        'title' => '編集されたテストタイトル',
        'member_id' => $member->id,
        'user_id' => $user->id,
        'condition' => 1,
        'meeting_log' => '編集されたテストです',
    ];

    $response = $this->put(route('meetinglog.update', $meetingLog->id), $data);
    $response->assertRedirect(route('meetinglog.index'));
});

test('違う事業所に所属する利用者の面談記録を編集できないか？', function () {
    $office = Office::factory()->count(2)->create();
    $user = User::factory()->create(['office_id' => $office[0]->id]);
    $member = Member::factory()->create(['office_id' => $office[1]->id]);
    $meetingLog = MeetingLog::factory()->create(['user_id' => $user->id, 'member_id' => $member->id]);

    $this->actingAs($user);

    $data = [
        'title' => '編集されたテストタイトル',
        'member_id' => $member->id,
        'user_id' => $user->id,
        'condition' => 1,
        'meeting_log' => '編集されたテストです',
    ];

    $response = $this->put(route('meetinglog.update', $meetingLog->id), $data);
    $response->assertStatus(400);
});

test('必須項目を入力しなかった場合、面談記録を編集できないか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create(['office_id' => $office->id]);
    $member = Member::factory()->create(['office_id' => $office->id]);
    $meetingLog = MeetingLog::factory()->create(['user_id' => $user->id, 'member_id' => $member->id]);

    $this->actingAs($user);

    $data = [
        'title' => null,
        'member_id' => null,
        'user_id' => null,
        'condition' => null,
        'meeting_log' => null,
    ];

    $response = $this->put(route('meetinglog.update', $meetingLog->id), $data);
    $response->assertStatus(302);
    $response->assertSessionHasErrors([
        'title', 'member_id', 'user_id', 'condition', 'meeting_log',
    ]);
});

test('管理者ユーザーは面談記録を削除できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create([
        'office_id' => $office->id,
        'is_admin' => true,
    ]);
    $member = Member::factory()->create(['office_id' => $office->id]);
    $meetingLog = MeetingLog::factory()->create(['user_id' => $user->id, 'member_id' => $member->id]);

    $this->actingAs($user);

    $response = $this->delete(route('meetinglog.destroy', $meetingLog->id));
    $response->assertRedirect(route('meetinglog.index'));
});

test('一般ユーザーは面談記録を削除できるか？', function () {
    $office = Office::factory()->create();
    $user = User::factory()->create([
        'office_id' => $office->id,
    ]);
    $member = Member::factory()->create(['office_id' => $office->id]);
    $meetingLog = MeetingLog::factory()->create(['user_id' => $user->id, 'member_id' => $member->id]);

    $this->actingAs($user);

    $response = $this->delete(route('meetinglog.destroy', $meetingLog->id));
    $response->assertStatus(400);
});
