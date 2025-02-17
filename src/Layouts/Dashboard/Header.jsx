import { IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { useContext } from 'react'
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { DashboardContext } from '../../Context/DashboardContext';
import { Menu } from '@mui/icons-material';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.default,
    zIndex: 1201,
    borderBottom: '1px solid ' + theme.palette.divider,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    padding: `${theme.spacing(0, 0.5)} !important`,
}));


const Header = () => {
    const context = useContext(DashboardContext);
    return (
        <AppBar position='fixed' open={context?.state.open} >
            <ToolbarStyle>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        onClick={() => context?.dispatch({ type: "SET_OPEN", payload: !context?.state.open })}
                        edge="start"
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant={"h1"} fontSize={20} color='primary' fontWeight={"bold"}>
                        Yamm Task
                    </Typography>

                </Stack>
            </ToolbarStyle>
        </AppBar>
    )
}

export default Header