<?php

namespace App\Http\Requests;

use App\Models\Member;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateMeetingLogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if(!$this->input('member_id')) return false;
        return Auth::user()->office_id == Member::find($this->input('member_id'))->office_id;
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
