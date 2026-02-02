"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilters } from "@/providers/filters/filter-context";
import { fetchCategories } from "@/services/product-service";
import { useCallback, useEffect, useState } from "react";

export function CategoryFilter() {
  const { category, setCategory } = useFilters();
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  if (loading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Category</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="space-y-1 px-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Category</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={category === "all"}
              onClick={() => setCategory("all")}
            >
              All Categories
            </SidebarMenuButton>
          </SidebarMenuItem>
          {categories.map((cat) => (
            <SidebarMenuItem key={cat}>
              <SidebarMenuButton
                isActive={category === cat}
                onClick={() => setCategory(cat)}
                className="capitalize"
              >
                {cat}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
