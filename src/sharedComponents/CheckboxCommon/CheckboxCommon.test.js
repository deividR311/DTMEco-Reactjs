import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import CheckboxCommon from '.';

configure({ adapter: new Adapter() });

describe('unit test in component <CheckboxCommon/>', () => {
    const checked = false;
    const handleOnChange = () => {};

   test('should render without crashing', () => {
       mount(
         <CheckboxCommon
            handleChange={handleOnChange}
            label={'test'}
            checked={checked}
         />
       );
   });
});