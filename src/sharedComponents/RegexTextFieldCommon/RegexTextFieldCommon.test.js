import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import classes from '*.module.css';
import RegexTextFieldCommon from ".";

configure({ adapter: new Adapter() });


describe('unit test in component <RegexTextFieldCommon/>', () => {
  test('should render without crashing', () => {
    const handleChange = () => { };
    const email = "correo@dominio.com.co";
    const nameInput = "exampleNameInput"
    const onSearchMock = jest.fn();
    const event = {
      preventDefault() { },
      target: { value: email, name: nameInput }
    };
    const component = mount(
      <RegexTextFieldCommon
        label={"exampleLabelInput"}
        name={nameInput}
        value={email}
        classes={classes.classes}
        disabled={true}
        required={true}
        handleChange={handleChange}
        regex={/\S+@\S+\.\S+/g}
        maxCharacterLength={100}
        medium={"editar"}
      />
    );
    component.find('input').simulate('change', event);
    expect(component.find('input').get(0).props.value).toEqual(email);
  });
});