import { createBrowserRouter, Outlet } from "react-router";

import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import ThemeProviderMUI from "../Components/MuiThem";
import Home from "../Pages/Home";
import NotFound from "../Components/NotFound";
import RefundOrdersList from "../Pages/RefundOrders/List";
import RefundOrdersView from "../Pages/RefundOrders/view";

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
                path: 'refund-orders',
                children: [
                  { index: true, element: <RefundOrdersList /> },
                  { path: ':id', element: <RefundOrdersView /> },
                ],
              },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },

]);