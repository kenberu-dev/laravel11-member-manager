<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'user_id',
        'member_id',
        'condition',
        'meeting_log',
        'last_message_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function lastMessage()
    {
        return $this->belongsTo(Message::class, 'last_message_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
