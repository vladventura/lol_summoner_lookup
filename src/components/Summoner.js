import React from 'react';

const Summoner = ({summoner, icon}) => {
    return(
        <div>
            <a
                rel="noopener noreferrer"
                href={`https://na.op.gg/summoner/userName=${summoner}`}
                target="_blank"
            >
                <img 
                    src={icon}
                    alt={summoner}
                />
            </a>
            <h2>
            <a
                rel="noopener noreferrer"
                href={`https://na.op.gg/summoner/userName=${summoner}`}
                target="_blank"
                title={summoner}
            >
                {summoner}
            </a>
            </h2>
        </div>
    );
}

export default Summoner;