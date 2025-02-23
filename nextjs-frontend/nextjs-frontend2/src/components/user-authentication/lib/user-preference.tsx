import {graphQLVariables} from "@/components/user-authentication/types/user";
import {PREFERENCE_RESET, TaskPreferenceFilterType} from "@/components/task/types/task";

export const getUserPreferenceVariables = (userId: string, fields: TaskPreferenceFilterType) => {
    const data: graphQLVariables = {}

    for (const index in fields) {
        if (!fields.hasOwnProperty(index)) continue;
        const value = fields[index as keyof TaskPreferenceFilterType];
        if (value === undefined) continue

        if (index === 'topicPreference') {
            data[index] = value
        }

        switch (index) {
            case 'topicPreference':
                if (fields[index] === PREFERENCE_RESET) {
                    data[index] = {"disconnect": true}
                } else {
                    data[index] = {
                        "connect": {
                            "id": value
                        }
                    }
                }
                break;
        }
    }

    console.log('data', data)

    return {
        "data": data,
        "where": {
            "id": userId
        },
    }
}