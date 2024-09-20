<?php

namespace App\Http\Controllers;

use App\Http\Resources\MeetingLogResource;
use App\Http\Resources\MemberResource;
use App\Models\MeetingLog;
use App\Models\Member;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index ()
    {
        $query = MeetingLog::where("user_id", "=", Auth::id());

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $today = Carbon::now()->format('Y-m-d');
        $yesterday = Carbon::now()->subDay(1)->format('Y-m-d');
        $startWeek = Carbon::now()->startOfWeek()->format('Y-m-d');
        $endWeek = Carbon::now()->endOfWeek()->format('Y-m-d');

        $members = Member::all();
        $messageCount = Message::select("messages.id")
                            ->leftJoin("meeting_logs", "messages.meeting_logs_id", "meeting_logs.id")
                            ->where("meeting_logs.id", "=", Auth::id())
                            ->where("messages.sender_id", "!=", Auth::id())
                            ->whereDate("messages.created_at", "=", $yesterday)
                            ->orWhereDate("messages.created_at", "=", $today)
                            ->count();
        $meetingLogCount = MeetingLog::select("id")
                                ->where("user_id", "=", Auth::id())
                                ->WhereDate("created_at", ">", $startWeek)
                                ->orWhereDate("created_at", "=", $startWeek)
                                ->WhereDate("created_at", "<", $endWeek)
                                ->orWhereDate("created_at", "=", $endWeek)
                                ->count();
        // dd($meetingLogCount);
        if (request("id")) {
            $query->where("id", "=", request("id"));
        }

        if (request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }

        if (request("member")) {
            $query->where("member_id", "=", request("member"));
        }

        if (request("condition")) {
            $query->where("condition", "=", request("condition"));
        }

        $meetingLogs = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $queryParams = request()->query();

        return inertia("Dashboard",[
            "meetingLogs" => MeetingLogResource::collection($meetingLogs),
            "members" => MemberResource::collection($members),
            "messageCount" => $messageCount ?: 0,
            "meetingLogCount" => $meetingLogCount ?: 0,
            "queryParams" => $queryParams ?: null,
        ]);
    }
}
