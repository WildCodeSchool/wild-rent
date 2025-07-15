import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "../pages/Login";

// Pour la doc se référer au fichier Register.test.tsx

const loginMutationMock = vi
  .fn()
  .mockImplementation(({ variables, onCompleted }) => {
    console.log(variables);
    onCompleted?.();
  });

const useNavigateMock = vi.fn();
vi.mock("../generated/graphql-types.ts", () => ({
  //
  useLoginMutation: () => [loginMutationMock],
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => useNavigateMock, //
}));

test("displays the login page", async () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Mot de passe");
  const submitButton = screen.getByRole("button", { name: "Se connecter" });

  fireEvent.change(emailInput, { target: { value: "email@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(useNavigateMock).toHaveBeenCalledWith("/");
    expect(loginMutationMock).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { data: { email: "email@gmail.com", password: "password" } },
      })
    );
  });
});
