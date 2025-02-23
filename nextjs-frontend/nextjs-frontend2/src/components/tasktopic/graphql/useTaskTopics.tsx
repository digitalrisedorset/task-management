import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUser} from "@/components/user-authentication/hooks/useUser";

const TASK_TOPIC_QUERY = gql`
    query TaskTopics($where: TaskTopicWhereInput!) {
      taskTopics(where: $where) {
        id
        label
      }
    }
`;

export const useTaskTopics = () => {
    const user = useUser()

    const topicData = useQuery(TASK_TOPIC_QUERY, {
        variables: {
            "where": {
                "user": {
                    "id": {
                        "equals": user?.id
                    }
                }
            }
        },
        fetchPolicy: 'no-cache'
    });

    return topicData
}