import { formatData } from "../../utils";

const Education = ({ profile, deleteEducation }) => {
  return (
    <div>
      {profile.education.map((edu) => console.log("edu._id", edu._id) (
        
        <div key={edu._id} className="container">
          {deleteEducation !== undefined ? (
            <div>
              <a
                href="#!"
                onClick={() => {
                  deleteEducation(edu._id);
                }}
              >
                <i className="fas fa-trash delete" />
              </a>
            </div>
          ) : null}

          <p>
            &#127891; {edu.current ? "Studies" : "Studied"} <b>{edu.degree}</b>{" "}
            of <b>{edu.fieldofstudy}</b> at <b>{edu.school}</b>
          </p>
          <small>
            from {formatData(edu.from)} to{" "}
            {edu.current ? "Current" : formatData(edu.to)}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Education;
