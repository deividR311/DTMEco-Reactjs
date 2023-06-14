import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import PermissionsCustomList from '.';

configure({ adapter: new Adapter() });

describe('unit test in component <PermissionsCustomList/>', () => {
    const checked = false;
    const handleToggle = () => {};

   test('should render without crashing', () => {
       mount(
         <PermissionsCustomList
            handleToggle={handleToggle}
            items={[]}
            checked={checked}
         />
       );
   });
});