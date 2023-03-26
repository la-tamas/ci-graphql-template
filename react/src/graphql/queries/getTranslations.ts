import { gql } from '@apollo/client'

export const GET_TRANSLATIONS = gql`
  query GetTranslations($language: String!) {
    getTranslations(language: $language) {
        code
        value
    }
  }
`;