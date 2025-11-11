/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const mockServerFetcher = jest.fn();
jest.mock("../src/lib/api", () => ({
  API_ENDPOINTS: {
    USERS: {
      LIST: `${BASE_URL}/users`,
      DETAIL: (id: string) => `${BASE_URL}/users/${id}`,
    },
  },
  serverFetcher: mockServerFetcher,
}));

// ✅ Mock Next.js router and params
const mockParams = { id: "1" };
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// ✅ Mock global fetch (digunakan di serverFetcher)
global.fetch = jest.fn();

// ✅ Mock user data
const mockUser = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "123-456-7890",
  website: "johndoe.com",
  address: {
    street: "123 Main St",
    suite: "Apt 1",
    city: "Anytown",
    zipcode: "12345",
    geo: {
      lat: "40.7128",
      lng: "-74.0060",
    },
  },
  company: {
    name: "Test Company",
    catchPhrase: "Test catchphrase",
    bs: "test business",
  },
};

describe("User Details Page (Task 3)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user details successfully", async () => {
    mockServerFetcher.mockResolvedValue(mockUser);
    const UserDetailPage = require("../src/app/users/[id]/page").default;

    const component = await UserDetailPage({ params: mockParams });
    render(component);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("johndoe.com")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
  });

  it("renders user not found when fetch fails", async () => {
    mockServerFetcher.mockResolvedValue(null);

    const UserDetailPage = require("../src/app/users/[id]/page").default;
    const component = await UserDetailPage({ params: { id: "999" } });
    render(component);

    expect(
      screen.getByText(
        "User not found. The user may have been deleted or the ID is invalid."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Back to Users")).toBeInTheDocument();
  });

  it("displays all contact information correctly", async () => {
    mockServerFetcher.mockResolvedValue(mockUser);
    const UserDetailPage = require("../src/app/users/[id]/page").default;

    const component = await UserDetailPage({ params: mockParams });
    render(component);

    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();

    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(screen.getByText("Apt 1 123 Main St")).toBeInTheDocument();
    expect(screen.getByText("Anytown, 12345")).toBeInTheDocument();
  });

  it("has correct mailto and tel links", async () => {
    mockServerFetcher.mockResolvedValue(mockUser);
    const UserDetailPage = require("../src/app/users/[id]/page").default;

    const component = await UserDetailPage({ params: mockParams });
    render(component);

    const emailLink = screen.getByRole("link", { name: /john@example.com/i });
    expect(emailLink).toHaveAttribute("href", "mailto:john@example.com");

    const phoneLink = screen.getByRole("link", { name: /123-456-7890/i });
    expect(phoneLink).toHaveAttribute("href", "tel:1234567890");

    const websiteLink = screen.getByRole("link", { name: /johndoe.com/i });
    expect(websiteLink).toHaveAttribute("href", "http://johndoe.com");
    expect(websiteLink).toHaveAttribute("target", "_blank");
  });

  it("displays company information correctly", async () => {
    mockServerFetcher.mockResolvedValue(mockUser);
    const UserDetailPage = require("../src/app/users/[id]/page").default;

    const component = await UserDetailPage({ params: mockParams });
    render(component);

    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText(/Test catchphrase/i)).toBeInTheDocument();
    expect(screen.getByText(/test business/i)).toBeInTheDocument();
  });

  it("has navigation back to users list", async () => {
    mockServerFetcher.mockResolvedValue(mockUser);
    const UserDetailPage = require("../src/app/users/[id]/page").default;

    const component = await UserDetailPage({ params: mockParams });
    render(component);

    const backButton = screen.getByRole("link", { name: /back to users/i });
    expect(backButton).toHaveAttribute("href", "/users");
  });
});

describe("User Details Metadata Generation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("generates correct metadata for valid user", async () => {
    mockServerFetcher.mockResolvedValue(mockUser);
    const { generateMetadata } = require("../src/app/users/[id]/page");

    const metadata = await generateMetadata({ params: { id: "1" } });

    expect(metadata.title).toBe("John Doe - User Profile");
    expect(metadata.description).toContain("John Doe");
    expect(metadata.description).toContain("@johndoe");
    expect(metadata.keywords).toContain("John Doe");
    expect(metadata.keywords).toContain("johndoe");
    expect(metadata.keywords).toContain("john@example.com");
  });

  it("generates not found metadata for invalid user", async () => {
    mockServerFetcher.mockResolvedValue(null);
    const { generateMetadata } = require("../src/app/users/[id]/page");

    const metadata = await generateMetadata({ params: { id: "999" } });

    expect(metadata.title).toBe("User Not Found");
    expect(metadata.description).toBe("The requested user could not be found.");
  });
});
