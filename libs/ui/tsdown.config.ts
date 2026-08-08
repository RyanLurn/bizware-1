import { createReactLibConfig } from "@repo/tsdown-config";

export default createReactLibConfig({
  exports: {
    customExports: {
      "./styles.css": "./src/styles/index.css",
      "./typeset.css": "./src/styles/typeset.css",
    },
  },
});
