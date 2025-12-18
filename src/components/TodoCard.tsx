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
			className="rounded-lg px-4 py-3 bg-gray-100 [box-shadow:0_1px_1.5px_black,inset_0_1px_2px_white] relative"
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			<p className="text-xl mb-2 text-left px-2 pt-1  wrap-break-word">{todo.title}</p>
			<div className="flex flex-row flex-nowrap justify-between items-center">
				<button
					onClick={() => {
						onTaskView(todo);
					}}
                    className="text-gray-700 px-2 py-1 rounded-lg focus-visible:bg-gray-300 hover:bg-gray-300 hover:text-black focus-visible:text-black focus-visible:outline-0 transition"
				>
					View details...
				</button>
				<button
					onClick={() => {
						onTaskDelete(todo.id);
					}}
                    className="text-red-500 hover:text-red-700 focus-visible:text-red-700 focus-visible:bg-red-200 hover:bg-red-200 px-2 py-1 rounded-lg focus-visible:outline-0 transition"
				>
					Delete
				</button>
                <div className={`absolute w-3 h-3 rounded-full top-2 right-2 border border-solid border-gray-800
                    ${
                        todo.tag === "none"
                        ? "bg-white"
                        : todo.tag === "low"
                        ? "bg-green-500"
                        : todo.tag === "mid"
                        ? "bg-amber-500"
                        : todo.tag === "high"
                        ? "bg-red-500"
                        : "bg-white"
                    }`}>    
                </div>
			</div>
		</div>
	);
}
