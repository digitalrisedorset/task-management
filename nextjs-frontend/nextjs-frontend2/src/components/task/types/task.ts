import {KeystoneTaskTopic} from "@/components/tasktopic/types/tasktopic";

export interface KeystoneTask  {
    id: string,
    label: string,
    description: string,
    topic: KeystoneTaskTopic
    createdAt: string,
    completedAt: string,
    estimatedTime: number
    priority: number
}

export interface TaskPreferenceFilterType {
    topicPreference?: string
}

export const PREFERENCE_RESET = 'reset'


export interface TaskFilterKeys {
    topic?: { "id": { "equals": string } },
    assignedTo?: { "id": { "equals": string } },
}

export const OPTION_SELECTED = 'checked'