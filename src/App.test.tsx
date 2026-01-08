import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("displays the welcome modal on first visit", () => {
        const root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);

        render(<App />, {container: root});

        expect(screen.getByText("Welcome!")).toBeInTheDocument();
    });

    it("displays the create/edit modal", async () => {
        const user = userEvent.setup();
        const root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);

        render(<App />, {container: root});

        await user.click(screen.getByText("New task"));

        expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("sets inert on other elements if the welcome modal is open", () => {
        const root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);

        render(<App />, {container: root});

        const inertElements = [...root.children].filter(el => el.hasAttribute("inert"));

        expect(inertElements.length).toBe(2); // header + main
    });

    it("sets inert on other elements if the create/edit modal is open", async () => {
        const user = userEvent.setup();
        const root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);

        render(<App />, {container: root});

        await user.click(screen.getByText("X"));
        await user.click(screen.getByText("New task"));

        const inertElements = [...root.children].filter(el => el.hasAttribute("inert"));

        expect(inertElements.length).toBe(2); // header + main
    });

    it("removes inert when a modal is closed", async () => {
        const user = userEvent.setup();
        const root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);

        render(<App />, {container: root});

        await user.click(screen.getByText("X"));

        const inertElements = [...root.children].filter(el => el.hasAttribute("inert"));

        expect(inertElements.length).toBe(0);
    });
})