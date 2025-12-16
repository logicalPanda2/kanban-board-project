interface Todo {
    title: string,
    details: string,
    status: Status,
    tag: Tag,
    id: string,
}

interface TodoCardProps {
    todo: Todo,
    onTaskView: (todo: Todo) => void,
    onTaskDelete: (id: string) => void,
}

interface ColumnProps {
    title: string,
    todos: Todo[],
    status: Status,
    onView: (todo: Todo) => void,
    onDelete: (id: string) => void,
    onSetTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

type Tag = "none" | "low" | "mid" | "high";
function isTag(value: string): value is Tag {
    if(value === "none" || value === "low" || value === "mid" || value === "high") {
        return true;
    }
    return false;
}

type Status = "todo" | "wip" | "completed";

const ItemTypes = {
    TODO: "TODO",
}