import { gql, useQuery } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name   
        topicPreference {
            id
            label
        }
      }
    }
  }
`;

export interface UserInformation {
    id: string
    email: string
    name: string
    topicPreference: TopicPreference
}

export interface TopicPreference {
    id: string
    label: string
}

export function useUser(): UserInformation | undefined {
  const { data } = useQuery(CURRENT_USER_QUERY, {
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only'
  });

  return data?.authenticatedItem;
}

export function useUserTopicId(): string {
    const user = useUser()

    if (user === undefined || user.topicPreference?.id === undefined) {
        return ''
    }

    return user.topicPreference?.id
}

export { CURRENT_USER_QUERY };
