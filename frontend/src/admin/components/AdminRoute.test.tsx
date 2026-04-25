import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AdminRoute } from "./AdminRoute";

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    isLoading: true,
  }),
}));

describe("AdminRoute", () => {
  it("shows a loading state while auth is being resolved", () => {
    render(
      <MemoryRouter>
        <AdminRoute>
          <div>Admin content</div>
        </AdminRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText("Проверяем доступ к админке...")).toBeVisible();
    expect(screen.queryByText("Admin content")).not.toBeInTheDocument();
  });
});
