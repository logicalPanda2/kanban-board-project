import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";
import Header from "./Header";
import { useState } from "react";

function FakeHeader() {
    const [value, setValue] = useState<Tag>("none");

    return (
        <Header
            onToggle={vi.fn()}
            value={value}
            onChange={setValue}
        />
    );
}

describe("Header", () => {
    it("toggles the create new modal", async () => {
        const user = userEvent.setup();
        const onToggle = vi.fn();

        render(
            <Header 
                onToggle={onToggle} 
                value="none"
                onChange={vi.fn()} 
            />
        );

        await user.click(screen.getByRole("button"));

        expect(onToggle).toHaveBeenCalled();
    });

    it("displays a filter value from a given prop", () => {
        render(
            <Header 
                onToggle={vi.fn()} 
                value="none"
                onChange={vi.fn()} 
            />
        );

        expect(screen.getByRole("combobox")).toHaveValue("none");
    });

    it("changes the filter value", async () => {
        const user = userEvent.setup();

        render(<FakeHeader />);

        await user.selectOptions(screen.getByRole("combobox"), "High");

        expect(screen.getByRole("combobox")).toHaveValue("high");
    });
})