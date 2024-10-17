<?php

use App\Http\Controllers\CrmController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MeetingLogController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/meetinglog', [MeetingLogController::class, 'index'])
        ->name('meetinglog.index');

    Route::get('/meetinglog/show/{meetingLog}', [MeetingLogController::class, 'show'])
        ->name('meetinglog.show');

    Route::get('/meetinglog/create', [MeetingLogController::class, 'create'])
        ->name('meetinglog.create');

    Route::post('/meetinglog', [MeetingLogController::class, 'store'])
        ->name('meetinglog.store');

    Route::delete('/meetinglog/destroy/{meetingLog}', [MeetingLogController::class, 'destroy'])
        ->name('meetinglog.destroy');

    Route::get('/meetinglog/edit/{meetingLog}', [MeetingLogController::class, 'edit'])
        ->name('meetinglog.edit');

    Route::put('/meetinglog/update/{meetingLog}', [MeetingLogController::class, 'update'])
        ->name('meetinglog.update');

    Route::patch('/meetinglog/update/{meetingLog}', [MeetingLogController::class, 'update'])
        ->name('meetinglog.update');

    Route::post('/message', [MessageController::class, 'store'])
        ->name('message.store');

    Route::delete('message/{message}', [MessageController::class, 'destroy'])
        ->name('message.destroy');

    Route::get('/message/older/{message}', [MessageController::class, 'loadOlder'])
        ->name('message.loadOlder');

    Route::get('/member', [MemberController::class, 'index'])
        ->name('member.index');

    Route::get('/member/show/{member}', [MemberController::class, 'show'])
        ->name('member.show');

    Route::get('/member/create', [MemberController::class, 'create'])
        ->name('member.create');

    Route::post('/member', [MemberController::class, 'store'])
        ->name('member.store');

    Route::delete('/member/destroy/{member}', [MemberController::class, 'destroy'])
        ->name('member.destroy');

    Route::get('/member/edit/{member}', [MemberController::class, 'edit'])
        ->name('member.edit');

    Route::put('/member/update/{member}', [MemberController::class, 'update'])
        ->name('member.update');

    Route::patch('/member/update/{member}', [MemberController::class, 'update'])
        ->name('memeber.update');

    Route::post('/member/updateLimit/{member}', [MemberController::class, 'updateLimit'])
        ->name('member.updateLimit');

    Route::get('/user', [UserController::class, 'index'])
        ->name('user.index');

    Route::get('/user/show/{user}', [UserController::class, 'show'])
        ->name('user.show');

    Route::get('/user/create', [UserController::class, 'create'])
        ->name('user.create');

    Route::post('/user', [UserController::class, 'store'])
        ->name('user.store');

    Route::delete('/user/destroy/{user}', [UserController::class, 'destroy'])
        ->name('user.destroy');

    Route::post('/user/archive/{user}', [UserController::class, 'archive'])
        ->name('user.archive');

    Route::get('/user/edit/{user}', [UserController::class, 'edit'])
        ->name('user.edit');

    Route::put('/user/update/{user}', [UserController::class, 'update'])
        ->name('user.update');

    Route::patch('/user/update/{user}', [UserController::class, 'update'])
        ->name('user.update');

    Route::get('/user/archived', [UserController::class, 'indexArchived'])
        ->name('user.indexArchived');

    Route::post('user/restore/{user}', [UserController::class, 'restore'])
        ->name('user.restore');

    Route::get('/office', [OfficeController::class, 'index'])
        ->name('office.index');

    Route::get('/office/show/{office}', [OfficeController::class, 'show'])
        ->name('office.show');

    Route::get('/office/create', [OfficeController::class, 'create'])
        ->name('office.create');

    Route::post('/office', [OfficeController::class, 'store'])
        ->name('office.store');

    Route::delete('/office/destroy/{office}', [OfficeController::class, 'destroy'])
        ->name('office.destroy');

    Route::post('/office/archive/{office}', [OfficeController::class, 'archive'])
        ->name('office.archive');

    Route::get('/office/edit/{office}', [OfficeController::class, 'edit'])
        ->name('office.edit');

    Route::put('/office/update/{office}', [OfficeController::class, 'update'])
        ->name('office.update');

    Route::patch('/office/update/{office}', [OfficeController::class, 'update'])
        ->name('office.update');

    Route::get('office/archived', [OfficeController::class, 'indexArchived'])
        ->name('office.indexArchived');

    Route::post('office/restore/{office}', [OfficeController::class, 'restore'])
        ->name('office.restore');

    Route::get('crm', [CrmController::class, 'index'])
        ->name('crm.index');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
