import React, { useState, useEffect } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faPenToSquare, faThLarge   } from "@fortawesome/free-solid-svg-icons";

import { deleteAll } from "../../services/RiskService";
import { deletePlan } from "../../services/TaskService";
import { getPlans } from "../../services/TaskService";
import "./styleRegister.css";

export function ListTask() {
  const [planTask, setPlans] = useState([]);

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  useEffect(() => {
    getPlans().then((plan) => {
      const formattedTasks = plan.map((task) => {
        const formattedStartDate = new Date(task.last_update)
          .toISOString()
          .substring(0, 10);
        return {
          ...task,
          last_update: formattedStartDate,
        };
      });
      setPlans(formattedTasks);
    });
  }, []);
//cambiarlo pro la lista tarida del back
  const projectsName = [
    { id: 1, label: "Project Hanks" },
    { id: 2, label: "Kodiak" },
    { id: 3, label: "Code Talkers" },
    { id: 4, label: "Project Blue Book" },
    { id: 5, label: "Project 404" },
  ];


  const deleteP = (id) => {
    swal({
      title: "",
      text: "¿Estás seguro de eliminar este plan de acción?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAll(id);
        deletePlan(id);
      } else {
      }
    });
  };

  return (
    <React.Fragment >
        <div className="container" style={{marginTop:"70px"}}>
      <h1 className="form-title-principal">
        {" "}
        <i className="fas fa-list"></i> Action plan{" "}
        <i className="fas fa-list"></i>
      </h1>
      <br></br>
      <Link to="/addRisk/add">
        <button className="btn btn-success" style={{ marginLeft: "50%" }}>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </Link>

      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <table id="example" className="table table-hover table-bordered">
          <thead className="table-light">
            <tr>
              <th>Project</th>
              <th>Id task</th>
              <th>Task name</th>
              <th>Last update</th>
              <th>Risk count</th>
              <th>Total points</th>
              <th>Matrix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {planTask.map((item, index) => (
              <tr key={item.id_plan}>
                <td>{projectsName.find(project => project.id === item.id_project)?.label || "Proyecto no encontrado"}</td>
                <td>{item.id_task}</td>
                <td>{item.task_name}</td>
                <td>{item.last_update}</td>
                <td>{item.risk_count}</td>
                <td>{item.total_points}</td>
                <td>
                  <Link to={`/matrix/${item.id_plan}`}>
                    <button className="btn">
                    <FontAwesomeIcon icon={faThLarge} />
                    </button>
                  </Link>
                </td>

                <td>
                  <div className="btn-group" role="group" aria-label="">
                  <Link to={`/addRisk/${item.id_plan}`}>
                      <button className="btn">
                      <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </Link>
                    <button
                      className="btn"
                      style={{ marginRight: "10px" }}
                      onClick={() => deleteP(item.id_plan)}
                    >
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </React.Fragment>
  );
}
