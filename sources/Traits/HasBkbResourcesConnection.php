<?php

namespace App\Traits;

trait HasBkbResourcesConnection
{
    public static function bootHasBkbResourcesConnection(): void
    {
        static::creating(fn() => false);
        static::updating(fn() => false);
        static::deleting(fn() => false);
    }
}
