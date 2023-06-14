import React from 'react';
import { useStylesNoMatchPage } from './styles';
import { Button, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

const NoMatchPage = () => {
    const classes = useStylesNoMatchPage();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }
    return (
        <div className={classes.noMatchContainer}>
            
            <Paper className={classes.paper}>
                <label className={classes.title} htmlFor="">404</label><br />
                <label className={classes.subTitle} htmlFor="">Ruta no valida o con acceso restringido</label><br />
                <Button className={classes.btn} onClick={goBack}>
                    Regresar
                </Button>
            </Paper>
        </div>
    )
}

export default NoMatchPage;
