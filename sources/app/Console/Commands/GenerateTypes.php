<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Wovosoft\LaravelTypescript\LaravelTypescript;

class GenerateTypes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-types';

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
        $dirs = [
            "models" => app_path("Models"),
//            "hrmPerson"            => base_path("packages/wovosoft/hrms-person/src/Models"),
//            "bkbHrmsCore"          => base_path("packages/wovosoft/bkb-hrms-core/src/Models"),
//            "bdAcademicComponents" => base_path("packages/wovosoft/bd-academic-components/src/Models"),
//            "bkbOffices"           => base_path("vendor/wovosoft/bkb-offices/src/Models"),
//            "bd-geocode"           => base_path("vendor/wovosoft/bd-geocode/src/Models"),
        ];

        foreach ($dirs as $name => $dir) {
            $transformer = new LaravelTypescript(
                outputPath: resource_path("js/types/" . $name . ".d.ts"),
                sourceDir: $dir
            );

            $transformer->run();
        }
    }
}
