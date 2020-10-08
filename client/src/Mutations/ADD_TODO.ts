import { gql } from '@apollo/client';

export const ADD_TODO = gql`
    mutation createTodo($text: String!) {
        createTodo(input: {text: $text}) {
            id
            text
            completed
        }
    }
`;
