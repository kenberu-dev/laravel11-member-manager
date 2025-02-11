<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExternalRequest;
use App\Http\Requests\UpdateExternalRequest;
use App\Http\Resources\ExternalMeetingLogResource;
use App\Http\Resources\ExternalRsource;
use App\Http\Resources\OfficeResource;
use App\Http\Resources\UserResource;
use App\Models\External;
use App\Models\ExternalMeetingLog;
use App\Models\Office;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ExternalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = External::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $offices = Office::all();

        if(!Auth::user()->is_global_admin) {
            $query->where("office_id", "=", Auth::user()->office_id);
        }

        if(request("company_name")) {
            $query->where("company_name", "like", "%" . request("company_name") . "%" );
        }

        if(request("manager_name")) {
            $query->where("manager_name", "like", "%" . request("manager_name"));
        }

        if(request("status")) {
            $query->where("status", "=", request("status"));
        }

        if(request("office")) {
            $query->where("office_id", "=", request("office"));
        }

        if(request("address")) {
            $query->where("address", "like", "%" . request("address") . "%");
        }

        if(request("phone_number")) {
            $query->where("phone_number", "like", "%" . request("phone_number") . "%");
        }

        if(request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $externals = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $queryParams = request()->query();

        return inertia("External/Index", [
            "externals" => ExternalRsource::collection($externals),
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

        return inertia("External/Create",[
            "offices" => OfficeResource::collection($offices),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExternalRequest $request)
    {
        $data = $request->validated();
        External::create($data);

        return to_route("external.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(External $external)
    {
        $query = ExternalMeetingLog::where("external_id", "=", $external->id);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if(request("id")) {
            $query->where("id", "like", "%" . request("id") . "%");
        }

        if(request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }

        if(request("user")) {
            $query->where("user_id", "=", request("user"));
        }

        $meetingLogs = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $users = User::select("users.id", "users.name")
                    ->leftjoin("external_meeting_logs", "external_meeting_logs.user_id", "=", "users.id")
                    ->where("external_meeting_logs.external_id", "=", $external->id)
                    ->groupBy("users.id", "users.name")
                    ->get();

        $queryParams = request()->query();

        return inertia("External/Show",[
            "external" => new ExternalRsource($external),
            "meetingLogs" => ExternalMeetingLogResource::collection($meetingLogs),
            "users" => UserResource::collection($users),
            "queryParams" => $queryParams ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(External $external)
    {
        $offices = Office::all();

        return inertia("External/Edit",[
            "offices" => OfficeResource::collection($offices),
            "external" => new ExternalRsource($external),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExternalRequest $request, External $external)
    {
        $data = $request->validated();
        $external->update($data);

        return to_route("external.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(External $external)
    {
        if (!(Auth::user()->is_admin || Auth::user()->is_global_admin)) {
            abort(403);
        }
        
        $external->delete();

        return to_route("external.index");
    }
}
