;(function () {
  'use strict'
  if (typeof document === 'undefined') return

  var injectionScript = document.currentScript

  var botId = injectionScript.dataset.botId
  if (!botId) return

  var apiUrl = 'https://api.zenbot.ai/bots'

  fetch(apiUrl + '/' + botId + '/')
    .then((res) => res.json())
    .then(init)

  function init(bot) {
    if (!bot.isEnabled) return

    var root = document.createElement('div')
    root.id = 'zenbot-chat'

    var vue = document.createElement('script')
    vue.src = 'https://cdn.jsdelivr.net/npm/vue@2.6.11'
    vue.onload = onVueLoad
    root.appendChild(vue)
    document.body.appendChild(root)

    function onVueLoad() {
      var zb = document.createElement('script')
      zb.src = 'https://raw.githack.com/masto-ai/zenbot/lib/zenbot-ui.min.js'
      zb.onload = function () {
        var widget = document.createElement('zenbot-ui')
        widget.setAttribute('bot-id', botId)
        widget.setAttribute('api-url', apiUrl)
        widget.setAttribute('session-id', 'test')
        root.appendChild(widget)
      }
      root.appendChild(zb)
    }
  }
})()
