import { useDrop } from "react-dnd";
import TodoCard from "./TodoCard";

interface Props {
    title: string,
    todos: Todo[],
    status: Status,
    onView: (todo: Todo) => void,
    onDelete: (id: string) => void,
    onSetTodos: React.Dispatch<React.SetStateAction<Todo[]>>
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

const ItemTypes = {
    TODO: "TODO",
}

export default function Column({title, todos, status, onView, onDelete, onSetTodos}: Props) {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: ItemTypes.TODO,
        drop: (item: { id: string }) => {
            onSetTodos((prev: Todo[]) =>
                prev.map((todo) =>
                    todo.id === item.id
                        ? { 
                            ...todo, 
                            status: status 
                        }
                        : todo
                )
            );
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={(node) => {dropRef(node)}} 
            className="w-1/3"
            style={{ backgroundColor: isOver ? "#f0f0f0" : undefined }}
        >
            <p>{title}</p>
            {todos && todos.length > 0
                ? todos.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} onTaskView={onView} onTaskDelete={onDelete}/>
                ))
                : <p>No current tasks</p>
            }
        </div>
    );
}