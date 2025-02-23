import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useFilter} from "@/components/task/hooks/useFilter";

export const TASKS_QUERY = gql`
    query Tasks($where: TaskWhereInput!) {
      tasks(where: $where) {
        id
        label
        description
        createdAt
        updatedAt
        completedAt
      }
    }
`;

export const useTasks = () => {
    const filter = useFilter()

    const tasksData = useQuery(TASKS_QUERY, {
        variables: {
            "where": filter,
            "orderBy": [{"createdAt": "desc"}],
        }
        }
    );

    return tasksData
}