interface Todo {
	title: string;
	details: string;
	status: Status;
	tag: Tag;
	id: string;
}

interface TodoCardProps {
	todo: Todo;
	onTaskView: (todo: Todo) => void;
    onTaskChangeStatus: (todo: Todo, key: "left" | "right") => void; 
}

interface ColumnProps {
	title: string;
	todos: Todo[];
	status: Status;
	onView: (todo: Todo) => void;
	onSetTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    onChangeStatus: (todo: Todo, key: "left" | "right") => void;
}

interface ModalProps {
	editedId: string;
	hasError: boolean;
	onError: React.Dispatch<React.SetStateAction<boolean>>;
	titleValue: string;
	onTitleChange: React.Dispatch<React.SetStateAction<string>>;
	detailsValue: string;
	onDetailsChange: React.Dispatch<React.SetStateAction<string>>;
	tagValue: Tag;
	onTagChange: React.Dispatch<React.SetStateAction<Tag>>;
	onEdit: (
		title: string,
		details: string,
		tag: Tag,
		targetId: string,
	) => boolean;
	onCreate: (title: string, details: string, tag: Tag) => boolean;
	onClose: () => void;
    onTaskDelete: (id: string) => void;
}

interface WelcomeModalProps {
    onClose: () => void;
}

interface HeaderProps {
	onToggle: () => void;
	value: Tag;
	onChange: React.Dispatch<React.SetStateAction<Tag>>;
}

type Tag = "none" | "low" | "mid" | "high";
type Status = "todo" | "wip" | "completed";
