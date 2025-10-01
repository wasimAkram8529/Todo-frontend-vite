import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import {describe, vi, it, expect} from 'vitest'
import api from '../../api'
import { MemoryRouter } from "react-router-dom"
import TaskList from "../../pages/TaskList"

vi.mock('../../api')

describe("Integration test for TaskList and TaskItem", () => {
  it('Should render TaskList element with TaskItem', async () => {
    const mockTodoData = [{_id: "123", name: "Gym workout", completed: false}, {_id: "234", name: "Buy groceries", completed: true}]

    api.get.mockResolvedValueOnce({data: {tasks: mockTodoData}})
    
    render(
      <MemoryRouter>
        <TaskList/>
      </MemoryRouter>
    )

    expect(screen.getByText(/Task Manager/i)).toBeInTheDocument()

    await waitFor(() => {
      mockTodoData.forEach((todo, index) => {
      expect(screen.getByText(todo.name)).toBeInTheDocument()
      expect(screen.getByText(todo.name)).toHaveTextContent(mockTodoData[index].name)
    })
    })
  })

  it('Should delete selected todo from TaskList', async () => {
    const mockTodoData = [{_id: "123", name: "Gym workout", completed: false}, {_id: "234", name: "Buy groceries", completed: true}]

    api.get.mockResolvedValueOnce({data: {tasks: mockTodoData}})
    api.delete.mockResolvedValueOnce({})

    const newMockData = [{_id: "123", name: "Gym workout", completed: false}]
    api.get.mockResolvedValueOnce({data: {tasks: newMockData}})
    
    render(
      <MemoryRouter>
        <TaskList/>
      </MemoryRouter>
    )

    await waitFor(() => {
      mockTodoData.forEach((todo, index) => {
        expect(screen.getByText(todo.name)).toBeInTheDocument()
        expect(screen.getByText(todo.name)).toHaveTextContent(mockTodoData[index].name)
      })
    })

    const deleteButtons = screen.getAllByRole('button', {name: /Delete Task/i})
    expect(deleteButtons.length).toBe(2)
    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalled()
    })

    await expect(api.get).toHaveBeenCalled()
    expect(screen.getAllByRole('button', {name: /Delete Task/i}).length).toBe(1)
  })

  it('Should print No tasks yet... if tasks is empty', async () => {
    const mockTodoData = []
    api.get.mockResolvedValueOnce({data: {tasks: mockTodoData}})
    
    render(
      <MemoryRouter>
        <TaskList/>
      </MemoryRouter>
    )
    
    await waitFor(() => {
      expect(screen.getByText(/No tasks yet.../i)).toBeInTheDocument()
    })

    const deleteButtons = screen.queryAllByRole('button', {name: /Delete Task/i})
    expect(deleteButtons.length).toBe(0)
  })
})