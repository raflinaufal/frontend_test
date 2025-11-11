"use client";

import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Users } from "lucide-react";
import { API_ENDPOINTS, fetcher } from "@/lib/api";
import type { User } from "@/lib/types";
import UsersErrorBoundary from "@/components/error/UsersErrorBoundary";
import Pagination from "@/components/ui/pagination";

type SortConfig = {
  key: keyof Pick<User, "name" | "email" | "website">;
  direction: "asc" | "desc";
} | null;

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const {
    data: users,
    error,
    isLoading,
  } = useSWR<User[]>(API_ENDPOINTS.USERS.LIST, fetcher);

  // 🔍 Filtering & sorting logic
  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.website.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig) {
      filtered = filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, sortConfig]);

  // 📄 Pagination logic
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedUsers.slice(startIndex, endIndex);
  }, [filteredAndSortedUsers, currentPage, itemsPerPage]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  // 🔽 Sorting handler
  const handleSort = (key: keyof Pick<User, "name" | "email" | "website">) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key: keyof Pick<User, "name" | "email" | "website">) => {
    if (sortConfig?.key !== key)
      return <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />;
    if (sortConfig.direction === "asc")
      return <ArrowUp className="ml-1 h-4 w-4 text-primary" />;
    return <ArrowDown className="ml-1 h-4 w-4 text-primary" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-10 px-4 flex justify-center">
      <Card className="w-full max-w-6xl shadow-lg border-primary/10 bg-card">
        <CardHeader className="space-y-2 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-primary">
                Users Directory
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Browse, search, and filter through our user database
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
            <Input
              placeholder="Search users by name, email, or website..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-primary/20 focus:border-primary focus:ring-primary/30"
            />
          </div>

          {/* ⚠️ Error */}
          {error && (
            <Alert variant="destructive" className="max-w-md">
              <AlertDescription>
                Failed to load users. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {/* ⏳ Loading */}
          {isLoading && (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          )}

          {/* 🧾 Users Table / Cards */}
          {!isLoading && !error && (
            <>
              {filteredAndSortedUsers.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? "No users found matching your search."
                      : "No users available."}
                  </p>
                  {searchTerm && (
                    <Button
                      variant="outline"
                      onClick={() => setSearchTerm("")}
                      className="mt-2 border-primary/30 text-primary hover:bg-primary/10"
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  {/* 🖥 Desktop Table */}
                  <div className="hidden md:block rounded-lg border border-primary/10 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-primary/5 hover:bg-primary/5">
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => handleSort("name")}
                              className="h-auto p-0 font-semibold text-primary hover:bg-transparent hover:text-primary/80"
                            >
                              Name {getSortIcon("name")}
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => handleSort("email")}
                              className="h-auto p-0 font-semibold text-primary hover:bg-transparent hover:text-primary/80"
                            >
                              Email {getSortIcon("email")}
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => handleSort("website")}
                              className="h-auto p-0 font-semibold text-primary hover:bg-transparent hover:text-primary/80"
                            >
                              Website {getSortIcon("website")}
                            </Button>
                          </TableHead>
                          <TableHead className="text-primary font-semibold">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedUsers.map((user) => (
                          <TableRow
                            key={user.id}
                            className="hover:bg-primary/5 transition-colors"
                          >
                            <TableCell>
                              <div>
                                <div className="font-semibold text-foreground">
                                  {user.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  @{user.username}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <a
                                href={`mailto:${user.email}`}
                                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                              >
                                {user.email}
                              </a>
                            </TableCell>
                            <TableCell>
                              <a
                                href={`http://${user.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                              >
                                {user.website}
                              </a>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 bg-transparent"
                              >
                                <a href={`/users/${user.id}`}>View Details</a>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* 📱 Mobile Card View */}
                  <div className="md:hidden grid gap-4">
                    {paginatedUsers.map((user) => (
                      <Card
                        key={user.id}
                        className="shadow-md border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all"
                      >
                        <div className="p-4 space-y-4">
                          <div className="border-l-4 border-primary pl-3">
                            <h3 className="font-semibold text-lg text-foreground">
                              {user.name}
                            </h3>
                            <p className="text-sm text-primary/70">
                              @{user.username}
                            </p>
                          </div>

                          <div className="space-y-2 text-sm bg-primary/5 p-3 rounded-lg">
                            <p>
                              <span className="text-muted-foreground font-medium">
                                Email:
                              </span>{" "}
                              <a
                                href={`mailto:${user.email}`}
                                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                              >
                                {user.email}
                              </a>
                            </p>
                            <p>
                              <span className="text-muted-foreground font-medium">
                                Website:
                              </span>{" "}
                              <a
                                href={`http://${user.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                              >
                                {user.website}
                              </a>
                            </p>
                          </div>

                          <Button
                            asChild
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
                          >
                            <a href={`/users/${user.id}`}>View Details</a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {/* 📄 Pagination */}
              {filteredAndSortedUsers.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredAndSortedUsers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={(newItemsPerPage) => {
                    setItemsPerPage(newItemsPerPage);
                    setCurrentPage(1);
                  }}
                  disabled={isLoading}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Wrap with Error Boundary
export default function UsersPageWithErrorBoundary() {
  return (
    <UsersErrorBoundary>
      <UsersPage />
    </UsersErrorBoundary>
  );
}
