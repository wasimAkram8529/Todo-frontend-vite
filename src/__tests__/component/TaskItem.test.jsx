import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import {describe, expect, it, vi} from 'vitest'
import api from "../../api"
import TaskItem from "../../components/TaskItem"
import { MemoryRouter } from "react-router-dom"

vi.mock('../../api')

describe("TaskItem()", () => {
  it("should get task and display", () => {
    const task = {_id: "123", name: "Gym workout", completed: false}
    const fetchTasks = vi.fn();
    api.delete.mockResolvedValueOnce()
    
    render(
      <MemoryRouter>
        <TaskItem task={task} fetchTasks={fetchTasks} />
      </MemoryRouter>
    )
    
    expect(screen.getByText(/Gym workout/i)).toBeInTheDocument()
    
  })

  it('should call api.delete and fetchTasks when delete button is clicked', async() => {
    const task = {_id: "123", name: "Gym workout", completed: false}
    const fetchTasks = vi.fn();
    api.delete.mockResolvedValueOnce()

    render(
      <MemoryRouter>
        <TaskItem task={task} fetchTasks={fetchTasks} />
      </MemoryRouter>
    )

    const deleteButton = screen.getByRole('button', {name:/Delete Task/i})

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith("/tasks/123")
      expect(fetchTasks).toHaveBeenCalledTimes(1)
    })
  })
})