<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOfficeRequest;
use App\Http\Requests\UpdateOfficeRequest;
use App\Http\Resources\OfficeResource;
use App\Models\Office;
use Illuminate\Support\Facades\Auth;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->isGlobalAdmin();
        
        $query = Office::where("is_archive", "=", false);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $query = $this->applyFilters($query, request());

        $offices = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $queryParams = request()->query();

        return inertia("Office/Index", [
            "offices" => OfficeResource::collection($offices),
            "queryParams" => $queryParams ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->isGlobalAdmin();

        return inertia("Office/Create",[]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfficeRequest $request)
    {
        $data = $request->validated();
        Office::create($data);

        return to_route("office.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Office $office)
    {
        $this->isGlobalAdmin();

        return inertia("Office/Show", [
            "office" => new OfficeResource($office),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Office $office)
    {
        $this->isGlobalAdmin();

        return inertia("Office/Edit",[
            "office" => new OfficeResource($office),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOfficeRequest $request, Office $office)
    {
        $data = $request->validated();
        $office->update($data);

        return to_route("office.index");
    }

    public function archive(Office $office)
    {
        $this->isGlobalAdmin();

        $office->update(['is_archive' => true]);

        return to_route("office.index");
    }

    public function indexArchived()
    {
        $this->isGlobalAdmin();

        $query = Office::where("is_archive", "=", true);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $query = $this->applyFilters($query, request());

        $offices = $query->orderBy($sortField, $sortDirection)->paginate(10);
        $queryParams = request()->query();

        return inertia("Office/Restore", [
            "offices" => OfficeResource::collection($offices),
            "queryParams" => $queryParams ?: null,
        ]);
    }

    public function restore(Office $office)
    {
        $this->isGlobalAdmin();

        $office->update(['is_archive' => false]);

        return to_route("office.indexArchived");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Office $office)
    {
        $this->isGlobalAdmin();

        $office->delete();

        return to_route("office.index");
    }

    private function applyFilters($query, $request)
    {
        if ($request["id"]) {
            $query->where("id", "like", "%" . request("id") . "%");
        }

        if ($request["name"]) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if ($request["zip_code"]) {
            $query->where("zip_code", "like", "%" . request("zip_code") . "%");
        }

        if ($request["address"]) {
            $query->where("address", "like", "%" . request("address") . "%");
        }

        if ($request["phone_number"]) {
            $query->wher("phone_number", "like", "%" . request("phone_number") . "%");
        }
        return $query;
    }

    private function isGlobalAdmin()
    {
        if (!Auth::user()->is_global_admin) {
            return abort(403);
        }
    }
}
