async function buildProject() {
  const result = await Bun.build({
    entrypoints: ["src/index.ts"],
    outdir: "dist",
    target: "node",
    minify: true,
    sourcemap: "inline",
  });

  if (result.success) {
    console.log("Build successful!");
  } else {
    console.error("Build failed with errors:");
    console.error(result.logs);
  }
}

// Call the async function
buildProject();
