import React from "react";
import "../styles/css/footer-component.css";

const FooterComponent = (props) => {
  return (
    <div className="posisiFooter">
      <div className="bg-light text-center p-3 d-flex justify-content-between">
        <div></div>
        <div>
          <h6
            style={{ color: "#B43D66" }}
            className="align-middle mt-2 text-dark"
          >
            ©2023 Astronacci
          </h6>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FooterComponent;
