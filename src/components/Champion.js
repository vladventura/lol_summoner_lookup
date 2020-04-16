import React from "react";
import NO_ICON from "../res/icons/29.png";

const Champion = ({ champ }) => {
  return (
    <div>
      <a
        href={champ ? `https://champion.gg/champion/${champ.name}` : "#"}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          src={
            champ
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
            champ ? `https://champion.gg/champion/${props.champ.name}` : "#"
          }
          target="_blank"
          title={champ ? champ.name : "Loading"}
        >
          {champ ? `Highest Mastery: ${champ.name}` : "Loading"}
        </a>
      </h2>
    </div>
  );
};

export default Champion;
