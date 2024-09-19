<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOfficeRequest;
use App\Http\Requests\UpdateOfficeRequest;
use App\Http\Resources\OfficeResource;
use App\Models\Office;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Office::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("id")) {
            $query->where("id", "like", "%" . request("id") . "%");
        }

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("zip_code")) {
            $query->where("zip_code", "like", "%" . request("zip_code") . "%");
        }

        if (request("address")) {
            $query->where("address", "like", "%" . request("address") . "%");
        }

        if (request("phone_number")) {
            $query->wher("phone_number", "like", "%" . request("phone_number") . "%");
        }

        $offices = $query->orderBy($sortField, $sortDirection)->paginate(10);

        $queryParams = request()->query();

        return inertia("Office/Index", [
            "offices" => OfficeResource::collection($offices),
            "queryParams" => $queryParams,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
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
        return inertia("Office/Show", [
            "office" => new OfficeResource($office),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Office $office)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOfficeRequest $request, Office $office)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Office $office)
    {
        //
    }
}
