<?php

namespace App\Console\Commands;

use File;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;

class PublishLangJs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'publish:lang-js';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        if (!File::isDirectory(resource_path("js/Lang"))) {
            File::makeDirectory(resource_path("js/Lang"), 0777, true, true);
        }

        $languages = collect(File::directories(lang_path()));

        $languages->mapWithKeys(function (string $path) {
            $pack = [
                basename($path) => [],
            ];

            collect(File::files($path))->each(function (\SplFileInfo $info) use ($path, &$pack) {
                $partialName = str($info->getBasename())->replace(".php", "")->value();
                $pack[basename($path)][$partialName] = include_once $info->getFileInfo();
            });

            return $pack;
        })->each(function (array $trans, string $name) {
            File::put(
                resource_path("js/Lang/$name.json"),
                json_encode($trans, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
            );
        });

//        File::put(resource_path("js/Lang/index.ts"), $this->createModule($languages));
        return 0;
    }

    private function createModule(Collection $languages): string
    {
        $languages = $languages->map(fn(string $path) => basename($path));
        $keys = $languages->map(fn(string $key) => "'$key'")->join(' | ');
        $messages = $languages->map(fn(string $key) => "\t\t$key")->join(",\n");

        $imports = "";
        $types = "";

        foreach ($languages as $language) {
            $imports .= "\nimport $language from \"./$language.json\";";
            $types .= "\nexport type MessageSchema" . str($language)->studly()->value() . " = typeof en;";
        }


        return <<<ts
import {createI18n, type I18nOptions} from 'vue-i18n';
$imports
$types
export type AvailableLanguagesType = $keys;

const options: I18nOptions = {
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('locale') || 'bn',
    fallbackLocale: 'en',
    messages: {
$messages
    },
}

export default createI18n<false, typeof options>(options);
ts;
    }
}
