import { useDrop } from "react-dnd";
import TodoCard from "./TodoCard";
import { ItemTypes } from "../types/ItemTypes";

export default function Column({
	title,
	todos,
	status,
	onView,
	onDelete,
	onSetTodos,
}: ColumnProps) {
	const [{ isOver }, dropRef] = useDrop(() => ({
		accept: ItemTypes.TODO,
		drop: (item: { id: string }) => {
			onSetTodos((prev: Todo[]) =>
				prev.map((todo) =>
					todo.id === item.id
						? {
								...todo,
								status: status,
							}
						: todo,
				),
			);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}));

	return (
		<div
			ref={(node) => {
				dropRef(node);
			}}
			className="w-1/3 flex flex-col p-4 gap-4"
			style={{ backgroundColor: isOver ? "#f0f0f0" : undefined }}
		>
			<p className="text-2xl">{title}</p>
			{todos.length > 0 ? (
				todos.map((todo) => (
					<TodoCard
						key={todo.id}
						todo={todo}
						onTaskView={onView}
						onTaskDelete={onDelete}
					/>
				))
			) : (
				<p className="text-center mt-4 text-gray-700">
					No current tasks
				</p>
			)}
		</div>
	);
}
