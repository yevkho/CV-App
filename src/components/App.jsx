import { useState } from "react";
import InfoPanel from "./InfoPanel";
import CvPage from "./CvPage";

export default function App() {
  //State 1 - personal details
  const [personalDetails, setPersonalDetails] = useState("");

  //State 2 - education
  const [education, setEducation] = useState([
    {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
    },
  ]);

  //State 3 - experience
  const [experience, setExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
  });

  return (
    <>
      <InfoPanel
        setPersonalDetails={setPersonalDetails}
        education={education}
        setEducation={setEducation}
        experience={experience}
        setExperience={setExperience}
      />
      <CvPage
        personalDetails={personalDetails}
        education={education}
        experience={experience}
      />
    </>
  );
}
