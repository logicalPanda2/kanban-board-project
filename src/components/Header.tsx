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

export default function Header({ onToggle, value, onChange }: HeaderProps) {
	return (
		<header className="flex flex-row flex-nowrap items-center py-4 px-6 sticky top-0 z-10 justify-between bg-green-800 text-white">
			<h1 className="text-4xl font-semibold">Kanban Board</h1>
			<div className="flex flex-row flex-nowrap items-center">
				<button
					onClick={onToggle}
					className="mx-4 py-2 px-4 rounded-lg bg-green-700/75 [box-shadow:0_1px_2px_black] active:bg-green-900/75 active:[box-shadow:inset_0_0_2px_0_black] active:text-gray-200 font-normal hover:bg-green-800/80 transition focus-visible:bg-green-800/80 focus-visible:outline-0"
				>
					Create new task
				</button>
				<div className="flex flex-col ml-8">
					<label htmlFor="filter" className="mb-1 font-medium">
						Filter
					</label>
					<div className="py-1 px-2 rounded-lg active:bg-green-900/75 active:[box-shadow:inset_0_0_2px_0_black] active:text-gray-200 bg-green-700/75 [box-shadow:0_1px_2px_black] font-normal hover:bg-green-800/80 transition focus-within:bg-green-800/80">
						<select
							name="filter"
							id="filter"
							value={value}
							onChange={(e) => {
								isTag(e.target.value)
									? onChange(e.target.value)
									: onChange("none");
							}}
							className="focus-visible:outline-0"
						>
							<option value="none" className="text-black">None</option>
							<option value="low" className="text-black">Low Priority</option>
							<option value="mid" className="text-black">Medium Priority</option>
							<option value="high" className="text-black">High Priority</option>
						</select>
					</div>
				</div>
			</div>
		</header>
	);
}
