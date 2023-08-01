<?php

namespace Wovosoft\JetstreamWovouiPreset;

use Illuminate\Support\ServiceProvider;
use Wovosoft\JetstreamWovouiPreset\Console\Commands\InstallWovoui;

class JetstreamWovouiPresetServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot(): void
    {
        // $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'wovosoft');
        // $this->loadViewsFrom(__DIR__.'/../resources/views', 'wovosoft');
        // $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        // $this->loadRoutesFrom(__DIR__.'/routes.php');

        // Publishing is only necessary when using the CLI.
        if ($this->app->runningInConsole()) {
            $this->bootForConsole();
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/jetstream-wovoui-preset.php', 'jetstream-wovoui-preset');

        // Register the service the package provides.
        $this->app->singleton('jetstream-wovoui-preset', function ($app) {
            return new JetstreamWovouiPreset;
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['jetstream-wovoui-preset'];
    }

    /**
     * Console-specific booting.
     *
     * @return void
     */
    protected function bootForConsole(): void
    {
        // Publishing the configuration file.
        $this->publishes([
            __DIR__ . '/../config/jetstream-wovoui-preset.php' => config_path('jetstream-wovoui-preset.php'),
        ], 'jetstream-wovoui-preset.config');

        // Publishing the views.
        /*$this->publishes([
            __DIR__.'/../resources/views' => base_path('resources/views/vendor/wovosoft'),
        ], 'jetstream-wovoui-preset.views');*/

        // Publishing assets.
        /*$this->publishes([
            __DIR__.'/../resources/assets' => public_path('vendor/wovosoft'),
        ], 'jetstream-wovoui-preset.assets');*/

        // Publishing the translation files.
        /*$this->publishes([
            __DIR__.'/../resources/lang' => resource_path('lang/vendor/wovosoft'),
        ], 'jetstream-wovoui-preset.lang');*/

        // Registering package commands.
        $this->commands([
            InstallWovoui::class
        ]);
    }
}
