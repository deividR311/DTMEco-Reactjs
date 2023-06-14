import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import TransferListCommon from '.';

configure({ adapter: new Adapter() });

describe('unit test in component <TransferListCommon/>', () => {
    const transferListTitles = ['test', 'test1']
    const handleAssignPermissions = () => {};

   test('should render without crashing', () => {
       mount(
         <TransferListCommon
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