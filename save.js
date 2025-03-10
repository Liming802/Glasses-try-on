document.getElementById('saveImageBtn').addEventListener('click', saveCanvasAsImage);

function saveCanvasAsImage() {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = photoCanvas.width;
  tempCanvas.height = photoCanvas.height;

  tempCtx.drawImage(photoCanvas, 0, 0); 
  tempCtx.drawImage(glassesCanvas01, 0, 0); 

  const image = tempCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

  const link = document.createElement('a');
  link.download = 'your_glasses_photo.png';
  link.href = image;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); 
}
