import React from 'react';
import { mount, configure } from "enzyme";
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import NavBreadCrumb from '.';


configure({ adapter: new Adapter() });

describe('unit test in component <NavBreadCrumb/>', () => {
  const path = [
    { path: "/", active: "", word: "Inicio" }
  ];
  test('should render without crashing', () => {
    mount(
      <Router>
        <NavBreadCrumb
          path={path}
        />
      </Router>
    );
  });
});