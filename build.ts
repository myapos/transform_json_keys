import { exec } from "child_process";
import { promisify } from "util";
import { rmSync, writeFileSync } from "fs";

const execAsync = promisify(exec);

async function buildProject() {
  try {
    // Clean the dist directory
    rmSync("dist", { recursive: true, force: true });

    // Run the TypeScript compiler to generate type definitions and JavaScript files
    await execAsync("tsc");

    // Run Bun's build process
    const result = await Bun.build({
      entrypoints: ["src/index.ts"],
      outdir: "dist",
      target: "node",
      minify: true,
      sourcemap: "inline",
    });

    if (result.success) {
      console.log("Build successful!");

      // Create custom package.json in the dist folder
      const packageJsonContent = {
        name: "transform_json_keys",
        version: "1.0.0",
        main: "index.js",
        types: "index.d.ts",
      };
      writeFileSync(
        "dist/package.json",
        JSON.stringify(packageJsonContent, null, 2)
      );
      console.log("Custom package.json created in dist folder.");
    } else {
      console.error("Build failed with errors:");
      console.error(result.logs);
    }
  } catch (error) {
    console.error("Build failed with errors:");
    console.error(error);
  }
}

// Call the async function
buildProject();
