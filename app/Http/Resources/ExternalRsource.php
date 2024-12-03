<?php

namespace App\Http\Resources;

use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExternalRsource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'manager_name' => $this->manager_name,
            'office' => new OfficeResource($this->office),
            'status' => $this->status,
            'address' => $this->address,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'notes' => $this->notes,
        ];
    }
}
