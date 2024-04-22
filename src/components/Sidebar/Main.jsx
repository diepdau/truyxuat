import React from "react";
import "./Sidebar.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function Main() {
  return (
    <main className="main">
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </main>
  );
}
