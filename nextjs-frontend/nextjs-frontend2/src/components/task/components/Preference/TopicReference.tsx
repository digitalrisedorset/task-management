import React from "react";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {Loading} from "@/components/global/components/Loading";
import {useUserPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {KeystoneTaskTopic} from "@/components/tasktopic/types/tasktopic";
import {useTaskTopics} from "@/components/tasktopic/graphql/useTaskTopics";
import {EventHostSelectionStyle} from "@/components/tasktopic/types/TopicStyle";
import {PreferenceChoice} from "@/components/task/styles/TaskFilterStyles";

export const TopicPreference: React.FC = () => {
    const {data, loading} = useTaskTopics()
    const user = useUser()
    const [updateUserPreference] = useUserPreference()

    if (user === undefined) return

    const onTopicChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'topicPreference': input.value})
        })
    };

    if (loading) return <Loading />

    return <EventHostSelectionStyle>
        {data?.taskTopics.map((item: KeystoneTaskTopic) => {
            return (
                <PreferenceChoice key={item.id}>
                    <input type="radio" id={item.label} name="eventHost" value={item.id} onClick={onTopicChange} />
                    <label htmlFor={item.label}>{item.label}</label>
                </PreferenceChoice>
            )
        })}
    </EventHostSelectionStyle>
}