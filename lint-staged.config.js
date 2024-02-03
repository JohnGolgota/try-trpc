const config = {
  "*.{js,jsx,ts,tsx}": ["pnpm run format"],
  "*.{md,json}": "prettier --write",
};

module.exports = config;
