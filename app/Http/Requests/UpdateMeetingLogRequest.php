<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMeetingLogRequest extends FormRequest
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
            "title" => ['required', 'max:255'],
            "user_id" => ['required', 'integer'],
            "member_id" => ['required', 'integer'],
            "condition" => ['required', 'integer', Rule::in(1, 2, 3, 4, 5)],
            "meeting_log" => ['required','string'],
        ];
    }
}
