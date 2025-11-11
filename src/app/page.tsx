import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center px-4">
      <main className="container mx-auto py-16 max-w-5xl">
        <section className="text-center space-y-10">
          {/* Header */}
          <header className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent tracking-tight">
              Frontend Test App
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Built with Next.js 14, TypeScript, shadcn/ui, and SWR — optimized
              for performance and developer experience.
            </p>
          </header>

          {/* Feature Cards */}
          <div className="grid  gap-6 justify-center items-stretch mt-10">
            <Card className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/60 bg-card/50 backdrop-blur">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  Users Directory
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground">
                  Browse, search, and filter through user profiles with
                  real-time data.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center mt-4">
                <Button
                  asChild
                  className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base"
                >
                  <a
                    href="/users"
                    className="flex items-center justify-center gap-2"
                  >
                    View Users
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
