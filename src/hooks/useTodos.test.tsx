import { renderHook } from "@testing-library/react";
import { useTodos } from "./useTodos";
import { act } from "react";

describe("useTodos hook", () => {
    beforeEach(() => {
        localStorage.removeItem("todos");
    });

    it("returns true on successful todo creation", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        const returnValue = result.current.createTodo("title", "details", "low");

        expect(returnValue).toBe(true);
    });

    it("returns false if todo is created without a title", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        console.log(result.current.todos);

        const returnValue = result.current.createTodo("", "details", "low");

        expect(returnValue).toBe(false);
    });

    it("returns true on successful todo edit", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.createTodo("old title", "details", "high");
        });
        
        const todos = result.current.todos;

        const returnValue = result.current.editTodo("new title", "new details", "mid", todos[0].id);

        expect(returnValue).toBe(true);
    });

    it("edits only the title, details, and tag", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.createTodo("old title", "details", "high");
        });
        
        const todos = result.current.todos;

        act(() => {
            result.current.editTodo("new title", "new details", "mid", todos[0].id);
        });

        const updatedTodos = result.current.todos;

        expect(updatedTodos[0].title).toBe("new title");
        expect(updatedTodos[0].details).toBe("new details");
        expect(updatedTodos[0].tag).toBe("mid");
        expect(updatedTodos[0].status).toBe(todos[0].status);
        expect(updatedTodos[0].id).toBe(todos[0].id);
    });

    it("returns false if todo is edited without a title", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.createTodo("old title", "details", "high");
        });
        
        const todos = result.current.todos;

        const returnValue = result.current.editTodo("", "new details", "mid", todos[0].id);

        expect(returnValue).toBe(false);
    });

    it("returns false if the provided id does not match an existing todo", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.createTodo("old title", "details", "high");
        });

        const returnValue = result.current.editTodo("new title", "new details", "mid", "never-id");

        expect(returnValue).toBe(false);
    });

    it("deletes a todo", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.createTodo("task 1", "no details", "high");
        });

        act(() => {
            result.current.createTodo("task 2", "no details also", "mid");
        })

        const todos = result.current.todos;
        const targetId = todos[0].id;

        expect(todos).toHaveLength(2);

        act(() => {
            result.current.deleteTodo(targetId);
        });

        const newTodos = result.current.todos;

        expect(newTodos).toHaveLength(1);
        expect(newTodos[0].title).toBe("task 2");
    });

    it("changes the status to 'wip' provided a right key and previous status 'todo'", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.createTodo("todo", "no details", "none");
        })

        expect(result.current.todos[0].status).toBe("todo");

        act(() => {
            result.current.changeTodoStatus(result.current.todos[0], "right");
        });

        expect(result.current.todos[0].status).toBe("wip");
    });

    it("changes the status to 'completed' provided a right key and previous status 'wip'", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.createTodo("todo", "no details", "none");
        })

        act(() => {
            result.current.changeTodoStatus(result.current.todos[0], "right");
        });

        expect(result.current.todos[0].status).toBe("wip");

        act(() => {
            result.current.changeTodoStatus(result.current.todos[0], "right");
        });

        expect(result.current.todos[0].status).toBe("completed");
    });

    it("changes the status to 'todo' provided a left key and previous status 'wip'", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.createTodo("todo", "no details", "none");
        })

        act(() => {
            result.current.changeTodoStatus(result.current.todos[0], "right");
        });

        expect(result.current.todos[0].status).toBe("wip");

        act(() => {
            result.current.changeTodoStatus(result.current.todos[0], "left");
        });

        expect(result.current.todos[0].status).toBe("todo");
    });

    it("changes the status to 'wip' provided a left key and previous status 'completed'", () => {
        const {result} = renderHook(() => (
            useTodos("todos")
        ));

        act(() => {
            result.current.createTodo("todo", "no details", "none");
        })

        act(() => {
            result.current.changeTodoStatus(result.current.todos[0], "right");
        });

        act(() => {
            result.current.changeTodoStatus(result.current.todos[0], "right");
        });

        expect(result.current.todos[0].status).toBe("completed");

        act(() => {
            result.current.changeTodoStatus(result.current.todos[0], "left");
        });

        expect(result.current.todos[0].status).toBe("wip");
    });
});