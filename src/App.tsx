import { useState } from "react";

interface Todo {
    title: string,
    details: string,
    status: string,
    tag: string,
    id: string,
}

export default function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [hasError, setError] = useState<boolean>(false);
    const [editedId, setEditedId] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [detailsValue, setDetailsValue] = useState<string>("");
    const [tagValue, setTagValue] = useState<string>("none");
    const root = document.getElementById("root");

    const createTodo = (title: string, details: string, tag: string): boolean => {
        if(!title) {
            console.log("ran");
            return false;
        }
        
        deleteTodo(editedId);

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
        setEditedId("");

        todos.length === 0 ? setTodos([newTodo]) : setTodos((prev) => [...prev, newTodo]);

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
            <button 
                onClick={toggleModal}
            >
                Create new task
            </button>
            <div>
                {todos && todos.length > 0
                    ? todos.map((todo) => (
                        <div
                            key={todo.id}
                        >
                            <p>{todo.title}</p>
                            <button onClick={() => {viewDetails(todo)}}>View task details</button>
                            <button onClick={() => {deleteTodo(todo.id)}}>Delete Task</button>
                        </div>
                    ))
                    : <p>No current tasks</p>
                }
            </div>
            {isModalOpen &&
                <div
                    className="flex flex-col w-2xs"
                >
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
                        onChange={(e) => {setTagValue(e.target.value)}}
                    >
                        <option value="none">None</option>
                        <option value="low">Low Priority</option>
                        <option value="mid">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>

                    <button onClick={() => {
                        createTodo(titleValue, detailsValue, tagValue) === false
                        ? setError(true)
                        : closeModal()
                    }}>
                        Confirm
                    </button>
                    <button onClick={() => { closeModal() }}>Close</button>
                    {hasError &&
                        <p>Cannot create task with no title</p>
                    }
                </div>
            }
        </>
    );
}
