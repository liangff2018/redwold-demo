const path = require('path')
//启用热更新的第二步
const webpack = require('webpack')
// 导入在内存中生成html页面的 html-webpack-plugin
// 注意：只要是插件都放到plugins节点里。
// 插件的作用：
// 1.自动在内存中根据指定的页面生成一个内存中的页面
// 2.自动把打包好的bundle.js追加到内存的页面中
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 这个配置文件，就是一个js文件，通过Node中的模块操作，向外暴露一个配置对象
module.exports = {
  entry: path.join(__dirname, './src/main'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  mode: 'development', // 设置mode
  // 配置dev-server的第二种方式
  devServer: {
    open: true, //自动打开浏览器
    port: 3000, //设置启动时的支行端口
    // contentBase: 'src', //指定托管的目录,使用html-webpack-plugin后，会内存中该项目根目录的放一份html页面，所以可以不托管src目录
    hot: true,  // 启用热更新的第一步
    proxy: {
      '/api': {
        target: 'http://localhost:3001/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }

  },
  plugins: [
    //new 一个热更新的模块对象，这是启用热更新的第三步
    new webpack.HotModuleReplacementPlugin(),  
    //这是创建在内存中生成html页面的插件对象
    new htmlWebpackPlugin({
      // 指定模板页面，会根据此页面生成内存中的页面
      template: path.join(__dirname, './src/index.html'),
      // 指定生成内存中页面的名称
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ],
  // 这个节点用来配置所有第三方模块加载器
  module: {
    // 所有第三方模块的匹配规则
    rules: [
      // 配置处理.css文件的第三方loader规则
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      // 配置处理.less文件的第三方loader规则
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      // 配置处理》scss文件的第三方loader规则
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      // 处理css文件中，图片路径的url-loader,
      // 可使用limit参数设置是否使用base64编码，如果图片大于limt的值，则不转成base64,否则就转
      // 可使用name参数指定使用原来的名字，不建议使用，会覆盖同名文件
      // 可使用[hash:8]获取32位哈希中的前几位来当做名字的一部分
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/, 
        // use: 'url-loader?limit=1&name=[hash:8]-[name].ext',
        loader: 'url-loader',
        options: {
          limt: 1024,
          esModule: false   //解决img的src显示[object%20Module]的问题
        }
      },
      // 使用url-loader处理字体的url
      {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
      // 配置babel-loader转换为低级语法
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
      // 配置vue-loader打包.vue文件
      {test: /\.vue$/, use: 'vue-loader'}
    ]
  },
  resolve: {
    alias: {
      // 使用最全vue.js可以通过下面的方式实现，这是修改vue被导入时包的路径
      "vue$": 'vue/dist/vue.js'
    }
  }
}