import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./components/Column";
import Modal from "./components/Modal";
import { useTodos } from "./hooks/useTodos";

function isTag(value: string): value is Tag {
	if (
		value === "none" ||
		value === "low" ||
		value === "mid" ||
		value === "high"
	) {
		return true;
	}
	return false;
}

export default function App() {
	const { todos, setTodos, createTodo, editTodo, deleteTodo } = useTodos("todos");
	const [isModalOpen, setModalOpen] = useState<boolean>(false);
	const [hasError, setError] = useState<boolean>(false);
	const [editedId, setEditedId] = useState<string>("");
	const [titleValue, setTitleValue] = useState<string>("");
	const [detailsValue, setDetailsValue] = useState<string>("");
	const [tagValue, setTagValue] = useState<Tag>("none");
	const [filterValue, setFilterValue] = useState<Tag>("none");
	const root = document.getElementById("root");
	const filteredTodos =
		filterValue !== "none"
			? todos.filter((todo) => todo.tag === filterValue)
			: todos;

	const toggleModal = (): void => {
		if (!root) throw new Error("root element not found");

		const newState = !isModalOpen;
		setModalOpen(newState);
		[...root.children].forEach((child) => child.toggleAttribute("inert"));
	};

	const closeModal = (): void => {
		toggleModal();
		setTitleValue("");
		setDetailsValue("");
		setTagValue("none");
		setEditedId("");
		setError(false);
	};

	const viewDetails = (todo: Todo): void => {
		setTitleValue(todo.title);
		setDetailsValue(todo.details);
		setTagValue(todo.tag);
		setEditedId(todo.id);
		toggleModal();
	};

	return (
		<>
			<header className="flex flex-row flex-nowrap items-center py-4 px-6 justify-between">
                <div className="flex flex-row flex-nowrap items-center">
                    <h1 className="text-4xl">Kanban Board</h1>
                </div>
                <button onClick={toggleModal} className="mx-4 border border-solid border-black py-2 px-4 rounded-lg">Create new task</button>
			</header>
            <DndProvider backend={HTML5Backend}>
				<main className="flex flex-col grow">
					<div className="flex flex-row grow">
						<Column
							title="To Do"
							status={"todo"}
							todos={filteredTodos.filter(
								(todo) => todo.status === "todo",
							)}
							onView={viewDetails}
							onDelete={deleteTodo}
							onSetTodos={setTodos}
						/>
						<Column
							title="In Progress"
							status={"wip"}
							todos={filteredTodos.filter(
								(todo) => todo.status === "wip",
							)}
							onView={viewDetails}
							onDelete={deleteTodo}
							onSetTodos={setTodos}
						/>
						<Column
							title="Completed"
							status={"completed"}
							todos={filteredTodos.filter(
								(todo) => todo.status === "completed",
							)}
							onView={viewDetails}
							onDelete={deleteTodo}
							onSetTodos={setTodos}
						/>
					</div>
				</main>
			</DndProvider>
			{isModalOpen && (
				<Modal
					editedId={editedId}
					titleValue={titleValue}
					onTitleChange={setTitleValue}
					detailsValue={detailsValue}
					onDetailsChange={setDetailsValue}
					tagValue={tagValue}
					onTagChange={setTagValue}
					onEdit={editTodo}
					onCreate={createTodo}
					onClose={closeModal}
					hasError={hasError}
					onError={setError}
				/>
			)}
		</>
	);
}
