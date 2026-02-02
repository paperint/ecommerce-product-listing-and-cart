"use client";

import { useFilters } from "@/providers/filters/filter-context";
import { Button } from "../ui/button";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar";

const ClearFilter = () => {
  const { clearAll } = useFilters();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="w-full justify-center">
          <Button variant={"outline"} onClick={() => clearAll()}>
            Clear All Filters
          </Button>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ClearFilter;
