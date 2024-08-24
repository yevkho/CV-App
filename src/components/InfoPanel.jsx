import { useState, useEffect } from "react";
import "../styles/InfoPanel.css";

// INFOPANEL IS REDUNDANT AND COULD BE ELIMINATED AND ITS STATE PUT IN APP COMPONENT
export default function InfoPanel(props) {
  //State 1 - shared index
  const [sharedIndex, setSharedIndex] = useState(1);

  return (
    <>
      <div className="infoPanelContainer">
        <PersonalDetails
          setPersonalDetails={props.setPersonalDetails}
          isActive={sharedIndex === 1}
          switchSharedIndex={(n) => setSharedIndex(n)}
        />
        <EducationDetails
          education={props.education}
          setEducation={props.setEducation}
          isActive={sharedIndex === 2}
          switchSharedIndex={(n) => setSharedIndex(n)}
        />

        <ExperienceDetails
          experience={props.experience}
          setExperience={props.setExperience}
          isActive={sharedIndex === 3}
          switchSharedIndex={(n) => setSharedIndex(n)}
        />
      </div>
    </>
  );
}

// 1) PERSONAL DETAILS
function PersonalDetails(props) {
  //State 1 - form inputs
  const [formInputs, setFormInputs] = useState("");

  function handleFormInputChange(e) {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    props.setPersonalDetails(formInputs);
    props.switchSharedIndex(0);
  }

  function handleEditButton() {
    props.switchSharedIndex(1);
  }

  return (
    <div
      className={
        props.isActive ? "personalDetails" : "personalDetails inactive"
      }
    >
      <h3>Personal Detail</h3>
      {props.isActive ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            First name:{" "}
            <input
              name="firstName"
              value={formInputs.firstName}
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            Last name:{" "}
            <input
              name="lastName"
              value={formInputs.lastName}
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            email:{" "}
            <input
              type="email"
              name="email"
              value={formInputs.email}
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            phone:{" "}
            <input
              type="phone"
              name="phone"
              value={formInputs.phone}
              onChange={handleFormInputChange}
            />
          </label>
          <button>Submit</button>
        </form>
      ) : (
        <button className="edit" onClick={handleEditButton}>
          Edit
        </button>
      )}
    </div>
  );
}

//2) EDUCATION DETAILS
function EducationDetails(props) {
  //State 1 - form inputs
  const [formInputs, setFormInputs] = useState(props.education);

  // useEffect(() => {
  //   setFormInputs(props.education);
  // }, [props.education]);

  function handleFormInputChange(e) {
    // setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    setFormInputs(
      formInputs.map((edu) =>
        e.target.id === edu.id
          ? { ...edu, [e.target.name]: e.target.value }
          : edu
      )
    );
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    props.setEducation(formInputs);
    props.switchSharedIndex(0);
  }

  function handleEditButton() {
    props.switchSharedIndex(2);
  }

  //new
  function handleAddEducationButton() {
    setFormInputs([
      ...props.education,
      {
        id: crypto.randomUUID(),
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ]);
  }

  function handleRemoveButton(e) {
    e.preventDefault();
    if (Object.values(props.education[0]).some(Boolean)) {
      props.setEducation(
        props.education.filter((edu) => e.target.id !== edu.id)
      );
      //ADDED THIS TO EXCLUDE useEffect function
      setFormInputs(formInputs.filter((edu) => e.target.id !== edu.id));
    } else {
      return;
    }
  }

  return (
    <div
      className={
        props.isActive ? "educationDetails" : "educationDetails inactive"
      }
    >
      <h3>Education</h3>
      {props.isActive ? (
        <>
          {formInputs.map((edu) => (
            <form key={edu.id}>
              <label>
                School:{" "}
                <input
                  id={edu.id}
                  name="school"
                  value={edu.school}
                  onChange={handleFormInputChange}
                />
              </label>
              <label>
                Degree:{" "}
                <input
                  id={edu.id}
                  name="degree"
                  value={edu.degree}
                  onChange={handleFormInputChange}
                />
              </label>
              <label>
                Start Date:{" "}
                <input
                  id={edu.id}
                  type="date"
                  name="startDate"
                  value={edu.startDate}
                  onChange={handleFormInputChange}
                />
              </label>
              <label>
                End Date:{" "}
                <input
                  id={edu.id}
                  type="date"
                  name="endDate"
                  value={edu.endDate}
                  onChange={handleFormInputChange}
                />
              </label>

              <button
                id={edu.id}
                className="romeve-button"
                onClick={handleRemoveButton}
              >
                Remove
              </button>
            </form>
          ))}
          <button onClick={handleFormSubmit} className="submit-button">
            Submit
          </button>
          <button onClick={handleAddEducationButton}>Add</button>
        </>
      ) : (
        <button className="edit" onClick={handleEditButton}>
          Edit
        </button>
      )}
    </div>
  );
}

//3) EXPERIENCE DETAILS
function ExperienceDetails(props) {
  //State 1 - form inputs
  const [formInputs, setFormInputs] = useState(props.experience);

  function handleFormInputChange(e) {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    props.setExperience(formInputs);
    props.switchSharedIndex(0);
  }

  function handleEditButton() {
    props.switchSharedIndex(3);
  }

  return (
    <div
      className={
        props.isActive ? "experienceDetails" : "experienceDetails inactive"
      }
    >
      <h3>Experience</h3>
      {props.isActive ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Company:{" "}
            <input
              name="company"
              value={formInputs.company}
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            Position:{" "}
            <input
              name="position"
              value={formInputs.position}
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            Start Date:{" "}
            <input
              type="date"
              name="startDate"
              value={formInputs.startDate}
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            End Date:{" "}
            <input
              type="date"
              name="endDate"
              value={formInputs.endDate}
              onChange={handleFormInputChange}
            />
          </label>
          <button>Submit</button>
        </form>
      ) : (
        <button className="edit" onClick={handleEditButton}>
          Edit
        </button>
      )}
    </div>
  );
}
