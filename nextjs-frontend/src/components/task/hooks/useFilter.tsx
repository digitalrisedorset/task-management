import {useUser, useUserTopicId} from "@/components/user-authentication/hooks/useUser";
import {TaskFilterKeys} from "@/components/task/types/task";
import {useMemo} from "react";

export const useFilter = () => {
    const user = useUser()
    const topic = useUserTopicId()

    const filter: TaskFilterKeys = {}

    return useMemo(() => {
        if (user === undefined) {
            return filter
        }

        if (user.topicPreference !== undefined) {
            filter['topic'] = { "id": {"equals": topic} }
        }

        if (user.hideComplete === true) {
            filter['completedAt'] = null
        }

        filter['assignedTo'] = {"id": {"equals": user.id}}

        return filter
    }, [useUser, topic, filter, user]);
}
