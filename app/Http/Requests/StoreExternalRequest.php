<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExternalRequest extends FormRequest
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
            "company_name" => ["required","string"],
            "manager_name" => ["nullable","string"],
            "office_id"=> ["required"],
            "status" => ["required","string"],
            "address" => ["nullable","string"],
            "phone_number" => ["nullable","string"],
            "email" => ["nullable","email"],
            "notes" => ["nullable", "string"],
        ];
    }
}
