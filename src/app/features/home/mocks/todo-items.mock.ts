import { TodoItem } from "../models/todo-item.interface";

export const activeItems: TodoItem[] = [
  {
    _id: '1',
    title: 'Create application with Angular',
    active: true,
  },
  {
    _id: '2',
    title: 'Deploy application',
    active: true,
  },
  {
    _id: '3',
    title: 'Set up Firebase',
    active: true,
  },
  {
    _id: '4',
    title: 'Write unit tests',
    active: true,
  },
];

export const doneItems: TodoItem[] = [
  {
    _id: '1',
    title: 'Create repository',
    active: false,
  },
];
