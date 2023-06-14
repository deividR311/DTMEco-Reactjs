import { useEffect, useState } from "react";
import { useStylesStepIndicator } from "./styles";
import checkGreen from "../../../../../../assets/images/checkGreen.svg";

export const StepIndicator = ({ step }) => {
  const classesMaterial = useStylesStepIndicator();
  const [styleStepOne, setStyleStepOne] = useState("");
  const [styleStepTwo, setStyleStepTwo] = useState("");
  const [styleStepThree, setStyleStepThree] = useState("");

  useEffect(() => {
    switch (step) {
      case 1:
        setStyleStepOne("");
        setStyleStepTwo("__disabled");
        setStyleStepThree("__disabled");
        break;
      case 2:
        setStyleStepOne("__green");
        setStyleStepTwo("");
        setStyleStepThree("__disabled");
        break;
      case 3:
        setStyleStepOne("__green");
        setStyleStepTwo("__green");
        setStyleStepThree("");
        break;
    }
  }, [step]);

  return (
    <>
      <div className={classesMaterial.containerWizard}>
        <div className={classesMaterial.divider}>
          <div className={classesMaterial.divider__item}></div>
        </div>
        <div className={classesMaterial.section}>
          <div className={classesMaterial[`section__item${styleStepOne}`]}>
            <div className={classesMaterial[`section__info${styleStepOne}`]}>
              <div
                className={
                  classesMaterial[`section__info__Number${styleStepOne}`]
                }
              >
                {styleStepOne === "__green" ? <img src={checkGreen} /> : "1"}
              </div>
              <div
                className={
                  classesMaterial[`section__info__name${styleStepOne}`]
                }
              >
                Tipo de solicitud
              </div>
            </div>
          </div>
          <div className={classesMaterial[`section__item${styleStepTwo}`]}>
            <div className={classesMaterial[`section__info${styleStepTwo}`]}>
              <div
                className={
                  classesMaterial[`section__info__Number${styleStepTwo}`]
                }
              >
                {styleStepTwo === "__green" ? <img src={checkGreen} /> : "2"}
              </div>
              <div
                className={
                  classesMaterial[`section__info__name${styleStepTwo}`]
                }
              >
                Datos del material
              </div>
            </div>
          </div>
          <div className={classesMaterial[`section__item${styleStepThree}`]}>
            <div className={classesMaterial[`section__info${styleStepThree}`]}>
              <div
                className={
                  classesMaterial[`section__info__Number${styleStepThree}`]
                }
              >
                3
              </div>
              <div
                className={
                  classesMaterial[`section__info__name${styleStepThree}`]
                }
              >
                Observaciones
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
