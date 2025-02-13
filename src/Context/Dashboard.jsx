import { useReducer } from "react";
import PropTypes from "prop-types";
import { DashboardContext } from "./DashboardContext"; // Import the context

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_OPEN":
            localStorage.setItem("drawer", action.payload.toString());
            return { ...state, open: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// Initial state
const getInitialState = {
    open: localStorage.getItem("drawer") === "false" ? false : true,
    pageActions: null,
    breadcrumbLinks: [],
}

// Provider component
export const DashboardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, getInitialState);

    return (
        <DashboardContext.Provider value={{ state, dispatch }}>
            {children}
        </DashboardContext.Provider>
    );
};

// Prop validation
DashboardProvider.propTypes = {
    children: PropTypes.node.isRequired,
};