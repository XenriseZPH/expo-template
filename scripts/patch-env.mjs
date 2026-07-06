import { readFileSync, writeFileSync, existsSync } from "fs";
import { networkInterfaces } from "os";
import { resolve } from "path";

const ENV_PATH = resolve(process.cwd(), ".env.local");

function getLocalIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

if (existsSync(ENV_PATH)) {
  const ip = getLocalIP();
  if (ip) {
    let content = readFileSync(ENV_PATH, "utf-8");
    content = content.replace(
      /EXPO_PUBLIC_CONVEX_URL=http:\/\/[0-9.]+:3210/,
      `EXPO_PUBLIC_CONVEX_URL=http://${ip}:3210`,
    );
    content = content.replace(
      /EXPO_PUBLIC_CONVEX_SITE_URL=http:\/\/[0-9.]+:3211/,
      `EXPO_PUBLIC_CONVEX_SITE_URL=http://${ip}:3211`,
    );
    writeFileSync(ENV_PATH, content);
    console.log(`Patched .env.local with IP ${ip}`);
  } else {
    console.warn("Could not detect local IP");
  }
}
