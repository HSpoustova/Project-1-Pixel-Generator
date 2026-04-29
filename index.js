const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const button_clear = document.getElementById('button_clear');
const blockSize = 51 - pixelSlider.value;

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

    const newW = Math.round(img.naturalWidth * scale);
    const newH = Math.round(img.naturalHeight * scale);

    const offsetX = Math.round((canvasW - newW) / 2);
    const offsetY = Math.round((canvasH - newH) / 2);

    // vymaže předchozí obrázek a nakreslí nový
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, offsetX, offsetY, newW, newH);

    URL.revokeObjectURL(url);
  };
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
});
