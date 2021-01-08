import axios from "axios";

export const getVersion = async () => {
    return axios.get('https://ddragon.leagueoflegends.com/api/versions.json').then(data => 
     data.data[0]
    );
};