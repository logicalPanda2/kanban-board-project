function isTag(value: string): value is Tag {
	if (
		value === "none" ||
		value === "low" ||
		value === "mid" ||
		value === "high"
	) {
		return true;
	}
	return false;
}

export default function Modal({
	editedId,
	hasError,
	onError,
	titleValue,
	onTitleChange,
	detailsValue,
	onDetailsChange,
	tagValue,
	onTagChange,
	onEdit,
	onCreate,
	onClose,
}: ModalProps) {
	return (
		<div className="flex flex-col w-2xs">
			<p>{editedId ? "Edit a task" : "Create a task"}</p>
			<label htmlFor="titleField">Task Title</label>
			<input
				type="text"
				name="title"
				id="titleField"
				className="border border-solid border-black"
				value={titleValue}
				onChange={(e) => {
					onTitleChange(e.target.value);
				}}
			/>
			<label htmlFor="detailsField">Task Details</label>
			<input
				type="text"
				name="details"
				id="detailsField"
				className="border border-solid border-black"
				value={detailsValue}
				onChange={(e) => {
					onDetailsChange(e.target.value);
				}}
			/>
			<label htmlFor="tagField">Task Tag</label>
			<select
				name="tag"
				id="tagField"
				className="border border-solid border-black"
				value={tagValue}
				onChange={(e) => {
					isTag(e.target.value)
						? onTagChange(e.target.value)
						: onTagChange("none");
				}}
			>
				<option value="none">None</option>
				<option value="low">Low Priority</option>
				<option value="mid">Medium Priority</option>
				<option value="high">High Priority</option>
			</select>

			<button
				onClick={() => {
					editedId
						? !onEdit(
								titleValue,
								detailsValue,
								tagValue,
								editedId,
							)
							? onError(true)
							: onClose()
						: !onCreate(titleValue, detailsValue, tagValue)
							? onError(true)
							: onClose();
				}}
			>
				{editedId ? "Confirm" : "Create"}
			</button>
			<button onClick={onClose}>Close</button>
			{hasError && <p>Title cannot be empty</p>}
		</div>
	);
}
