import React from "react";

const LoadingComponent = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="align-self-center">
          <div
            className="spinner-grow"
            role="status"
            style={{ width: "5em", height: "5em", color: "#282c34" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default LoadingComponent;
