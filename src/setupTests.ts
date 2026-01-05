import "@testing-library/jest-dom/vitest";

const localStorageMock = (() => {
    let storage: Record<string, string> = {}

    return {
        getItem: (key: string) => (
            storage[key] ?? null
        ),
        setItem: (key: string, value: string) => {
            storage[key] = value;
        },
        removeItem: (key: string) => {
            delete storage[key];
        },
        clear: () => {
            storage = {};
        },
    }
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});