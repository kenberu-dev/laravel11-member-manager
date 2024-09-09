<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('message.meetinglog.{meetinglogId}', function(User $user) {
    return $user;
});
