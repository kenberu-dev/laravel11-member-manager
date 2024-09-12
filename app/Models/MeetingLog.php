<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public static function getMeetingLogsForUser()
    {
        $userId = Auth::user()->id;
        $query = MeetingLog::where("user_id", "=", $userId);

        return $query->get()->toArray();
    }

    public static function updateMeetingLogWithMessage($meetinglogsId, $message)
    {
        return self::updateOrCreate(
            ['id' => $meetinglogsId],
            ['last_message_id' => $message->id,]
        );
    }
}
