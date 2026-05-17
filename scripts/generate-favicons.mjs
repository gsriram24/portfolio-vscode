import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SOURCE = join(root, "favicondesign.png");
const APP = join(root, "src", "app");

await sharp(SOURCE).resize(512, 512).png().toFile(join(APP, "icon.png"));
await sharp(SOURCE).resize(180, 180).png().toFile(join(APP, "apple-icon.png"));
await sharp(SOURCE).resize(32, 32).toFile(join(APP, "favicon.ico"));

console.log("✓ icon.png (512×512)");
console.log("✓ apple-icon.png (180×180)");
console.log("✓ favicon.ico (32×32)");
