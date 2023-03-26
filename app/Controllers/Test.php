<?php

namespace App\Controllers;

use App\Models\Translations;

class Test extends BaseController
{
    public function index()
    {
        $model = new Translations();
        $result = $model->getAllByLanguage('ro-ro');
        return json_encode($result);
    }
}