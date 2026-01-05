import { renderHook } from "@testing-library/react";
import { useTodos } from "./useTodos";
import { act } from "react";

describe("useTodos hook", () => {
    // NOT: test if it creates an empty array
    // NOT: test if it returns existing todos
    // 4: check if edit todo throws without a title
    // 5: check if edit todo throws when it doesn't find oldTodo (meaning: the targetId provided doesn't refer to any existing Todos)
    // 8: check if delete todo properly deletes a todo 
    // 9 - 12: check all 4 branches in changeTodoStatus

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
});