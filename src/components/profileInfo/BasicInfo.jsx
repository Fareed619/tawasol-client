const BasicInfo = ({ profile }) => {
  console.log("profile obj in basic info", profile);

  return (
    <div>
      <div className="container">
        <p>{profile.bio}</p>
      </div>
      <div className="container">
        <p>
          &#127759; Lives in <b> {profile.location}</b>
        </p>
      </div>

      <div className="container">
        <p>
          &#127968; From in <b> {profile.country}</b>
        </p>
      </div>
      <div className="container">
        <p>
          {profile.skills.map((skill, index) => {
            return (
              <span key={index}>
                {" "}
                &#10004; {skill} <br />
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default BasicInfo;
