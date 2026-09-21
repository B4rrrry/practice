import { beforeEach, describe, expect, test, vi } from "vitest";
import UsersPage from "./UsersPage";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import TestWrapper from "../../tests/utils";
import { fetchUserById, fetchUsers } from "../../api/users";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import UserPage from "../UserPage/UserPage";
import { ErrorBoundary } from "../../components/ErrorBoundary/ErrorBoundary";

vi.mock(import("../../api/users"), () => ({
  fetchUsers: vi.fn(),
  fetchUserById: vi.fn(),
}));

describe("tests UsersPage", () => {
  beforeEach(() => {
    vi.mocked(fetchUsers).mockReset();
    vi.mocked(fetchUserById).mockReset();
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
        <MemoryRouter initialEntries={["/users"]}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </MemoryRouter>
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

  test("empty users", async () => {
    vi.mocked(fetchUsers).mockResolvedValue([]);

    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/users"]}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>,
    );

    await waitForElementToBeRemoved(
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
        <MemoryRouter initialEntries={["/users"]}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>,
    );

    const preloader = screen.queryByTestId("preloader-page");
    expect(preloader).toBeInTheDocument();

    const errorText = await screen.findByText("Error");
    expect(errorText).toBeInTheDocument();
    expect(screen.queryByTestId("preloader-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("users-table")).not.toBeInTheDocument();
  });

  test("search Users", async () => {
    vi.mocked(fetchUsers).mockResolvedValue([
      {
        id: "1",
        name: "Alex",
        email: "alex@test.com",
        role: "admin",
        status: "active",
      },
    ]);
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/users"]}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>,
    );
    const users = await screen.findByText("Alex");
    expect(users).toHaveTextContent("Alex");
    const searchInput = screen.getByPlaceholderText("Search...");
    await user.type(searchInput, "dima");

    expect(searchInput).toHaveValue("dima");
    expect(screen.queryByText("Alex")).not.toBeInTheDocument();
  });

  test("filter in status Active", async () => {
    vi.mocked(fetchUsers).mockResolvedValue([
      {
        id: "1",
        name: "Alex",
        email: "alex@test.com",
        role: "admin",
        status: "blocked",
      },
      {
        id: "2",
        name: "Dima",
        email: "dima@test.com",
        role: "admin",
        status: "active",
      },
    ]);

    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/users"]}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>,
    );

    await waitForElementToBeRemoved(screen.getByTestId("preloader-page"));
    expect(screen.getByText("Alex")).toBeInTheDocument();
    const activeBtn = screen.getByText("Active");
    await userEvent.click(activeBtn);
    expect(screen.queryByText("Alex")).not.toBeInTheDocument();
    expect(screen.getByText("Dima")).toBeInTheDocument();
  });

  test("test view user", async () => {
    const user = userEvent.setup();

    vi.mocked(fetchUsers).mockResolvedValue([
      {
        id: "2",
        name: "Dima",
        email: "dima@test.com",
        role: "admin",
        status: "active",
      },
    ]);
    vi.mocked(fetchUserById).mockResolvedValue({
      id: "2",
      name: "Dima",
      email: "dima@test.com",
      role: "admin",
      status: "active",
    });

    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/users"]}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>,
    );

    await waitForElementToBeRemoved(screen.getByTestId("preloader-page"));
    expect(screen.getByTestId("users-table")).toBeInTheDocument();
    expect(screen.getByText("Dima")).toBeInTheDocument();

    const viewBtn = await screen.findByRole("link", { name: "View" });

    await user.click(viewBtn);

    expect(await screen.findByText("Information")).toBeInTheDocument();
    expect(screen.getByText("Dima")).toBeInTheDocument();
    expect(screen.queryByTestId("users-table")).not.toBeInTheDocument();
    expect(fetchUserById).toHaveBeenCalledWith("2");
  });

  test("sort users in table", async () => {
    vi.mocked(fetchUsers).mockResolvedValue([
      {
        id: "1",
        name: "Alex",
        email: "alex@test.com",
        role: "admin",
        status: "active",
      },
      {
        id: "2",
        name: "Dima",
        email: "dima@test.com",
        role: "admin",
        status: "active",
      },
    ]);
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <MemoryRouter initialEntries={["/users"]}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>,
    );

    await waitForElementToBeRemoved(screen.getByTestId("preloader-page"));
    expect(screen.getByTestId("users-table")).toBeInTheDocument();

    const sortBtnDesc = screen.getByText("Я - А");
    await user.click(sortBtnDesc);

    const sortUsersDesc = screen.getAllByTestId("table-row");
    expect(sortUsersDesc).toHaveLength(2);
    expect(sortUsersDesc[0]).toHaveTextContent("Dima");
    expect(sortUsersDesc[1]).toHaveTextContent("Alex");

    const sortBtnAsc = screen.getByText("А - Я");
    await user.click(sortBtnAsc);

    const sortUsersAsc = screen.getAllByTestId("table-row");
    expect(sortUsersAsc).toHaveLength(2);
    expect(sortUsersAsc[0]).toHaveTextContent("Alex");
    expect(sortUsersAsc[1]).toHaveTextContent("Dima");
  });

  test("error boundary", () => {
    const BrokenComponent = () => {
      throw new Error("Error");
    };

    render(
      <ErrorBoundary fallback="Error">
        <BrokenComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Error')).toBeInTheDocument()
  });
});
