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

interface ModalProps {
    editedId: string,
    hasError: boolean,
    onError: React.Dispatch<React.SetStateAction<boolean>>,
    titleValue: string,
    onTitleChange: React.Dispatch<React.SetStateAction<string>>,
    detailsValue: string,
    onDetailsChange: React.Dispatch<React.SetStateAction<string>>,
    tagValue: Tag,
    onTagChange: React.Dispatch<React.SetStateAction<Tag>>,
    onEdit: (title: string, details: string, tag: Tag, targetId: string) => boolean,
    onCreate: (title: string, details: string, tag: Tag) => boolean,
    onClose: () => void,
}

type Tag = "none" | "low" | "mid" | "high";
function isTag(value: string): value is Tag {
    if(value === "none" || value === "low" || value === "mid" || value === "high") {
        return true;
    }
    return false;
}

type Status = "todo" | "wip" | "completed";