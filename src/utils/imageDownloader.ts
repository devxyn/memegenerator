export const downloadImage = (meme: { topText: string; bottomText: string; url: string }) => {
  if (!meme.url) return;
  // Create a canvas to add texts
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  img.src = meme.url;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0);

      const impactFont = `Impact, sans-serif`;
      const fontSize = Math.floor(canvas.width * 0.07); // scale font size relative to width (~7%)
      ctx.font = `bold ${fontSize}px ${impactFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = Math.max(4, Math.floor(fontSize / 7)); // proportional border

      // Helper function to mimic multiple text-shadows in canvas
      const drawTextWithShadow = (text: string, x: number, y: number) => {
        const shadowOffsets = [
          [2, 2],
          [-2, -2],
          [2, -2],
          [-2, 2],
          [0, 2],
          [2, 0],
          [0, -2],
          [-2, 0],
        ];
        // Draw black shadow
        ctx.save();
        ctx.fillStyle = "black";
        shadowOffsets.forEach(([dx, dy]) => {
          ctx.fillText(text, x + dx, y + dy);
        });
        ctx.restore();
        // Draw white text on top
        ctx.strokeText(text, x, y);
        ctx.fillStyle = "white";
        ctx.fillText(text, x, y);
      };

      // Top text
      if (meme.topText) {
        const topText = meme.topText.toUpperCase();
        const margin = fontSize * 0.3 + 15; // mimic "margin: 15px 0"
        drawTextWithShadow(topText, canvas.width / 2, margin);
      }
      // Bottom text
      if (meme.bottomText) {
        const bottomText = meme.bottomText.toUpperCase();
        const margin = fontSize * 0.3 + 15; // same margin from bottom
        drawTextWithShadow(bottomText, canvas.width / 2, canvas.height - fontSize - margin);
      }
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };
  img.onerror = () => {
    console.error("Failed to load image for download.");
    alert("Failed to download image.");
  };
};
