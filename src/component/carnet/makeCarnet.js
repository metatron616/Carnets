/**
 * Modifica la plantilla SVG del carnet con los datos correspondientes
 */
import SVGFile from './plantilla carnet.svg';
import QRCode from 'qrcode';



async function makeIDCard  (data) {


    if (data.cedula !== undefined  || (data.pathFotografia !== "" && data.pathFotografia !== undefined && data.pathFotografia !== null) ){ 
        
        const generateQR = async text => {
            try {
              return (await QRCode.toDataURL(text, {
                margin: 1,
                color: {
                  dark: '#000',  // black dots
                  light: '#0000' // Transparent background
                }
              }))
            } catch (err) {
               return (err)
            }
          }

        const svgFile = SVGFile;
        const txtPlantilla =  fetch(svgFile)
        .then(r => r.text())
        .then(async (text) => {return text});
        var text = await txtPlantilla;
          console.log('MAKECARNETS DATA: ' + JSON.stringify(data))
        //remplase text on variables
        text = text.replace(/{{Nombre}}/g, data.name);    
        text = text.replace(/{{Apellidos}}/g, data.lastnames);    
        text = text.replace(/{{Cedula}}/g, data.cedula);    
        text = text.replace(/{{FechaNacimiento}}/g,  data.birthday);    
        text = text.replace(/{{Ruta}}/g, data.ruta);    
        text = text.replace(/{{CursoLectivo}}/g, data.schoolyear); 
        text = text.replace(/{{QRCode}}/g, await generateQR(data.cedula)); 
        //console.log("foto desde MYSQL :" + data.foto);

        //############ FOTO       

///revisar si tiene el encabezado data:image,base64 y si lo tiene quitarlo

       // let buf = Buffer.from(data.foto);
        //let Foto64 = buf;
        let Foto64 = data.photo;

        //console.log("foto64 :" + Foto64);

        text = text.replace(/{{Foto64}}/g, Foto64); //obtiene el Base64 de la foto

        
        text = text.replace(/{{Secciones}}/g, data.groups); 
       
        if ( data.whorkshop1 === "" ||  data.whorkshop1 === null ||  data.whorkshop1 === undefined) {
            text = text.replace(/{{Taller1}}/g, "");
        } else { text = text.replace(/{{Taller1}}/g, data.whorkshop1);}

        if ( data.whorkshop2 === "" ||  data.whorkshop2 === null ||  data.whorkshop2 === undefined) {
            text = text.replace(/{{Taller2}}/g, "");
        } else {   text = text.replace(/{{Taller2}}/g, data.whorkshop2);}

        if ( data.whorkshop3 === "" ||  data.whorkshop3 === null ||  data.whorkshop3 === undefined) {
            text = text.replace(/{{Taller3}}/g, "");
        } else {   text = text.replace(/{{Taller3}}/g, data.whorkshop3); }

        /* // se designan las becas de transporte y comedor
        if (data.ruta === "" || data.ruta === null || data.ruta === undefined) {
            text = text.replace(/#ff0000/g,"none");
            text = text.replace(/#ff0000/g,"none");
        } else { text = text.replace(/#ff0000/g,"#ff0000");  }
        
        if (data.recibeComedor === ""  || data.recibeComedor === null || data.recibeComedor === undefined ){
            text = text.replace(/#800080/g,"none");             
        }*/

        text = text.replace(/#ff0000/g,"none");
        text = text.replace(/#800080/g,"none"); 
        console.log("Recibe religion: " + data.recibeReligion );
        console.log("Recibe PASI: " + data.recibePASI );

        if (data.recibeReligion === ""  || data.recibeReligion === null || data.recibeReligion === undefined || data.recibeReligion === 0){
            text = text.replace(/#ffff26/g,"none");             
        }
        if (data.recibePASI === ""  || data.recibePASI === null || data.recibePASI === undefined || data.recibePASI === 0 ){
            text = text.replace(/#99ff55/g,"none");             
        }


    }
    else{ text = 'No Data';}
    return text;
}

export default makeIDCard;