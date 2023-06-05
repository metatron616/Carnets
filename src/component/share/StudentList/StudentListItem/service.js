import axios from 'axios';
import { APIServerURL } from '../../../../config.json';

export const updateStudentHasReligion = (value)=>{
    return new Promise (async (resolve,reject)=>{
        await axios.patch(APIServerURL + 'api/students/religion', 
                 { hasReligion: value.hasReligion,  
                   id: value.id 
                 }
             )
             .then(function (result) {
                resolve(true)
                //setHasReligion(hasReligion);
                 //console.log(result.data); 
             })
             .catch(function (error) {
                reject(error) //console.log(error);
             });
    });
}

export const updateStudentHasPASI = (value)=>{
    return new Promise (async (resolve,reject)=>{
    
        await axios.patch(APIServerURL + 'api/students/PASI', 
                 { hasPASI: value.hasPASI,  
                   id: value.id 
                 }
             )
             .then(function (result) {
                resolve(true)
                //setHasReligion(hasReligion);
                 //console.log(result.data); 
             })
             .catch(function (error) {
                reject(error) //console.log(error);
             });
    });
}

export const savePhotoStudent = ({id,image}) => {
    return new Promise (async (resolve, reject)=>{
     //   var imageBuffer = new Buffer(image).toString('base64');
       // var imageBuffer = Buffer.from(image, "base64");
        

        await axios.patch(APIServerURL + `api/students/${id}/photo`, 
        { 
            id: id,
            imageSource: image
        }
    )
    .then(function (result) {
        console.log(result.data); 
       resolve(result.data.thumbnail)
       //setHasReligion(hasReligion);
    })
    .catch(function (error) {
       reject(error); console.log(error);
    });
    });
}