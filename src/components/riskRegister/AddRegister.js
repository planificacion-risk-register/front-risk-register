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
import { getPlanById } from "../../services/TaskService";
import { getProjects } from "../../services/SecondaryTables";
import { getOwners } from "../../services/SecondaryTables";
import { getProbability } from "../../services/SecondaryTables";
import { getImpacts } from "../../services/SecondaryTables";


export function AddRisk() {
  const { id } = useParams();
  const [riskList, setRiskList] = useState([]);
  const [changesMade, setChanges] = useState(false);
  const [showMessage, setMessage] = useState("changes pending to be save...");
  const [projectsName, setProjects] = useState([]);
  const [owners, setOwners] = useState([]);
  const [probability, setProbability] = useState([]);
  const [impact, setImpact] = useState([]);
  const [deletedRisks, setDeleted] = useState([]);
  const [isPlanSaved, setSaved] = useState(false);
  const [planRegister, setPlan] = useState({
    id_task: 0,
    project_name: "",
    task_name: "",
  });

  useEffect(() => {
    if (id != "add") {
      getRisksByIdPlan(id).then((risks) => {
        setRiskList(risks);
      });
      getPlanById(id).then((plan) => {
        setPlan(plan);
      });
    }

    getProjects().then((project) => {
      setProjects(project);
    });

    getOwners().then((owner) => {
      setOwners(owner);
      console.log("holi",owner)
    });

    getProbability().then((probability) => {
      setProbability(probability);
    });

    getImpacts().then((impact) => {
      setImpact(impact);
    });
    
  }, []);


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
        window.location.href = "/";
      } else {
        console.log("Sigo en la misma página");
      }
    });
  };

  console.log("HOLA",owners)
  return (

    <div className="container shadow" style={{ padding: 0, marginTop: "50px" }}>
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
                projectsName={projectsName}
              />
              <TableRisk
                riskList={riskList}
                setRiskList={setRiskList}
                setChanges={setChanges}
                deletedRisks={deletedRisks}
                setDeleted={setDeleted}
                ownersName= {owners} 
                probability ={probability}
                impact = {probability}
              />
            </>
          )}
        </>
      ) : owners.length>0 && probability.length>0 && impact.length >0 &&(
        <>
          <FormRisk
            task={planRegister}
            setTask={setPlan}
            setChanges={setChanges}
            projectsName={projectsName}
          />
          <TableRisk
            riskList={riskList}
            setRiskList={setRiskList}
            setChanges={setChanges}
            deletedRisks={deletedRisks}
            setDeleted={setDeleted}
            ownersName= {owners} 
            probability ={probability}
            impact = {probability}
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
