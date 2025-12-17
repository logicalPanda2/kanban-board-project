import { useLocalStorage } from "./useLocalStorage";

export function useTodos(localStorageKey: string) {
	const [todos, setTodos] = useLocalStorage<Todo[]>(localStorageKey, []);

	const createTodo = (title: string, details: string, tag: Tag): boolean => {
		if (!title) return false;

		const newTodo: Todo = {
			title: title,
			details: details,
			status: "todo",
			tag: tag,
			id: crypto.randomUUID(),
		};

		todos.length === 0
			? setTodos([newTodo])
			: setTodos((prev) => [...prev, newTodo]);

		return true;
	};

	const editTodo = (
		title: string,
		details: string,
		tag: Tag,
		targetId: string,
	): boolean => {
		if (!title) return false;

		const oldTodo = todos.find((todo) => todo.id === targetId);

		if (!oldTodo) return false;

        const index = todos.indexOf(oldTodo);

		const newTodo = {
			...oldTodo,
			title: title,
			details: details,
			tag: tag,
		};

		const copy = todos;
        copy[index] = newTodo;

		setTodos(copy);

		return true;
	};

	const deleteTodo = (id: string): void => {
		const newTodos = todos.filter((todo) => todo.id !== id);

		setTodos(newTodos);
	};

	return {
		todos,
		setTodos,
		createTodo,
		editTodo,
		deleteTodo,
	};
}
