<?php

namespace App\Controllers;

use App\Models\GraphQLModel\GraphQLSchema;
use GraphQL\GraphQL;

class GraphQLController extends BaseController
{
    public function index()
    {
        return $this->response->setJSON(['up' => true]);
    }

    public function store()
    {
        try {
            $schemaFactory = new GraphQLSchema();
            $schema = $schemaFactory->getSchema();

            $input = $this->request->getJSON(true);
            $query = $input['query'];
            $operationName = isset($input['operationName']) ? $input['operationName'] : null;
            $variables = isset($input['variables']) ? $input['variables'] : null;

            $context = [
                'logger' => $this->logger
            ];

            $result = GraphQL::executeQuery($schema, $query, null, $context, $variables, $operationName);

            return $this->response->setJSON($result->toArray(), true);
        } catch (\Exception $e) {
            $this->response->setStatusCode(500);
            return $this->response->setJSON([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }

    }

    public function error()
    {
        $this->response->setStatusCode(403);
        return $this->response->setJSON(['error' => 'Forbidden']);
    }
}