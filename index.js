img.onload = function () {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0);
};
