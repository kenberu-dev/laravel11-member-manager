<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Http\Resources\MeetingLogResource;
use App\Http\Resources\MemberResource;
use App\Http\Resources\OfficeResource;
use App\Http\Resources\UserResource;
use App\Models\MeetingLog;
use App\Models\Member;
use App\Models\Office;
use App\Models\User;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Member::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $offices = Office::all();

        if (request("id")) {
            $query->where("id", "=", request("id"));
        }

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("sex")) {
            $query->where("sex", "=", request("sex"));
        }

        if (request("office")) {
            $query->where("office_id", "=", request("office"));
        }

        if (request("status")) {
            $query->where("status", "=", request("status"));
        }

        if (request("characteristics")) {
            $query->where("characteristics", "like", "%" . request("characteristics") . "%");
        }

        $members = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $queryParams = request()->query();

        return inertia("Member/Index", [
            "members" => MemberResource::collection($members),
            "offices" => OfficeResource::collection($offices),
            "queryParams" => $queryParams ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $offices = Office::all();

        return inertia("Member/Create", [
            "offices" => OfficeResource::collection($offices),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMemberRequest $request)
    {
        $data = $request->validated();
        Member::create($data);

        return to_route('member.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        $query = MeetingLog::where("member_id", "=", $member->id);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("id")) {
            $query->where("id", "=", request("id"));
        }

        if (request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }

        if (request("user")) {
            $query->where("user_id", "=", request("user"));
        }

        if (request("condition")) {
            $query->where("condition", "=", request("condition"));
        }

        $meetingLogs = $query->orderBy($sortField, $sortDirection)->paginate(10);
        $users = User::select("users.id", "users.name")
                    ->leftJoin("meeting_logs", "meeting_logs.user_id", "=", "users.id")
                    ->where("meeting_logs.member_id", "=", $member->id)
                    ->groupBy("users.id", "users.name")
                    ->get();

        $queryParams = request()->query();

        return inertia('Member/Show', [
            'member' => new MemberResource($member),
            'users' => UserResource::collection($users),
            'meetingLogs' => MeetingLogResource::collection($meetingLogs),
            'queryParams' => $queryParams,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        $offices = Office::all();

        return inertia("Member/Edit", [
            'member' => new MemberResource($member),
            'offices' => OfficeResource::collection($offices),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMemberRequest $request, Member $member)
    {
        $data = $request->validated();
        $member->update($data);

        return to_route('member.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $member->delete();
        return to_route('member.index');
    }
}
