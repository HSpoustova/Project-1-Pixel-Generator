const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const button_clear = document.getElementById('button_clear');
const pixelSlider = document.getElementById('pixelSlider');
const blockSize = Math.round(pixelSlider.value / 2);
let lastImg = null;
let offsetX, offsetY, newW, newH; //undefined, but I fill it in onload function

function processFile(file) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;

  img.onload = function () {
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    const scale = Math.min(
      canvasW / img.naturalWidth,
      canvasH / img.naturalHeight,
    );

    newW = Math.round(img.naturalWidth * scale);
    newH = Math.round(img.naturalHeight * scale);

    offsetX = Math.round((canvasW - newW) / 2);
    offsetY = Math.round((canvasH - newH) / 2);

    lastImg = img;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, offsetX, offsetY, newW, newH);

    URL.revokeObjectURL(url);
  };
}

function applyPixelate(blockSize) {
  const width = canvas.width;
  const height = canvas.height;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      const [r, g, b] = getAverageColor(x, y, blockSize, data, width);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x, y, blockSize, blockSize);
    }
  }
}

function getAverageColor(x, y, blockSize, data, width) {
  let r = 0,
    g = 0,
    b = 0,
    count = 0;

  for (let by = 0; by < blockSize; by++) {
    for (let bx = 0; bx < blockSize; bx++) {
      const index = ((y + by) * width + (x + bx)) * 4;
      r += data[index];
      g += data[index + 1];
      b += data[index + 2];
      count++;
    }
  }

  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) processFile(fileInput.files[0]);
});

button_clear.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lastImg = null;
  pixelSlider.value = 25;
});

pixelSlider.addEventListener('input', () => {
  if (!lastImg) return;

  const blockSize = Math.round(pixelSlider.value / 2);

  ctx.drawImage(lastImg, offsetX, offsetY, newW, newH);
  applyPixelate(blockSize);
});
