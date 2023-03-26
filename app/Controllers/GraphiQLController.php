<?php

namespace App\Controllers;

class GraphiQLController extends BaseController
{
    public function index()
    {
        return view('graphiql');
    }
}
