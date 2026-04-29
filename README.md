# Project-1-Pixel-Generator

A lightweight, browser-based image pixelation tool built with vanilla JavaScript and the Canvas API. No frameworks, no dependencies — just HTML, CSS, and JS.

Drag & drop any image, adjust the slider and watch it transform into pixel art in real time. All processing happens locally in the browser — no data is sent to any server.

## ✨ Features

- Drag & drop image upload or click to browse
- Real-time pixelation controlled by a slider
- Auto-scaling — any image size is automatically fitted to the canvas while preserving aspect ratio
- Clear button to reset the canvas
- Supports JPG, PNG, and WEBP formats
- Smooth pixelation range — optimized to avoid performance issues on fine detail

## 🧠 How It Works

When an image is uploaded, it is drawn onto a `<canvas>` element and automatically scaled to fit while maintaining its original aspect ratio. The pixelation algorithm then divides the canvas into a grid of square blocks. For each block, it reads all pixel colors using `getImageData()`, calculates the average R, G, B values, and fills the entire block with that single color using `fillRect()`. Canvas pixel data is read once before the loop for performance.

The slider controls the block size using a proportional formula — slider range min="5" max="50" maps to blockSize 2–25, ensuring smooth performance across the full range without rendering artifacts:

const blockSize = Math.round(pixelSlider.value / 2);

The result: slide left for heavy pixelation, slide right for subtle detail.

## 🛠️ Built With

HTML5 Canvas API · Vanilla JavaScript ES6+ · CSS3 · Google Fonts Jersey 15

## 📌 Notes

No external libraries or frameworks used. All processing happens locally in the browser — no data is sent to any server.
