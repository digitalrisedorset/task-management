import {list} from "@keystone-6/core";
import { relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";
import type {Session} from "../schema";

export const Task = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'label', 'assignedTo', 'createdAt'],
        },
    },
    fields: {
        label: text(),
        description: text(),
        assignedTo: relationship({ ref: 'User.todos' }),
        followup: relationship({ref: 'FollowUp.task'}),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
        }),
        completedAt: timestamp(),
    },
    hooks: {
        resolveInput: async ({ item, resolvedData, context }) => {
            const sesh = context.session as Session;
            if (!sesh.itemId) {
                throw new Error('You must be logged in to do this!');
            }

            resolvedData.assignedTo = { connect: { id: sesh.itemId} }

            return resolvedData;
        },
    }
})