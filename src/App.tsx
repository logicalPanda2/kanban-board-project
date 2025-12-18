import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./components/Column";
import TodoModal from "./components/TodoModal";
import Header from "./components/Header";
import WelcomeModal from "./components/WelcomeModal";
import { useTodos } from "./hooks/useTodos";
import { useModalStates } from "./hooks/useModalStates";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
    const [hasVisited, setHasVisited] = useLocalStorage<boolean>("hasVisited", false);
	const { todos, setTodos, createTodo, editTodo, deleteTodo, changeTodoStatus } = useTodos("todos");
    const {
        isModalOpen,
        hasError,
        setError,
        editedId,
        titleValue,
        setTitleValue,
        detailsValue,
        setDetailsValue,
        tagValue,
        setTagValue,
        filterValue,
        setFilterValue,
        toggleModal,
        closeModal,
        viewDetails
    } = useModalStates();
    const filteredTodos =
        filterValue !== "none"
            ? todos.filter((todo) => todo.tag === filterValue)
            : todos;

	return (
		<>
			<Header
				onToggle={toggleModal}
				value={filterValue}
				onChange={setFilterValue}
			/>
			<DndProvider backend={HTML5Backend}>
				<main className="selection:bg-green-800 selection:text-neutral-100">
					<div className="flex md:flex-row flex-col grow">
						<Column
							title="To Do"
							status={"todo"}
							todos={filteredTodos.filter(
								(todo) => todo.status === "todo",
							)}
							onView={viewDetails}
							onDelete={deleteTodo}
							onSetTodos={setTodos}
                            onChangeStatus={changeTodoStatus}
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
                            onChangeStatus={changeTodoStatus}
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
                            onChangeStatus={changeTodoStatus}
						/>
					</div>
				</main>
			</DndProvider>
			{isModalOpen && (
				<TodoModal
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
            {!hasVisited && (
                <WelcomeModal onClose={() => setHasVisited(true)}/>
            )}
		</>
	);
}
