import { gql } from '@apollo/client';

export const FETCH_TODOS = gql`
    query getTodos{
        todos {
            id
            text
            completed
        }
    }
`;
