var path = require('path')
var webpack = require('webpack')

var bannerPlugin = new webpack.BannerPlugin(
{
  banner: '// { "framework": "Vue" }\n',
  raw: true
})

function getBaseConfig()
{
  return {
    entry:
    {
      'index': path.resolve('src', 'entry.js')
    },
    output:
    {
      path: path.resolve(__dirname, './dist'),
    },
    module:
    {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.vue(\?[^?]+)?$/,
          loaders: []
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader!vue-style-loader'
        },
        // {
        //     test: /\.(png|jpe?g|gif|svg|svg?)(\?.*)?$/,
        //     loader: 'url-loader?limit=10000&name=img/[name].[hash:7].[ext]'
        //   },
        //   {
        //     test: /\.(woff2?|eot|ttf|ttf?|otf)(\?.*)?$/,
        //     loader: 'url-loader?limit=10000&name=fonts/[name].[hash:7].[ext]'
        //   }
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'file-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
          loader: 'file-loader',
          query:
          {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(
      {
        compress:
        {
          warnings: false
        }
      }),
      bannerPlugin
    ]
  }
}

var webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.rules[1].loaders.push('vue-loader')

var nativeConfig = getBaseConfig()
nativeConfig.output.filename = '[name].weex.js'
nativeConfig.module.rules[1].loaders.push('weex-loader')

module.exports = [webConfig, nativeConfig]
