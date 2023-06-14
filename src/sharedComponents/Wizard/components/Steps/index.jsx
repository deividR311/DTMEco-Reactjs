import * as React from "react";

export const Steps = (props) => {
  const activeItem = (numberItem, nameItem, indexItem) => {
    return (
      <div className={props.classes.section__info} index={indexItem}>
        <div className={props.classes.section__info__Number}>{numberItem}</div>
        <div className={props.classes.section__info__name}>{nameItem}</div>
      </div>
    );
  };

  return (
    <>
      <div className={props.classes.containerWizard}>
        <div className={props.classes.divider}>
          <div className={props.classes.divider__item}></div>
        </div>
        <div className={props.classes.section}>
          {props.data.map((datos, index) => {
            return (
              <div className={props.classes.section__item} key={index}>
                {datos.number === props.currentStep
                  ? activeItem(datos.number, datos.name, index)
                  : datos.number}
              </div>
            );
          })}
        </div>
      </div>
      <div className={props.classes.contentFormWizard}>{props.children}</div>
    </>
  );
};
