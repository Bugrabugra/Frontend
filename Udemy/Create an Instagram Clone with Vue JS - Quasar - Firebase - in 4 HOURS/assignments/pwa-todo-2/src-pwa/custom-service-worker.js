/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

import {precacheAndRoute} from "workbox-precaching";
import {registerRoute} from "workbox-routing";
import {NetworkFirst} from "workbox-strategies";
import {Queue} from "workbox-background-sync";


// Config
precacheAndRoute(self.__WB_MANIFEST);

// Caching strategies
registerRoute(
  ({url}) => url.pathname.startsWith("/tasks"),
  new NetworkFirst()
)

// Queue - createTask
const createTaskQueue = new Queue("createTaskQueue");

// Events - fetch
self.addEventListener("fetch", event => {
  if (event.request.url.startsWith("http://localhost:3000/createTask")) {
    if (!self.navigator.onLine) {
      const promiseChain = fetch(event.request.clone()).catch(error => {
        return createTaskQueue.pushRequest({request: event.request});
      })
      event.waitUntil(promiseChain);
    }
  }
})

// Events - push
self.addEventListener("push", event => {
  if (event.data) {
    const data = JSON.parse(event.data.text());
    event.waitUntil(
      self.registration.showNotification(data.title)
    )
  }
})

// Events - notification click
self.addEventListener("notificationclick", event => {
  event.waitUntil(
    clients.matchAll()
      .then(clis => {
        const clientUsingApp = clis.find(cli => {
          return cli.visibilityState = "visible";
        })
        if (clientUsingApp) {
          clientUsingApp.navigate("/#/");
          clientUsingApp.focus();
        } else {
          clients.openWindow("/#/");
        }
      })
  )
})
