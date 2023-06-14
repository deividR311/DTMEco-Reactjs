import React from "react";
import { ModalCommon } from "../../../../../../sharedComponents";

const UpdateOrDelete = ({
  openModalReconfirm, setOpenModalReconfirm, deleteCostumerRequest,
  deleteJson, setOpenModalExistRequest, classes
}) => {

  const closeReconfirmModal = () => {
    setOpenModalReconfirm(false);
  }

  const deleteRequest = () => {
    deleteCostumerRequest(deleteJson);
    setOpenModalReconfirm(false);
    setOpenModalExistRequest(false);
  }
  return (
    <>
      <div>
          <strong>Tiene una solicitud en curso para la identificación ingresada <br /> ¿Desea continuar con ella?</strong>
      </div>
      <ModalCommon
        classes={classes}
        handleOptions={""}
        handleClose={closeReconfirmModal}
        open={openModalReconfirm}
        disableBackdropClick={true}
        title={''}
        handleConfirm={deleteRequest}
        cancel={"No"}
        confirm={"Si"}
      >
        <div>
        Esta opción elimina los datos ingresado en la solicitud anterior ¿Está seguro que desea continuar?
        </div>
      </ModalCommon>
    </>
  );
};

export default UpdateOrDelete;
