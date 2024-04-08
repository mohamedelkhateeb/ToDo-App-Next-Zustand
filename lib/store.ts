import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

export type Status = 'DONE' | 'IN_PROGRESS' | 'TODO'

export type Task = {
  id: string
  title: string
  description?: string
  status: Status
}

export type State = {
  tasks: Task[]
}

export type Actions = {
  addTask: (title: string, description?: string) => void
  updateTask: (id: string, status: Status) => void
  removeTask: (id: string) => void
}

export const useTaskStore = create<State & Actions>()(set => ({
  tasks: [],
  addTask: (title: string, description?: string) =>
    set(state => ({
      tasks: [
        ...state.tasks,
        { id: uuid(), title: 'Our first task', status: 'TODO' }
      ]
    })),
  removeTask: (id: string) =>
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
    })),
  updateTask: (id: string, status: Status) => set(state => ({
    tasks: state.tasks.map(task => (task.id === id ? { ...task, status } : task))
  }))
}))
