<?php

namespace App\Http\Requests;

use App\Models\External;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreExternalMeetingLogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if(!$this->input('external_id')) return false;
        return Auth::user()->office_id == External::find($this->input('external_id'))->office_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => ['required', 'max:255'],
            "user_id" => ['required', 'integer'],
            "external_id" => ['required', 'integer'],
            "meeting_log" => ['required', 'string'],
        ];
    }
}
