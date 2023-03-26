<?php

namespace App\Models;

use CodeIgniter\Model;

class Translations extends Model
{
    protected $table = 'translations';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = [
        'code',
        'value',
        'lang',
    ];

    public function getAllByLanguage($lang = 'en-en')
    {
        $translations = $this->asArray()->select(['code', 'value'])->where('lang', $lang)->findAll();

        if (!$translations || 0 === count($translations)) {
            return [];
        }

        return $translations;
    }
};
