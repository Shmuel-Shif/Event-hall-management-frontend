module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        'react-native$': 'react-native-web'
      }
    }],
    'babel-plugin-react-native-web',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread'
  ]
}; 