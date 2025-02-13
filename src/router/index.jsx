import { createBrowserRouter, Outlet } from "react-router";

import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import ThemeProviderMUI from "../Components/MuiThem";
import Home from "../Pages/Home";
import NotFound from "../Components/NotFound";
import RefundOrdersList from "../Pages/RefundOrders/List";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ThemeProviderMUI>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </ThemeProviderMUI>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/refund-orders',
                element: <RefundOrdersList />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },

], {
    future: {
        v7_partialHydration: true, // Enable the fetcher persist behavior
        v7_relativeSplatPath: true, // Enable the fetcher persist behavior
        v7_skipActionErrorRevalidation: true, // Enable the fetcher persist behavior
        v7_normalizeFormMethod: true, // Enable the fetcher persist behavior
        v7_fetcherPersist: true, // Enable the fetcher persist behavior
    },
});