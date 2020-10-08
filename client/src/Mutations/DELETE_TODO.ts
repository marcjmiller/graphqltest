import { gql } from '@apollo/client';

export const DELETE_TODO = gql`
    mutation deleteTodo($id: Int!) {
        deleteTodo(id: $id) {
            id
            text
            completed
        }
    }
`;
