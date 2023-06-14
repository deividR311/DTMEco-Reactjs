import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import NumberTextField from '.';
import classes from '*.module.css';

configure({ adapter: new Adapter() });

describe('unit test in component <MultilineTextFieldCommon/>', () => {
  const handleChange = () => { };
  const nif = 120022747;
  const maxCharacterLength = 10;
  const required = true;
  const disabled = true;
  const isIndicative = true;

  test('should render without crashing', () => {
    mount(
      <NumberTextField
        name={'exampleInputName'}
        label={'exampleInputLable'}
        value={nif}
        handleChange={handleChange}
        classes={classes.classes}
        maxCharacterLength={maxCharacterLength}
        required={required}
        disabled={disabled}
        isIndicative={isIndicative}
      />
    );
  });

});