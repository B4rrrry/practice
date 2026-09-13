import { beforeEach, describe, expect, test, vi } from "vitest";
import UsersPage from "./UsersPage";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import TestWrapper from "../../tests/utils";
import { fetchUsers } from "../../api/users";

vi.mock(import("../../api/users"), () => ({
  fetchUsers: vi.fn(),
}));

describe("tests UsersPage", () => {
  beforeEach(() => {
    vi.mocked(fetchUsers).mockReset();
  });

  test("first Test users load", async () => {
    vi.mocked(fetchUsers).mockResolvedValue([
      {
        id: "1",
        name: "Alex",
        email: "alex@test.com",
        role: "admin",
        status: "active",
      },
    ]);
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>,
    );

    const preloader = screen.getByTestId("preloader-page");
    expect(preloader).toBeInTheDocument();
    const emptyUsers = screen.queryByText("Empty users");
    expect(emptyUsers).not.toBeInTheDocument();
    const usersTable = await screen.findByTestId("users-table");
    expect(usersTable).toBeInTheDocument();
    expect(usersTable).toHaveTextContent("Alex");
    expect(usersTable).toHaveTextContent("alex@test.com");
    expect(screen.queryByTestId("preloader-page")).not.toBeInTheDocument();
  });
  ("");

  test("empty users", async () => {
    vi.mocked(fetchUsers).mockResolvedValue([]);

    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>,
    );

    const preloader = await waitForElementToBeRemoved(
      screen.getByTestId("preloader-page"),
    );

    const usersTable = screen.queryByTestId("users-table");
    expect(usersTable).not.toBeInTheDocument();
    const emptyUsersText = screen.getByText("Empty users");
    expect(emptyUsersText).toBeInTheDocument();
    /*  const preloader = screen.getByTestId('preloader-page');
    expect(preloader).toBeInTheDocument()
    const usersTable =  screen.queryByTestId('users-table');
    expect(usersTable).not.toBeInTheDocument();
    const emptyUsersText = await screen.findByText('Empty users');
    expect(emptyUsersText).toBeInTheDocument(); */
  });

  test("error fetchUsers", async () => {
    vi.mocked(fetchUsers).mockRejectedValue(new Error("Error"));

    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>,
    );

    const preloader = screen.queryByTestId('preloader-page')
    expect(preloader).toBeInTheDocument()

    const errorText = await screen.findByText('Error')
    expect(errorText).toBeInTheDocument();
    expect(screen.queryByTestId("preloader-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("users-table")).not.toBeInTheDocument();
    

  });
});
