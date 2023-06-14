import React from "react";
import { mount, configure } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { AdminListUsers } from "..";
import AdminContext from "../../../../context/Administration/adminContext";

configure({ adapter: new Adapter() });

describe("unit test in component <AdminListUsers />", () => {

  test("should render without crashing", () => {
    const loadAllUsers = jest.fn();

    mount(
        <Router>
          <AdminContext.Provider
            value={{
              allUsers: [],
              loadAllUsers: loadAllUsers,
            }}
          >
            <AdminListUsers />
          </AdminContext.Provider>
        </Router>
      );
  });
});
