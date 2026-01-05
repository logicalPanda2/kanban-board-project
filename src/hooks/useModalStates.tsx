import { useState } from "react";

export function useModalStates() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [hasError, setError] = useState<boolean>(false);
    const [editedId, setEditedId] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [detailsValue, setDetailsValue] = useState<string>("");
    const [tagValue, setTagValue] = useState<Tag>("none");
    const [filterValue, setFilterValue] = useState<Tag>("none");

	const closeModal = (): void => {
		setModalOpen(false);
		setTitleValue("");
		setDetailsValue("");
		setTagValue("none");
		setEditedId("");
		setError(false);
	};

    const openModal = (): void => {
        setTitleValue("");
		setDetailsValue("");
		setTagValue("none");
		setEditedId("");
		setError(false);
        setModalOpen(true);
    }

	const viewDetails = (todo: Todo): void => {
		setTitleValue(todo.title);
		setDetailsValue(todo.details);
		setTagValue(todo.tag);
		setEditedId(todo.id);
		setModalOpen(true);
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
        closeModal,
        openModal,
        viewDetails
    };
}