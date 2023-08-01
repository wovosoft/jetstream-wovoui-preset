<?php

namespace Wovosoft\JetstreamWovouiPreset\Facades;

use Illuminate\Support\Facades\Facade;

class JetstreamWovouiPreset extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor(): string
    {
        return 'jetstream-wovoui-preset';
    }
}
