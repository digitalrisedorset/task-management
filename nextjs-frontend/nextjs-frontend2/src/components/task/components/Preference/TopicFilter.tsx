import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useUserPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {KeystoneTaskTopic} from "@/components/tasktopic/types/tasktopic";
import {useTaskTopics} from "@/components/tasktopic/graphql/useTaskTopics";
import {VenueStyle} from "@/components/task/styles/TaskFilterStyles";

export const TopicFilter: React.FC = () => {
    const {data} = useTaskTopics()
    const user = useUser()
    const [updateUserPreference] = useUserPreference()

    if (user?.id === undefined) return
    const onTopicChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id,{'topicPreference': e.target.value})
        })
    };

    return (
        <VenueStyle>
            <fieldset>
                <Label>Week Filter</Label>
                <select onChange={onTopicChange} className="form-select" value={user.topicPreference?.id}>
                    <option value="">-</option>
                    {data?.taskTopics.map((item: KeystoneTaskTopic) => {
                        return (<option key={item.label} value={item.id}>{item.label}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}