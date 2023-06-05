import axios from 'axios';
import { APIServerURL } from '../../../config.json';

export const getGroupsFromAPI = (schoolYearId, levelNumber )=> {
    return new Promise((resolve, reject) => {
        axios.get(APIServerURL + `api/school/group`, 
            { params: {
                schoolYearId: schoolYearId,
                levelNumber: levelNumber
            } }
        )
        .then(function (result) {
           // console.log(result.data);
            resolve(result.data);  
        })
        .catch((error) => { 
            reject (error)
        })
    })
}
