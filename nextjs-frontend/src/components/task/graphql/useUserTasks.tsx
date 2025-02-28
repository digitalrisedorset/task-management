import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useFilter} from "@/components/task/hooks/useFilter";

export const TASKS_QUERY = gql`
    query Tasks($where: TaskWhereInput!, $orderBy: [TaskOrderByInput!]!) {
      tasks(where: $where, orderBy: $orderBy) {
        id
        label
        description
        priority
        estimatedTime
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
            "orderBy": [{"priority": "desc"}],
        },
        fetchPolicy: "cache-and-network"
    });

    return tasksData
}