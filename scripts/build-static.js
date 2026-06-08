const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const sourceHtml = fs
  .readdirSync(root)
  .find(
    (name) =>
      name.endsWith(".html") &&
      name !== "index.html" &&
      name !== "index-standalone-src.html" &&
      !name.includes("standalone")
  );

if (!sourceHtml) {
  throw new Error("Could not find the working HTML file.");
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

fs.copyFileSync(path.join(root, sourceHtml), path.join(dist, "index.html"));

for (const name of fs.readdirSync(root)) {
  if (name.endsWith(".jsx") || name.endsWith(".css")) {
    fs.copyFileSync(path.join(root, name), path.join(dist, name));
  }
}

const canvasState = ".design-canvas.state.json";
if (fs.existsSync(path.join(root, canvasState))) {
  fs.copyFileSync(path.join(root, canvasState), path.join(dist, canvasState));
}

console.log(`Built ${sourceHtml} into dist/index.html`);
