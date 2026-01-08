import { render, screen } from "@testing-library/react";
import TodoModal from "./TodoModal";
import { useModalStates } from "../hooks/useModalStates";
import { useTodos } from "../hooks/useTodos";
import { useEffect } from "react";
import userEvent from "@testing-library/user-event";

function FakeTodoModal() {
    const {
        editedId,
        titleValue,
        setTitleValue,
        detailsValue,
        setDetailsValue,
        tagValue,
        setTagValue,
        closeModal,
        hasError,
        setError,
    } = useModalStates();
    const {
        editTodo,
        createTodo,
        deleteTodo,
    } = useTodos("todos");
    const modalId = "1";

    useEffect(() => {
        setTitleValue("example title");
    }, []);

    useEffect(() => {
        setDetailsValue("example details");
    }, []);

    return (
        <TodoModal
            editedId={editedId}
            titleValue={titleValue}
            onTitleChange={setTitleValue}
            detailsValue={detailsValue}
            onDetailsChange={setDetailsValue}
            tagValue={tagValue}
            onTagChange={setTagValue}
            onEdit={editTodo}
            onCreate={createTodo}
            onClose={closeModal}
            hasError={hasError}
            onError={setError}
            onTaskDelete={deleteTodo}
            id={modalId}
        />
    );
}

describe("TodoModal", () => {
    it("displays the title value from a given prop", () => {
        render(<FakeTodoModal />);

        expect(screen.getByRole("textbox", {name: "Title"})).toHaveValue("example title");
    });

    it("changes the title value", async () => {
        const user = userEvent.setup();

        render(<FakeTodoModal />);

        await user.type(screen.getByRole("textbox", {name: "Title"}), "Hello");

        expect(screen.getByRole("textbox", {name: "Title"})).toHaveValue("example titleHello");
    });

    it("displays the details value from a given prop", () => {
        render(<FakeTodoModal />);

        expect(screen.getByRole("textbox", {name: "Details"})).toHaveValue("example details");
    });

    it("changes the details value", async () => {
        const user = userEvent.setup();

        render(<FakeTodoModal />);

        await user.type(screen.getByRole("textbox", {name: "Details"}), "Hello");

        expect(screen.getByRole("textbox", {name: "Details"})).toHaveValue("example detailsHello");
    });

    it("displays the tag value from a given prop", () => {
        render(<FakeTodoModal />);

        expect(screen.getByRole("combobox", {name: "Tag"})).toHaveValue("none");
    });

    it("changes the tag value", async () => {
        const user = userEvent.setup();
        render(<FakeTodoModal />);

        await user.selectOptions(screen.getByRole("combobox", {name: "Tag"}), "High");

        expect(screen.getByRole("combobox", {name: "Tag"})).toHaveValue("high");
    });

    it("creates a task", async () => {
        const onCreate = vi.fn();
        const user = userEvent.setup();

        render(<TodoModal
            editedId=""
            titleValue=""
            onTitleChange={vi.fn()}
            detailsValue=""
            onDetailsChange={vi.fn()}
            tagValue="none"
            onTagChange={vi.fn()}
            onEdit={vi.fn()}
            onCreate={onCreate}
            onClose={vi.fn()}
            hasError={false}
            onError={vi.fn()}
            onTaskDelete={vi.fn()}
            id="1"
        />);

        await user.click(screen.getByText("Create"));

        expect(onCreate).toHaveBeenCalled();
    });

    it("edits a task", async () => {
        const onEdit = vi.fn();
        const user = userEvent.setup();

        render(<TodoModal
            editedId="something"
            titleValue=""
            onTitleChange={vi.fn()}
            detailsValue=""
            onDetailsChange={vi.fn()}
            tagValue="none"
            onTagChange={vi.fn()}
            onEdit={onEdit}
            onCreate={vi.fn()}
            onClose={vi.fn()}
            hasError={false}
            onError={vi.fn()}
            onTaskDelete={vi.fn()}
            id="1"
        />);

        await user.click(screen.getByText("Confirm"));

        expect(onEdit).toHaveBeenCalled();
    });

    it("sets an error when given a false return value", async () => {
        const onCreate = () => {
            return false;
        };
        const onError = vi.fn();
        const user = userEvent.setup();

        render(<TodoModal
            editedId=""
            titleValue=""
            onTitleChange={vi.fn()}
            detailsValue=""
            onDetailsChange={vi.fn()}
            tagValue="none"
            onTagChange={vi.fn()}
            onEdit={vi.fn()}
            onCreate={onCreate}
            onClose={vi.fn()}
            hasError={false}
            onError={onError}
            onTaskDelete={vi.fn()}
            id="1"
        />);

        await user.click(screen.getByText("Create"));

        expect(onError).toHaveBeenCalled();
    });

    it("displays an error", async () => {
        const user = userEvent.setup();

        render(<FakeTodoModal />);

        await user.clear(screen.getByRole("textbox", {name: "Title"}));

        await user.click(screen.getByText("Create"));

        expect(screen.getByText("Title cannot be empty")).toBeInTheDocument();
    });

    it("displays the 'delete' button if editedId is a string", () => {
        render(<TodoModal
            editedId="any string"
            titleValue=""
            onTitleChange={vi.fn()}
            detailsValue=""
            onDetailsChange={vi.fn()}
            tagValue="none"
            onTagChange={vi.fn()}
            onEdit={vi.fn()}
            onCreate={vi.fn()}
            onClose={vi.fn()}
            hasError={false}
            onError={vi.fn()}
            onTaskDelete={vi.fn()}
            id="1"
        />);

        expect(screen.getByRole("button", {name: "Delete"})).toBeInTheDocument();
    });

    it("closes the modal", async () => {
        const onClose = vi.fn();
        const user = userEvent.setup();

        render(<TodoModal
            editedId=""
            titleValue=""
            onTitleChange={vi.fn()}
            detailsValue=""
            onDetailsChange={vi.fn()}
            tagValue="none"
            onTagChange={vi.fn()}
            onEdit={vi.fn()}
            onCreate={vi.fn()}
            onClose={onClose}
            hasError={false}
            onError={vi.fn()}
            onTaskDelete={vi.fn()}
            id="1"
        />);

        await user.click(screen.getByText("X"));

        expect(onClose).toHaveBeenCalled();
    });

    it("resets errors upon closing", async () => {
        const user = userEvent.setup();

        render(<FakeTodoModal />);

        await user.clear(screen.getByRole("textbox", {name: "Title"}));

        await user.click(screen.getByText("Create"));

        expect(screen.getByText("Title cannot be empty")).toBeInTheDocument();

        await user.click(screen.getByText("X"));

        expect(screen.queryByText("Title cannot be empty")).toBe(null);
    });
})