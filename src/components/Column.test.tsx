import { render, screen } from "@testing-library/react";
import Column from "./Column";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

describe("Column", () => {
    it("renders a given title", () => {
        const title = "example title"

        render(
            <DndProvider backend={HTML5Backend}>
                <Column
                    title={title}
                    todos={[]}
                    status="todo"
                    onChangeStatus={vi.fn()}
                    onSetTodos={vi.fn()}
                    onView={vi.fn()}
                />
            </DndProvider>
        );

        expect(screen.getByText(title)).toBeInTheDocument();
    });

    it("renders each TodoCard from an array of todos", () => {
        const mockTodoArr: Todo[] = [
            {
                title: "todo title",
                status: "todo",
                details: "no details",
                tag: "none",
                id: "string",
            }
        ]

        render(
            <DndProvider backend={HTML5Backend}>
                <Column
                    title="example"
                    todos={mockTodoArr}
                    status="todo"
                    onChangeStatus={vi.fn()}
                    onSetTodos={vi.fn()}
                    onView={vi.fn()}
                />
            </DndProvider>
        );

        expect(screen.getByText(mockTodoArr[0].title)).toBeInTheDocument();
    });

    it("renders a fallback when given an empty array", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <Column
                    title="example"
                    todos={[]}
                    status="todo"
                    onChangeStatus={vi.fn()}
                    onSetTodos={vi.fn()}
                    onView={vi.fn()}
                />
            </DndProvider>
        );

        expect(screen.getByText("No current tasks")).toBeInTheDocument();
    });
})