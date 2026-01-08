import { render, renderHook, screen } from "@testing-library/react";
import TodoCard from "./TodoCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import userEvent from "@testing-library/user-event";
import { useTodos } from "../hooks/useTodos";
import { act } from "react";

const mockTodo: Todo = {
    title: "new todo",
    details: "no details",
    tag: "low",
    status: "wip",
    id: "string",
}

describe("TodoCard", () => {
    beforeEach(() => {
        localStorage.clear();
    })

    it("renders a todo's title", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <TodoCard 
                    todo={mockTodo}
                    onTaskChangeStatus={vi.fn()}
                    onTaskView={vi.fn()}
                />
            </DndProvider>
        );

        expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    });

    it("has buttons which are accessible through aria labels", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <TodoCard 
                    todo={mockTodo}
                    onTaskChangeStatus={vi.fn()}
                    onTaskView={vi.fn()}
                />
            </DndProvider>
        );

        expect(screen.getByRole("button", { name: "move left"})).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "move right"})).toBeInTheDocument();
    });

    it("calls changeTodoStatus with a 'left' key when the left button is clicked", async () => {
        const user = userEvent.setup();

        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.todos.push(mockTodo);
        })
        
        render(
            <DndProvider backend={HTML5Backend}>
                <TodoCard 
                    todo={mockTodo}
                    onTaskChangeStatus={result.current.changeTodoStatus}
                    onTaskView={vi.fn()}
                />
            </DndProvider>
        );

        await user.click(screen.getByRole("button", { name: "move left"}));

        expect(result.current.todos[0].status).toBe("todo");
    });

    it("calls changeTodoStatus with a 'right' key when the right button is clicked", async () => {
        const user = userEvent.setup();

        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.todos.push(mockTodo);
        })
        
        render(
            <DndProvider backend={HTML5Backend}>
                <TodoCard 
                    todo={mockTodo}
                    onTaskChangeStatus={result.current.changeTodoStatus}
                    onTaskView={vi.fn()}
                />
            </DndProvider>
        );

        await user.click(screen.getByRole("button", { name: "move right"}));

        expect(result.current.todos[0].status).toBe("completed");
    });
    
    it("displays the correct color based on it's tag", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <TodoCard 
                    todo={mockTodo}
                    onTaskChangeStatus={vi.fn()}
                    onTaskView={vi.fn()}
                />
            </DndProvider>
        );

        const card = screen.getByText(mockTodo.title).closest("div");

        if(!card) throw new Error("component does not have an outer div");

        const cardChildren = [...card.children];

        expect(cardChildren[cardChildren.length - 1]).toHaveClass("bg-green-500");
    });
})