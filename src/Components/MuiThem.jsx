import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { Toaster } from "sonner";

const muiCache = createCache({
    key: "mui",
});

// eslint-disable-next-line react/prop-types
const ThemeProviderMUI = ({ children }) => {
    const darkMode = "light";
    const dir = "ltr";

    const theme = createTheme({
        direction: dir,
        shape: {
            borderRadius: 10,
        },
        components: {
            MuiIcon: {
                styleOverrides: {
                    root: {
                        fontFamily: "'Material Icons Outlined' !important",
                    },
                },
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        textTransform: "capitalize",
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        padding: "0 16px",
                        maxHeight: "45px",
                        height: "45px",
                        whiteSpace: "nowrap",
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    size: "small",
                },
            },
        },
        palette: {
            mode: darkMode,
            primary: {
                main: "#5685d9",
            },
            background: {
                default: "#fafafa",
                paper: "#fff",
            },
        },
        typography: {
            fontFamily: [`cairo`, "sans-serif"].join(","),
            fontSize: 12.5,
        },
    });

    return (
        <CacheProvider value={muiCache}>
            <Toaster richColors toastOptions={{
                style: {
                    fontFamily: [`cairo`, "sans-serif"].join(","),
                    fontSize: 12.5,
                },
            }}
            />
            <ThemeProvider
                theme={
                    {
                        ...theme,
                        direction: "ltr",
                    }
                }
            >
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
};

export default ThemeProviderMUI;
