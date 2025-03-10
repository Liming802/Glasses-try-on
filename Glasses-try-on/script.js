let frameType = "rectangle";
let activeImage = null;

function setGlassesType(type) {
  frameType = type;
  if (frameType === "rectangle") {
    document.getElementById('rectangleImage').style.border = '10px solid white';
    document.getElementById('rectangleImage').style.boxSizing = 'border-box';

    document.getElementById('triangleImage').style.border = '0px solid white';
    drawGlasses();
  } else if (frameType === "triangle") {
    document.getElementById('rectangleImage').style.border = '0px solid white';

    document.getElementById('triangleImage').style.border = '10px solid white';
    document.getElementById('triangleImage').style.boxSizing = 'border-box';

    drawTriangleGlasses();
  }
}



function showStyleContainer() {

  document.querySelector('.style-container').style.display = 'block';
  document.querySelector('.slider-container').style.display = 'none';;
  document.querySelector('.color-container').style.display = 'none';
  document.getElementById('size').style.color = '#fff';
  document.getElementById('size').style.backgroundColor = '#ffcc00';
  document.getElementById('style').style.color = '#ffcc00';
  document.getElementById('style').style.backgroundColor = '#fff';
  document.getElementById('color').style.color = '#fff';
  document.getElementById('color').style.backgroundColor = '#ffcc00';
}

function showSliderContainer() {
  document.querySelector('.style-container').style.display = 'none';
  document.querySelector('.slider-container').style.display = 'block';
  document.querySelector('.color-container').style.display = 'none';
  document.getElementById('size').style.color = '#ffcc00';
  document.getElementById('size').style.backgroundColor = '#fff';
  document.getElementById('style').style.color = '#fff';
  document.getElementById('style').style.backgroundColor = '#ffcc00';
  document.getElementById('color').style.color = '#fff';
  document.getElementById('color').style.backgroundColor = '#ffcc00';
}

function showColorContainer() {
  document.querySelector('.style-container').style.display = 'none';
  document.querySelector('.slider-container').style.display = 'none';
  document.querySelector('.color-container').style.display = 'block';
  document.getElementById('style').style.color = '#fff';
  document.getElementById('style').style.backgroundColor = '#ffcc00';
  document.getElementById('color').style.color = '#ffcc00';
  document.getElementById('color').style.backgroundColor = '#fff';
  document.getElementById('size').style.color = '#fff';
  document.getElementById('size').style.backgroundColor = '#ffcc00';


}

const photoCanvas = document.getElementById('photoCanvas');
const glassesCanvas01 = document.getElementById('glassesCanvas01');
const photoCtx = photoCanvas.getContext('2d');
const glassesCtx = glassesCanvas01.getContext('2d');
const frameWidthInput = document.getElementById('frameWidth');
const frameFillColorInput = document.getElementById('frameFillColor');
const frameStrokeColorInput = document.getElementById('frameStrokeColor');
const cornerRadiusInput = document.getElementById('cornerRadius');
const borderWidthInput = document.getElementById('borderWidth');
const lensSeparationInput = document.getElementById('lensSeparation');
const frameAlphaInput = document.getElementById('frameAlphaInput');
const imageInput = document.getElementById('imageInput');
let dragging = false;
let offsetX, offsetY;
let imgX = 0, imgY = 0;
let imgWidth, imgHeight;
let uploadedImage = null;

imageInput.addEventListener('change', handleImageUpload);
document.addEventListener('DOMContentLoaded', loadDefaultImage);

function loadDefaultImage() {
  const defaultImageSrc = 'images.png';
  const img = new Image();
  img.onload = function() {
    uploadedImage = img;
    const scaleWidth = photoCanvas.width / img.width;
    const scaleHeight = photoCanvas.height / img.height;
    const scale = Math.min(scaleWidth, scaleHeight);
    imgWidth = img.width * scale - 100;
    imgHeight = img.height * scale - 100;
    imgX = (photoCanvas.width / 2) - (imgWidth / 2) - 30;
    imgY = (photoCanvas.height / 2) - (imgHeight / 2) + 4;

    photoCtx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    photoCtx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    if (frameType === "rectangle") {
      drawGlasses();
    }
    else if (frameType === "triangle") {
      drawTriangleGlasses()
    }
  };
  img.src = defaultImageSrc;
}

