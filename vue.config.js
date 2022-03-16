const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : ''

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  // baseUrl: BASE_URL,
  publicPath: BASE_URL,
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: 'dist',
  // 存放静态资源的目录
  assetsDir: 'static',
  // html输出路径
  indexPath: 'index.html',
  // pages:{ type:Object,Default:undfind }
  /*
  构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
  个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
  的字符串，
  注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
  */
  pages: {
    index: {
    // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      title: '产业金融服务平台'
    }
  },
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // transpileDependencies: ['tree-table-vue', 'iview'],
  chainWebpack: config => {
    config.entry('polyfill').add('@babel/polyfill')
    config.resolve.symlinks(true)
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('assets', 'src/assets')
  },
  // 打包时清除console信息
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串

  // '/newmdpa' =>  192.168.103.16:8303（供应链协同）

  devServer: {
    disableHostCheck: true,
    // 端口配置
    port: 8081,
    proxy: {
      '/newmdpa': {
        // target: 'http://192.168.103.16:8303',
        target: 'http://22.42.41.78:8303',
        changeOrigin: true,
        pathRewrite: {
          '^/newmdpa': '/'
        }
      },
      '/api': {
        target: 'http://192.168.0.35:9995',
        // target: 'http://192.168.103.16:8303',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    // css 地图导航
    sourceMap: true
  }
}

// module.exports = {
//   lintOnSave: true,
//   productionSourceMap: false,
//   chainWebpack: (config) => {
//     //忽略的打包文件
//     config.externals({
//       'vue': 'Vue',
//       'vue-router': 'VueRouter',
//       'vuex': 'Vuex',
//       'axios': 'axios',
//       'element-ui': 'ELEMENT',
//     })
//     const entry = config.entry('app')
//     entry
//       .add('babel-polyfill')
//       .end()
//     // entry
//     //   .add('classlist-polyfill')
//     //   .end()
//     // entry
//     //   .add('@/mock')
//     //   .end()
//   },
//   devServer: {
//     // 端口配置
//     port: 1888,
//     // 反向代理配置
//     proxy: {
//       '/api': {
//         target: 'http://192.168.0.35:9995',
//         // target: 'http://39.96.71.10:9995',
//         ws: true,
//         pathRewrite: {
//           '^/api': '/'
//         }
//       }
//     }
//   }
// }
