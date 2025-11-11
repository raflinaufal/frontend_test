/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock API configuration
jest.mock("../src/lib/api", () => ({
  API_ENDPOINTS: {
    USERS: {
      LIST: "https://jsonplaceholder.typicode.com/users",
      DETAIL: (id: string) =>
        `https://jsonplaceholder.typicode.com/users/${id}`,
    },
  },
  fetcher: jest.fn(),
}));

// Mock SWR
jest.mock("swr", () => {
  return jest.fn();
});

const mockSWR = require("swr") as jest.Mock;

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    website: "johndoe.com",
    phone: "123-456-7890",
    address: {
      street: "123 Main St",
      suite: "Apt 1",
      city: "Anytown",
      zipcode: "12345",
      geo: { lat: "0", lng: "0" },
    },
    company: {
      name: "Test Company",
      catchPhrase: "Test phrase",
      bs: "test business",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    website: "janesmith.com",
    phone: "098-765-4321",
    address: {
      street: "456 Oak Ave",
      suite: "Suite 2",
      city: "Other City",
      zipcode: "67890",
      geo: { lat: "1", lng: "1" },
    },
    company: {
      name: "Another Company",
      catchPhrase: "Another phrase",
      bs: "another business",
    },
  },
];

describe("Users Page Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    mockSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    // Import component dynamically to avoid module loading issues
    const UsersPage = require("../src/app/users/page").default;
    render(<UsersPage />);

    expect(screen.getByText("Users Directory")).toBeInTheDocument();
    expect(
      screen.getByText("Browse, search, and filter through our user database")
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockSWR.mockReturnValue({
      data: undefined,
      error: new Error("Failed to fetch"),
      isLoading: false,
    });

    const UsersPage = require("../src/app/users/page").default;
    render(<UsersPage />);

    expect(
      screen.getByText("Failed to load users. Please try again later.")
    ).toBeInTheDocument();
  });

  it("renders users data successfully", () => {
    mockSWR.mockReturnValue({
      data: mockUsers,
      error: undefined,
      isLoading: false,
    });

    const UsersPage = require("../src/app/users/page").default;
    render(<UsersPage />);

    // Use getAllByText to handle multiple instances (desktop + mobile)
    expect(screen.getAllByText("John Doe")).toHaveLength(2); // Desktop table + mobile card
    expect(screen.getAllByText("Jane Smith")).toHaveLength(2);
    expect(screen.getAllByText("john@example.com")).toHaveLength(2);
    expect(screen.getAllByText("jane@example.com")).toHaveLength(2);
  });

  it("filters users based on search input", async () => {
    const user = userEvent.setup();

    mockSWR.mockReturnValue({
      data: mockUsers,
      error: undefined,
      isLoading: false,
    });

    const UsersPage = require("../src/app/users/page").default;
    render(<UsersPage />);

    // Find search input
    const searchInput = screen.getByPlaceholderText(
      "Search users by name, email, or website..."
    );

    // Type in search input
    await user.type(searchInput, "John");

    // John should be visible (multiple instances for responsive design), Jane should not
    expect(screen.getAllByText("John Doe")).toHaveLength(2); // Desktop + mobile
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("shows no results message when search yields no matches", async () => {
    const user = userEvent.setup();

    mockSWR.mockReturnValue({
      data: mockUsers,
      error: undefined,
      isLoading: false,
    });

    const UsersPage = require("../src/app/users/page").default;
    render(<UsersPage />);

    const searchInput = screen.getByPlaceholderText(
      "Search users by name, email, or website..."
    );
    await user.type(searchInput, "NonExistentUser");

    expect(
      screen.getByText("No users found matching your search.")
    ).toBeInTheDocument();
  });
});