function handleImageUpload() {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        uploadedImage = img;
        const scaleWidth = photoCanvas.width / img.width;
        const scaleHeight = photoCanvas.height / img.height;
        const scale = Math.min(scaleWidth, scaleHeight);
        imgWidth = img.width * scale;
        imgHeight = img.height * scale;
        imgX = (photoCanvas.width / 2) - (imgWidth / 2);
        imgY = (photoCanvas.height / 2) - (imgHeight / 2);

        photoCtx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
        photoCtx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        document.getElementById('customFileLabel').innerText = "Change the selfie";
        if (frameType === "rectangle") {
          drawGlasses();
        }
        else if (frameType === "triangle") {
          drawTriangleGlasses()
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function drawTriangleGlasses() {
  glassesCtx.clearRect(0, 0, glassesCanvas01.width, glassesCanvas01.height);

  if (!uploadedImage) return;

  const frameWidth = parseInt(frameWidthInput.value);
  const frameFillColor = frameFillColorInput.value;
  const frameStrokeColor = frameStrokeColorInput.value;
  const cornerRadius = parseInt(cornerRadiusInput.value);
  const borderWidth = parseInt(borderWidthInput.value);
  const lensSeparation = parseInt(lensSeparationInput.value);
  const frameAlpha = parseFloat(frameAlphaInput.value);

  glassesCtx.fillStyle = `rgba(${hexToRgb(frameFillColor)}, ${frameAlpha})`;
  glassesCtx.strokeStyle = frameStrokeColor;
  glassesCtx.lineWidth = borderWidth;

  const lensWidth = (frameWidth - lensSeparation) / 2;
  const halfLensHeight = lensWidth / 2.5;
  let lensY = offsetY !== undefined ? offsetY : glassesCanvas01.height / 2 - 10;
  let centerLensX = offsetX !== undefined ? offsetX : glassesCanvas01.width / 2;

  glassesCtx.beginPath();
  // glassesCtx.moveTo(centerLensX - lensWidth / 2, lensY - halfLensHeight);
  // glassesCtx.lineTo(centerLensX - cornerRadius, lensY + halfLensHeight);
  // glassesCtx.lineTo(centerLensX - lensWidth + cornerRadius, lensY - halfLensHeight);
  // Draw left lens
  glassesCtx.moveTo(centerLensX, lensY - halfLensHeight * 0.6);
  glassesCtx.lineTo(centerLensX - cornerRadius, lensY + halfLensHeight * 0.6);
  glassesCtx.lineTo(centerLensX - lensWidth * 1.2 + cornerRadius, lensY - halfLensHeight);
  glassesCtx.closePath();
  glassesCtx.fill();
  glassesCtx.stroke();

  glassesCtx.beginPath();
  // Draw right lens (mirrored horizontally, starting from right)
  glassesCtx.moveTo(centerLensX, lensY - halfLensHeight * 0.6);
  glassesCtx.lineTo(centerLensX + cornerRadius, lensY + halfLensHeight * 0.6);
  glassesCtx.lineTo(centerLensX + lensWidth * 1.2 - cornerRadius, lensY - halfLensHeight);
  glassesCtx.closePath();
  glassesCtx.fill();
  glassesCtx.stroke();

  // glassesCtx.beginPath();
  // // Draw bridge connecting the lenses
  // glassesCtx.moveTo(centerLensX - lensWidth / 2 + cornerRadius, lensY + halfLensHeight);
  // glassesCtx.lineTo(centerLensX + lensWidth / 2 - cornerRadius, lensY + halfLensHeight);
  // glassesCtx.stroke();
}




function drawGlasses() {
  glassesCtx.clearRect(0, 0, glassesCanvas01.width, glassesCanvas01.height);
  if (!uploadedImage) return;

  const frameWidth = parseInt(frameWidthInput.value);
  const frameFillColor = frameFillColorInput.value;
  const frameStrokeColor = frameStrokeColorInput.value;
  const cornerRadius = parseInt(cornerRadiusInput.value);
  const borderWidth = parseInt(borderWidthInput.value);
  const lensSeparation = parseInt(lensSeparationInput.value);
  const frameAlpha = parseFloat(frameAlphaInput.value);

  glassesCtx.fillStyle = `rgba(${hexToRgb(frameFillColor)},${frameAlpha})`;
  glassesCtx.strokeStyle = frameStrokeColor;
  glassesCtx.lineWidth = borderWidth;

  const lensWidth = (frameWidth - lensSeparation) / 2;
  const halfLensHeight = lensWidth / 2.5;
  let lensY = offsetY !== undefined ? offsetY : glassesCanvas01.height / 2 - 10;
  let leftLensX = offsetX !== undefined ? offsetX - lensWidth / 2 - lensSeparation / 2 : glassesCanvas01.width / 2 - lensWidth - lensSeparation / 2;
  let rightLensX = offsetX !== undefined ? offsetX + lensWidth / 2 + lensSeparation / 2 : glassesCanvas01.width / 2 + lensSeparation / 2;

  glassesCtx.beginPath();
  glassesCtx.moveTo(leftLensX + cornerRadius, lensY - halfLensHeight);
  glassesCtx.arcTo(leftLensX, lensY - halfLensHeight, leftLensX, lensY + halfLensHeight, cornerRadius);
  glassesCtx.arcTo(leftLensX, lensY + halfLensHeight, leftLensX + cornerRadius, lensY + halfLensHeight, cornerRadius);
  glassesCtx.arcTo(leftLensX + lensWidth, lensY + halfLensHeight, leftLensX + lensWidth, lensY - halfLensHeight, cornerRadius);
  glassesCtx.arcTo(leftLensX + lensWidth, lensY - halfLensHeight, leftLensX + lensWidth - cornerRadius, lensY - halfLensHeight, cornerRadius);
  glassesCtx.closePath();
  glassesCtx.fill();
  glassesCtx.stroke();

  glassesCtx.beginPath();
  glassesCtx.moveTo(rightLensX + cornerRadius, lensY - halfLensHeight);
  glassesCtx.arcTo(rightLensX, lensY - halfLensHeight, rightLensX, lensY + halfLensHeight, cornerRadius);
  glassesCtx.arcTo(rightLensX, lensY + halfLensHeight, rightLensX + cornerRadius, lensY + halfLensHeight, cornerRadius);
  glassesCtx.arcTo(rightLensX + lensWidth, lensY + halfLensHeight, rightLensX + lensWidth, lensY - halfLensHeight, cornerRadius);
  glassesCtx.arcTo(rightLensX + lensWidth, lensY - halfLensHeight, rightLensX + lensWidth - cornerRadius, lensY - halfLensHeight, cornerRadius);
  glassesCtx.closePath();
  glassesCtx.fill();
  glassesCtx.stroke();

  glassesCtx.beginPath();
  glassesCtx.moveTo(leftLensX + lensWidth, lensY)
  glassesCtx.lineTo(rightLensX, lensY)
  glassesCtx.stroke();
}


function getPosition(event) {
  const rect = glassesCanvas01.getBoundingClientRect();
  if (event.touches && event.touches.length) {
    const touch = event.touches[0]; // Get the first touch if there's any
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  } else {
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
}

glassesCanvas01.addEventListener('mousedown', startDrag);
glassesCanvas01.addEventListener('touchstart', startDrag);

function startDrag(e) {
  e.preventDefault();
  const position = getPosition(e);
  offsetX = position.x;
  offsetY = position.y;
  dragging = true;
  if (frameType === "rectangle") {
    drawGlasses();
  }
  else if (frameType === "triangle") {
    drawTriangleGlasses()
  }
}

glassesCanvas01.addEventListener('mousemove', doDrag);
glassesCanvas01.addEventListener('touchmove', doDrag);

function doDrag(e) {
  if (dragging) {
    e.preventDefault();
    const position = getPosition(e);
    offsetX = position.x - 20;
    offsetY = position.y;
    if (frameType === "rectangle") {
      drawGlasses();
    }
    else if (frameType === "triangle") {
      drawTriangleGlasses()
    }
  }
}

glassesCanvas01.addEventListener('mouseup', endDrag);
glassesCanvas01.addEventListener('touchend', endDrag);

function endDrag() {
  dragging = false;
}

frameWidthInput.addEventListener('input', function() {
  if (frameType === "rectangle") {
    drawGlasses();
  } else if (frameType === "triangle") {
    drawTriangleGlasses();
  }
});
frameFillColorInput.addEventListener('input', function() {
  if (frameType === "rectangle") {
    drawGlasses();
  } else if (frameType === "triangle") {
    drawTriangleGlasses();
  }
});
frameStrokeColorInput.addEventListener('input', function() {
  if (frameType === "rectangle") {
    drawGlasses();
  } else if (frameType === "triangle") {
    drawTriangleGlasses();
  }
});
cornerRadiusInput.addEventListener('input', function() {
  if (frameType === "rectangle") {
    drawGlasses();
  } else if (frameType === "triangle") {
    drawTriangleGlasses();
  }
});
borderWidthInput.addEventListener('input', function() {
  if (frameType === "rectangle") {
    drawGlasses();
  } else if (frameType === "triangle") {
    drawTriangleGlasses();
  }
});
lensSeparationInput.addEventListener('input', function() {
  if (frameType === "rectangle") {
    drawGlasses();
  } else if (frameType === "triangle") {
    drawTriangleGlasses();
  }
});
frameAlphaInput.addEventListener('input', function() {
  if (frameType === "rectangle") {
    drawGlasses();
  } else if (frameType === "triangle") {
    drawTriangleGlasses();
  }
});

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

let initialTouchDistance = null;
let initialScale = 1;
let lastTouch = null;

function getDistanceBetweenTouches(touches) {
  if (touches.length < 2) return 0;
  const dx = touches[0].pageX - touches[1].pageX;
  const dy = touches[0].pageY - touches[1].pageY;
  return Math.sqrt(dx * dx + dy * dy);
}

function onPhotoTouchStart(event) {
  if (event.touches.length === 1) {
    lastTouch = { x: event.touches[0].pageX, y: event.touches[0].pageY };
  } else if (event.touches.length === 2) {
    initialTouchDistance = getDistanceBetweenTouches(event.touches);
    event.preventDefault(); // Prevent pinch-to-zoom on some browsers
  }
}

function onPhotoTouchMove(event) {
  if (event.touches.length === 1 && lastTouch) {
    const dx = event.touches[0].pageX - lastTouch.x;
    const dy = event.touches[0].pageY - lastTouch.y;
    offsetX += dx;
    offsetY += dy;
    lastTouch = { x: event.touches[0].pageX, y: event.touches[0].pageY };
    if (frameType === "rectangle") {
      drawGlasses();
    }
    else if (frameType === "triangle") {
      drawTriangleGlasses()
    }
  } else if (event.touches.length === 2) {
    const distance = getDistanceBetweenTouches(event.touches);
    if (initialTouchDistance) {
      const scaleMultiplier = distance / initialTouchDistance;
      const newFrameWidth = parseInt(frameWidthInput.value) * scaleMultiplier;
      frameWidthInput.value = Math.max(Math.min(newFrameWidth, 200), 50);
      initialTouchDistance = distance;
      if (frameType === "rectangle") {
        drawGlasses();
      }
      else if (frameType === "triangle") {
        drawTriangleGlasses()
      }
    }
    event.preventDefault();
  }
}

function onPhotoTouchEnd(event) {
  if (event.touches.length < 2) {
    initialTouchDistance = null;
  }
  if (event.touches.length === 0) {
    lastTouch = null;
  }
}

glassesCanvas01.addEventListener('touchstart', onPhotoTouchStart, { passive: false });
glassesCanvas01.addEventListener('touchmove', onPhotoTouchMove, { passive: false });
glassesCanvas01.addEventListener('touchend', onPhotoTouchEnd);


