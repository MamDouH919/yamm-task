import { useContext } from "react";
import {
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "./DashboardLayout";
import { Link, useLocation } from "react-router";
import { DashboardContext } from "../../Context/DashboardContext";
import useWidth, { isWidthDown } from "../../Components/Helpers/useWidth";
import { RiRefund2Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import clsx from "clsx";

// Styled Components
const PREFIX = "NavDrawer";

const classes = {
    root: `${PREFIX}-root`,
    drawer: `${PREFIX}-drawer`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    listItemFocus: `${PREFIX}-listItemFocus`,
    navLink: `${PREFIX}-navLink`,
    nestedListItem: `${PREFIX}-nestedListItem`,
    navSubItem: `${PREFIX}-navSubItem`,
};

const Root = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
    [`& .${classes.drawerPaper}`]: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.paper,
    },

    [`& .${classes.navLink}`]: {
        textDecoration: "none",
        color: theme.palette.text.primary,
        "&:hover": {
            color: theme.palette.primary.main,
            "& svg": {
                color: theme.palette.primary.main,
            },
        },
    },
    [`& .${classes.listItemFocus}`]: {
        color: theme.palette.primary.main,
        "& svg": {
            color: theme.palette.primary.main,
        },
    },
    [`& .${classes.nestedListItem}`]: {
        padding: theme.spacing(0.5, 1),
        paddingLeft: theme.spacing(1.5),
    },
    [`& .${classes.navSubItem}`]: {
        padding: theme.spacing(0, 0.5),
        minWidth: "20px !important",
        "& svg": {
            fontSize: "20px",
        },
    },
}));

const ItemButtonStyle = styled(ListItemButton)(({ theme }) => ({
    padding: theme.spacing(0.5, 1),
}));

const NavDrawer = () => {
    const context = useContext(DashboardContext);

    const linksList = [
        {
            pathname: "/",
            icon: MdDashboard,
            primary: "dashboard",
            id: "dash"
        },
        {
            pathname: "/refund-orders",
            icon: RiRefund2Fill,
            primary: "refund orders",
            id: "refund-orders"
        },
    ];

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const screenWidth = useWidth();
    const isScreenSmall = isWidthDown("xs", screenWidth);
    const { pathname } = useLocation();
    
    return (
        <Root
            variant={isScreenSmall ? "temporary" : "persistent"}
            anchor="left"
            open={context?.state.open}
        >
            <DrawerHeader />
            <Divider />
            <List>
                {linksList.map((link, index) => {
                    return (
                        <Link
                            key={index}
                            to={link.pathname}
                            className={clsx(classes.navLink, {
                                [classes.listItemFocus]: pathname === "/" ? link.id === "dash" : pathname.includes(link.id)
                            })}
                        >
                            <ItemButtonStyle>
                                <ListItemIcon className={classes.navSubItem}>
                                    {link.icon && <link.icon />}
                                </ListItemIcon>
                                <ListItemText primary={link.primary} />
                            </ItemButtonStyle>
                        </Link>
                    );
                })}
            </List>
        </Root>
    );
};

export default NavDrawer;
