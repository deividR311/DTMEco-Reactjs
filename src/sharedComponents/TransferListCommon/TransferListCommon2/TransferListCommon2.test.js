import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import TransferListCommon2 from '.';

configure({ adapter: new Adapter() });

describe('unit test in component <TransferListCommon2/>', () => {
    const transferListTitles = ['test', 'test1']
    const handleAssignPermissions = () => {};

   test('should render without crashing', () => {
       mount(
         <TransferListCommon2
            handleAssignPermissions={handleAssignPermissions}
            medium={'create'}
            transferListTitles={transferListTitles}
            classes={{}}
            allOptions={[]}
            allEditOptions={[]}
         />
       );
   });
});