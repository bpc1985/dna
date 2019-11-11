module.exports = {
  "presets": [
    // Fix Polyfill for IE 11 https://www.thebasement.be/updating-to-babel-7.4
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3
    }],
    "@babel/preset-react"
  ],
  "plugins": [
    ["@babel/transform-runtime"]
  ]
}