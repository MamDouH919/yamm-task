import { useContext } from 'react'
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { drawerWidth } from './DashboardLayout';
import useWidth, { isWidthDown } from '../../Components/Helpers/useWidth';
import { DashboardContext } from '../../Context/DashboardContext';

const MainPage = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    height: "100dvh",
    // minHeight: "100%",
    overflow: "hidden",
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// eslint-disable-next-line react/prop-types
const Main = ({ children }) => {
    const context = useContext(DashboardContext);
    const screenWidth = useWidth();
    const isScreenSmall = isWidthDown("xs", screenWidth);
    return (
        <MainPage open={isScreenSmall ? true : context?.state.open}>
            <Stack height={"100dvh"}>
                <DrawerHeader />
                <Stack flexGrow={1} overflow={"auto"}>
                    {children}
                </Stack>
            </Stack>
        </MainPage>
    )
}

export default Main