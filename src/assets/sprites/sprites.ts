import { Jimp } from "jimp";

export async function renderSprite(spriteUrl: string): Promise<void> {

  if (!spriteUrl) {
    console.log("(no sprite available)");
    return;
  }

  try {
    const image = await Jimp.read(spriteUrl);
    
    image.resize({ w: 80, h: 80 });

    const lines: string[] = [];

    for (let y = 0; y < image.height; y += 2) {
      let line = "";
      for (let x = 0; x < image.width; x++) {
        const topPixel = image.getPixelColor(x, y);
        const bottomPixel =
          y + 1 < image.height ? image.getPixelColor(x, y + 1) : 0x00000000;

        const tr = (topPixel >> 24) & 0xff;
        const tg = (topPixel >> 16) & 0xff;
        const tb = (topPixel >> 8) & 0xff;
        const ta = topPixel & 0xff;

        const br = (bottomPixel >> 24) & 0xff;
        const bg = (bottomPixel >> 16) & 0xff;
        const bb = (bottomPixel >> 8) & 0xff;
        const ba = bottomPixel & 0xff;

        if (ta < 128 && ba < 128) {
          line += " "; 
        } else if (ta < 128) {
          line += `\x1b[48;2;0;0;0m\x1b[38;2;${br};${bg};${bb}m▄\x1b[0m`;
        } else if (ba < 128) {
          line += `\x1b[48;2;0;0;0m\x1b[38;2;${tr};${tg};${tb}m▀\x1b[0m`;
        } else {
          line += `\x1b[48;2;${tr};${tg};${tb}m\x1b[38;2;${br};${bg};${bb}m▄\x1b[0m`;
        }
      }
      if (line.trim()) lines.push(line);
    }

    console.log(lines.join("\n"));
  } catch (error) {
    console.log(`(sprite not available): ${error}`);
  }
}
