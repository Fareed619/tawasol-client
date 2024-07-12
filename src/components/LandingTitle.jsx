/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */

import { useEffect, useState } from "react";

const LandingTitle = () => {
  const titles = [
    "I am a mechatroics engineer",
    "I am very helpful person",
    "you must help your mate",
  ];
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  let timeOut = null;
  let titleInterval = null;

  useEffect(() => {
    titleInterval = setInterval(() => {
      const titleIndex = (index + 1) % titles.length;
      setIndex(titleIndex);
      setFadeIn(true);
      timeOut = setTimeout(() => {
        setFadeIn(false);
      }, 2000);
    }, 4000);

    timeOut = setTimeout(() => {
      setFadeIn(false);
    }, 2000);

    return () => {
      clearInterval(titleInterval);
      clearTimeout(timeOut);
    };
  }, [index]);

  return (
    <div>
      <h1 className={fadeIn ? "title-fade-in" : "title-fade-out"}>
        {titles[index]}
      </h1>
    </div>
  );
};

export default LandingTitle;
