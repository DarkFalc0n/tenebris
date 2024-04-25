import { build } from "esbuild";
import clean from "esbuild-plugin-clean";
import copy from "esbuild-plugin-copy";
import inlineImage from "esbuild-plugin-inline-image";
import dotenv from "dotenv";
dotenv.config();

let onBuild = {
  name: "log",
  setup(build) {
    build.onEnd(() => {
      process.stdout.write(`🚀 Tenebris bundled in /dist folder\n`);
    });
  },
};

const builder = async () => {
  await build({
    entryPoints: ["./src/main.ts"],
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ["chrome58", "firefox57", "safari11"],
    outfile: "./dist/bundle.min.js",
    define: { ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT) },
    plugins: [
      clean({
        patterns: ["./dist/*", "./public/bundle.min.js"],
      }),
      inlineImage({
        namespace: "assets",
      }),
      copy({
        assets: [
          {
            from: "./public/index.html",
            to: "./",
          },
          {
            from: "./public/style.css",
            to: "./",
          },
          {
            from: "./public/favicon.ico",
            to: "./",
          },
          {
            from: "./public/favicon.png",
            to: "./",
          },
          {
            from: "./public/assets/**/*",
            to: "./assets/",
          },
        ],
      }),
      onBuild,
    ],
  });
};
builder();
