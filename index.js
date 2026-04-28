const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

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

function processFile(file) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;

  img.onload = function () {
    const canvasW = canvas.width; // 600
    const canvasH = canvas.height; // 600

    // spočítáš o kolik se obrázek zmenší
    const scale = Math.min(
      canvasW / img.naturalWidth,
      canvasH / img.naturalHeight,
    );

    // nové rozměry obrázku
    const newW = Math.round(img.naturalWidth * scale);
    const newH = Math.round(img.naturalHeight * scale);

    // vycentruješ obrázek na canvasu
    const offsetX = Math.round((canvasW - newW) / 2);
    const offsetY = Math.round((canvasH - newH) / 2);

    // vymaže předchozí obrázek a nakreslí nový
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, offsetX, offsetY, newW, newH);

    URL.revokeObjectURL(url);
  };
}
