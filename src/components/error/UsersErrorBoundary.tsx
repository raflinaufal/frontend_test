"use client";

import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface UsersErrorBoundaryProps {
  children: React.ReactNode;
}

const UsersErrorFallback = () => (
  <div className="container mx-auto py-12 px-6 max-w-2xl text-center">
    <Card className="border-destructive/50">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <Users className="h-6 w-6 text-destructive" />
          <CardTitle className="text-destructive">Users Data Error</CardTitle>
        </div>
        <CardDescription>
          We encountered an error while loading the users data. This might be
          due to a network issue or server problem.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Possible causes:</p>
          <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
            <li>Network connectivity issues</li>
            <li>Server temporarily unavailable</li>
            <li>Data format changes</li>
            <li>Component rendering error</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Page
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const UsersErrorBoundary: React.FC<UsersErrorBoundaryProps> = ({
  children,
}) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log users-specific errors
    console.error("Users Error:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // In production, send to error reporting service
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  };

  return (
    <ErrorBoundary fallback={<UsersErrorFallback />} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default UsersErrorBoundary;
