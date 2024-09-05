<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMeetingLogRequest;
use App\Http\Requests\UpdateMeetingLogRequest;
use App\Http\Resources\MeetingLogResource;
use App\Http\Resources\MemberResource;
use App\Http\Resources\OfficeResource;
use App\Http\Resources\UserResource;
use App\Models\MeetingLog;
use App\Models\Member;
use App\Models\Office;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MeetingLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = MeetingLog::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $users = User::all();
        $offices = Office::all();
        $members = Member::all();

        if (request("id")) {
            $query->where("id", "=", request("id"));
        }

        if (request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }

        if (request("office")) {
            $query->select("meeting_logs.*", "offices.id as office_id")
                ->leftJoin('members', 'meeting_logs.member_id', '=', 'members.id')
                ->leftJoin('offices', 'members.office_id', '=', 'offices.id')
                ->where('offices.id', '=', request("office"));
            $users = User::where('office_id', '=', request("office"))->get();
            $members = Member::where('office_id', '=', request("office"))->get();
        }

        if (request("user")) {
            $query->where("user_id", "=", request("user"));

            $officeId = User::select("office_id")->where("id", "=", request("user"));
            $offices = Office::where("id", "=", $officeId)->get();
            $members = Member::where("office_id", "=", $officeId)->get();
        }

        if (request("member")) {
            $query->where("member_id", "=", request("member"));

            $officeId = Member::select("office_id")->where("id", "=", request("member"));
            $offices = Office::where("id", "=", $officeId)->get();
            $users = User::where("office_id", "=", $officeId)->get();
        }

        if (request("condition")) {
            $query->where("condition", "=", request("condition"));
        }

        if ($sortField == "office_id") {
            if (!request("office")) {
                $query->select("meeting_logs.*", "offices.id as office_id")
                    ->leftJoin('members', 'meeting_logs.member_id', '=', 'members.id')
                    ->leftJoin('offices', 'members.office_id', '=', 'offices.id');
            }
        }

        $meetingLogs = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $queryParams = request()->query();

        return inertia("MeetingLog/Index", [
            'meetingLogs' => MeetingLogResource::collection($meetingLogs),
            'offices' => OfficeResource::collection($offices),
            'users' => UserResource::collection($users),
            'members' => MemberResource::collection($members),
            'queryParams' => $queryParams ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $query = MeetingLog::query();
        $meetingLogs = [];

        $members = Member::where('office_id', '=', Auth::user()->office_id)->get();

        if (request("member")) {
            $query->where("member_id", "=", request("member"));
            $meetingLogs = $query->orderBy("created_at", "desc")->paginate(1);
        }

        $queryParams = json_decode(json_encode(request()->query()), false);

        return inertia("MeetingLog/Create", [
            'members' => MemberResource::collection($members),
            'meetingLogs' => MeetingLogResource::collection($meetingLogs) ?? [],
            'queryParams' => $queryParams ?: null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMeetingLogRequest $request)
    {
        $data = $request->validated();
        MeetingLog::create($data);

        return to_route('meetinglog.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(MeetingLog $meetingLog)
    {

        return inertia('MeetingLog/Show', [
            'meetingLog' => new MeetingLogResource($meetingLog),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MeetingLog $meetingLog)
    {
        $query = MeetingLog::query();
        $meetingLogs = [];
        $officeId = User::select("office_id")->where("id", "=", $meetingLog->user_id);
        $members = Member::where('office_id', '=', $officeId)->get();
        if (request("member") || $meetingLog) {
            $memberId = request("member") ?? $meetingLog->member_id;
            $query->where("member_id", "=", $memberId);
            $meetingLogs = $query->orderBy("created_at", "desc")->paginate(1);
        }

        $queryParams = request()->query();

        return inertia('MeetingLog/Edit', [
            'members' => MemberResource::collection($members),
            'currentLog' => new MeetingLogResource($meetingLog),
            'meetingLogs' => MeetingLogResource::collection($meetingLogs) ?? [],
            'queryParams' => $queryParams ?: null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMeetingLogRequest $request, MeetingLog $meetingLog)
    {
        $data = $request->validated();

        $meetingLog->update($data);

        return to_route('meetinglog.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MeetingLog $meetingLog)
    {
        $meetingLog->delete();
        return to_route('meetinglog.index');
    }
}
