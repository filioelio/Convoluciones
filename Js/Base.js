var image = new Image();
image.onload = imageLoaded;
image.src = "./Img/IMG_0355.jpg"

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

    //nucleo, kernel => soel
    var kernel = [
        [-1,-1,-1],
        [-1,8,-1],
        [-1,-1,-1],
    ];

    for(var y = 1 ; y < canvas.height-1; y++) {
        for(var x = 1 ; x < canvas.width-1; x++) {
            //posición en el arreglo js
            var idx =((y*canvas.width) + x) *4
            //casilla
            var casilla1 = kernel[0][0]  * pixelesCanvas[((((y-1)*canvas.width) + (x-1)) *4)]
            var casilla2 = kernel[0][1]  * pixelesCanvas[((((y-1)*canvas.width) + (x)) *4)]
            var casilla3 = kernel[0][2]  * pixelesCanvas[((((y-1)*canvas.width) + (x+1)) *4)]
            var casilla4 = kernel[1][0]  * pixelesCanvas[((((y)*canvas.width) + (x-1)) *4)]
            var casilla5 = kernel[1][1]  * pixelesCanvas[((((y)*canvas.width) + (x)) *4)]
            var casilla6 = kernel[1][2]  * pixelesCanvas[((((y)*canvas.width) + (x+1)) *4)]
            var casilla7 = kernel[2][0]  * pixelesCanvas[((((y+1)*canvas.width) + (x-1)) *4)]
            var casilla8 = kernel[2][1]  * pixelesCanvas[((((y+1)*canvas.width) + (x)) *4)]
            var casilla9 = kernel[2][2]  * pixelesCanvas[((((y+1)*canvas.width) + (x+1)) *4)]

            var resultEnd = casilla1 + casilla2 + casilla3 + casilla4 + casilla5+casilla6 + casilla7 + casilla8 + casilla9;

            pixelesResult[idx] = resultEnd ; // red
            pixelesResult[idx+1] = resultEnd; // green  
            pixelesResult[idx+2] = resultEnd;// blue
            pixelesResult[idx+3] = 255;// alpha

            //convierte todo la imagen en gris
            // pixelesResult[idx] = pixelesCanvas[idx] ; // red
            // pixelesResult[idx+1] = pixelesCanvas[idx+1]; // green  
            // pixelesResult[idx+2] = pixelesCanvas[idx+2];// blue
            // pixelesResult[idx+3] = pixelesCanvas[idx+3];// alpha
        }
    }
    ctxResult.putImageData(imageResult, 0, 0)


}