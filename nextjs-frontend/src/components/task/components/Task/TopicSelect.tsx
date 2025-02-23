import React from "react";
import {capitalise} from "@/lib/string";
import {Loading} from "@/components/global/components/Loading";
import {useTaskTopics} from "@/components/tasktopic/graphql/useTaskTopics";
import {KeystoneTaskTopic} from "@/components/tasktopic/types/tasktopic";
import {useTaskTopicState} from "@/state/TopicStateProvider";
import {SelectStyle} from "@/components/global/styles/ItemStyles";
import {Radio} from "@/components/global/components/Preference/Radio";
import {EditTaskProps} from "@/components/task/components/EditTask";

export const TopicSelect: React.FC<EditTaskProps> = ({task}: EditTaskProps) => {
    const {data, loading} = useTaskTopics()
    const {topicState, toggleActiveTaskTopic} = useTaskTopicState();

    if (loading) return <Loading />

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        toggleActiveTaskTopic(e.target.value)
    }

    const topicSelected = () => {
        return topicState.activeTopicId || task.topic.id
    }

    return <SelectStyle>
        {data?.taskTopics.map((item: KeystoneTaskTopic) => {
            return (
                <Radio key={`topic-${item.id}`}
                       id={`topic-${item.id}`}
                       name="topic"
                       value={item.id}
                       checked={topicSelected() === item.id}
                       onChange={handleSelect}
                       label={capitalise(item?.label)}
                />
            )
        })}
    </SelectStyle>
}