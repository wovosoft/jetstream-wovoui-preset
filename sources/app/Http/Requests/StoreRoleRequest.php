<?php

namespace App\Http\Requests;

use App\Static\Permissions;
use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        if ($this->id) {
            return auth()->user()->can(Permissions::UPDATE_ROLES);
        }

        return auth()->user()->can(Permissions::CREATE_ROLES);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            "name"          => ["string", "required"],
            "permissions"   => ["array"],
            "permissions.*" => ["string"],
        ];
    }
}
