import { checkbox } from "@keystone-6/core/fields";

export const topicStatusFields = {
    hideComplete: checkbox({
        defaultValue: false,
        label: 'Hide Complete Task',
    }),
};