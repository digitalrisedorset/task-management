import {list} from "@keystone-6/core";
import { relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";
import type {Session} from "../schema";

export const TaskTopic = list({
    access: allowAll,
    fields: {
        label: text(),
        tasks: relationship({
            ref: 'Task.topic',
            many: true
        }),
        user: relationship({
            ref: 'User.taskTopics',
        }),
        userPreference: relationship({
            ref: 'User.topicPreference',
        }),
    },
    hooks: {
        resolveInput: async ({ item, resolvedData, context }) => {
            const sesh = context.session as Session;
            if (!sesh.itemId) {
                throw new Error('You must be logged in to do this!');
            }

            resolvedData.user = { connect: { id: sesh.itemId} }

            return resolvedData;
        },
    }
})