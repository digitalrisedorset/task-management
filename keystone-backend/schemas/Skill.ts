import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";

export const Skill = list({
    access: allowAll,
    fields: {
        label: text(),
        tasks: relationship({
            ref: 'Task.skill',
            many: true
        }),
    }
})