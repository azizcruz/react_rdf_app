import React from "react";

export default function LoadingSpinner() {
  return (
    <div>
      <div className="lds-css ng-scope">
        <div
          className="lds-spinner"
          id="lds-spinner"
          style={{ width: 100 + "%", height: 100 + "%" }}
        >
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}
