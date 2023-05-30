import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { saveTask } from "../../services/TaskService";
import { updateTask } from "../../services/TaskService";
import { saveRisks } from "../../services/RiskService";
import { updateRisks } from "../../services/RiskService";
import { deleteRisks } from "../../services/RiskService";

const SweetAlertC = ({
  setIsSaved,
  typeOfAction,
  planRegister,
  risksList,
  isSaved,
  setChanges,
  deletedList,
}) => {
  console.log("estoy a punto de guardar",risksList)
  async function handleConfirm() {
    const today = new Date().toISOString().substr(0, 10);
    const totalPoints = calculateTotalPoints();
    planRegister.total_points = totalPoints;
    planRegister.last_update = today;
    setChanges(false);
    if (typeOfAction === "add") {

      planRegister.risk_count = risksList.length + 1;

      await saveTask(planRegister);

      await saveRisks(risksList);

    } else {

      if (deletedList.length > 0) {
        console.log("voy a eliminar");
        await deleteRisks(deletedList);
      }
      planRegister.risk_count = risksList.length + 1 - deletedList.length;
      
      await updateTask(planRegister);

      await updateRisks(risksList);
    }

    swal({
      title: "Saved!",
      text: "Do you return to the principal page?",
      icon: "warning",
      buttons: ["Cancel", "Accept"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        window.location.href = "/";
        setIsSaved(false);
      } else {
        setIsSaved(false);
      }
    });
  }

  const calculateTotalPoints = () => {
    const totalPoints = risksList.reduce((sum, risk) => {
      if (deletedList.includes(risk.id_risk)) {
        return sum; // Excluir riesgo eliminado de la suma total
      }
      const impact = parseInt(risk.impact);
      const probability = parseInt(risk.probability);
      const points = impact * probability;
      return sum + points;
    }, 0);

    return totalPoints;
  };

  useEffect(() => {
    if (isSaved) {
      swal({
        title: "Are you sure to save this action plan",
        text: "",
        icon: "warning",
        buttons: ["Cancel", "Accept"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          handleConfirm();
        } else {
          setIsSaved(false);
        }
      });
    }
  }, [isSaved]);

  return null;
};

export default SweetAlertC;
