<?php

namespace App\Http\Requests;

use App\Models\Office;
use App\Static\Permissions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return auth()->user()->canAny([
            Permissions::CREATE_USERS,
            Permissions::UPDATE_USERS,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            "id"        => ["numeric", "nullable"],
            "office_id" => [
                "numeric",
                "nullable",
                Rule::exists(Office::class, 'id'),
            ],
            "name"      => ["string", "required"],
            "email"     => ["email", "required"],
            "password"  => [
                Rule::requiredIf(function () {
                    return !$this->request->has('id');
                }),
            ],
            "roles"     => ["array"],
            "roles.*"   => ["string"],
        ];
    }
}
