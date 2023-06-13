---
title: Gulp加速Hexo
tags:
  - Hexo
  - Gulp
categories:
  - Hexo
abbrlink: 954c5566
date: 2019-04-12 17:47:48
updated: 2019-04-12 17:47:48
---

站点访问速度总是让人不满意，想快，那就使劲折腾吧。

## gulp 静态资源压缩

采用 gulp 对静态资源进行压缩，提升访问速度。

### 什么是 Gulp

gulp.js 是一种基于流的，代码优于配置的新一代构建工具.[官方文档](https://github.com/gulpjs/gulp/tree/master/docs)

Gulp 和 Grunt 类似。但相比于 Grunt 的频繁的 I/O 操作，Gulp 的流操作，能更快地完成构建

<!--more-->

#### Gulp 特性

- 使用方便
  - 通过代码优于配置的策略，Gulp 可以让简单的任务简单，复杂的任务更可管理。
- 构建快速
  - 通过流式操作，减少频繁的 IO 操作，更快地构建项目。
- 插件高质
  - Gulp 有严格的插件指导策略，确保插件能简单高质的工作。
- 易于学习
  - 少量的 API，掌握 Gulp 可以毫不费力。构建就像流管道一样，轻松加愉快。

### 安装插件

首先安装 gulp 以及所需要的模块：

```npm
npm install gulp -g
```

```npm
npm install gulp gulp-htmlclean gulp-htmlmin gulp-minify-css gulp-uglify gulp-imagemin --save
```

### 添加代码

然后在根目录下创建**gulpfile.js**文件并写入代码：

```js
var gulp = require('gulp')
var minifycss = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var htmlmin = require('gulp-htmlmin')
var htmlclean = require('gulp-htmlclean')
var imagemin = require('gulp-imagemin')

// 压缩html
gulp.task('minify-html', function() {
  return gulp
    .src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      })
    )
    .pipe(gulp.dest('./public'))
})
// 压缩css
gulp.task('minify-css', function() {
  return gulp
    .src('./public/**/*.css')
    .pipe(
      minifycss({
        compatibility: 'ie8'
      })
    )
    .pipe(gulp.dest('./public'))
})
// 压缩js
gulp.task('minify-js', function() {
  return gulp
    .src('./public/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public'))
})
// 压缩图片
gulp.task('minify-images', function() {
  return gulp
    .src('./public/images/**/*.*')
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ optimizationLevel: 3 }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 7 }),
          imagemin.svgo()
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest('./public/images'))
})
// 默认任务
gulp.task(
  'default',
  gulp.parallel('minify-html', 'minify-css', 'minify-js', 'minify-images')
)
```

## 部署上传

- hexo clean
- hexo g
- gulp
- hexo d

在 gulp 的过程中可能会遇到问题，根据问题排除就可以了～，没啥大问题的。
