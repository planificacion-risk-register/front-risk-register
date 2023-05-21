import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { savePlan } from "../../services/RiskService";
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
  const today = new Date().toISOString().substr(0, 10);
  const totalPoints = calculateTotalPoints();

  async function handleConfirm() {
    //  planRegister.lastUpdate=today
    setChanges(false);
    if (typeOfAction === "add") {
      // planRegister.riskCount = (risksList.length + 1);
      await savePlan(planRegister);
      await saveRisks(risksList);
    } else {
      if (deletedList.length > 0) {
        console.log("voy a eliminar");
        await deleteRisks(deletedList);
      }
      //planRegister.riskCount = (risksList.length + 1)-deletedList.length;
      //await planUpdate(planRegister);
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
