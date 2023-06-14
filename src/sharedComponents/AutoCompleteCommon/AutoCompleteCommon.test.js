import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import AutoCompleteCommon from '.';

configure({ adapter: new Adapter() });

describe('unit test in component <AutoCompleteCommon/>', () => {
    const required = false;
    const handleOnChange = () => {};
    const list = [
      {name: 'Test', lastName: 'test1'}
    ];

   test('should render without crashing', () => {
       mount(
         <AutoCompleteCommon
           list={list}
           item={'name'}
           label={'list'}
           required={required}
           name={'name'}
           handleOnChange={handleOnChange}
           isSecondItem={true}
           secondItem={'lastName'}
         />
       );
   });
});