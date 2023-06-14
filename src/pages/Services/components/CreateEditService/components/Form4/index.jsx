import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { SelectCustom } from "../../../../../Materials/widgets";
import ServicesContext from "../../../../../../context/Services/servicesContext";

export const Form4 = ({
  company,
  isEdit,
  setForm,
  dataEdit,
  setError,
  dataForm,
  isSubmitting,
  typeMaterial,
  setIsSubmitting,
}) => {
  const servicesContext = useContext(ServicesContext);
  const { ListsMDS } = servicesContext;

  const [text, setText] = useState({});
  const [errores, serErrores] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
    serErrores(() => {
      return { ...errores, [name]: isLenght(value) };
    });
  };

  useEffect(() => {
    try {
      let ListError = {};
      let ListValues = {};
      if (ListsMDS !== undefined) {
        const Impuesto = ListsMDS.filter(
          (element) => element.listName === "Impuesto"
        );

        ListError = Impuesto[0].list[0].values.reduce((acc, data) => {
          acc[data.id] = [];
          return acc;
        }, {});

        ListValues = Impuesto[0].list[0].values.reduce((acc, data) => {
          acc[data.id] = "";
          return acc;
        }, {});
        setText(ListValues);
        serErrores(ListError);
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
    }
  }, []);

  const ClasificationByTax = (idTax) => {
    try {
      const fiscal = list.ClasificacionFiscalList.filter(
        (cf) => cf.id === idTax
      );
      if (!fiscal.length) {
        setError(
          "La lista clasificación fiscal no contiene información. ¡Contacte al administrador del sistema!",
          10000
        );
      }
      return fiscal[0].subValues;
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
    }
  };

  useEffect(() => {
    try {
      if (isEdit) {
        if (ListsMDS !== undefined) {
          const { tax } = dataEdit;
          const ArrayTax = JSON.parse(tax);
          const ImpuestoEdit = ListsMDS.filter(
            (element) => element.listName === "Impuesto"
          );
          const ListTax = ImpuestoEdit[0].list[0].values;
          const arrayEdit = ArrayTax.filter((element) =>
            ListTax.some((tax) => tax.id === element.TipoImpuesto)
          );
          const valuesText = arrayEdit.reduce((acc, data) => {
            acc[data.TipoImpuesto] = data.ClasificacionFiscal;
            return acc;
          }, {});
          setText(valuesText);
        }
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
    }
  }, [isEdit]);

  const [list, setList] = useState({
    taxList: [],
    ClasificacionFiscalList: [],
  });

  const [validateList, setValidateList] = useState(true);

  useEffect(() => {
    try {
      if (ListsMDS !== undefined) {
        if (ListsMDS.length) {
          const Impuesto = ListsMDS.filter(
            (element) => element.listName === "Impuesto"
          );
          const ClasificacionFiscal = ListsMDS.filter(
            (element) => element.listName === "ClasificacionFiscal"
          );
          setList({
            taxList: Impuesto[0].list[0].values,
            ClasificacionFiscalList: ClasificacionFiscal[0].list[0].values,
          });
        }
      }
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
    }
  }, [ListsMDS]);

  const validateError = () => {
    const listErrores = {};
    Object.keys(text).forEach((data) => {
      listErrores[data] = isLenght(text[data]);
    });
    serErrores(listErrores);
  };

  const isLenght = (value) => {
    if (!value) {
      return ["Campo requerido"];
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      validateError();
    }
  }, [isSubmitting]);

  useEffect(() => {
    try {
      if (isSubmitting) {
        const value = Object.values(errores).every(
          (data) => data.length == 0 && data !== ""
        );
        if (value) {
          const valueTax = [];
          Object.keys(text).forEach((data) => {
            const valueTax_i = {
              TipoImpuesto: data,
              ClasificacionFiscal: text[data],
            };
            valueTax.push(valueTax_i);
          });
          setForm(valueTax);
        }
      }
      setIsSubmitting();
    } catch (error) {
      setError("Ha ocurrido un error inesperado. ¡Intenta de nuevo!", 5000);
    }
  }, [errores]);

  const Fragment = () => (
    <>
      <div className="colTax">
        <h6>Tipo impuesto</h6>
        {list.taxList.map((tipoI, index) => (
          <div className="rowTax" key={index}>
            {tipoI.name}
          </div>
        ))}
      </div>
      <div className="colTax">
        <h6>Clasificación fiscal</h6>
        {list.taxList.map((tax, index) => (
          <div className="rowTax" key={index}>
            <SelectCustom
              widthSelect={"w200"}
              showId={false}
              withHook={false}
              showError={true}
              name={`${tax.id}`}
              value={text[`${tax.id}`]}
              onChange={handleOnChange}
              placeholder="Seleccionar"
              errors={errores[`${tax.id}`]}
              items={ClasificationByTax(tax.id)}
            />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="containerTax contentDistribution_center">
        <h5>Impuestos</h5>
        <div className="gridTax">{validateList && <Fragment />}</div>
      </div>
    </>
  );
};
