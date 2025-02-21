import {list} from "@keystone-6/core";
import { relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";

export const FollowUp = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'label', 'assignedTo', 'completedAt'],
        },
    },
    fields: {
        label: text(),
        description: text(),
        task: relationship({ ref: 'Task.followup' }),
        completedAt: timestamp(),
    },
})