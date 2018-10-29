import store from '@/store'

function deviceReady() {
  const options = {
    devKey:  '6egQaSHLoJLjtKGYso8aiA'
  };

  let userAgent = window.navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test( userAgent )) {
    options.appId = "1274981749";
  }

  window.plugins.appsFlyer.initSdk(options);

  window.ga.startTrackerWithId('UA-26472404-10', 30)

  const responce = fetch(`https://www.googleadservices.com/pagead/conversion/817035433/?label=CFtmCMbfoX4QqfHLhQM&bundleid=ru.domovenok.app`, {
    method: 'GET'
  })
}

const analytic = {
  init() {
    if (!store.state.common.isApp) {
      const afterGA = function () {
        setTimeout(function () {
          try {
            window.ga('set', '&uid', store.state.client.clientId);
          } catch (error) {
            afterGA()
          }
        }, 200)
      }

      afterGA();
    } else {
      document.addEventListener("deviceready", function() {
        deviceReady()

        this.sendEvent({name: 'app', value: 'open', ga_action: 'open'}, ['ga', 'af']);
      }, false);
    }
  },

  sendEvent(event, options) {
    options.forEach((item) => {
      if (item === 'ga') {
        if (!store.state.common.isApp && !store.state.common.isSite) {

          const ga_param = {
            "hitType": "event",
            "eventCategory": event.name,
            "eventAction": event.ga_action ? event.ga_action : "click",
            "eventLabel": `${event.value}_lk`
          }

          if (window.ga) {
            window.ga('send', ga_param);
          }
        } else if (store.state.common.isSite) {
          const ga_param = {
            "hitType": "event",
            "eventCategory": event.name,
            "eventAction": event.ga_action ? event.ga_action : "click",
            "eventLabel": `${event.value}`
          }

          if (window.ga) {
            window.ga('send', ga_param);
          }
        } else {
          if (window.ga) {
            window.ga.trackEvent(event.name, event.ga_action ? event.ga_action : "click", `${event.value}_app`)
          }
        }
      }

      if (item === 'af') {
        if (store.state.common.isApp) {
          if (window.plugins) {
            window.plugins.appsFlyer.trackEvent(event.value);
          }
        }
      }

      if (item === 'fb') {
        if (store.state.common.isApp) {
          if (window.facebookConnectPlugin) {
            window.facebookConnectPlugin.logEvent(event.value);
          }
        }
      }

      if (item === 'ya') {}
    });
  },
}

export default analytic
