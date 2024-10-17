<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string",
            "sex" => "required",
            "office_id" => "required",
            "status" => "required|string",
            "characteristics" => "required|string",
            "document_url" => "url|nullable",
            "beneficiary_number" => "nullable|string|max:10|min:10",
            "started_at" => "date|nullable",
            "update_limit" => "date|nullable",
            "notes" => "nullable|string",
        ];
    }
}
