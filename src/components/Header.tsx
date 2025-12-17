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

export default function Header({onToggle, value, onChange}: HeaderProps) {
    return (
        <header className="flex flex-row flex-nowrap items-center py-4 px-6 justify-between">
            <h1 className="text-4xl">Kanban Board</h1>
            <div className="flex flex-row flex-nowrap items-center">
                <button onClick={onToggle} className="mx-4 border border-solid border-black py-2 px-4 rounded-lg">Create new task</button>
                <div className="flex flex-col ml-8">
                    <label htmlFor="filter" className="mb-1">Filter</label>
                    <div className="border border-solid border-black py-1 px-2 rounded-lg focus-within:outline-[1.5px]">
                        <select
                            name="filter"
                            id="filter"
                            value={value}
                            onChange={(e) => {
                                isTag(e.target.value)
                                    ? onChange(e.target.value)
                                    : onChange("none");
                            }}
                            className="focus-visible:outline-0 "
                        >
                            <option value="none">None</option>
                            <option value="low">Low Priority</option>
                            <option value="mid">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
}