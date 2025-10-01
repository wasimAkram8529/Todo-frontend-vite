import {describe, expect, vi, it} from 'vitest'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import EditTask from '../../pages/EditTask';
import { MemoryRouter } from 'react-router-dom';
import api from '../../api';

vi.mock('../../api')

describe('EditTask()', () => {
  it("Should fetch task data and display it on render", async() => {
    api.get.mockResolvedValueOnce({
      data: {
        task: {
          _id: "123", name: "Gym workout", completed: false
        }
      }
    })

    render(
      <MemoryRouter initialEntries={["/edit?id=123"]}>
        <EditTask/>
      </MemoryRouter>
    )
    
    // screen.debug()
    await waitFor(() => {
      expect(screen.getByRole("textbox", {name: /name/i})).toHaveValue("Gym workout")
    })

    const nameInput = screen.getByRole("textbox", {name: /name/i})
    expect(nameInput.value).toBe("Gym workout")
    const completedCheckBox = screen.getByRole('checkbox', {name: /completed/i})
    expect(completedCheckBox.checked).toBe(false)
  })

  it('should update the task on form submission and show success alert', async() => {
    api.get.mockResolvedValueOnce({
      data: {
        task: {
          _id: "123", name: "Gym workout", completed: false
        }
      }
    })

    api.patch.mockResolvedValueOnce({
      data: {
        task:{
          _id: "123",
          name: "Buy groceries",
          completed: true
        }
      }
    })
    
    render(
      <MemoryRouter initialEntries={["/edit?id=123"]}>
       <EditTask/>
      </MemoryRouter>
    )
    
    await waitFor(() => {
      expect(screen.getByRole("textbox", {name: /name/i})).toHaveValue("Gym workout")
    })
    
    const nameInput = screen.getByRole("textbox", {name: /name/i})
    const completedCheckBox = screen.getByRole('checkbox', {name: /completed/i})
    const submitButton = screen.getByRole("button", {name: /Edit/i})

    fireEvent.change(nameInput, {target:{value: "Buy groceries"}})
    fireEvent.click(completedCheckBox)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toHaveTextContent("Loading...")
    })

    expect(api.patch).toHaveBeenCalledWith("/tasks/123", {
      name: "Buy groceries",
      completed: true
    })

    await waitFor(() => {
      expect(screen.getByText(/task updated successfully!/i)).toBeInTheDocument()
    })

    expect(nameInput).toHaveValue("Buy groceries")
    expect(completedCheckBox).toBeChecked();
  })
})