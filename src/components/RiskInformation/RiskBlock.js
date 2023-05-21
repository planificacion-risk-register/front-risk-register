import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./block.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const RiskBlock = ({ riskList, setDisplayChange }) => {
  return (
    <div className="container">
      <div className="table-wrapper-scroll-y">
        {riskList.map((data, index) => (
          <Form style={{ maxWidth: "1000px", margin: "auto" }}>
            <div className="row">
              <div className="col">
                <label class="form-label">Id Risk</label>
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={data.id_risk}
                />
              </div>
              <div className="col">
                <label class="form-label">Impact</label>
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={data.impact}
                />
              </div>
              <div className="col">
                <label class="form-label">Probability</label>
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={data.probability}
                />
              </div>
              <div className="col">
                <label class="form-label">Priority</label>
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={data.priority}
                />
              </div>
              <div className="col">
                <label class="form-label">Point</label>
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={data.impact * data.probability}
                />
              </div>
            </div>
            <br></br>

            <div class="mb-3 row">
              <label className="col-sm-2 col-form-label">
                Risk description
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={data.risk_description}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" className="col-sm-2 col-form-label">
                Impact Description
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={data.impact_description}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" className="col-sm-2 col-form-label">
                Responsable plan
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={data.response_plan}
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" className="col-sm-2 col-form-label">
                Owner
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={data.owner}
                />
              </div>
            </div>
          </Form>
        ))}
        <a href="" style={{marginLeft:"90%", fontSize: "20px"}}>
        Return{" "}
        <FontAwesomeIcon icon={faRotateLeft}></FontAwesomeIcon>
        </a>
       <br></br>
       <br></br>
      </div>
    </div>
  );
};

export default RiskBlock;
