import { useState } from "react";

export function useModalStates() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [hasError, setError] = useState<boolean>(false);
    const [editedId, setEditedId] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [detailsValue, setDetailsValue] = useState<string>("");
    const [tagValue, setTagValue] = useState<Tag>("none");
    const [filterValue, setFilterValue] = useState<Tag>("none");

    const root = document.getElementById("root");

	const toggleModal = (): void => {
		if (!root) throw new Error("root element not found");

		[...root.children].forEach((child) => child.toggleAttribute("inert"));
        const newState = !isModalOpen;
		setModalOpen(newState);
	};

	const closeModal = (): void => {
		toggleModal();
		setTitleValue("");
		setDetailsValue("");
		setTagValue("none");
		setEditedId("");
		setError(false);
	};

	const viewDetails = (todo: Todo): void => {
		setTitleValue(todo.title);
		setDetailsValue(todo.details);
		setTagValue(todo.tag);
		setEditedId(todo.id);
		toggleModal();
	};

    return {
        isModalOpen,
        hasError,
        setError,
        editedId,
        titleValue,
        setTitleValue,
        detailsValue,
        setDetailsValue,
        tagValue,
        setTagValue,
        filterValue,
        setFilterValue,
        toggleModal,
        closeModal,
        viewDetails
    };
}