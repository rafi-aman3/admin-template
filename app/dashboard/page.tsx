"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  ShoppingCart,
  Users,
  RefreshCcw,
  Percent,
  UserPlus,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";

// Mock data for the dashboard
const kpiData = [
  {
    title: "Total Sales",
    value: "$25,000",
    change: "+12.5%",
    trend: "up",
    period: "this month",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "3,200",
    change: "+8.2%",
    trend: "up",
    period: "this month",
    icon: ShoppingCart,
  },
  {
    title: "Average Order Value",
    value: "$78",
    change: "+2.1%",
    trend: "up",
    period: "vs last month",
    icon: DollarSign,
  },
  {
    title: "Conversion Rate",
    value: "2.5%",
    change: "-0.3%",
    trend: "down",
    period: "vs last month",
    icon: Percent,
  },
  {
    title: "Total Customers",
    value: "1,750",
    change: "+5.8%",
    trend: "up",
    period: "this month",
    icon: Users,
  },
  {
    title: "New Customers",
    value: "400",
    change: "+15.2%",
    trend: "up",
    period: "this month",
    icon: UserPlus,
  },
  {
    title: "Refunds/Returns",
    value: "$1,200",
    change: "-2.5%",
    trend: "down",
    period: "32 items",
    icon: RefreshCcw,
  },
  {
    title: "Gross Profit",
    value: "$18,500",
    change: "+10.3%",
    trend: "up",
    period: "this month",
    icon: DollarSign,
  },
];

// Mock data for best selling products
const bestSellingProducts = [
  { name: "Premium Headphones", units: 245, revenue: "$12,250" },
  { name: "Wireless Earbuds", units: 189, revenue: "$7,560" },
  { name: "Smart Watch", units: 142, revenue: "$7,100" },
  { name: "Bluetooth Speaker", units: 132, revenue: "$5,280" },
  { name: "Phone Case", units: 120, revenue: "$1,800" },
];

// Mock data for worst selling products
const worstSellingProducts = [
  { name: "USB Cable", units: 15, revenue: "$150" },
  { name: "Screen Protector", units: 18, revenue: "$180" },
  { name: "Laptop Stand", units: 22, revenue: "$660" },
  { name: "Mouse Pad", units: 25, revenue: "$250" },
  { name: "Keyboard Cover", units: 28, revenue: "$280" },
];

// Mock data for sales by category
const salesByCategory = [
  { category: "Electronics", revenue: "$12,500", percentage: 50 },
  { category: "Accessories", revenue: "$6,250", percentage: 25 },
  { category: "Wearables", revenue: "$3,750", percentage: 15 },
  { category: "Other", revenue: "$2,500", percentage: 10 },
];

// Mock data for recent orders
const recentOrders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    product: "Premium Headphones",
    status: "Completed",
    date: "2023-06-15",
    total: "$250",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    product: "Wireless Earbuds",
    status: "Processing",
    date: "2023-06-15",
    total: "$120",
  },
  {
    id: "#ORD-003",
    customer: "Bob Johnson",
    product: "Smart Watch",
    status: "Completed",
    date: "2023-06-14",
    total: "$180",
  },
  {
    id: "#ORD-004",
    customer: "Alice Brown",
    product: "Bluetooth Speaker",
    status: "Shipped",
    date: "2023-06-14",
    total: "$80",
  },
  {
    id: "#ORD-005",
    customer: "Charlie Wilson",
    product: "Phone Case",
    status: "Pending",
    date: "2023-06-13",
    total: "$25",
  },
];

// Mock data for sales by device
const salesByDevice = [
  { device: "Desktop", percentage: 45 },
  { device: "Mobile", percentage: 40 },
  { device: "Tablet", percentage: 15 },
];

// Mock data for sales by channel
const salesByChannel = [
  { channel: "Direct", percentage: 30 },
  { channel: "Google", percentage: 25 },
  { channel: "Facebook", percentage: 20 },
  { channel: "Email", percentage: 15 },
  { channel: "Other", percentage: 10 },
];

