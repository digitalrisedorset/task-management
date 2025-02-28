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
    hideComplete?: string
}

export const PREFERENCE_RESET = 'reset'

export const PREFERENCE_HIDE_COMPLETE = 'true'


export interface TaskFilterKeys {
    topic?: { "id": { "equals": string } },
    assignedTo?: { "id": { "equals": string } },
    completedAt?: string | null
}

export const OPTION_SELECTED = 'checked'