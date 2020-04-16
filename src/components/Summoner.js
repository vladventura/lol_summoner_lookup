import React from 'react';

const Summoner = ({summoner, icon, loaded}) => {
    return(
        <div>
            <a
                rel="noopener noreferrer"
                href={loaded? (`https://na.op.gg/summoner/userName=${summoner}`) : ("#")}
                target="_blank"
            >
                <img 
                    src={icon}
                    alt={loaded? (summoner) : "Loading"}
                />
            </a>
            <h2>
            <a
                rel="noopener noreferrer"
                href={loaded? (`https://na.op.gg/summoner/userName=${summoner}`) : ("#")}
                target="_blank"
                title={loaded? (summoner) : ("Loading")}
            >
                {loaded? (summoner) : ("Loading")}
            </a>
            </h2>
        </div>
    );
}

export default Summoner;