import { render, screen } from "@testing-library/react";
import WelcomeModal from "./WelcomeModal";
import userEvent from "@testing-library/user-event";

describe("WelcomeModal", () => {
    it("closes the modal", async () => {
        const onClose = vi.fn();
        const user = userEvent.setup();

        render(<WelcomeModal onClose={onClose} />);

        await user.click(screen.getByRole("button"));

        expect(onClose).toHaveBeenCalled();
    });
})