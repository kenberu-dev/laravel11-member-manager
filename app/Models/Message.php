<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'sender_id',
        'meeting_logs_id',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class);
    }

    public function meetingLog()
    {
        return $this->belongsTo(MeetingLog::class);
    }
}
