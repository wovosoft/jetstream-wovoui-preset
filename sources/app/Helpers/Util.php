<?php

namespace App\Helpers;

class Util
{
    public static function enumOptions($enum): array
    {
        return array_map(fn($op) => [
            "text"  => str($op->name)->title()->replace("_", " "),
            "value" => $op->value,
        ], $enum::cases());
    }

    public static function getLike(): string
    {
        return config("database.default") === "pgsql" ? "ilike" : "like";
    }

    public static function districtReplace(string $district): string
    {
        $parts = explode("-", $district);

        if (trim(strtolower($district)) === "comilla") {
            return "CUMILLA";
        }

        if (str($district)->is("*PATIA") || str($district)->is("*PATIYA")) {
            $parts[2] = "CHATTOGRAM";
            return str(join("-", $parts))->replace("PATIA", "PATIYA")->value();
        }

        if (str($district)->is("*LAKSAM")) {
            $parts[2] = "CUMILLA";
            return join("-", $parts);
        }

        $values = [
            'KHAGRACHARI' => 'KHAGRACHHARI',
            'JHALAKATHI'  => 'JHALOKATI',
            'HOBIGANJ'    => 'HABIGANJ',
            'BARISAL'     => 'BARISHAL',
            "COXSBAZAR"   => "COX'S BAZAR"
        ];

        foreach (array_keys($values) as $key) {
            if (str($district)->is("*$key")) {
                return str($district)->replace($key, $values[$key])->value();
            }
        }
        return $district;
    }

    public static function updateEnumValues(string $table, string $column, array $values): bool|string
    {
        try {
            \DB::statement("ALTER TABLE {$table} DROP CONSTRAINT {$table}_{$column}_check");


            $result = join(', ', array_map(fn($value) => sprintf("'%s'::character varying", $value), $values));

            return \DB::statement("ALTER TABLE t_people ADD CONSTRAINT t_people_birth_place_check CHECK ({$column}::text = ANY (ARRAY[$result]::text[]))");
        } catch (\Throwable $throwable) {
            return $throwable->getMessage();
        }
    }
}
