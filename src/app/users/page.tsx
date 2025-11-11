"use client";

import { useState, useMemo } from "react";
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
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

// 🧩 Type definition
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// ⚡ Fetcher for SWR
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  });

type SortConfig = {
  key: keyof Pick<User, "name" | "email" | "website">;
  direction: "asc" | "desc";
} | null;

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const {
    data: users,
    error,
    isLoading,
  } = useSWR<User[]>("https://jsonplaceholder.typicode.com/users", fetcher);

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-10 px-4 flex justify-center">
      <Card className="w-full max-w-6xl shadow-sm border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Users Directory
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Browse, search, and filter through our user database
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 🔍 Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or website..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* ⚠️ Error */}
          {error && (
            <Alert variant="destructive" className="max-w-md mx-auto">
              <AlertDescription>
                Failed to load users. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {/* ⏳ Loading */}
          {isLoading && (
            <div className="space-y-3 animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4 justify-center">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
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
                      className="mt-2"
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  {/* 🖥 Desktop Table */}
                  <div className="hidden md:block rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => handleSort("name")}
                              className="h-auto p-0 font-semibold hover:bg-transparent"
                            >
                              Name {getSortIcon("name")}
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => handleSort("email")}
                              className="h-auto p-0 font-semibold hover:bg-transparent"
                            >
                              Email {getSortIcon("email")}
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              onClick={() => handleSort("website")}
                              className="h-auto p-0 font-semibold hover:bg-transparent"
                            >
                              Website {getSortIcon("website")}
                            </Button>
                          </TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAndSortedUsers.map((user) => (
                          <TableRow
                            key={user.id}
                            className="hover:bg-muted/40 transition-colors"
                          >
                            <TableCell>
                              <div>
                                <div className="font-semibold">{user.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  @{user.username}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <a
                                href={`mailto:${user.email}`}
                                className="text-primary hover:underline"
                              >
                                {user.email}
                              </a>
                            </TableCell>
                            <TableCell>
                              <a
                                href={`http://${user.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {user.website}
                              </a>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" asChild>
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
                    {filteredAndSortedUsers.map((user) => (
                      <Card
                        key={user.id}
                        className="p-4 shadow-sm border-border/50 hover:shadow-md transition-all"
                      >
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {user.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              @{user.username}
                            </p>
                          </div>

                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-muted-foreground">
                                Email:
                              </span>{" "}
                              <a
                                href={`mailto:${user.email}`}
                                className="text-primary hover:underline"
                              >
                                {user.email}
                              </a>
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Website:
                              </span>{" "}
                              <a
                                href={`http://${user.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {user.website}
                              </a>
                            </p>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="w-full"
                          >
                            <a href={`/users/${user.id}`}>View Details</a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {/* 🧮 Results Count */}
              {filteredAndSortedUsers.length > 0 && (
                <div className="text-sm text-muted-foreground text-center pt-4">
                  Showing {filteredAndSortedUsers.length} of{" "}
                  {users?.length || 0} users
                  {searchTerm && ` matching "${searchTerm}"`}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
