import { renderHook } from "@testing-library/react";
import { useModalStates } from "./useModalStates";
import { act } from "react";

describe("useModalStates hook", () => {
    it("resets all states when opening the modal", () => {
        const {result} = renderHook(() => (
            useModalStates()
        ));

        result.current.openModal();

        expect(result.current.titleValue).toBe("");
        expect(result.current.detailsValue).toBe("");
        expect(result.current.tagValue).toBe("none");
        expect(result.current.editedId).toBe("");
        expect(result.current.hasError).toBe(false);
    });

    it("resets all states when closing the modal", () => {
        const {result} = renderHook(() => (
            useModalStates()
        ));

        result.current.closeModal();

        expect(result.current.titleValue).toBe("");
        expect(result.current.detailsValue).toBe("");
        expect(result.current.tagValue).toBe("none");
        expect(result.current.editedId).toBe("");
        expect(result.current.hasError).toBe(false);
    });

    it("will apply necessary states when viewing details", () => {
        const {result} = renderHook(() => (
            useModalStates()
        ));

        const mockTodo: Todo = {
            title: "new todo",
            details: "not empty",
            tag: "low",
            status: "todo",
            id: crypto.randomUUID(),
        };

        act(() => {
            result.current.viewDetails(mockTodo);
        })

        expect(result.current.titleValue).toBe(mockTodo.title);
        expect(result.current.detailsValue).toBe(mockTodo.details);
        expect(result.current.tagValue).toBe(mockTodo.tag);
        expect(result.current.editedId).toBe(mockTodo.id);
    });
});