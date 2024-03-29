import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import Table from "react-bootstrap/Table";
import "./styleRegister.css";

const TableRisk = ({
  riskList,
  setRiskList,
  setChanges,
  deletedRisks,
  setDeleted,
  ownersName,
  impact,
  probability,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    addRow();
  }, []);

  const priority = [
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
    { id: "5", label: "5" },
  ];

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
          id_plan: lastRisk ? lastRisk.id_plan : 0,
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
            [name]: selectedOption.toString(),
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
        setDeleted([...deletedRisks, id]);
      }
      const updatedArrayRisk = riskList.filter((risk) => risk.id_risk !== id);
      setRiskList(updatedArrayRisk);
    } else {
      swal({
        title: "Failed to delete",
        text: "The action plan must have at least one risk",
        icon: "error",
      });
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = riskList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(riskList.length / itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {currentItems.length > 0 && (
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
            {currentItems.map((data, index) => (
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
                <td
                  className={`risk-${data.impact}`}
                  style={{ width: "190px" }}
                >
                  <Select
                    options={impact}
                    isSearchable={false}
                    placeholder="Selecciona una opción"
                    value={impact.find(
                      (option) => option.id.toString() === data.impact
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
                <td
                  className={`risk-${data.probability}`}
                  style={{ width: "200px" }}
                >
                  <Select
                    options={probability}
                    isSearchable={false}
                    placeholder="Selecciona una opción"
                    value={probability.find(
                      (option) => option.id.toString() === data.probability
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
                <td style={{ width: "200px" }}>
                  <Select
                    options={ownersName}
                    isSearchable={true}
                    placeholder="Selecciona una opción"
                    value={ownersName.find(
                      (option) => option.id.toString() === data.owner
                    )}
                    name="owner"
                    onChange={(selectedOption) =>
                      handleSelectedChange(
                        selectedOption.id,
                        "owner",
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
                <td
                  className={`risk-${data.priority}`}
                  style={{ width: "70px" }}
                >
                  <Select
                    options={priority}
                    isSearchable={false}
                    placeholder="Selecciona una opción"
                    value={priority.find(
                      (option) => option.id.toString() === data.priority
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
                    value={data.probability * data.impact}
                    style={{ width: "50px" }}
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
      <div className="pagination">
        <button
          style={{ border: "none" }}
          className="btn"
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={{ border: "none" }}
          className="btn"
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <button
        onClick={addRow}
        style={{ marginLeft: "93%", width: "88px" }}
        className="btn btn-primary"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <br />
      <br />
    </div>
  );
};

export default TableRisk;
