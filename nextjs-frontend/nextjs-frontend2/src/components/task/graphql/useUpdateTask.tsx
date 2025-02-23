import gql from "graphql-tag";
import {InMemoryCache, useMutation} from "@apollo/client";
import {TASKS_QUERY} from "@/components/task/graphql/useUserTasks";

const UPDATE_TASK_MUTATION = gql`
    mutation UpdateTask($where: TaskWhereUniqueInput!, $data: TaskUpdateInput!) {
      updateTask(where: $where, data: $data) {
        id
      }
    }
`;

function update(cache: InMemoryCache, payload: { data?: {updateTask: string } }) {
    const updateId = payload?.data?.updateTask
    if (updateId === undefined) {
        return
    }

    const cacheKey = cache.identify({ __typename: "Task", id: updateId });
    if (cacheKey) {
        cache.evict({ id: cacheKey });
    }
}

export const useUpdateTask = () => {
    const response = useMutation(
        UPDATE_TASK_MUTATION,{
            update,
            refetchQueries: [{ query: TASKS_QUERY }],
        }
    );

    return response
}