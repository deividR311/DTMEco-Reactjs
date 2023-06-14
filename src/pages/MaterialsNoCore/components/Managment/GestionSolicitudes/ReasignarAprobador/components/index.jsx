import { SearchSelect } from "../../../../../../../sharedComponents/SearchSelectCommon"

export const InputSelectModal = ({ data, valueId, onChange }) => {
  return (
    <>
      <SearchSelect
        itemProps={{ maxMenuHeight: 150 }}
        maxMenuHeight={150}
        placeholder={'Seleccione un catalogador'}
        label={'Aprobador'}
        onChange={onChange}
        listOpt={data}
        valueId={valueId}
        optionList={'listCataloger'}
      />
    </>
  )
}