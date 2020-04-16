import React from "react";
import NO_ICON from "../res/icons/29.png";

const Champion = ({ champ, loaded }) => {
  return (
    <div>
      <a
        href={loaded ? `https://na.op.gg/champion/${champ.id}` : "#"}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          src={
            loaded
              ? `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/${champ.id}.png`
              : NO_ICON
          }
          alt="Champion Icon"
        />
      </a>
      <h2>
        <a
          rel="noopener noreferrer"
          href={
            loaded ? `https://na.op.gg/champion/${champ.id}` : "#"
          }
          target="_blank"
          title={loaded ? champ.name : "Loading"}
        >
          {loaded ? `Highest Mastery: ${champ.name}` : "Loading"}
        </a>
      </h2>
    </div>
  );
};

export default Champion;
