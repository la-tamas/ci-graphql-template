<?php

namespace App\Models\GraphQLModel;

use \GraphQL\Utils\BuildSchema;
use \GraphQL\Executor\Executor;
use \GraphQL\Type\Definition\ResolveInfo;

class GraphQLSchema
{
    public static final function getSchema()
    {
        self::setResolvers(ResolverMap::getResolverMap());
        
        $schema = BuildSchema::build(file_get_contents(__DIR__ . '/schema.type.graphql'));

        return $schema;
    }

    private static function setResolvers($resolvers)
    {
        Executor::setDefaultFieldResolver(function ($source, $args, $context, ResolveInfo $info) use ($resolvers) {
            $fieldName = $info->fieldName;

            if (is_null($fieldName)) {
                throw new \Exception('Could not get $fieldName from ResolveInfo');
            }

            if (is_null($info->parentType)) {
                throw new \Exception('Could not get $parentType from ResolveInfo');
            }

            $parentTypeName = $info->parentType->name;

            if (isset($resolvers[$parentTypeName])) {
                $resolver = $resolvers[$parentTypeName];

                if (is_array($resolver)) {
                    if (array_key_exists($fieldName, $resolver)) {
                        $value = $resolver[$fieldName];

                        return is_callable($value) ? $value($source, $args, $context, $info) : $value;
                    }
                }

                if (is_object($resolver)) {
                    if (isset($resolver->{$fieldName})) {
                        $value = $resolver->{$fieldName};

                        return is_callable($value) ? $value($source, $args, $context, $info) : $value;
                    }
                }
            }

            return Executor::defaultFieldResolver($source, $args, $context, $info);
        });
    }
};
