 import "./_buttonsFooter.scss";

export const ButtonsFooter = ({
  showCancel = true,
  showBack = false,
  showNext = true,
  handleCancel = () => {},
  handleBack = () => {},
  handleNext = () => {},
  labelNext = "Siguiente",
}) => {
  return (
    <div className="ContainerDetailButtons">
      <div className="containerBtnTwo">
        <div className="col-btn">
          {showCancel && (
            <div
              className="ContainerDetailButtons__items"
              onClick={handleCancel}
            >
              <div className={`ButtonCancelFooter btn`}>Cancelar</div>
            </div>
          )}
          {showBack && (
            <div className="ContainerDetailButtons__items" onClick={handleBack}>
              <button className={`ButtonBackFooter btn`}>Anterior</button>
            </div>
          )}
          {showNext && (
            <div className="ContainerDetailButtons__items" onClick={handleNext}>
              <div className={`ButtonNextFooter btn`} onClick={() => {}}>
                {labelNext}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
