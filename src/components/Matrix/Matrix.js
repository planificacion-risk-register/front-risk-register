import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import RiskBlock from "../RiskInformation/RiskBlock";
import "./RiskMatrix.css";
import { getRisksByIdPlan } from "../../services/RiskService";

const probability = [
  { value: "1", label: "Rare 1" },
  { value: "2", label: "Unlikely 2" },
  { value: "3", label: "Moderate 3" },
  { value: "4", label: "Likely 4" },
  { value: "5", label: "Almost certain 5" },
];

const impact = [
  { value: "1", label: "Insignificant 1" },
  { value: "2", label: "Minor 2" },
  { value: "3", label: "Significant 3" },
  { value: "4", label: "Major 4" },
  { value: "5", label: "Severe 5" },
];

const Matrix = () => {
  const [risk, setRisk] = useState([]);
  const { id } = useParams();
  const [riskList, setRiskList] = useState([
    { impact: "", posibility: "", risk_count: 0 },
  ]);

  const [riskInformation, setRiskInformation] = useState([]);
  const [displayChange, setDisplayChange] = useState(false);
  
  useEffect(() => {
    getRisksByIdPlan(id).then((risks) => {
      setRisk(risks);
    });

    if (risk.length > 0) {
      addRiskMatrix();
    }
  }, [risk]);
  

  function addRiskMatrix() {
    const riskMatrix = [];

    risk.forEach((data) => {
      const existingRiskIndex = riskMatrix.findIndex(
        (risk) =>
          risk.impact === data.impact && risk.probability === data.probability
      );

      if (existingRiskIndex !== -1) {
        riskMatrix[existingRiskIndex].risk_count += 1;
      } else {
        riskMatrix.push({
          impact: data.impact,
          probability: data.probability,
          risk_count: 1,
        });
      }
    });

    setRiskList(riskMatrix);
  }

  function handleClick(probability, impact) {
    console.log(probability, " - ", impact)
    const filteredRisks = risk.filter((data) => data.impact === impact && data.probability === probability);
    setRiskInformation(filteredRisks);
  setDisplayChange(true);
  }
  
  return (
    <div className="container">
       <div className="vertical-text">IMPACT</div>
       <div className="vertical-text-TWO">What is the probability the risk wil happen?</div>
      <div className="text">PROBABILITY</div>
      <div className="subtext">How severe would the outcomes be if the risk ocurred?</div>
      <br></br>
      {riskList.length > 1 && (
        <table className="risk-matrix">
          <thead>
            <tr>
              <th></th>
              {probability.map((p) => (
                <th key={p.value}>{p.label}</th>
              ))}
            </tr>
          </thead>
<tbody>
  {impact.map((i, indexA) => (
    <tr key={i.value}>
      <th className="vertical-label">{i.label}</th> {/* Nueva columna */}
      {probability.map((j, indexB) => {
        const risk = riskList.find(
          (data) =>
            data.impact === i.value && data.probability === j.value
        );

        return (
          <td
            key={j.value}
            className={`risk-${i.value}-${j.value}`}
            style={{ width: "150px", height: "100px" }}
            onClick={(e) => handleClick(j.value, i.value)}
          >
            {risk ? `Risk count: ${risk.risk_count}` : null}
            <br></br>
            {risk
              ? `Total point ${risk.risk_count * i.value * j.value}`
              : null}
          </td>
        );
      })}
    </tr>
  ))}
</tbody>

        </table>
      )}
      <br></br> <br></br>
      {displayChange && (
        <RiskBlock
          riskList={riskInformation}
          setDisplayChange={setDisplayChange}
        ></RiskBlock>
      )}
    </div>
  );
};

export default Matrix;
