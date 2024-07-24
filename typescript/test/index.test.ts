import { describe, expect, it } from 'vitest'
import { Todo } from '@/index'

describe('Todo class', () => {
  it('creates a new todo item successfully', () => {
    const todo = new Todo<string>()
    const newItem = todo.createTodoItem('Test Task')
    expect(newItem).toEqual({ id: 0, content: 'Test Task', isCompleted: false })
  })

  it('retrieves an existing todo item by id', () => {
    const todo = new Todo<string>([{ id: 0, content: 'Initial Task', isCompleted: false }])
    const item = todo.getTodoItem(0)
    expect(item).toEqual({ id: 0, content: 'Initial Task', isCompleted: false })
  })

  it('returns undefined for a non-existing todo item', () => {
    const todo = new Todo<string>()
    const item = todo.getTodoItem(999)
    expect(item).toBeUndefined()
  })

  it('updates an existing todo item successfully', () => {
    const todo = new Todo<string>([{ id: 0, content: 'Initial Task', isCompleted: false }])
    const updatedItem = todo.setTodoItem(0, { isCompleted: true })
    expect(updatedItem).toEqual({ id: 0, content: 'Initial Task', isCompleted: true })
  })

  it('returns undefined when updating a non-existing todo item', () => {
    const todo = new Todo<string>()
    const updatedItem = todo.setTodoItem(999, { isCompleted: true })
    expect(updatedItem).toBeUndefined()
  })

  it('deletes an existing todo item successfully', () => {
    const todo = new Todo<string>([{ id: 0, content: 'Task to be deleted', isCompleted: false }])
    todo.deleteTodoItem(0)
    const item = todo.getTodoItem(0)
    expect(item).toBeUndefined()
  })

  it('handles deletion of a non-existing todo item gracefully', () => {
    const todo = new Todo<string>()
    expect(() => todo.deleteTodoItem(999)).not.toThrow()
  })
})
