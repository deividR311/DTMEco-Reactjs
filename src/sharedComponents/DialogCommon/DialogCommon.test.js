import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DialogCommon from '.';

configure({ adapter: new Adapter() });

describe('unit test in component <DialogCommon/>', () => {
    const open = false;
    const confirmCancelDialog = () => {};
    const handleClose = () => {};

   test('should render without crashing', () => {
       mount(
         <DialogCommon
            open={open}
            handleClose={handleClose}
            title={'test'}
            medium={'create'}
            messageEdit={'edit test'}
            messageCreate={'create test'}
            confirmCancelDialog={confirmCancelDialog}
            classes={{}}
         />
       );
   });
});