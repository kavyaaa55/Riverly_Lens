// components/navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Eye, Settings, User, LogOut, Search, Building2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Company {
  id: string;
  name: string;
  logoUrl?: string | null;
  type?: string | null;
  description?: string | null;
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const searchCompanies = async () => {
      if (!debouncedSearch || debouncedSearch.length < 2) {
        setCompanies([]);
        return;
      }

      setIsSearching(true);
      try {
        // Updated to use simpler /api/search endpoint
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedSearch)}&limit=8`
        );

        console.log('🔍 Search response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Search results:', data);
          setCompanies(data.companies || []);
        } else {
          console.error('❌ Search failed:', response.status, response.statusText);
          setCompanies([]);
        }
      } catch (error) {
        console.error("❌ Search error:", error);
        setCompanies([]);
      } finally {
        setIsSearching(false);
      }
    };

    searchCompanies();
  }, [debouncedSearch]);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  const handleCompanySelect = (companyId: string) => {
    setOpen(false);
    setSearchQuery("");
    setCompanies([]);
    router.push(`/companies/${companyId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">RivalryLens</span>
          </Link>
          <div className="h-9 w-20 bg-muted animate-pulse rounded" />
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">RivalryLens</span>
          </Link>

          {/* Search Component */}
          {user && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-start text-muted-foreground"
                >
                  <Search className="mr-2 h-4 w-4 shrink-0" />
                  <span>Search companies...</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0" align="start">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Type at least 2 characters..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    {isSearching && (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span>Searching companies...</span>
                        </div>
                      </div>
                    )}
                    {!isSearching && searchQuery.length < 2 && (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        Type at least 2 characters to search
                      </div>
                    )}
                    {!isSearching && searchQuery.length >= 2 && companies.length === 0 && (
                      <CommandEmpty>
                        <div className="py-4 text-center">
                          <Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">No companies found</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Try a different search term
                          </p>
                        </div>
                      </CommandEmpty>
                    )}
                    {companies.length > 0 && (
                      <CommandGroup heading={`Companies (${companies.length})`}>
                        {companies.map((company) => (
                          <CommandItem
                            key={company.id}
                            value={company.id}
                            onSelect={() => handleCompanySelect(company.id)}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                          >
                            {company.logoUrl ? (
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={company.logoUrl} alt={company.name} />
                                <AvatarFallback>
                                  {company.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Building2 className="h-5 w-5 text-primary" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium truncate">{company.name}</span>
                                {company.type && (
                                  <Badge variant="outline" className="text-xs">
                                    {company.type}
                                  </Badge>
                                )}
                              </div>
                              {company.description && (
                                <p className="text-xs text-muted-foreground truncate mt-0.5">
                                  {company.description}
                                </p>
                              )}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <nav className="flex items-center gap-4">
          {user ? (
            // Authenticated User Navigation
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost">About Us</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">
                      {user.name || user.email?.split("@")[0] || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.name && <p className="font-medium">{user.name}</p>}
                      {user.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <Eye className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Non-authenticated User Navigation
            <>
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost">About Us</Button>
              </Link>
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

