import "./styleRegister.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

const TableRisk = ({
  riskList,
  setRiskList,
  setChanges,
  deletedRisks,
  setDeleted,
}) => {
  useEffect(() => {
    addRow();
  }, []);

  const owners = [
    { id: "1", nombre: "Propietario 1", edad: 30 },
    { id: "2", nombre: "Propietario 2", edad: 35 },
    { id: "3", nombre: "Propietario 3", edad: 28 },
    // Más objetos de propietarios
  ];
  const probability = [
    { id: "1", label: "Rare 1" },
    { id: "2", label: "Unlikely 2" },
    { id: "3", label: "Moderate 3" },
    { id: "4", label: "likely 4" },
    { id: "5", label: "Almost certain 5" },
  ];

  const impact = [
    { id: "1", label: "Insignificant 1" },
    { id: "2", label: "Minor 2" },
    { id: "3", label: "Significant 3" },
    { id: "4", label: "Major 4" },
    { id: "5", label: "Severe 5" },
  ];

  const priority = [
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
    { id: "5", label: "5" },
  ];

  const ownersName = owners.map((propietario) => ({
    id: propietario.id,
    label: propietario.nombre,
  }));

  const addRow = () => {
    const lastRisk = riskList[riskList.length - 1];
    if (
      lastRisk &&
      (!lastRisk.risk_description ||
        !lastRisk.impact ||
        !lastRisk.probability ||
        !lastRisk.priority)
    ) {
      console.log("Ya existe una nueva línea", lastRisk);
    } else {
      setRiskList([
        ...riskList,
        {
          id_risk: riskList.length
            ? riskList[riskList.length - 1].id_risk + 1
            : 1,
          risk_description: "",
          id_plan: lastRisk ? lastRisk.idPlan : 0, 
          impact_description: "",
          impact: "",
          probability: "",
          owner: "",
          response_plan: "",
          priority: "",
          point: "",
          newT: true,
        },
      ]);
    }
  };

  const handleSelectedChange = (selectedOption, name, id) => {
    setRiskList(
      riskList.map((risk) => {
        if (risk.id_risk === id) {
          return {
            ...risk,
            [name]: selectedOption,
          };
        } else {
          return risk;
        }
      })
    );
  };

  const handleRiskChange = (e, id) => {
    setChanges(true);
    setRiskList(
      riskList.map((risk) => {
        if (risk.id_risk === id) {
          return {
            ...risk,
            [e.target.name]: e.target.value,
          };
        } else {
          return risk;
        }
      })
    );
  };

  function deleteRisk(id, newT) {
    if (riskList.length > 1) {
      if (newT) {
      } else {
        const newRisk = { id_risk: id };
        setDeleted([...deletedRisks, newRisk]);
      }
      const updatedArrayRisk = riskList.filter((risk) => risk.id_risk !== id);
      setRiskList(updatedArrayRisk);
    } else {
      swal({
        title: "Failed to delete",
        text: "The action plan must have at least one risk",
        icon: "error",
      });
      //mensaje un plan de acción al menos debe tener una línea
    }
  }
console.log(deletedRisks)
  return (
    <div>
      {riskList.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Risk</th>
              <th>Impact description</th>
              <th>Impact</th>
              <th>Probability</th>
              <th>Owner</th>
              <th>Response plan</th>
              <th>Priority</th>
              <th>Point</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {riskList.map((data, index) => (
              <tr key={data.id_risk}>
                <td>{data.id_risk}</td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    name="risk_description"
                    defaultValue={data.risk_description}
                    onChange={(e) => handleRiskChange(e, data.id_risk)}
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    name="impact_description"
                    defaultValue={data.impact_description}
                    onChange={(e) => handleRiskChange(e, data.id_risk)}
                  />
                </td>
                <td className={`risk-${data.impact}`} >
                  <Select
                    options={impact}
                    isSearchable={false}
                    placeholder="Selecciona una opción"
                    value={impact.find(
                      (option) => option.id === data.impact
                    )}
                    name="impact"
                    classNamePrefix="css-1hwfws3"
                    onChange={(selectedOption) =>
                      handleSelectedChange(
                        selectedOption.id,
                        "impact",
                        data.id_risk
                      )
                    }
                  />
                </td>
                <td className={`risk-${data.probability}`}>
                  <Select
                    options={probability}
                    isSearchable={false}
                    placeholder="Selecciona una opción"
                    value={probability.find(
                      (option) => option.id === data.probability
                    )}
                    name="probability"
                    classNamePrefix="css-1hwfws3"
                    onChange={(selectedOption) =>
                      handleSelectedChange(
                        selectedOption.id,
                        "probability",
                        data.id_risk
                      )
                    }
                  />
                </td>
                <td>
                  <Select
                    options={ownersName}
                    isSearchable={true}
                    placeholder="Selecciona una opción"
                    value={ownersName.find(
                      (option) => option.id === data.owner
                    )}
                    name="owner"
                    onChange={(selectedOption) =>
                      handleSelectedChange(
                        selectedOption.id,
                        "owner_name",
                        data.id_risk
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    name="response_plan"
                    defaultValue={data.response_plan}
                    onChange={(e) => handleRiskChange(e, data.id_risk)}
                  />
                </td>
                <td className={`risk-${data.priority}`}>
                  <Select
                    options={priority}
                    isSearchable={false}
                    placeholder="Selecciona una opción"
                    value={priority.find(
                      (option) => option.id === data.priority
                    )}
                    name="priority"
                    classNamePrefix="css-1hwfws3"
                    onChange={(selectedOption) =>
                      handleSelectedChange(
                        selectedOption.id,
                        "priority",
                        data.id_risk
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    disabled
                    name="point"
                    value={data.probability*data.impact}
                    style={{width:"55px"}}
                  />
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      deleteRisk(data.id_risk, data.newT);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <button
        onClick={addRow}
        style={{ marginLeft: "93%", width: "88px" }}
        className="btn btn-primary"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <br></br>
      <br></br>
    </div>
  );
};

export default TableRisk;
