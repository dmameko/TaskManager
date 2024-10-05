import { TodoItem } from "../models/todo-item.interface";

export const activeItems: TodoItem[] = [
  {
    id: 1,
    title: 'Create application with Angular',
    active: true,
    readonly: true,
  },
  {
    id: 2,
    title: 'Deploy application',
    active: true,
    readonly: false,
  },
  {
    id: 3,
    title: 'Set up Firebase',
    active: true,
    readonly: false,
  },
  {
    id: 4,
    title: 'Write unit tests',
    active: true,
    readonly: false,
  },
];

export const doneItems: TodoItem[] = [
  {
    id: 1,
    title: 'Create repository',
    active: false,
    readonly: false,
  },
];
