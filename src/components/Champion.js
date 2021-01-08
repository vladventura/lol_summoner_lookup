import React, {useEffect, useState} from "react";
import {getVersion} from "../utilities";
import NO_ICON from "../res/icons/29.png";

const Champion = ({ champ, loaded }) => {
  const [version, setVersion] = useState('');
  
  useEffect(()=>{
      getVersion().then(v => {
        setVersion(v);
      })
  }, [])



  return (
    <div>
      <a
        href={loaded ? `https://na.op.gg/champion/${champ.id}` : "#"}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          src={
            loaded && version
              ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`
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
          {loaded ? champ.name : "Loading"}
        </a>
      </h2>
    </div>
  );
};

export default Champion;
