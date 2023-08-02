<?php

namespace Wovosoft\JetstreamWovouiPreset\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class InstallWovoui extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jetstream-wovoui:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $sourcePath = __DIR__ . "/../../../sources/";

        /**
         * target=>source
         */
        collect([
            "app"       => $sourcePath . "app",
            "resources" => $sourcePath . "resources",
            "routes"    => $sourcePath . "routes",
            "public"    => $sourcePath . "public",
            "database"  => $sourcePath . "database",
            "."         => [
                $sourcePath . "tailwind.config.js",
                $sourcePath . "tsconfig.json",
                $sourcePath . "vite.config.ts",
                $sourcePath . "package.json",
                $sourcePath . "postcss.config.js",
            ],
        ])->each(function (string|array $source, string $target) {
            if (is_string($source)) {
                File::ensureDirectoryExists(base_path($target));
                echo File::copyDirectory(directory: $source, destination: $target);
            } else {
                foreach ($source as $file) {
                    echo File::copy(path: $file, target: $target . "/" . basename($file));
                }
            }
        });
    }
}
