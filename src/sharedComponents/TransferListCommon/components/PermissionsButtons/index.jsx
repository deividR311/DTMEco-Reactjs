import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const PermissionsButtons = ({
    classes,
    handleAllRight,
    left,
    handleCheckedRight,
    leftChecked,
    handleCheckedLeft,
    handleAllLeft,
    right,
    rightChecked
}) => {
    return (
        <>
            <Grid container direction="column" alignItems="center">
                <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick={handleAllRight}
                    disabled={left.length === 0}
                    aria-label="move all right"
                >
                    ≫
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                >
                    &gt;
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                >
                    &lt;
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick={handleAllLeft}
                    disabled={right.length === 0}
                    aria-label="move all left"
                >
                    ≪
                </Button>
            </Grid>
        </>
    )
}

export default PermissionsButtons;
