import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./components/Column";
import TodoModal from "./components/TodoModal";
import Header from "./components/Header";
import WelcomeModal from "./components/WelcomeModal";
import { useTodos } from "./hooks/useTodos";
import { useModalStates } from "./hooks/useModalStates";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect } from "react";

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
        closeModal,
        openModal,
        viewDetails
    } = useModalStates();
    const filteredTodos =
        filterValue !== "none"
            ? todos.filter((todo) => todo.tag === filterValue)
            : todos;
    const modalId = "1";
    const welcomeModalId = "2";

    useEffect(() => {
        const root = document.getElementById("root");
		if (!root) throw new Error("root element not found");

		[...root.children].forEach((child) => {
            if(child.id === "1" || child.id === "2") return;

            child.toggleAttribute("inert");
        });
    }, [isModalOpen, hasVisited]);

	return (
		<>
			<Header
				onToggle={openModal}
				value={filterValue}
				onChange={setFilterValue}
			/>
			<DndProvider backend={HTML5Backend}>
				<main className="flex grow selection:bg-green-800 selection:text-neutral-100">
					<div className="flex md:flex-row flex-col grow min-h-full">
						<Column
							title="To Do"
							status={"todo"}
							todos={filteredTodos.filter(
								(todo) => todo.status === "todo",
							)}
							onView={viewDetails}
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
                    onTaskDelete={deleteTodo}
                    id={modalId}
				/>
			)}
            {!hasVisited && (
                <WelcomeModal onClose={() => setHasVisited(true)} id={welcomeModalId}/>
            )}
		</>
	);
}
