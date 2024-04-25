import esbuildServe from "esbuild-serve";
import inlineImage from "esbuild-plugin-inline-image";
import dotenv from "dotenv";
dotenv.config();

esbuildServe(
  {
    logLevel: "info",
    entryPoints: ["src/main.ts"],
    bundle: true,
    minify: true,
    outfile: "public/bundle.min.js",
    plugins: [inlineImage()],
    define: { ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT) },
  },
  { root: "public", port: 8080 },
);
