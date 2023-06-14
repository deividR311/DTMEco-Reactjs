import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { InputFieldCustom } from "../../../DraftMaterialNoCore/components/CustomInput";

const getNameObj = (strName = "", type) => {
  if (type === 1) {
    return strName.replace(" ", "_");
  }
  if (type === 2) {
    return strName.replace("_", " ");
  }
};

const validateNullOrUndefined = (value) => {
  if (value === null) return "";
  if (value === undefined) return "";
  return value;
};

export const LongDescriptionModify = ({
  isEdited,
  setBuild,
  initBuild,
  setLongDescription,
  arrayLongDescription,
}) => {
  const [values, setValues] = useState({});
  const [existValues, setExistValues] = useState(false);

  useEffect(() => {
    if (arrayLongDescription.length > 0) {
      if (!isEdited) {
        const valuesToState = arrayLongDescription.reduce((acum, key) => {
          acum[getNameObj(key.caracteristica, 1)] = validateNullOrUndefined(
            key.valor
          );
          return acum;
        }, {});
        setValues(valuesToState);
      } else {
        const valuesToStateEdit = arrayLongDescription.reduce((acum, key) => {
          acum[getNameObj(key.Caracteristica, 1)] = validateNullOrUndefined(
            key.Valor
          );
          return acum;
        }, {});
        setValues(valuesToStateEdit);
      }
      setExistValues(true);
    }
  }, [arrayLongDescription, isEdited]);

  useEffect(() => {
    if (setBuild) {
      const arrayValues = Object.keys(values).map((key) => {
        return {
          Caracteristica: getNameObj(key, 2),
          Valor: values[key],
        };
      });
      setLongDescription(JSON.stringify(arrayValues));
    }
    initBuild();
  }, [setBuild]);

  const capitalizarPrimeraLetra = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const changeData = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <section className="containerLongDescriptionCaract">
      <Grid
        container
        className="containerLongDescriptionCaract_gridContainer"
        spacing={2}
      >
        {existValues && (
          <>
            {arrayLongDescription.map((data, index) => (
              <Grid
                xs={4}
                className={"item"}
                key={`key-${
                  isEdited ? data.Caracteristica : data.caracteristica
                }-${index}`}
              >
                <InputFieldCustom
                  max={300}
                  widthInput={"full"}
                  onChange={changeData}
                  name={getNameObj(
                    isEdited ? data.Caracteristica : data.caracteristica,
                    1
                  )}
                  value={
                    values[
                      getNameObj(
                        isEdited ? data.Caracteristica : data.caracteristica,
                        1
                      )
                    ]
                  }
                  label={capitalizarPrimeraLetra(
                    isEdited ? data.Caracteristica : data.caracteristica
                  )}
                  props={{ multiline: true, maxRows: 10 }}
                  //   errors={printErrorLong(
                  //     error[getNameObj(value.caracteristica, 1)]
                  //   )}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </section>
  );
};
