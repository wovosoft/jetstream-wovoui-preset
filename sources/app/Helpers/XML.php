<?php

namespace App\Helpers;

use DOMDocument;
use Illuminate\Support\Collection;
use XMLWriter;

class XML
{
    public XMLWriter $xml;
    private ?bool $shouldRemoveEmpty = false;
    private array|\stdClass $items;

    //can be used to make promise
    public bool $isFinished;

    public function __construct(
        private readonly ?string $encoding = 'utf-8',
        private readonly ?bool   $standalone = true,
        private readonly ?string $rootElement = "root"
    )
    {
        $this->xml = new XMLWriter();
        $this->isFinished = false;
    }

    public static function instance(
        ?string $encoding = "utf-8",
        ?bool   $standalone = true,
        ?string $rootElement = "root"
    ): static
    {
        return new static(
            encoding: $encoding,
            standalone: $standalone,
            rootElement: $rootElement
        );
    }

    /**
     * Call after initialization
     * starts document and root element
     * if php://output is used, example: because output is directly written to the output
     * ----------------------------
     * ob_start();
     * $xml
     * ->start(uri: "php://output")
     * ->prettify()
     * ->setData($data)
     * ->removeEmpty()
     * ->end()
     * ->flush();
     *
     * return ob_get_clean();
     * ------------------------------
     * @return $this
     */
    public function start(?string $uri = "php://memory"): static
    {
        if (str_starts_with($uri, "php://memory")) {
            $this->xml->openMemory();
        } else {
            $this->xml->openUri($uri);
        }

        //start document
        $this->xml->startDocument(
            encoding: $this->encoding,
            standalone: $this->standalone ? 'yes' : 'no',
        );

        //start root element
        $this->xml->startElement($this->rootElement ?? "root");
        return $this;
    }

    /**
     * Call after start()
     * @param string|null $indent
     * @return $this
     */
    public function prettify(?string $indent = "\t"): static
    {
        $this->xml->setIndent(true);
        $this->xml->setIndentString($indent);
        return $this;
    }

    /**
     * Call after conversion is completed
     * ends root element and main document
     * @return $this
     */
    public function end(): static
    {
        //generate and end root element
        $this
            ->generate()
            ->close();    //can be improved with partial loading


        return $this;
    }

    public function close(): static
    {
        $this->xml->endElement();
        $this->xml->endDocument();
        $this->isFinished = true;
        return $this;
    }

    public function setData(array $items): static
    {
        //convert to sequential (not associative)
        $this->items = json_decode(json_encode($items));

        return $this;
    }

    /**
     * @return $this
     */
    public function generate(): static
    {
        foreach ($this->items as $key => $value) {
            $this->generateElement($key, $value);
        }
        return $this;
    }

    /**
     * Should be called before generation (end)
     * @param bool|null $value
     * @return $this
     */
    public function removeEmpty(?bool $value = true): static
    {
        $this->shouldRemoveEmpty = !!$value;
        return $this;
    }

    public function generateElement($key, $value): void
    {
        if (is_object($value)) {
            $this->xml->startElement($key);
            foreach ((array)$value as $oKey => $oValue) {
                $this->generateElement($oKey, $oValue);
            }
            $this->xml->endElement();
        } elseif (is_array($value)) {
            foreach ($value as $aItem) {
                $this->generateElement($key, $aItem);
            }
        } else {
            if (!($this->shouldRemoveEmpty && is_null($value))) {
                $this->writeElement($key, $value);
            }
        }
    }

    private function writeElement(string $key, $value): static
    {
        $this->xml->startElement($key);
        $this->xml->text($value);
        $this->xml->endElement();
        return $this;
    }

    /**
     * Call to get data when php://memory uri is used
     * @return string
     */
    public function output(): string
    {
        return $this->xml->outputMemory();
    }

    /**
     * Flush stream
     * @return int|string
     */
    public function flush(): int|string
    {
        return $this->xml->flush();
    }

    /**
     * @param string $xml
     * @param string $xsdPath
     * @return bool|array
     * @link https://stackoverflow.com/a/60637894/17014896
     */
    public static function validateXsd(string $xml, string $xsdPath): bool|array
    {
        // needed for getting errors
        libxml_use_internal_errors(true);

        $domDocument = new DOMDocument();
        $domDocument->loadXML($xml);

        if (!$domDocument->schemaValidate($xsdPath)) {
            $errors = libxml_get_errors();
            libxml_clear_errors();
            return $errors;
        }

        return true;
    }

    public static function xmlToArray(string $xml)
    {
        $new = simplexml_load_string($xml);
        $jsonfile = json_encode($new);

        return json_decode($jsonfile, true);
    }

    public static function xmlToCollection(string $xml): Collection
    {
        return collect(static::xmlToArray($xml));
    }
}
