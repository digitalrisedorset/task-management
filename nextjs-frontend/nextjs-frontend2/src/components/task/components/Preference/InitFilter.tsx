import React from "react";
import {EventRow, ViewEventStyle} from "@/components/global/styles/ItemStyles";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {TopicPreference} from "@/components/task/components/Preference/TopicReference";

export const InitFilter: React.FC = () => {
    const user = useUser()

    if (user === undefined) return

    return (
        <ViewEventStyle>
            <h5>Let&apos;s make this task listing easy</h5>
            {<EventRow>
                <p className="label">What topic type do you want to use?</p>
                <TopicPreference />
            </EventRow>}
        </ViewEventStyle>
    )
}