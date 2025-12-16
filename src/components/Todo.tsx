interface Props {
    todo: Todo,
    onTaskView: (todo: Todo) => void,
    onTaskDelete: (id: string) => void,
}

type Status = "todo" | "wip" | "completed";
type Tag = "none" | "low" | "mid" | "high";

interface Todo {
    title: string,
    details: string,
    status: Status,
    tag: Tag,
    id: string,
}

export default function Todo({todo, onTaskView, onTaskDelete}: Props) {
    
    return (
        <div
            className="border border-solid border-black rounded-lg p-4"
        >
            <p>{todo.title}</p>
            <button onClick={() => {onTaskView(todo)}}>View task details</button>
            <button onClick={() => {onTaskDelete(todo.id)}}>Delete Task</button>
        </div>
    );
}