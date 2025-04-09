import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AdminNavbar } from "../components/AdminNavbar";

describe("AdminNavbar", () => {
  const renderNavbar = () =>
    render(
      <MemoryRouter>
        <AdminNavbar />
      </MemoryRouter>
    );

  it("renders the AdminNavbar component correctly", () => {
    renderNavbar();
    expect(
      screen.getByRole("img", { name: "Wild Rent logo" })
    ).toBeInTheDocument();
  });

  it('displays the text "Wild Rent" when isOpen is true', () => {
    renderNavbar();
    expect(
      screen.getByRole("heading", { name: "Wild Rent" })
    ).toBeInTheDocument();
  });

  it("toggles the menu when clicking the button", () => {
    renderNavbar();
    const toggleButton = screen.getByRole("button");

    expect(screen.getByText("Wild Rent")).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.queryByText("Wild Rent")).not.toBeInTheDocument();
  });

  it("displays all navigation links when the menu is open", () => {
    renderNavbar();
    expect(screen.getByText("🏠 Accueil")).toBeInTheDocument();
    expect(screen.getByText("📂 Catégorie")).toBeInTheDocument();
    expect(screen.getByText("📝 Article")).toBeInTheDocument();
    expect(screen.getByText("📦 Commandes")).toBeInTheDocument();
    expect(screen.getByText("📊 Inventaire")).toBeInTheDocument();
    expect(screen.getByText("👤 Mon compte")).toBeInTheDocument();
    expect(screen.getByText("🚪 Déconnexion")).toBeInTheDocument();
  });
});
