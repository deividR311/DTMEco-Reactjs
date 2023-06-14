import { useEffect, useState } from 'react';

export const useMaxLength = ( generalInfo, validateLength ) => {

  const [maxLength, setMaxLength] = useState(null);

  useEffect(() => {
    if (
      generalInfo.codeTypeNif === '31' &&
      generalInfo.codeTypePerson === 'PN'
    ) {
      validateLength = true;
      setMaxLength(11);
    }
    if (
      generalInfo.codeTypeNif === '31' &&
      generalInfo.codeTypePerson === 'PJ'
    ) {
      validateLength = true;
      setMaxLength(10);
    }
    if (
      generalInfo.codeTypeNif === '42' &&
      generalInfo.codeTypePerson === 'PJ'
    ) {
      validateLength = true;
      setMaxLength(16);
    }
    if (
      generalInfo.codeTypeNif !== '42' &&
      generalInfo.codeTypeNif !== '31' &&
      generalInfo.codeTypePerson === 'PN'
    ) {
      validateLength = true;
      setMaxLength(10);
    }

    if (!validateLength) {
      setMaxLength(16);
    }
  }, [generalInfo]);

  return [ maxLength ];
}
