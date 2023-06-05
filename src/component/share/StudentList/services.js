import axios from 'axios';
import { APIServerURL } from '../../../config.json'

export const getEstudiantesXGrupo = (_codGrupo)=>{
    return new Promise ((resolve,reject)=>{
        axios.post(APIServerURL + 'api/getEstudiantesXGrupo', {
            codGrupo: _codGrupo,
        })
        .then(function (result) {
            resolve(result.data);
        })
        .catch(function (error) {
            reject(error);
        });
    });
}

export const getEstudiantesXNivel = (_codCursoLectivo, _numNivel)=>{
    return new Promise ((resolve,reject)=>{
        axios.post(APIServerURL + 'api/student/list/all', {
            codCursoLectivo: _codCursoLectivo,
            numNivel: _numNivel,
        })
        .then(function (result) {
            console.log("getEstudiantesXNivel = " + JSON.stringify(result))
            resolve(result.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}


export const getEstudiantesXCursoLectivo = (schoolYearId)=>{
    return new Promise ((resolve,reject)=>{
        axios.get(APIServerURL + 'api/students/list/all', {
            params: {
                schoolYearId
        }})
        .then((result) => {
            // console.log("getEstudiantesXCursoLectivo = " + JSON.stringify(result))
            resolve(result.data);
        })
        .catch( (error) => {
            reject(error);
        });
    });
}

export const getStudentsList = (codCursoLectivo, numNivel, codGrupo) => {
    return new Promise((resolve,reject) => {
      //  console.log("CodCursolectivo: " + codCursoLectivo + " - NumNivel:" + numNivel + " - CodGrupo: " + codGrupo);
        if (codGrupo > 0 && numNivel > 0 && codCursoLectivo > 0 ){
            // getEstudiantesXGrupo
            getEstudiantesXGrupo(codGrupo)
            .then((result)=>{resolve(result)})
            .catch((error)=>{reject(error)})
        } 
        if (numNivel > 0 && codCursoLectivo > 0){
            getEstudiantesXNivel(codCursoLectivo, numNivel)
            .then((result)=>{resolve(result)})
            .catch((error)=>{reject(error)})
            //getEstudiantesXCursoLectivo
        }
   
        if (codCursoLectivo > 0 ) {
            getEstudiantesXCursoLectivo(codCursoLectivo)
            .then((result)=>{resolve(result)})
            .catch((error)=>{reject(error)})
        }
        else { resolve([])}
            
       
        
    });
}

/**
 *             axios.post(APIServerURL + 'api/getEstudiantesXGrupo', {
                codGrupo: _codGrupo,
            })
            .then(function (result) {
                //console.log(JSON.stringify(result))
                setArrayEstudiantes(result.data);
               // Array.isArray(result.data) ? setArrayEstudiantes(result.data):setArrayEstudiantes([]);
                console.log(JSON.stringify(arrayEstudiantes))

                // props.onChanged(res);
            })
            .catch(function (error) {
                console.log(error);
            });
 */