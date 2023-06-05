

const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })


function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  try{

  
  var canvas_cropped = document.createElement('canvas');
  var ctx_cropped = canvas_cropped.getContext('2d');
  var image_cropped =  new Image();
  image_cropped.src = imageSrc;
 


  var maxSize = Math.max(image_cropped.width, image_cropped.height)
  var safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas_cropped context
  canvas_cropped.width = safeArea
  canvas_cropped.height = safeArea

  // translate canvas_cropped context to a central location on image to allow rotating around the center.
  ctx_cropped.translate(safeArea / 2, safeArea / 2)
  ctx_cropped.rotate(getRadianAngle(rotation))
  ctx_cropped.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx_cropped.drawImage(
    image_cropped,
    safeArea / 2 - image_cropped.width * 0.5,
    safeArea / 2 - image_cropped.height * 0.5
  );
   
    var data = ctx_cropped.getImageData(0, 0, safeArea, safeArea);

    // set canvas_cropped width to final desired crop size - this will clear existing context
    canvas_cropped.width = pixelCrop.width;
    canvas_cropped.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx_cropped.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image_cropped.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image_cropped.height * 0.5 - pixelCrop.y)
    );

    //Redimencionar a 600 x 600
    console.log(canvas_cropped.toDataURL('image/jpg'));

    var image_big =  new Image();
    image_big.src = imageSrc;
   // image_big.src = canvas_cropped.toDataURL('image/jpg');

    var canvas_big = document.createElement('canvas');
    canvas_big.width = 600;
    canvas_big.height = 600;
    var ctx_big = canvas_big.getContext('2d');
    ctx_big.drawImage(image_big, 0, 0, image_big.width, image_big.height, 0, 0, 600, 600);

    // Redimencionar a 64x64
    var image_small =  new Image();
    image_small.src = canvas_cropped.toDataURL('image/jpg');
    var canvas_small = document.createElement('canvas');
    canvas_small.width = 64;
    canvas_small.height = 64;
    var ctx_small = canvas_small.getContext('2d');
    ctx_small.drawImage(image_small, 0, 0, image_small.width, image_small.height, 0, 0, 64, 64);

   // console.log(canvas_small);

   // Redimencionar a 131x144
   var image_PIAD =  new Image();
   image_PIAD.src = canvas_cropped.toDataURL('image/jpg');
   var canvas_PIAD = document.createElement('canvas');
   canvas_PIAD.width = 131;
   canvas_PIAD.height = 144;
   var ctx_PIAD = canvas_PIAD.getContext('2d');
   ctx_PIAD.drawImage(image_PIAD, 0, 0, image_PIAD.width, image_PIAD.height, -7, 0, 144, 144);
   
   var data_PIAD = ctx_PIAD.getImageData(0, 0,131,144);
   ctx_PIAD.putImageData(
      data_PIAD,
      0,
      0
    );
  
  //Redimencionar a 
  // As Base64 string
  // return canvas_cropped.toDataURL('image/jpeg');
    return {
        image1: canvas_big.toDataURL('image/jpg'),
        image2: canvas_small.toDataURL('image/jpg'),
        image3: canvas_PIAD.toDataURL('image/jpg')
    };
  }
  catch(err){
    console.log(err.errno);
    return {
      image1: "",
      image2: "",
      image3: ""
    };
  }
}
