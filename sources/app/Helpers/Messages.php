<?php

namespace App\Helpers;

class Messages
{
    public static function success(array $merge = []): array
    {
        return array_merge([
            "message" => "Successfully Done",
            "variant" => "primary",
        ], $merge);
    }

    public static function failed(\Throwable $throwable, array $merge = []): array
    {
        if (app()->environment(["development", "local"])) {
            return array_merge([
                "variant" => "danger",
                "message" => $throwable->getMessage(),
                "file"    => $throwable->getFile(),
                "line"    => $throwable->getLine(),
            ], $merge);
        }
        return array_merge([
            "message" => "Operation Failed",
            "variant" => "danger",
        ], $merge);
    }
}
