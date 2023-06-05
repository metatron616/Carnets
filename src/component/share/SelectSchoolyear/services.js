import axios from 'axios';
import { APIServerURL } from '../../../config.json'

export const getSchoolaryearsFromAPI = () =>{
    return new Promise((resolve, reject)=>{
        axios.get(APIServerURL + `api/school/schoolyears`) //LOAD DATA FROM API
        .then(  result => {
          //  console.log(JSON.stringify(result.data))

           resolve(result.data.data); //SET DEFAULT OPTIONS
        }).catch(error=>{
            reject(error);
        });
    });
}

