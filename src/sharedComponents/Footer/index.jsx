import React from "react";

const Footer = ({ buttons = "", position = "60%" }) => {
  const date = new Date();
  const year = date.getFullYear();
  const floadButtons = {
    position: "relative",
    display: "flex",
    left: position,
  };

  return (
    <>
      <footer className="footer__position" style={{ zIndex: "2" }}>
        <article className="container-fluid">
          <div style={floadButtons}>{buttons}</div>
        </article>
        <article
          className="container-fluid login__ecoFooter p-0"
          style={{ zIndex: "4" }}
        >
          <div className="row login__footerCopyrights">
            <span className="col-sm-12">
              Todos los derechos reservados {year}
            </span>
          </div>
        </article>
      </footer>
    </>
  );
};

export default Footer;
