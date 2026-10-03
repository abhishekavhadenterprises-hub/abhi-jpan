"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Filter, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function AnnualReportsFilter(props: any) {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>
      <AnnualReportsFilterInner {...props} />
    </React.Suspense>
  );
}

function AnnualReportsFilterInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "desc";
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, pathname, router, searchParams]);

  const toggleSort = () => {
    const newSort = sort === "desc" ? "asc" : "desc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="relative z-20 bg-white dark:bg-[#071321] py-4 transition-colors">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
          {/* Search & Sorting */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-72 w-full">
            <input
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EBF3FC]/60 dark:bg-[#0D2440]/80 border border-[#7BA4D0]/35 dark:border-white/15 rounded-xl py-2.5 pl-10 pr-10 text-sm text-[#0D2440] dark:text-white placeholder:text-[#0D2440]/50 dark:placeholder:text-white/40 focus:outline-none focus:border-[#2E5E99] dark:focus:border-[#7BA4D0] transition-all"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E5E99] dark:text-[#7BA4D0] pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#0D2440] dark:text-white/60 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button 
            onClick={toggleSort}
            className="flex items-center gap-2.5 bg-white dark:bg-[#0D2440] border border-[#7BA4D0]/35 dark:border-white/15 rounded-xl py-2.5 px-5 text-xs font-semibold text-[#0D2440] dark:text-white hover:border-[#2E5E99] dark:hover:border-[#7BA4D0] transition-all shrink-0 whitespace-nowrap justify-between"
          >
            <Filter className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
            <span>{sort === "desc" ? "Latest First" : "Oldest First"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#2E5E99] dark:text-[#7BA4D0] shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}

