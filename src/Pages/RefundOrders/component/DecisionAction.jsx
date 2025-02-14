import { MoreVert } from '@mui/icons-material';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material'
import { useEffect, useRef, useState } from 'react';
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types';

const PopperStyle = styled(Popper)(() => ({
    zIndex: 1,
}));

const GrowStyle = styled(Grow)(({ placement }) => ({
    zIndex: 1,
    transformOrigin:
        placement === 'bottom-start' ? 'left top' : 'left bottom',
}));

const DecisionAction = ({
    id,
    handleChangeDecision,
}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleClickCode = (e, code) => {
        handleChangeDecision(id, code);
        handleClose(e)
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <MoreVert />
            </IconButton>
            <PopperStyle
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal

            >
                {({ TransitionProps, placement }) => (
                    <GrowStyle
                        {...TransitionProps}
                        placement={placement}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={(e) => handleClickCode(e, "reject")}>reject</MenuItem>
                                    <MenuItem onClick={(e) => handleClickCode(e, "accept")}>accept</MenuItem>
                                    <MenuItem onClick={(e) => handleClickCode(e, "escalate")}>escalate</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </GrowStyle>
                )}
            </PopperStyle>
        </>
    )
}

export default DecisionAction

DecisionAction.propTypes = {
    id: PropTypes.string,
    handleChangeDecision: PropTypes.func,
};