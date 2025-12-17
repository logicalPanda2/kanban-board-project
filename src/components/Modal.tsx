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
		<div className="fixed inset-0 bg-gray-500/70 flex items-center justify-center">
			<div className="w-lg h-96 rounded-2xl px-6 py-4 bg-white flex flex-col relative">
				<p className="text-3xl mb-4">
					{editedId ? "Edit a task" : "Create a task"}
				</p>
				<div className="flex flex-col w-3/4">
					<label htmlFor="titleField" className="text-xl mb-1">
						Title
					</label>
					<input
						type="text"
						name="title"
						id="titleField"
						className={`border border-solid border-black px-2 py-1 rounded-lg ${hasError ? "mb-1" : "mb-2"}`}
						value={titleValue}
						onChange={(e) => {
							onTitleChange(e.target.value);
						}}
					/>
					{hasError && (
						<p className="text-xs mb-1">Title cannot be empty</p>
					)}
					<label htmlFor="detailsField" className="text-xl mb-1">
						Details
					</label>
					<input
						type="text"
						name="details"
						id="detailsField"
						className="border border-solid border-black px-2 py-1 rounded-lg mb-2"
						value={detailsValue}
						onChange={(e) => {
							onDetailsChange(e.target.value);
						}}
					/>
					<label htmlFor="tagField" className="text-xl mb-1">
						Tag
					</label>
					<div className="px-2 py-1 border border-solid border-black rounded-lg focus-within:outline-[1.5px]">
						<select
							name="tag"
							id="tagField"
							className="focus-visible:outline-0 w-full"
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
					</div>
				</div>
				<button
					className="absolute px-4 py-1 bottom-6 border border-solid border-blackr rounded-lg"
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
				<button onClick={onClose} className="absolute top-5 right-6">
					X
				</button>
			</div>
		</div>
	);
}
