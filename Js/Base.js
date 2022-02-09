var image = new Image();
image.onload = imageLoaded;
image.src = "./Img/IMG_E0288.jpg"

function imageLoaded(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d")

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0, image.width, image.height);

    WriterAndBlack(canvas);

    var result = document.getElementById("result");
    convolucionar(canvas, result);
}

function WriterAndBlack(canvas) {
    var ctx = canvas.getContext("2d")
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixeles = imgData.data;
    for( var i=0; i < pixeles.length; i+=4){
        var red = pixeles[i];
        var green = pixeles[i+1];
        var blue = pixeles[i+2];
        var alpha = pixeles[i+3];

        var gris = (red + green+blue) /3;

        pixeles[i] = gris ;
        pixeles[i+1] = gris ;
        pixeles[i+2] = gris
    }

    ctx.putImageData(imgData, 0, 0)
    // console.log(imgData);
}

function convolucionar(canvas,  result){
    //obtener todas las variables
    var ctxCanvas = canvas.getContext('2d');
    var imageCanvas = ctxCanvas.getImageData(0,0, canvas.width, canvas.height);
    var pixelesCanvas = imageCanvas.data;

    result.width = canvas.width;
    result.height = canvas.height
    var ctxResult = result.getContext('2d');
    var imageResult = ctxResult.getImageData(0,0, result.width, result.height);
    var pixelesResult = imageResult.data;

    //nucleo, kernel => sobel
    var sobelVertical = [
        [-1,0,1],
        [-2,0,2],
        [-1,0,1],
    ];

    var sobelHorizontal = [
        [-1,-2,-1],
        [0,0,0],
        [1,2,1],
    ];

    for(var y = 1 ; y < canvas.height-1; y++) {
        for(var x = 1 ; x < canvas.width-1; x++) {
            //posición en el arreglo js
            var idx =((y*canvas.width) + x) *4
            
            var totalY =  0;
            var totalX = 0;

            for(var kernelY = 0 ; kernelY< 3; kernelY++){
                for(var kernelX=0; kernelX< 3 ; kernelX++){
                    totalY += sobelVertical[kernelY][kernelX]  * pixelesCanvas[((((y+(kernelY-1))*canvas.width) + (x+(kernelX-1))) *4)];
                    totalX += sobelHorizontal[kernelY][kernelX]  * pixelesCanvas[((((y+(kernelY-1))*canvas.width) + (x +(kernelX-1))) *4)];
                }
            }
            var mag = Math.sqrt((totalX * totalX ) + (totalY * totalY))
            
            //quita lo de atras de la foto
            mag = (mag < 40) ? 0 : mag ;

            pixelesResult[idx] = mag ; // red
            pixelesResult[idx+1] = mag; // green  
            pixelesResult[idx+2] = mag;// blue
            pixelesResult[idx+3] = 255;// alpha
        }
    }
    ctxResult.putImageData(imageResult, 0, 0)
}