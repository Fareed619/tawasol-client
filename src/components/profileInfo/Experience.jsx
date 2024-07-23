import { formatData } from "../../utils";

const Experience = ({ profile, deleteExperience }) => {
  return (
    <div>
      {profile.experience.map((exp) => (
        <div key={exp._id} className="container">
          {deleteExperience !== undefined ? (
            <div>
              <a
                href="#!"
                onClick={() => {
                  deleteExperience(exp._id);
                }}
              >
                <i className="fas fa-trash delete" />
              </a>
            </div>
          ) : null}

          <p>
            &#128188; {exp.current? "works" : "Worked"} as <b> {exp.title}</b>
            at <b>{exp.company}</b>
          </p>
          <small>
            from {formatData(exp.from)} to{" "}
            {exp.current ? "Current" : formatData(exp.to)}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Experience;
