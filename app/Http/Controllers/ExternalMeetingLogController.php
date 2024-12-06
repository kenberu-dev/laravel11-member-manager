<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExternalMeetingLogRequest;
use App\Http\Requests\UpdateExternalMeetingLogRequest;
use App\Http\Resources\ExternalMeetingLogResource;
use App\Http\Resources\ExternalMessageResource;
use App\Http\Resources\ExternalRsource;
use App\Http\Resources\OfficeResource;
use App\Http\Resources\UserResource;
use App\Models\External;
use App\Models\ExternalMeetingLog;
use App\Models\ExternalMessage;
use App\Models\Office;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ExternalMeetingLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = ExternalMeetingLog::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $offices = Office::all();
        $users = User::all();
        $externals = External::all();

        if(!Auth::user()->is_global_admin) {
            $officeId = Auth::user()->office_id;
            $query->select("external_meeting_logs.*", "offices.id as office_id")
                ->leftJoin('externals', 'external_meeting_logs.external_id', '=', 'externals.id')
                ->leftJoin('offices', 'externals.office_id', '=', 'offices.id')
                ->where('offices.id', '=', $officeId);
            $users = User::where("office_id", "=", $officeId)->get();
            $externals = External::where("office_id", "=", $officeId)->get();
        }

        if(request("id")) {
            $query->where("id", "like", "%" . request("id") . "%");
        }

        if(request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }

        if(request("user")) {
            $query->where("user_id", "=", request("user"));

            $officeId = User::select("office_id")->where("id", "=", request("user"));
            $offices = Office::where("id", "=", $officeId)->get();
            $externals = External::where("office_id", "=", $officeId)->get();
        }

        if(request("external")) {
            $query->where("external_id", "=", request("external"));

            $officeId = External::select("office_id")->where("id", "=", request("external"));
            $offices = Office::where("id", "=", $officeId)->get();
            $users = User::where("office_id", "=", $officeId)->get();
        }

        if (request("office")) {
            $query->select("external_meeting_logs.*", "offices.id as office_id")
                ->leftJoin('externals', 'external_meeting_logs.external_id', '=', 'externals.id')
                ->leftJoin('offices', 'externals.office_id', '=', 'offices.id')
                ->where('offices.id', '=', request("office"));
            $externals = External::where("office_id", "=", request("office"))->get();
            $users = User::where("office_id", "=", request("office"))->get();
        }

        if ($sortField == "office_id") {
            if (!request("office")) {
                $query->select("external_meeting_logs.*", "offices.id as office_id")
                    ->leftJoin('externals', 'meeting_logs.external_id', '=', 'externals.id')
                    ->leftJoin('offices', 'externals.office_id', '=', 'offices.id');
            }
        }

        $meetingLogs = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $queryParams = request()->query();

        return inertia("ExternalMeetingLog/Index",[
            "meetingLogs" => ExternalMeetingLogResource::collection($meetingLogs),
            "offices" => OfficeResource::collection($offices),
            "users" => UserResource::collection($users),
            "externals" => ExternalRsource::collection($externals),
            "queryParams" => $queryParams ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $query = ExternalMeetingLog::query();
        $meetingLogs = [];

        $members = External::where('office_id', '=', Auth::user()->office_id)->get();

        if (request("external")) {
            $query->where("external_id", "=", request("external"));
            $meetingLogs = $query->orderBy("created_at", "desc")->paginate(1);
        }

        $queryParams = request()->query();

        return inertia("ExternalMeetingLog/Create", [
            'externals' => ExternalRsource::collection($members),
            'meetingLogs' => ExternalMeetingLogResource::collection($meetingLogs) ?? [],
            'queryParams' => $queryParams ?: null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExternalMeetingLogRequest $request)
    {
        $data = $request->validated();

        ExternalMeetingLog::create($data);

        return to_route("external.show", $request->external_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(ExternalMeetingLog $externalMeetingLog)
    {
        $messages = ExternalMessage::where('external_meeting_logs_id', $externalMeetingLog->id)
        ->latest()
        ->paginate(10);

        return inertia('ExternalMeetingLog/Show', [
            'meetingLog' => new ExternalMeetingLogResource($externalMeetingLog),
            'messages' => ExternalMessageResource::collection($messages),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExternalMeetingLog $externalMeetingLog)
    {
        $query = ExternalMeetingLog::query();
        $meetingLogs = [];
        $officeId = User::select("office_id")->where("id", "=", $externalMeetingLog->user_id);
        $externals = External::where('office_id', '=', $officeId)->get();
        if (request("external") || $externalMeetingLog) {
            $externalId = request("external") ?? $externalMeetingLog->external_id;
            $query->where("external_id", "=", $externalId);
            $meetingLogs = $query->orderBy("created_at", "desc")->paginate(1);
        }
        $queryParams = request()->query();

        return inertia('ExternalMeetingLog/Edit', [
            'externals' => ExternalRsource::collection($externals),
            'currentLog' => new ExternalMeetingLogResource($externalMeetingLog),
            'meetingLogs' => ExternalMeetingLogResource::collection($meetingLogs) ?? [],
            'queryParams' => $queryParams ?: null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExternalMeetingLogRequest $request, ExternalMeetingLog $externalMeetingLog)
    {
        $data = $request->validated();

        $externalMeetingLog->update($data);

        return to_route("external.show", $request->external_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExternalMeetingLog $externalMeetingLog)
    {
        $externalMeetingLog->delete();

        return to_route("external.show", $externalMeetingLog->external_id);
    }
}
