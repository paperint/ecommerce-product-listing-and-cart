"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PRICE_RANGES } from "@/constants/data";
import { useFilters } from "@/providers/filters/filter-context";

export function PriceRangeFilter() {
  const { priceRange, setPriceRange } = useFilters();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Price Range</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {PRICE_RANGES.map((range) => (
            <SidebarMenuItem key={range.value}>
              <SidebarMenuButton
                isActive={priceRange === range.value}
                onClick={() => setPriceRange(range.value)}
              >
                {range.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
