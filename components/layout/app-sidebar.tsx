"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SlidersHorizontalIcon } from "lucide-react";
import * as React from "react";
import { CategoryFilter } from "../filters/category-filter";
import ClearFilter from "../filters/clear-filter";
import { PriceRangeFilter } from "../filters/price-range-filter";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <SlidersHorizontalIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none font-bold">
                  Filters
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <CategoryFilter />
        <PriceRangeFilter />
        <ClearFilter />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
