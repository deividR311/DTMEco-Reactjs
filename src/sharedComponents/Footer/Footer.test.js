import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Footer from '.';

configure({ adapter: new Adapter() });

describe('unit test in component <Footer/>', () => {
  test('should render without crashing', () => {
    mount(
      <Footer
      />
    );
  });
});