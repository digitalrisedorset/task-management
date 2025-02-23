import {list} from "@keystone-6/core";
import {integer, relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";
import type {Session} from "../schema";

export const Task = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'label', 'assignedTo', 'topic', 'createdAt'],
        },
    },
    fields: {
        label: text(),
        description: text(),
        assignedTo: relationship({ ref: 'User.todos' }),
        followup: relationship({ref: 'FollowUp.task'}),
        topic: relationship({ref: 'TaskTopic.tasks'}),
        estimatedTime: integer(),
        priority: integer(),
        skill: relationship({ref: 'Skill.tasks'}),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
        }),
        updatedAt: timestamp(),
        completedAt: timestamp(),
    },
    hooks: {
        resolveInput: async ({ item, resolvedData, context }) => {
            const sesh = context.session as Session;
            if (!sesh.itemId) {
                throw new Error('You must be logged in to do this!');
            }

            resolvedData.assignedTo = { connect: { id: sesh.itemId} }
            resolvedData.updatedAt = (new Date()).toISOString()

            return resolvedData;
        },
    }
})