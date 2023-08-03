<?php

namespace App\Console\Commands;

use App\Helpers\ClassFinder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class EnumToOptions extends Command
{
    private array $exports = [
        'export type Option = {
    text: string;
    value: string;
};
'
    ];
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'publish:options-js';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publishes Enums to JavaScript {text,value}[] format array';

    /**
     * Execute the console command.
     * @throws \ReflectionException
     */
    public function handle(): int
    {
        if (!File::isDirectory(resource_path("js/Options"))) {
            File::makeDirectory(resource_path("js/Options"), 0777, true, true);
        }


        $enums = [];
        collect([
            app_path('Enums'),
            base_path('packages/wovosoft/hrms-person/src/Enums')
        ])->each(function (string $path) use (&$enums) {
            $enums = [
                ...$enums,
                ...ClassFinder::in($path)->toArray()
            ];
        });

        collect($enums)->each(function (string $enum) {
            $reflection = new \ReflectionEnum($enum);
            File::put(resource_path("js/Options/" . $reflection->getShortName() . ".ts"), $this->generateOptions($enum));
        });

        File::put(resource_path("js/Options/index.ts"), join("\n", $this->exports));


        $this->info("Successfully Generated");
        return 0;
    }

    /**
     * @throws \ReflectionException
     */
    private function generateOptions(string $class): string
    {
        $reflection = new \ReflectionClass($class);

        $name = str($reflection->getShortName())->camel()->value();
        $options = json_encode($class::toOptions(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        $method = str('get' . str($reflection->getShortName())->ucfirst()->singular())->value();

        $this->exports[] = 'export {' . $name . ', ' . $method . '} from "./' . $reflection->getShortName() . "\";";

        return <<<ts
import {Option} from "@/Options";

export const $name: Option[] = $options;

export function $method(value: string): Option | null {
    return $name.find((i: Option): boolean => i.value === value);
}

ts;

    }
}
