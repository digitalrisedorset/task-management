// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document'
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from '.keystone/types'
import {User} from "./schemas/User";
import {Task} from "./schemas/Task";
import {FollowUp} from "./schemas/FollowUp";

export type Session = {
  itemId: string
  data: {
    isAdmin: boolean
  }
}

export const lists = {
  User,
  Task,
  FollowUp
} satisfies Lists
