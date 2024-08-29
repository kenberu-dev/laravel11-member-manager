<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sex',
        'office_id',
        'status',
        'characteristics',
        'notes',
    ];

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function meetingLogs()
    {
        return $this->hasMany(MeetingLog::class);
    }
}
