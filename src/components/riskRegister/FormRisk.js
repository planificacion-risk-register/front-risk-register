import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const FormRisk = ({ task, setTask, setChanges, projectsName }) => {
  const handleOnChange = (e) => {
    setChanges(true);
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSelectProject = (selectedOption, name) => {
    console.log(selectedOption);
    setChanges(true);
    setTask({
      ...task,
      [name]: selectedOption,
    });
  };


  return (
    <div>
      {task && (
        <Form style={{ maxWidth: "1000px", margin: "auto" }}>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3" controlId="id_project">
                <Form.Label>Project name</Form.Label>
                <Select
                  options={projectsName}
                  isSearchable={true}
                  placeholder="Select a project"
                  name="id_project"
                  value={projectsName.find(
                    (option) => option.id === task.id_project
                  )}
                  onChange={(selectedOption) =>
                    handleSelectProject(selectedOption.id, "id_project")
                  }
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3" controlId="task_name">
                <Form.Label>Task name</Form.Label>
                <Form.Control
                  type="text"
                  name="task_name"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </div>
          </div>
          <br></br>
        </Form>
      )}
    </div>
  );
};
export default FormRisk;
