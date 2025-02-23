import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {formProps} from "@/components/global/types/form";
import {graphQLVariables} from "@/components/user-authentication/types/user";
import {TASKS_QUERY} from "@/components/task/graphql/useUserTasks";
import {useUserTopicId} from "@/components/user-authentication/hooks/useUser";

export const TASK_CREATE_MUTATION = gql`
  mutation CreateTask($data: TaskCreateInput!) {
      createTask(data: $data) {       
        id
      }
    }
`;

export const useCreateTask = (inputs: formProps) => {
    const topic = useUserTopicId()

    const variables: graphQLVariables = inputs

    variables['topic'] = {
        "connect": {
            "id":  topic
        }
    }

    const response = useMutation(TASK_CREATE_MUTATION, {
        variables: {
            data: variables
        },
        // refectch the currently logged in user
        refetchQueries: [{ query: TASKS_QUERY }],
    });

    return response;
}