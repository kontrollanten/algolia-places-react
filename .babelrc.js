module.exports = {
  "presets": [
     "@babel/preset-env"
  ],
   "plugins": [
     ["@babel/plugin-proposal-class-properties", {}, "plugin-prop-class-prop"],
     "@babel/plugin-transform-react-jsx",
     process.env.NODE_ENV === 'test' && "@babel/plugin-transform-runtime"
   ].filter(p => p !== false)
};
