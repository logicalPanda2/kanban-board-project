import { useDrag } from "react-dnd"

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

const ItemTypes = {
    TODO: "TODO",
}

export default function TodoCard({todo, onTaskView, onTaskDelete}: Props) {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.TODO,
        item: { id: todo.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    
    return (
        <div
            ref={(node) => {dragRef(node)}}
            className="border border-solid border-black rounded-lg p-4"
            style={{opacity: isDragging ? 0.5 : 1}}
        >
            <p>{todo.title}</p>
            <button onClick={() => {onTaskView(todo)}}>View task details</button>
            <button onClick={() => {onTaskDelete(todo.id)}}>Delete Task</button>
        </div>
    );
}