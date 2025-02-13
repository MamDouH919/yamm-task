import { createContext } from "react";

// Create context with default value
export const DashboardContext = createContext({
    state: { open: true, pageActions: null, breadcrumbLinks: [] },
    dispatch: () => { },
});