<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
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
            'name' => $this->name,
            'sex' => $this->sex,
            'office' => new OfficeResource($this->office),
            'status' => $this->status,
            'characteristics' => $this->characteristics,
            'document_url' => $this->document_url,
            'beneficiary_number' => $this->beneficiary_number,
            'started_at' => (new Carbon($this->started_at))->format('Y-m-d'),
            'update_limit' => (new Carbon($this->update_limit))->format('Y-m-d'),
            'notes' => $this->notes,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
