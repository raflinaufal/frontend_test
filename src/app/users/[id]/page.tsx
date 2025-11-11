import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building } from "lucide-react";

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

// --- Data Fetcher (Server Side) ---
async function getUser(id: string): Promise<User | null> {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// --- Loading Skeleton ---
function UserDetailsSkeleton() {
  return (
    <div className="container mx-auto py-12 px-6 max-w-4xl">
      <div className="space-y-8">
        <Skeleton className="h-10 w-40" />
        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-40 mt-2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- Not Found State ---
function UserNotFound() {
  return (
    <div className="container mx-auto py-12 px-6 max-w-3xl text-center">
      <Alert variant="destructive" className="mb-8">
        <AlertDescription>
          User not found. The user may have been deleted or the ID is invalid.
        </AlertDescription>
      </Alert>
      <Button asChild>
        <a href="/users" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Users
        </a>
      </Button>
    </div>
  );
}

// --- Main UI Component ---
function UserDetails({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto py-12 px-6 max-w-4xl space-y-8">
        {/* Back Button */}
        <Button variant="outline" asChild>
          <a href="/users" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Users
          </a>
        </Button>

        {/* Profile Card */}
        <Card className="rounded-2xl shadow-lg border border-border/50">
          <CardHeader className="pb-0">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
              {user.name}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-1">
              @{user.username}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8 space-y-10">
            {/* Information Sections */}
            <div className="grid md:grid-cols-2 gap-10">
              {/* Personal Info */}
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <InfoRow
                    icon={<Mail className="w-5 h-5 text-muted-foreground" />}
                    label="Email"
                    value={user.email}
                    href={`mailto:${user.email}`}
                  />
                  <InfoRow
                    icon={<Phone className="w-5 h-5 text-muted-foreground" />}
                    label="Phone"
                    value={user.phone}
                    href={`tel:${user.phone.replace(/\D/g, "")}`}
                  />
                  <InfoRow
                    icon={<Globe className="w-5 h-5 text-muted-foreground" />}
                    label="Website"
                    value={user.website}
                    href={`http://${user.website}`}
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">
                  Company
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Company Name
                      </p>
                      <p className="font-medium text-foreground">
                        {user.company.name}
                      </p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground pl-8">
                    “{user.company.catchPhrase}”
                  </p>
                  <p className="text-sm pl-8 text-muted-foreground">
                    Business: {user.company.bs}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="pt-4 border-t border-border/50 space-y-4">
              <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">
                Address
              </h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Address</p>
                  <div className="font-medium leading-tight">
                    <p>
                      {user.address.suite} {user.address.street}
                    </p>
                    <p>
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-border/50 flex flex-wrap gap-4">
              <Button variant="default" asChild>
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- Small Info Row Helper ---
function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-primary transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

// --- Main Page ---
export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  if (!user) return <UserNotFound />;

  return (
    <Suspense fallback={<UserDetailsSkeleton />}>
      <UserDetails user={user} />
    </Suspense>
  );
}

// --- Metadata (SEO) ---
export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  if (!user) {
    return {
      title: "User Not Found",
      description: "The requested user could not be found.",
    };
  }
  return {
    title: `${user.name} - User Profile`,
    description: `Profile details for ${user.name} (@${user.username}), including contact, company, and address info.`,
    keywords: `${user.name}, ${user.username}, ${user.email}, ${user.company.name}`,
  };
}
