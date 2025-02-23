import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const TASK_QUERY = gql`
  query Task($where: TaskWhereUniqueInput!) {
      task(where: $where) {
        id
        label
        topic {
            id
        }
        description
        estimatedTime  
        priority   
      }
    }
`;

export const useTask = (id: string | undefined) => {
    const { data, error, loading } = useQuery(TASK_QUERY, {
        variables: { "where": { id }},
    });

    return { data, error, loading }
}