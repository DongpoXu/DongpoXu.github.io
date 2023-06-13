var OriginTitle = document.title
var titleTime
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    $('[rel="icon"]').attr('href', '/images/favicon-error.png')
    document.title = '╭(°A°`)╮页面崩溃啦 ~'
    clearTimeout(titleTime)
  } else {
    $('[rel="icon"]').attr('href', '/images/xu.jpg')
    document.title = '(ฅ>ω<*ฅ) 嗨~你好呀~' + OriginTitle
    titleTime = setTimeout(function() {
      document.title = OriginTitle
    }, 2000)
  }
})
