"use client";

import * as React from "react";
import {
  AudioWaveform,
  BarChart4,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  LineChart,
  Map,
  Package,
  PieChart,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  SquareTerminal,
  Users,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Sales Analytics",
          url: "/dashboard/sales-analytics",
        },
        {
          title: "Product Insights",
          url: "/dashboard/product-insights",
        },
        {
          title: "Order Management",
          url: "/dashboard/order-management",
        },
        {
          title: "Customers",
          url: "/dashboard/customers",
        },
        {
          title: "Marketing & Traffic",
          url: "/dashboard/marketing",
        },
        {
          title: "Payments",
          url: "/dashboard/payments",
        },
      ],
    },
    {
      title: "Sales",
      url: "/dashboard/sales-analytics",
      icon: LineChart,
      items: [
        {
          title: "Analytics",
          url: "/dashboard/sales-analytics",
        },
        {
          title: "Reports",
          url: "/dashboard/sales-analytics",
        },
        {
          title: "Forecasts",
          url: "/dashboard/sales-analytics",
        },
      ],
    },
    {
      title: "Products",
      url: "/dashboard/product-insights",
      icon: ShoppingBag,
      items: [
        {
          title: "Inventory",
          url: "/dashboard/product-inventory",
        },
        {
          title: "Categories",
          url: "/dashboard/product-insights",
        },
        {
          title: "Performance",
          url: "/dashboard/product-insights",
        },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/order-management",
      icon: Package,
      items: [
        {
          title: "All Orders",
          url: "/dashboard/order-management",
        },
        {
          title: "Pending",
          url: "/dashboard/order-management",
        },
        {
          title: "Completed",
          url: "/dashboard/order-management",
        },
      ],
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
      items: [
        {
          title: "All Customers",
          url: "/dashboard/customers",
        },
        {
          title: "Segments",
          url: "/dashboard/customers",
        },
        {
          title: "Feedback",
          url: "/dashboard/customers",
        },
      ],
    },
    {
      title: "Marketing",
      url: "/dashboard/marketing",
      icon: BarChart4,
      items: [
        {
          title: "Campaigns",
          url: "/dashboard/marketing",
        },
        {
          title: "Traffic Sources",
          url: "/dashboard/marketing",
        },
        {
          title: "Conversions",
          url: "/dashboard/marketing",
        },
      ],
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: Wallet,
      items: [
        {
          title: "Transactions",
          url: "/dashboard/payments",
        },
        {
          title: "Refunds",
          url: "/dashboard/payments",
        },
        {
          title: "Invoices",
          url: "/dashboard/payments",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
