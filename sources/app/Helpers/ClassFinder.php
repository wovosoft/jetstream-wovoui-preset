<?php

namespace App\Helpers;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

class ClassFinder
{
    public static function in(string $namespace, string $directory): Collection
    {
        $classes = collect([]);

        foreach (File::allFiles(app_path($directory)) as $file) {
            $classes->add($namespace . '\\' . \str($file->getRelativePathname())->replaceLast('.php', ''));
        }
        return $classes;
    }
}
