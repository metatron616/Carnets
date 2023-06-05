export const BobToBase64 = (blob) => {
  return new Promise(resolve => {
    resolve(URL.createObjectURL(blob))
  })
}

/*export const Base64String_To_Base64BinaryString = (value) =>{
  let Base64BinaryData = value.substr(value.indexOf(',') + 1);
  return Base64BinaryData;
}*/



export const createImage = (imageSource) =>
  new Promise((resolve, reject) => {
    try{    
        let url =imageSource;
        //console.log('valor de url: ' + imageSource)
        if (imageSource instanceof Blob) url = BobToBase64(imageSource)

        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
        resolve(image)
    }
    catch(error){
      reject(error)
    }
  })

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}



/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation)
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}


  /*const convertCanvasToBuffer = async (canvas) => {
    return new Promise((resolve,reject)=>{
      try{
        const imageData = canvas.toDataURL("image/jpg");
        const byteString = atob(imageData.split(",")[1]);
        const bytes = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          bytes[i] = byteString.charCodeAt(i);
        }
    
        const blob = new Blob([bytes.buffer], { type: "image/jpg" });
        console.log(bytes.buffer)
        resolve(blob);
      }
      catch(error){
        reject(error)
      }

    });


    const imageData = canvas.toDataURL("image/jpg");
    const byteString = atob(imageData.split(",")[1]);
    const bytes = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      bytes[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([bytes.buffer], { type: "image/jpg" });
    console.log(bytes.buffer)
    return Blob;
  }*/


/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export async function getCroppedImg(
      imageSrc,
      pixelCrop,
      rotation = 0,
      flip = { horizontal: false, vertical: false }
    ) {
      const image = await createImage(imageSrc)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return null
      }

      const rotRad = getRadianAngle(rotation)

      // calculate bounding box of the rotated image
      const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
      )

      // set canvas size to match the bounding box
      canvas.width = bBoxWidth
      canvas.height = bBoxHeight

      // translate canvas context to a central location to allow rotating and flipping around the center
      ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
      ctx.rotate(rotRad)
      ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
      ctx.translate(-image.width / 2, -image.height / 2)

      // draw rotated image
      ctx.drawImage(image, 0, 0)

      // croppedAreaPixels values are bounding box relative
      // extract the cropped image using these values
      const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
      )

      // set canvas width to final desired crop size - this will clear existing context
      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height

      // paste generated rotate image at the top left corner
      ctx.putImageData(data, 0, 0)
      return await canvas.toDataURL('image/jpeg',1.0)
    //  return await convertCanvasToBuffer(canvas)
  }



export async function getRotatedImage(imageSrc, rotation = 0) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const orientationChanged =
    rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270
  if (orientationChanged) {
    canvas.width = image.height
    canvas.height = image.width
  } else {
    canvas.width = image.width
    canvas.height = image.height
  }

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.drawImage(image, -image.width / 2, -image.height / 2)

  return await canvas.toDataURL('image/jpeg',1.0)
  //return convertCanvasToBuffer(canvas)
/*   return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file))
    }, 'image/png')
  }) */
/*   return new Promise((resolve, reject) => {
    resolve(canvas.toDataURL('image/jpeg',1.0))
    }, ) */
}

export  function getResizeImage (imageSrc, width, height=0){
  return new Promise(async (resolve,reject)=>{
    try{

      const image = await createImage(imageSrc)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d');
      
          // Set width and height
        canvas.width = width;
        if(height===0) canvas.height = image.height * (width/image.width);
        else canvas.height = height;
      
        // Draw image and export to a data-uri
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
        resolve(canvas.toDataURL('image/jpeg',1.0));   
    }
    catch(error){
      reject(error)
    }
  });


/*   return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file))
    }, 'image/png')
  }) */
  /* 
    return new Promise((resolve, reject) => {
        resolve(canvas.toDataURL('image/jpeg',1.0))
        }, ) */
}
