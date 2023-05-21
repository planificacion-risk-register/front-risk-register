import React from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import "./block.css";

const RiskBlock = ({ riskList, setDisplayChange }) => {
  return (
    <div className="container">
      <div className="table-wrapper-scroll-y">
        {riskList.map((data, index) => (
          <div className="risk-block">
            <Form className="risk-form">
              <div className="row">
                <div className="col">
                  <label className="form-label">Id Risk</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={data.id_risk}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Impact</label>
                  <input
                    type="text"
                    readOnly
                    className={`form-control-plaintext risk-${data.impact}`}
                    value={data.impact}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Probability</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={data.probability}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Priority</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={data.priority}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Point</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={data.impact * data.probability}
                  />
                </div>
              </div>
              <br />

              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                  Risk description
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={data.risk_description}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                  Impact Description
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={data.impact_description}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">
                  Responsable plan
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={data.response_plan}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Owner</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={data.owner}
                  />
                </div>
              </div>
            </Form>
          </div>
        ))}
        <a href="" className="return-link">
          Return{" "}
          <FontAwesomeIcon icon={faRotateLeft}></FontAwesomeIcon>
        </a>
        <br />
        <br />
      </div>
    </div>
  );
};

export default RiskBlock;