export default function Page() {
  // Ensure user data is loaded
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <DashboardLayout
      title="Dashboard Overview"
      description="Comprehensive view of your business performance"
    >
      {/* Time Range Filter */}
      <div className="flex flex-wrap gap-2 mt-2">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
          Today
        </button>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium">
          This Week
        </button>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium">
          This Month
        </button>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium">
          Custom Range
        </button>
      </div>

      {/* KPI Cards Section */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Key Performance Indicators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <Card
              key={index}
              className={`overflow-hidden ${
                kpi.title === "Total Customers"
                  ? "md:col-span-2 lg:col-span-2 md:row-span-2"
                  : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">
                    {kpi.title}
                  </CardTitle>
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                {kpi.title === "Total Customers" ? (
                  <>
                    <div className="text-2xl font-bold">75,782</div>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">2%</span>
                      <span className="text-muted-foreground text-xs ml-1">
                        24,635 users increased from last month
                      </span>
                    </div>
                    <div className="h-40 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={customerChartData}
                          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                        >
                          {/* <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#f0f0f0"
                          /> */}
                          <XAxis
                            dataKey="day"
                            tick={{ fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis hide />
                          <RechartsTooltip
                            formatter={(value, name) => [
                              `${value} users`,
                              name === "current" ? "This Month" : "Last Month",
                            ]}
                            labelFormatter={(label) => `Day ${label}`}
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              borderRadius: "var(--radius)",
                              border: "1px solid var(--border)",
                              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                              padding: "8px 12px",
                            }}
                            itemStyle={{
                              color: "var(--foreground)",
                              fontSize: "12px",
                              fontWeight: 500,
                            }}
                            labelStyle={{
                              color: "var(--muted-foreground)",
                              fontSize: "12px",
                              fontWeight: 600,
                              marginBottom: "4px",
                            }}
                            cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="previous"
                            stroke="#d1d5db"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="current"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className="flex items-center mt-1">
                      {kpi.trend === "up" ? (
                        <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={
                          kpi.trend === "up" ? "text-green-500" : "text-red-500"
                        }
                      >
                        {kpi.change}
                      </span>
                      <span className="text-muted-foreground text-xs ml-1">
                        {kpi.period}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sales Over Time Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
            <CardDescription>Daily/weekly/monthly sales trends</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/20">
            <p className="text-muted-foreground">Line/Area Chart Placeholder</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-1"></div>
              <span className="text-sm">Current Period</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-muted-foreground mr-1"></div>
              <span className="text-sm">Previous Period</span>
            </div>
          </CardFooter>
        </Card>

        {/* Orders Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
            <CardDescription>Status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span>Total Orders</span>
              <span className="font-bold">3,200</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Completed</span>
              <span className="font-bold">2,450</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending</span>
              <span className="font-bold">520</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Canceled</span>
              <span className="font-bold">230</span>
            </div>
            <div className="flex-1 flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Pie Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Products Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Best Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
            <CardDescription>Top 5 products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bestSellingProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span>{product.name}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{product.units}</div>
                      <div className="text-xs text-muted-foreground">Units</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {product.revenue}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Revenue
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Worst Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Low-Selling Products</CardTitle>
            <CardDescription>Products that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {worstSellingProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span>{product.name}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{product.units}</div>
                      <div className="text-xs text-muted-foreground">Units</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {product.revenue}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Revenue
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recent Orders Table */}
      <section className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Product</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-right py-3 px-4 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.product}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4 text-right">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <button className="text-sm text-primary hover:underline">
              View all orders
            </button>
          </CardFooter>
        </Card>
      </section>
    </DashboardLayout>
  );
}

// Mock data for the Total Customers chart
const customerChartData = [
  { day: "01", current: 1200, previous: 1000 },
  { day: "05", current: 1350, previous: 1100 },
  { day: "10", current: 1500, previous: 1200 },
  { day: "15", current: 1650, previous: 1300 },
  { day: "20", current: 1800, previous: 1400 },
  { day: "25", current: 1950, previous: 1500 },
  { day: "30", current: 2100, previous: 1600 },
];
