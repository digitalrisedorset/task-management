import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUserTopicId} from "@/components/user-authentication/hooks/useUser";

const TOPIC_QUERY = gql`
  query TaskTopic($where: TaskTopicWhereUniqueInput!) {
     taskTopic(where: $where) {
        id
        label    
      }
    }
`;

export const useTaskTopic = () => {
    const topic = useUserTopicId()

    const { data, error, loading } = useQuery(TOPIC_QUERY, {
        variables: { "where": { id: topic } },
    });

    return { data, error, loading }
}