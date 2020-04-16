import React from "react";
import { TIER_EMBLEM_MAP } from "../constants/assetmaps";

const BottomStatsDisplay = ({ league }) => {
  return (
    <div>
      <ul>
        {league && league.leaguePoints ? (
          <div>
            <li>
              <i>{league.wins}</i>
              <span>Wins</span>
            </li>
            <li>
              <i>{league.losses}</i>
              <span>Losses</span>
            </li>
            <li>
              <i>{league.leaguePoints}</i>
              <span>LP</span>
            </li>
            <li>
              <img
                height={50}
                alt=""
                src={TIER_EMBLEM_MAP[league.tier]}
                mode="fit"
              />
              <span>{`${league.tier} ${league.rank}`}</span>
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
