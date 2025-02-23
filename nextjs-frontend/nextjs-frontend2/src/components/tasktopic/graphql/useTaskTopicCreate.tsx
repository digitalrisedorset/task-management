import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {formProps} from "@/components/global/types/form";
import {graphQLVariables} from "@/components/user-authentication/types/user";

export const SECTION_CREATE_MUTATION = gql`
  mutation CreateTaskTopic($data: TaskTopicCreateInput!) {
      createTaskTopic(data: $data) {       
        id
      }
    }
`;

export const useCreateTaskTopic = (inputs: formProps) => {
    const variables: graphQLVariables = inputs

    const response = useMutation(SECTION_CREATE_MUTATION, {
        variables: {
            data: variables
        },
    });

    return response;
}