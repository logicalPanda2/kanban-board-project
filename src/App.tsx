import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./components/Column";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
    const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [hasError, setError] = useState<boolean>(false);
    const [editedId, setEditedId] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [detailsValue, setDetailsValue] = useState<string>("");
    const [tagValue, setTagValue] = useState<Tag>("none");
    const root = document.getElementById("root");

    const createTodo = (title: string, details: string, tag: Tag): boolean => {
        if(!title) {
            return false;
        }

        const newTodo: Todo = {
            title: title,
            details: details,
            status: "todo",
            tag: tag,
            id: crypto.randomUUID(),
        }

        setTitleValue("");
        setDetailsValue("");
        setTagValue("none");

        todos.length === 0 ? setTodos([newTodo]) : setTodos((prev) => [...prev, newTodo]);

        return true;
    }

    const editTodo = (title: string, details: string, tag: Tag): boolean => {
        if(!title) {
            return false;
        }

        const oldTodo = todos.find(todo => todo.id === editedId);

        if(!oldTodo) {
            return false;
        }

        const newTodo = {
            ...oldTodo,
            title: title,
            details: details,
            tag: tag,
        }

        const newTodos = [...todos.filter(todo => todo.id !== editedId), newTodo];
        
        setTodos(newTodos);
        setTitleValue("");
        setDetailsValue("");
        setTagValue("none");
        setEditedId("");

        return true;
    }

    const deleteTodo = (id: string): void => {
        if(!todos) return;

        const newTodos = todos.filter(todo => todo.id !== id);

        setTodos(newTodos);
    }

    const toggleModal = (): void => {
        if(!root) throw new Error("root element not found");

        const newState = !isModalOpen;
        setModalOpen(newState);
        [...root.children].forEach(child => child.toggleAttribute("inert"));
    }

    const closeModal = (): void => {
        toggleModal();
        setTitleValue("");
        setDetailsValue("");
        setTagValue("none");
        setEditedId("");
        setError(false);
    }

    const viewDetails = (todo: Todo): void => {
        setTitleValue(todo.title);
        setDetailsValue(todo.details);
        setTagValue(todo.tag);
        setEditedId(todo.id);
        toggleModal();
    }

	return (
        <>
            <DndProvider backend={HTML5Backend}>
                <main className="flex flex-col h-screen">
                    <button 
                        onClick={toggleModal}
                    >
                        Create new task
                    </button>
                    <div className="flex flex-row grow">
                        <Column title="To Do" status={"todo"} todos={todos.filter(todo => todo.status === "todo")} onView={viewDetails} onDelete={deleteTodo} onSetTodos={setTodos}/>
                        <Column title="In Progress" status={"wip"} todos={todos.filter(todo => todo.status === "wip")} onView={viewDetails} onDelete={deleteTodo} onSetTodos={setTodos}/>
                        <Column title="Completed" status={"completed"} todos={todos.filter(todo => todo.status === "completed")} onView={viewDetails} onDelete={deleteTodo} onSetTodos={setTodos}/>
                    </div>
                </main>
            </DndProvider>
            {isModalOpen &&
                <div
                    className="flex flex-col w-2xs"
                >
                    <p>{editedId ? "Edit a task": "Create a task"}</p>
                    <label 
                        htmlFor="titleField"
                    >
                        Task Title
                    </label>
                    <input 
                        type="text" 
                        name="title" 
                        id="titleField" 
                        className="border border-solid border-black"
                        value={titleValue}
                        onChange={(e) => {setTitleValue(e.target.value)}}
                    />
                    <label 
                        htmlFor="detailsField"
                    >
                        Task Details
                    </label>
                    <input 
                        type="text" 
                        name="details" 
                        id="detailsField" 
                        className="border border-solid border-black"
                        value={detailsValue}
                        onChange={(e) => {setDetailsValue(e.target.value)}}
                    />
                    <label 
                        htmlFor="tagField"
                    >
                        Task Tag
                    </label>
                    <select 
                        name="tag" 
                        id="tagField"
                        className="border border-solid border-black"
                        value={tagValue}
                        onChange={(e) => {isTag(e.target.value) ? setTagValue(e.target.value) : setTagValue("none")}}
                    >
                        <option value="none">None</option>
                        <option value="low">Low Priority</option>
                        <option value="mid">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>

                    <button onClick={() => {
                        editedId
                        ? (editTodo(titleValue, detailsValue, tagValue) === false ? setError(true) : closeModal())
                        : (createTodo(titleValue, detailsValue, tagValue) === false ? setError(true) : closeModal())
                    }}>
                        {editedId ? "Confirm": "Create"}
                    </button>
                    <button onClick={() => { closeModal() }}>Close</button>
                    {hasError &&
                        <p>Title cannot be empty</p>
                    }
                </div>
            }
        </>
    );
}