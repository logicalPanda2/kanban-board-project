import { useEffect, useRef } from "react";

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

export default function TodoModal({
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
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!modalRef.current || !overlayRef.current) return;

        overlayRef.current.classList.add("bg-transparent");
        modalRef.current.classList.add("top-512");
        let timeout = setTimeout(() => {
            if(!modalRef.current || !overlayRef.current) return;

            overlayRef.current.classList.remove("bg-transparent");
            modalRef.current.classList.remove("top-512");
        }, 4);

        return () => {
            clearTimeout(timeout);
        }
    }, [modalRef, overlayRef])

	return (
		<div className="fixed inset-0 z-20 bg-neutral-600/70 flex items-center justify-center transition" ref={overlayRef}>
			<div className="w-lg h-96 rounded-2xl px-6 py-4 bg-gray-100 flex flex-col relative [box-shadow:0_1px_2px_black,inset_0_1px_2px_white] selection:bg-green-800 selection:text-neutral-100 [transition:top_250ms_ease] top-0" ref={modalRef}>
				<p className="text-3xl mb-4">
					{editedId ? "Edit" : "New"}
				</p>
				<div className="flex flex-col w-3/4">
					<label htmlFor="titleField" className="text-xl mb-1">
						Title
					</label>
					<input
						type="text"
						name="title"
						id="titleField"
						className={`[box-shadow:0_1px_2px_black] focus-visible:bg-white hover:bg-white focus-visible:outline-0 bg-neutral-100/50 transition px-2 py-1 rounded-lg ${hasError ? "mb-1" : "mb-2"}`}
						value={titleValue}
						onChange={(e) => {
							onTitleChange(e.target.value);
						}}
					/>
					{hasError && (
						<p className="text-xs mb-1 text-red-600 font-semibold">Title cannot be empty</p>
					)}
					<label htmlFor="detailsField" className="text-xl mb-1">
						Details
					</label>
					<input
						type="text"
						name="details"
						id="detailsField"
						className="[box-shadow:0_1px_2px_black] focus-visible:bg-white hover:bg-white focus-visible:outline-0 bg-neutral-100/50 transition px-2 py-1 rounded-lg mb-2"
						value={detailsValue}
						onChange={(e) => {
							onDetailsChange(e.target.value);
						}}
					/>
					<label htmlFor="tagField" className="text-xl mb-1">
						Tag
					</label>
					<div className="px-2 py-1 [box-shadow:0_1px_2px_black] focus-within:bg-white hover:bg-white focus-within:outline-0 bg-neutral-100/50 transition rounded-lg">
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
					className="absolute px-4 py-1 bottom-6 [box-shadow:0_1px_2px_black] focus-visible:bg-white hover:bg-white focus-visible:outline-0 bg-neutral-100/50 transition rounded-lg"
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
				<div className="absolute top-5 right-6 hover:bg-gray-300 focus-within:bg-gray-300 transition rounded-full focus-within:outline-0">
                    <button onClick={onClose} className="px-3 py-1 transform-[scaleX(1.4)] font-semibold focus-visible:outline-0" aria-label="close">X</button>
                </div>
			</div>
		</div>
	);
}
