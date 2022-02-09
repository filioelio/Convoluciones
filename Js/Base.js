var image = new Image();
image.onload = imageLoaded;
image.src = "./Img/IMG_5960.jpg"

function imageLoaded(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d")

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0, image.width, image.height);

    WriterAndBlack(canvas);
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