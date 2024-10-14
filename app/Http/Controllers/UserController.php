<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\MeetingLogResource;
use App\Http\Resources\MemberResource;
use App\Http\Resources\OfficeResource;
use App\Http\Resources\UserResource;
use App\Models\MeetingLog;
use App\Models\Member;
use App\Models\Office;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::where("is_archive", "=", false);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $offices = Office::all();

        if (request("id")) {
            $query->where("id", "=", request("id"));
        }

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        if (request("office")) {
            $query->where("office_id", "=", request("office"));
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $queryParams = request()->query();

        return inertia("User/Index",[
            "offices" => OfficeResource::collection($offices),
            "users" => UserResource::collection($users),
            "queryParams" => $queryParams ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $offices = Office::all();

        return inertia("User/Create", [
            "offices" => OfficeResource::collection($offices),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $avatar = $request->file('avatar');
        $data = $request->validated();

        if ($avatar) {
            $avatarName = uniqid('atavar_'). '.' . $avatar->getClientOriginalExtension();
            $data['avatar'] = $avatar->storeAs('avatars', $avatarName, 'public');
        }
        User::create($data);

        return to_route("user.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $query = MeetingLog::where("user_id", "=", $user->id);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $members = Member::select("members.id", "members.name")
                    ->leftJoin("meeting_logs", "meeting_logs.member_id", "=", "members.id")
                    ->where("meeting_logs.user_id", "=", $user->id)
                    ->groupBy("members.id", "members.name")
                    ->get();

        $meetingLogs = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $queryParams = request()->query();

        return inertia("User/Show", [
            "user" => new UserResource($user),
            "members" => MemberResource::collection($members),
            "meetingLogs" => MeetingLogResource::collection($meetingLogs),
            "queryParams" => $queryParams ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $offices = Office::all();

        return inertia("User/Edit", [
            "user" => new UserResource($user),
            "offices" => OfficeResource::collection($offices),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $avatar = $request->file('avatar');
        $data = $request->validated();

        if ($avatar) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            $avatarName = uniqid('atavar_'). '.' . $avatar->getClientOriginalExtension();
            $user->avatar = $avatar->storeAs('avatars', $avatarName, 'public');
        }

        unset($data['avatar']);
        $user->update($data);

        return to_route("user.index");
    }

    public function archive(User $user)
    {
        $user->update(['is_archive' => true]);

        return to_route("user.index");
    }

    public function indexArchived()
    {
        $query = User::where("is_archive", "=", true);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $offices = Office::all();

        if (request("id")) {
            $query->where("id", "=", request("id"));
        }

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        if (request("office")) {
            $query->where("office_id", "=", request("office"));
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10);
        $queryParams = request()->query();

        return inertia("User/Restore", [
            "users" => UserResource::collection($users),
            "offices" => OfficeResource::collection($offices),
            "queryParams" => $queryParams ?: null,
        ]);
    }

    public function restore(User $user)
    {
        $user->update(['is_archive' => false]);

        return to_route("user.indexArchived");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }
        $user->delete();

        return to_route("user.indexArchived");
    }
}
