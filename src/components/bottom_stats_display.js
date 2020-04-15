import React from "react";

const BottomStatsDisplay = ({
  wins,
  losses,
  leaguePoints,
  tierEmblem,
  tier,
  rank,
}) => {
  return (
    <div>
      <ul>
        {leaguePoints ? (
          <div>
            <li>
              <i>{wins}</i>
              <span>Wins</span>
            </li>
            <li>
              <i>{losses}</i>
              <span>Losses</span>
            </li>
            <li>
              <i>{leaguePoints}</i>
              <span>LP</span>
            </li>
            <li>
              <img height={50} alt="" src={tierEmblem} mode="fit" />
              <span>{`${tier} ${rank}`}</span>
            </li>
          </div>
        ) : (
          <li>
            <span>No data on Ranked 5v5 for this Summoner</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default BottomStatsDisplay;
