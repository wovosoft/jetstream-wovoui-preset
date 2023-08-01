<?php

namespace Wovosoft\JetstreamWovouiPreset\Console\Commands;

use File;
use Illuminate\Console\Command;

class InstallWovoui extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:install-wovoui';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sourcePath = __DIR__ . "/../../../sources/";

        /**
         * target=>source
         */
        collect([
            "app"       => $sourcePath . "app",
            "resources" => $sourcePath . "resources",
            "."         => [
                $sourcePath . "tailwind.config.js",
                $sourcePath . "tsconfig.json",
                $sourcePath . "vite.config.ts",
                $sourcePath . "package.json",
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
