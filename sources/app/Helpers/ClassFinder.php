<?php

namespace App\Helpers;

use Composer\ClassMapGenerator\ClassMapGenerator;
use Illuminate\Support\Collection;

class ClassFinder
{
    public static function in(string $directory): Collection
    {
        /**
         * @link https://github.com/composer/class-map-generator
         */

        return collect(array_keys(ClassMapGenerator::createMap($directory)));
    }
}
