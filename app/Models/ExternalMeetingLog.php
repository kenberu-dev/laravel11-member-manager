<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ExternalMeetingLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'user_id',
        'external_id',
        'meeting_log',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function external()
    {
        return $this->belongsTo(External::class);
    }

    public function messages()
    {
        return $this->hasMany(ExternalMessage::class);
    }

    public static function getMeetingLogsForUser()
    {
        $userId = Auth::user()->id;
        $query = ExternalMeetingLog::where("user_id", "=", $userId);

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
