import React from 'react';
import { Modal, Backdrop, Fade, Grid } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { ModalFooter } from './components';

const ModalCommon = (props) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={props.classes.modal}
        disableBackdropClick={props.disableBackdropClick}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <>
            <div className={props.classes.paper}>
              <div className={props.classes.ctnModalHeader}>
                <Grid container>
                  <Grid item xs={11}>
                    <strong>{props.title}</strong>
                  </Grid>
                  <Grid item xs={1}>
                    <Close onClick={props.handleClose}></Close>
                  </Grid>
                </Grid>
              </div>
              {props.children}
              { !props.hideButtons &&
                <ModalFooter
                  cancel={props.cancel}
                  confirm={props.confirm}
                  closeModal={props.handleClose}
                  handleConfirm={props.handleConfirm}
                  classes={props.classes}
                />
              }
            </div>
          </>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalCommon;