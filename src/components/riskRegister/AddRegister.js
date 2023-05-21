import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import SweetAlertC from "../sweetAlert/sweetAlert";

import TableRisk from "./TableRisk";
import FormRisk from "./FormRisk";
import { getRisksByIdPlan } from "../../services/RiskService";


export function AddRisk() {
  //const { id } = useParams();
  const id = 3;
  useEffect(() => {
    if (id != "add") {
      getRisksByIdPlan(id).then((risks) => {
        setRiskList(risks);
      });
      console.log("Hola ",riskList)
    }
  }, []);

  const [riskList, setRiskList] = useState([]);
  const [changesMade, setChanges] = useState(false);
  const [showMessage, setMessage] = useState("changes pending to be save...");
  const [projectsName, setProjects] = useState([]);
  const [deletedRisks, setDeleted] = useState([{id_risk: 0}]);
  const [isPlanSaved, setSaved] = useState(false);
  const [planRegister, setPlan] = useState({
    id_task: 0,
    project_name: "",
    task_name: "",
  });

  const projectsName2 = [
    { id: "1", label: "Project Hanks" },
    { id: "2", label: "Kodiak" },
    { id: "3", label: "Code Talkers" },
    { id: "4", label: "Project Blue Book" },
    { id: "5", label: "Project 404" },
  ];

  const saveInformation = () => {
    const lastRisk = riskList[riskList.length - 1];
    if (riskList.length <= 1) {
      if (
        !lastRisk ||
        !lastRisk.risk_description ||
        !lastRisk.impact ||
        !lastRisk.probability ||
        !lastRisk.priority
      ) {
        swal({
          title: "Error saving",
          text: "To save you must have at least one risk",
          icon: "error",
        });
      } else {
        setSaved(true);
      }
    } else {
      setSaved(true);
    }
  };

  const cancelChanges = () => {
    swal({
      title: "Are you sure to return to the main page?",
      text: "",
      icon: "warning",
      buttons: ["Cancel", "Accept"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log("Volví a página principal");
      } else {
        console.log("Sigo en la misma página");
      }
    });
  };

  return (
    <div className="container shadow" style={{ padding: 0 }}>
      <div className="form-title">Risk register details</div>
      <br />
      <Button
        variant="success"
        style={{ marginLeft: "86%" }}
        onClick={saveInformation}
      >
        <FontAwesomeIcon icon={faFloppyDisk} /> Save
      </Button>{" "}
      <Button variant="warning" onClick={cancelChanges}>
        <FontAwesomeIcon icon={faFloppyDisk} /> Cancel
      </Button>
      {changesMade && (
        <span
          style={{
            fontWeight: "bold",
            color: "red",
            marginLeft: "80%",
          }}
        >
          {showMessage}
        </span>
      )}
      {id !== "add" ? (
        <>
          {riskList.length > 0 && Object.keys(planRegister).length > 0 && (
            <>
              <FormRisk
                task={planRegister}
                setTask={setPlan}
                setChanges={setChanges}
                projectsName={projectsName2}
              />
              <TableRisk
                riskList={riskList}
                setRiskList={setRiskList}
                setChanges={setChanges}
                deletedRisks={deletedRisks}
                setDeleted={setDeleted}
              />
            </>
          )}
        </>
      ) : (
        <>
          <FormRisk
            task={planRegister}
            setTask={setPlan}
            setChanges={setChanges}
            projectsName={projectsName2}
          />
          <TableRisk
            riskList={riskList}
            setRiskList={setRiskList}
            setChanges={setChanges}
            deletedRisks={deletedRisks}
            setDeleted={setDeleted}
          />
        </>
      )}
      {isPlanSaved && (
        <SweetAlertC
          setIsSaved={setSaved}
          typeOfAction={id}
          planRegister={planRegister}
          risksList={riskList}
          isSaved={isPlanSaved}
          setChanges={setChanges}
          deletedList={deletedRisks}
        />
      )}
    </div>
  );
}
