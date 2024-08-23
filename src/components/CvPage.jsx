import "../styles/CvPage.css";

export default function CvPage({ personalDetails, education, experience }) {
  // Check if there are any meaningful education fields
  const hasEducation = education.some(
    (edu) =>
      edu.school.trim() !== "" ||
      edu.degree.trim() !== "" ||
      edu.startDate.trim() !== "" ||
      edu.endDate.trim() !== ""
  );

  return (
    <>
      <div className="cvContainer">
        <div className="personalDetailsCv">
          <h2>
            {personalDetails.firstName} {personalDetails.lastName}
          </h2>
          <p>{personalDetails.email}</p>
          <p>{personalDetails.phone}</p>
        </div>

        <div className="education">
          {education.length > 0 && hasEducation && <h2>Education</h2>}
          {education.map((edu) => (
            <div key={edu.id} className="edu-entry">
              {Object.values(edu)
                .filter((_, index) => index !== 0)
                .map((value, index) => (
                  <p key={index}>{value}</p>
                ))}
            </div>
          ))}
        </div>

        {/* <CvSection title="Education" data={education} /> */}
        <CvSection title="Experience" data={experience} />
      </div>
    </>
  );
}

function CvSection({ title, data }) {
  return (
    <div className={title}>
      {Object.values(data).some(Boolean) && <h2>{title}</h2>}
      {Object.values(data).map((value, index) => (
        <p key={index}>{value}</p>
      ))}
    </div>
  );
}
