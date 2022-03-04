import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import clear from "rollup-plugin-clear";
import postcss from "rollup-plugin-postcss"; // v4.0.0

export default [
  {
    input: "src/index.ts",
    output: [
      {
        format: "esm",
        file: "lib/index.esm.js",
        exports: "named",
      },
      {
        format: "cjs",
        file: "lib/index.js",
        exports: "named",
      },
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: null,
          preserveModules: true,
        },
      }),
      peerDepsExternal(),
      vue({ preprocessStyles: true }),
      postcss(),
      clear({
        targets: ["./lib"],
      }),
    ],
  },
];
