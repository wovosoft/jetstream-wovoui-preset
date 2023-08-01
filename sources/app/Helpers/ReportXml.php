<?php

namespace App\Helpers;


use App\Models\Report;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;


class ReportXml
{
    public array|null|Builder|Collection|Model|Report $report;
    public array $errors = [];

    public function __construct(public int|Report $reportId)
    {

    }

    public static function generate(int $reportId): string|array
    {
        return (new static($reportId))->render();
    }

    public function render(): string|array
    {
        try {
            $path = storage_path("app/reports/ctr-{$this->reportId}-" . now()->timestamp . ".xml");
            File::ensureDirectoryExists(dirname($path));

            //ensure file exists
            if (!File::exists($path)) {
                File::put($path, "");
            }

            //generate and write to file
//            $generator=XML::instance(rootElement: "report")
//                ->start(uri: "file://$path")
//                ->prettify()
//                //can be improved with partial loading
//                ->setData($this->find()->toData())
//                ->removeEmpty()
//                ->end();

            $generator = XML::instance(rootElement: "report")
                ->start(uri: "file://$path")
                ->removeEmpty()
                ->prettify();

            $items = json_decode(json_encode($this->find()->toData()));

            foreach ($items as $key => $value) {
                $generator->generateElement($key, $value);
            }
            $selects = [
                "id",
                "transaction_id",
                "is_my_client",
                "funds_code",
                "funds_comment",
                "account_id",
                "person_id",
                "entity_id",
                "country",
                "created_at",
                "updated_at",
            ];
            $personSelects = [
                "id",
                "is_my_client",
                "gender",
                "title",
                "first_name",
                "last_name",
                "birthdate",
                "birth_place",
                "mothers_name",
                "fathers_name",
                "spouse_name",
                "ssn",
                "passport_number",
                "passport_country",
                "id_number",
                "nationality1",
                "residence",
                "email",
                "occupation",
                "employer_name",
                "employer_address_id",
                "employer_phone_id",
                "deceased",
                "deceased_date",
                "tax_number",
                "tax_reg_number",
                "source_of_wealth",
                "comments",
            ];

            Transaction::query()
                ->where('report_id', '=', $this->reportId)
                ->whereNotNull('transaction_office_id')
                ->whereNotNull('report_id')
                ->with([
                    "tFrom:" . implode(",", $selects),
                    "tFrom.account.branch:id,name,code,sbs_code",
                    "tFrom.person:" . implode(",", $personSelects),
                    "tFrom.entity",

                    "tTo:" . implode(",", $selects),
                    "tTo.account.branch:id,name,code,sbs_code",
                    "tTo.person:" . implode(",", $personSelects),
                    "tTo.entity",

                    'transactionOffice:id,name,code,sbs_code,district_id',
                    'transactionOffice.district',
                ])
                ->select([
                    "id",
                    "is_suspicious",
//                    "transactionnumber",
                    "internal_ref_number",
                    "transaction_office_id",
                    "transaction_description",
                    "date_transaction",
                    "transmode_code",
                    "transmode_comment",
                    "amount_local",
                    "transaction_type",
                    "comments",
                    "created_at",
                    "updated_at",
                    "report_id",
                ])
                ->chunk(200, function (Collection $collection) use ($generator) {
                    $collection->each(function (Transaction $transaction) use ($generator) {
                        if (!$transaction->transaction_location) {
                            $this->errors[] = [
                                "transaction" => $transaction,
                                "message"     => "Transaction Location Not Set for Txn # " . $transaction->id
                            ];
                        } else {
                            try {
                                $person = $transaction->tFrom?->person ?? $transaction->tTo?->person;
                                $account = $transaction->tFrom?->account ?? $transaction->tTo?->account;

                                if ($person && $account) {
                                    $generator->generateElement(
                                        "transaction",
                                        json_decode(
                                            json_encode(\App\Formatters\Transaction::format($transaction))
                                        )
                                    );
                                }
                            } catch (\Throwable $throwable) {
                                $this->errors[] = [
                                    "transaction" => $transaction,
                                    "message"     => $throwable->getMessage()
                                ];
                            }
                        }
                    });
                });

            $generator->close();
            if (count($this->errors)) {
                return $this->errors;
            }
            return $path;
        } catch (\Throwable $throwable) {
            return $throwable;
        }
    }


    public function find(): static
    {
        if (isset($this->report)) {
            return $this;
        }

        $this->report = Report::reportableFormatOf($this->reportId);

        return $this;
    }

    public function toData(): array
    {
        return \App\Formatters\Report::format($this->report);
    }
}
