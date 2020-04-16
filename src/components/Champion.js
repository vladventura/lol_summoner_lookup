import React from "react";
import NO_ICON from "../res/icons/29.png";

const Champion = (props) => {
  return (
    <div>
      <a
        href={
          props.champ ? `https://champion.gg/champion/${props.champ.name}` : "#"
        }
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          src={
            props.champ
              ? `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/${props.champ.id}.png`
              : NO_ICON
          }
          alt="Champion Icon"
        />
      </a>
      <h2>
        <a
          rel="noopener noreferrer"
          href={
            props.champ
              ? `https://champion.gg/champion/${props.champ.name}`
              : "#"
          }
          target="_blank"
          title={props.champ ? props.champ.name : "Loading"}
        >
          {props.champ ? `Highest Mastery: ${props.champ.name}` : "Loading"}
        </a>
      </h2>
    </div>
  );
};

export default Champion;
