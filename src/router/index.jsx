import { createBrowserRouter, Outlet } from "react-router";

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <div>Not Found</div>,
        element: <div>
            <Outlet />
        </div>,
        children: [
            {
                path: '/',
                element: <Outlet />,
                children: [
                    { path: '/', element: <div>ok</div> },
                ]
            }
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