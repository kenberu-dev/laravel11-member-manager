<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class External extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'manager_name',
        'office_id',
        'status',
        'address',
        'phone_number',
        'email',
        'notes',
    ];

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function meetingLogs()
    {
        return $this->hasMany(ExternalMeetingLog::class);
    }
}
