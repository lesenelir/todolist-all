import { TodoLists } from '@/types'

interface ITodo<T> {
  createTodoItem: (content: T) => TodoLists.TodoItem<T>
  setTodoItem: (id: number, updates: Partial<TodoLists.TodoItem<T>>) => TodoLists.TodoItem<T> | undefined
  getTodoItem: (id: number) => TodoLists.TodoItem<T> | undefined
  deleteTodoItem: (id: number) => void
}

export class Todo<T> implements ITodo<T>{
  private todoItemsMap: Map<number, TodoLists.TodoItem<T>>
  protected nextId: number

  constructor(initialTodoItems: TodoLists.TodoItem<T>[] = []) {
    this.todoItemsMap = new Map<number, TodoLists.TodoItem<T>>()
    this.nextId = 0

    for (const initialTodoItem of initialTodoItems) {
      const newTodoItem = {
        ...initialTodoItem,
        id: this.nextId
      }
      this.todoItemsMap.set(this.nextId, newTodoItem)
      this.nextId++
    }
  }

  createTodoItem(content: T): TodoLists.TodoItem<T> {
    const newTodoItem = {
      id: this.nextId,
      content,
      isCompleted: false
    }

    this.todoItemsMap.set(this.nextId++, newTodoItem)

    return newTodoItem
  }

  setTodoItem(id: number, updates: Partial<TodoLists.TodoItem<T>>): TodoLists.TodoItem<T> | undefined {
    const item = this.todoItemsMap.get(id)

    if (!item) {
      return undefined
    }

    const updatedItem = {
      ...item,
      ...updates
    }

    this.todoItemsMap.set(id, updatedItem)
    return updatedItem
  }

  getTodoItem(id: number): TodoLists.TodoItem<T> | undefined {
    return this.todoItemsMap.get(id)
  }

  deleteTodoItem(id: number): void {
    this.todoItemsMap.delete(id)
  }
}


