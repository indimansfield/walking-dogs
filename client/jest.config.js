module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "moduleFileExtensions": [
    "js",
    "ts",
    "json",
    // tell Jest to handle `*.vue` files
    "vue"
  ],
  "transform": {
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.ts?$": "ts-jest"
  },
  "testURL": "http://localhost/"
}
