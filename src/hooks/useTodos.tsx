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

		const newTodo = {
			...oldTodo,
			title: title,
			details: details,
			tag: tag,
		};

		const newTodos = [
			...todos.filter((todo) => todo.id !== targetId),
			newTodo,
		];

		setTodos(newTodos);

		return true;
	};

	const deleteTodo = (id: string): void => {
		if (!todos) return;

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
