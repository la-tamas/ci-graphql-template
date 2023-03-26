<?php

namespace App\Models\GraphQLModel;

use App\Models\Translations;

class ResolverMap
{
    public static function getResolverMap()
    {
        return [
            'QueryType' => [
                'getTranslations' => function($root, $args, $context) {
                    $translationModel = new Translations();

                    return $translationModel->getAllByLanguage($args['language']);
                },
            ],
            'MutationType' => [
                'demoMutation' => function($root, $args, $context) {
                    return [
                        'success' => true,
                        'message' => 'Mutation successful',
                    ];
                }, 
            ],
        ];
    }
};
