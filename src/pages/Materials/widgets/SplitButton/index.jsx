import {useState, useEffect, useRef, Fragment } from 'react';
import { Button, 
    ButtonGroup, 
    ClickAwayListener, 
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


export const SplitButton = ({labelButton, buttonStyle, handleClick, optionsSolicitud}) => {
const options = optionsSolicitud;
const [open, setOpen] = useState(false);
const anchorRef = useRef(null);
const [selectedIndex, setSelectedIndex] = useState(1);

const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    handleClick(index+1)
};

const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
};

const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }

    setOpen(false);
};

return (
    <Fragment>
        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" color="primary">
            <Button 
                className={buttonStyle}
                style={{width:"12rem", display:"flex", justifyContent:"space-around"}}
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
            >
                <span>{labelButton}</span>
                <span>{!open?<ArrowDropDownIcon sx={{ color: "white" }} />:<ArrowDropUpIcon sx={{ color: "white" }} />}</span>
            </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal >
            {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
            >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem className='SplitButton' >
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                            {option}
                            </MenuItem>
                        ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Grow>
            )}
        </Popper>
    </Fragment>
    );
}
