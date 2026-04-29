# Project-1-Pixel-Generator

A lightweight, browser-based image pixelation tool built with vanilla JavaScript and the Canvas API. No frameworks, no dependencies — just HTML, CSS, and JS.

✨ Features

Drag & drop image upload or click to browse
Real-time pixelation controlled by a slider
Auto-scaling — any image size is automatically fitted to the canvas while preserving aspect ratio
Clear button to reset the canvas
Supports JPG, PNG, and WEBP formats

🧠 How It Works

Image Loading
The app uses the browser's Canvas API. When an image is uploaded, it is drawn onto a <canvas> element. The image is automatically scaled to fit the canvas while maintaining its original aspect ratio.
Pixelation Algorithm
The canvas is divided into a grid of square blocks. For each block, the algorithm reads all pixel colors using getImageData(), calculates the average R, G, B values, and fills the entire block with that single color using fillRect().
The entire canvas pixel data is read once before the loop for performance — rather than calling getImageData() separately for each block.

blockSize = 50 → large blocks → heavy pixelation
blockSize = 1 → 1px blocks → original image

The slider maps left (more pixelated) to right (less pixelated) by inverting the value:

javascriptconst blockSize = 51 - slider.value;

🛠️ Built With

HTML5 Canvas API
Vanilla JavaScript (ES6+)
CSS3

📌 Notes

No external libraries or frameworks used
All processing happens locally in the browser — no data is sent to any server.
