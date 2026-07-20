const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      features: {
        'custom-properties' : false,
      },
    },
  },
};

export default config;