import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { savePlan } from "../../services/RiskService";
import { saveRisks } from "../../services/RiskService";
import { updateRisks } from "../../services/RiskService";
import { deleteRisks } from "../../services/RiskService";



const SweetAlertC = ({ setIsSaved, typeOfAction, planRegister , risksList,  isSaved, setChanges, deletedList}) => {

    async function handleConfirm() {
    setChanges(false)
    if (typeOfAction === "add") {
      await savePlan(planRegister);
      await saveRisks(risksList);
    } else {
      if(deletedList.length>0){
        console.log("voy a eliminar")
      await deleteRisks(deletedList)

      }
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