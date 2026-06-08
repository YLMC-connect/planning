const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const sourceHtml = "index.html";
const sourcePath = path.join(root, sourceHtml);

if (!fs.existsSync(sourcePath)) {
  throw new Error("Could not find index.html.");
}

const html = fs.readFileSync(sourcePath, "utf8");
const assetNames = new Set();
const assetRe = /<(?:script|link)\b[^>]+(?:src|href)="([^"]+)"/g;
for (const match of html.matchAll(assetRe)) {
  const asset = match[1];
  if (/^(https?:)?\/\//.test(asset) || asset.startsWith("#")) continue;
  assetNames.add(asset);
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

fs.copyFileSync(sourcePath, path.join(dist, sourceHtml));

for (const name of assetNames) {
  const source = path.join(root, name);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing asset referenced by index.html: ${name}`);
  }
  fs.copyFileSync(source, path.join(dist, name));
}

const canvasState = ".design-canvas.state.json";
if (fs.existsSync(path.join(root, canvasState))) {
  fs.copyFileSync(path.join(root, canvasState), path.join(dist, canvasState));
}

console.log(`Built ${sourceHtml} with ${assetNames.size} referenced assets into dist/`);
