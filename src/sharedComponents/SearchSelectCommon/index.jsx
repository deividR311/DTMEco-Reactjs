import { useEffect, useState } from "react";
import { InputLabel } from "@material-ui/core";
import Select from "react-select";
import { TooltipCustom } from "../../pages/Materials/widgets";

const initialStateValor = {
  label: "",
  value: "",
};

export const SearchSelect = ({
  name = "",
  placeholder,
  label,
  defaultValue = "",
  listOpt = [],
  optionList = "",
  tooltip = "",
  valueId = "",
  onChange,
  isDisabled = false,
  autoFocus = false,
  isLoading = false,
  isRequired = false,
  errors = "",
  maxMenuHeight = '',
  itemProps = [],
}) => {
  const errorStyle = {
    control: (base) => ({
      ...base,
      borderColor: "red",
    }),
    indicatorContainer: (base) => ({
      ...base,
      color: "red",
    }),
  };

  const [valor, setValor] = useState(initialStateValor);
  useEffect(() => {
    if (valueId) {
      if (listOpt.length > 0) {
        const opt = listOpt.filter((opt) => opt.id === valueId);
        if (opt.length > 0) {
          setValor({ label: opt[0].name, value: opt[0].id });
        }
      }
    } else {
      setValor(initialStateValor);
    }
  }, [valueId, listOpt]);

  const setValues = (obj) => {
    const value = Object.values(obj).every((data) => data !== "");
    if (value) {
      return { value: obj };
    } else {
      return { value: null };
    }
  };

  return (
    <>
      <div>
        <InputLabel
          style={{
            justifyContent: "space-between",
            fontWeight: "bold",
            alignItems: "flex-start",
            display: "flex",
          }}
        >
          <span>
            {label} {isRequired ? <b style={{ color: "red" }}>*</b> : ""}
          </span>
          {tooltip !== "" ? (
            <TooltipCustom
              title={tooltip}
              placement={"top"}
              style={{
                marginTop: "-2px",
                display: "flex",
              }}
            />
          ) : (
            ""
          )}
        </InputLabel>
      </div>
      <div>
        <Select
        {...itemProps}
        name={name}
        {...setValues(valor)}
        defaultValue={defaultValue}
        isLoading={isLoading}
        autoFocus={autoFocus}
          // maxMenuHeight={maxMenuHeight ? maxMenuHeight : ''}
        menuPlacement={"auto"}
        isDisabled={isDisabled}
        onChange={onChange}
        components={{
          IndicatorSeparator: () => null,
        }}
        placeholder={placeholder}
        styles={errors !== "" ? errorStyle : ""}
        theme={(theme) => ({
          ...theme,
          display: "flex",
          width: "100%",
          height: "800px",
          borderRadius: 3,
          fontSize: "10px",
          colors: {
            ...theme.colors,
            primary25: "#F3F3F3",
          },
        })}
        options={listOpt.map((opt) => ({
          label: opt.name,
          value: opt.id,
          target: { name: optionList, value: opt.id },
        }))}
        />
        <div style={{ color: "red", fontWeight: "blod" }}>
          <span>{errors}</span>
        </div>
      </div>
    </>
  );
};
