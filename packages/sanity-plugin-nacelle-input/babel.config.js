module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          edge: '14'
        }
      }
    ],
    '@babel/preset-react'
  ]
}
