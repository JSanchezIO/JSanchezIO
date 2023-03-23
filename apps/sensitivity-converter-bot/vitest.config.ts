/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    outputFile: {
      junit: 'test-results/unit-integration.xml',
    },
    reporters: ['default', 'junit'],
  },
});
