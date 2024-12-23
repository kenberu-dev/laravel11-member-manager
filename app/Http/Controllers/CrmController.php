<?php

namespace App\Http\Controllers;

use App\Http\Resources\MemberResource;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CrmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $officeId = Auth::user()->office_id;

        $visiters = Member::where("office_id", "=", $officeId)
                        ->where("status", "=", "見学")->get();

        $experiencers = Member::where("office_id", "=", $officeId)
                            ->where("status", "=", "体験")->get();

        $premembers = Member::where("office_id", "=", $officeId)
                            ->where("status", "=", "利用意思獲得")->get();

        $members = Member::where("office_id", "=", $officeId)
                        ->where("status", "=", "利用中")->get();

        Log::info($members);

        return inertia("Crm", [
            "visiters" => MemberResource::collection($visiters),
            "experiencers" => MemberResource::collection($experiencers),
            "premembers" => MemberResource::collection($premembers),
            "members" => MemberResource::collection($members),
        ]);
    }
}
