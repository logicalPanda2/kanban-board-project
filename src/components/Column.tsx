import Todo from "./Todo";

interface Props {
    title: string,
    todos: Todo[],
    onView: (todo: Todo) => void,
    onDelete: (id: string) => void,
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

export default function Column({title, todos, onView, onDelete}: Props) {
    return (
        <div className="w-1/3">
            <p>{title}</p>
            {todos && todos.length > 0
                ? todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} onTaskView={onView} onTaskDelete={onDelete}/>
                ))
                : <p>No current tasks</p>
            }
        </div>
    );
}