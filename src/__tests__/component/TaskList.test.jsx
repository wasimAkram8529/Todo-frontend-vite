import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import {describe, expect, it, vi} from 'vitest'
import api from "../../api"
import { MemoryRouter } from "react-router-dom"
import TaskList from "../../pages/TaskList"

vi.mock('../../api')

vi.mock('../../components/TaskItem', () => ({
    __esModule: true,
    default: ({ task }) => <div>{task.name}</div>,
}));

describe("TaskList()", () => {
  it("should get all task and display it", async () => {
    api.get.mockResolvedValueOnce({
      data: {
        tasks: [{_id: "123", name: "Gym workout", completed: false}, {_id: "234", name: "Buy groceries", completed: true}]
      }
    })

    render(
      <MemoryRouter>
        <TaskList/>
      </MemoryRouter>
    )

    await waitFor(() => {
       expect(screen.getByText(/Gym workout/i)).toBeInTheDocument()
       expect(screen.getByText(/Buy groceries/i)).toBeInTheDocument()
    })
  })

  it('should add new element when click on submit', async() => {
    api.get.mockResolvedValueOnce({data:{tasks: [{_id: "123", name: "Gym workout", completed: false}, {_id: "234", name: "Buy groceries", completed: true}]}})

    api.post.mockResolvedValueOnce()

    api.get.mockResolvedValueOnce({data:{tasks: [{_id: "123", name: "Gym workout", completed: false}, {_id: "234", name: "Buy groceries", completed: true}, { _id: "567", name: "New Task", completed: false }]}})


    render(
      <MemoryRouter>
        <TaskList/>
      </MemoryRouter>
    )

    await waitFor(() => {
       expect(screen.getByText(/Gym workout/i)).toBeInTheDocument()
       expect(screen.getByText(/Buy groceries/i)).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText(/e.g. learn React/i);
    const submitButton = screen.getByRole('button', {name: /Submit/i})

    fireEvent.change(input, {target: {value: "New Task"}})
    expect(input.value).toBe("New Task")

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/tasks", {name: "New Task"})
      expect(input.value).toBe("");
      expect(screen.getByText(/Task added successfully!/)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText(/New Task/i)).toBeInTheDocument();
    })
  })
})