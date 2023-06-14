import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import PermissionsButtons from '.';

configure({ adapter: new Adapter() });

describe('unit test in component <PermissionsButtons/>', () => {
    const leftChecked = false;
    const rightChecked = false;
    const handleAllRight = () => {};
    const handleCheckedRight = () => {};
    const handleCheckedLeft = () => {};
    const handleAllLeft = () => {};

   test('should render without crashing', () => {
       mount(
         <PermissionsButtons
            classes={{}}
            handleAllRight={handleAllRight}
            left={[]}
            handleCheckedRight={handleCheckedRight}
            leftChecked={leftChecked}
            handleCheckedLeft={handleCheckedLeft}
            handleAllLeft={handleAllLeft}
            right={[]}
            rightChecked={rightChecked}
         />
       );
   });
});