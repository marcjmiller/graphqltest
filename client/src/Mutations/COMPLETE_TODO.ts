import { gql } from '@apollo/client';

export const COMPLETE_TODO = gql`
    mutation completeTodo($id: Int!) {
        completeTodo(id: $id) {
            id
            text
            completed
        }
    }
`;
