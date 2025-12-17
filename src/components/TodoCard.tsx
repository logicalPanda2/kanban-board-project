import { useDrag } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";

export default function TodoCard({
	todo,
	onTaskView,
	onTaskDelete,
}: TodoCardProps) {
	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: ItemTypes.TODO,
		item: { id: todo.id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={(node) => {
				dragRef(node);
			}}
			className="border border-solid border-black rounded-lg p-4"
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			<p className="text-xl mb-2">{todo.title}</p>
            <div className="flex flex-row flex-nowrap justify-between items-center">
                 <button
                    onClick={() => {
                        onTaskView(todo);
                    }}
                >
                    View details...
                </button>
                <button
                    onClick={() => {
                        onTaskDelete(todo.id);
                    }}
                >
                    Delete
                </button>
            </div>
		</div>
	);
}
