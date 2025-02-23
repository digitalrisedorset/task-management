import {useUser, useUserTopicId} from "@/components/user-authentication/hooks/useUser";
import {TaskFilterKeys} from "@/components/task/types/task";

export const useFilter = () => {
    const user = useUser()
    const topic = useUserTopicId()

    const filter: TaskFilterKeys = {}

    if (user === undefined) {
        return filter
    }

    if (user.topicPreference !== undefined) {
        filter['topic'] = { "id": {"equals": topic} }
    }

    filter['assignedTo'] = {"id": {"equals": user.id}}

    return filter
}
