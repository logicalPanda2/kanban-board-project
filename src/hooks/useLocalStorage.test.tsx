import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage hook", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("retrieves an existing value", () => {
        const key = "initial";
        const value = 5;
        const fallback = 0;
        localStorage.setItem(key, JSON.stringify(value));

        const {result} = renderHook(() => (
            useLocalStorage(key, fallback)
        ));

        expect(result.current[0]).toBe(value);
    });

    it("will initialize a new value", () => {
        const key = "new";
        const value = 50;
        const initialStorage = localStorage.getItem(key);

        expect(initialStorage).toBeNull();

        renderHook(() => (
            useLocalStorage(key, value)
        ));

        const newStorage = localStorage.getItem(key);

        expect(newStorage).toBe(JSON.stringify(value));
    });

    it("will update a value", () => {
        const key = "key";
        const value = 100;
        const updated = 120;

        const {result} = renderHook(() => (
            useLocalStorage(key, value)
        ));

        const initialStorage = localStorage.getItem(key);

        expect(initialStorage).toBe(JSON.stringify(value));

        act(() => {
            result.current[1](updated);
        })
        
        const updatedStorage = localStorage.getItem(key);

        expect(result.current[0]).toBe(updated);
        expect(updatedStorage).toBe(JSON.stringify(updated));
    })
});