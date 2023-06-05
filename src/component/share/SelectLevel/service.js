import axios from 'axios';
import { APIServerURL } from '../../../config.json'

export const getLevelsFromAPI = (schoolYearId) =>{
    return new Promise((resolve, reject) => {
        axios.get(APIServerURL + `api/school/level`, 
            { params: {
               schoolYearId: schoolYearId          }}
        ) //LOAD DATA FROM API
        .then(  result => { 
           resolve(result.data); //SET DEFAULT OPTIONS
        }).catch(error=>{
           reject(error);
        });
    });
}