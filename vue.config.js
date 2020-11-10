module.exports = {
  "runtimeCompiler": true,
  "devServer": {
    "proxy": "http://localhost:9002"
  },
  "transpileDependencies": [
    "vuetify"
  ]
}