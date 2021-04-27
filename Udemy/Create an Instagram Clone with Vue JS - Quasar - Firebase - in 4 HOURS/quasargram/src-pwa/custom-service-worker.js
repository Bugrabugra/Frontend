/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// Dependencies
import {precacheAndRoute} from "workbox-precaching";
import {registerRoute} from "workbox-routing";
import {StaleWhileRevalidate} from "workbox-strategies";
import {CacheFirst} from "workbox-strategies";
import {ExpirationPlugin} from "workbox-expiration";
import {CacheableResponsePlugin} from "workbox-cacheable-response";
import {NetworkFirst} from "workbox-strategies";
import {Queue} from "workbox-background-sync";


// Config
self.__WB_DISABLE_DEV_LOGS = true;
precacheAndRoute(self.__WB_MANIFEST);

const isBackgroundSyncSupported = "sync" in self.registration;
console.log("isBackgroundSyncSupported: ", isBackgroundSyncSupported)

// Queue - createPost
let queueCreatePost = null;

if (isBackgroundSyncSupported) {
  queueCreatePost = new Queue("queueCreatePost", {
    onSync: async ({queue}) => {
      let entry;
      while (entry = await queue.shiftRequest()) {
        try {
          await fetch(entry.request);
          console.log("Replay successful for request", entry.request);
          const channel = new BroadcastChannel("sw-messages");
          channel.postMessage({msg: "offline-post-uploaded"})
        } catch (error) {
          console.log("Replay failed for request", entry.request, error);

          // Put the entry back in the queue anr re-throw the error
          await queue.unshiftRequest(entry);
          throw error;
        }
      }
      console.log("Replay complete");
    }
  });
}

// Caching strategies
registerRoute(
  ({url}) => {
    console.log("url: ", url)
    return url.host.startsWith("fonts.g");
  },
  new CacheFirst({
    cacheName: "google-fonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)

registerRoute(
  ({url}) => {
    return url.pathname.startsWith("/posts")
  },
  new NetworkFirst()
)

registerRoute(
  ({url}) => {
    return url.href.startsWith("http");
  },
  new StaleWhileRevalidate()
)

// Events - fetch
if (isBackgroundSyncSupported) {
  self.addEventListener("fetch", event => {
    if (event.request.url.endsWith("/createPost")) {
      // Clone the request to ensure it's safe to read when adding to the queue
      if (!self.navigator.onLine) {
        const promiseChain = fetch(event.request.clone()).catch(error => {
          return queueCreatePost.pushRequest({request: event.request});
        });
        event.waitUntil(promiseChain);
      }
    }
  })
}

// Events - push
self.addEventListener("push", event => {
  console.log("Push message received: ", event);

  if (event.data) {
    const data = JSON.parse(event.data.text());
    event.waitUntil(
      self.registration.showNotification(
        data.title,
        {
          body: data.body,
          icon: "icons/icon-128x128.png",
          badge: "icons/icon-128x128.png",
          data: {
            openURL: data.openURL
          }
        }
      )
    )
  }
})

// Events - notifications
self.addEventListener("notificationclick", event => {
  console.log("Event: ", event);
  const notification = event.notification;
  const action = event.action;

  if (action === "hello") {
    console.log("Hello button was clicked!");
  } else if (action === "goodbye") {
    console.log("Goodbye button was clicked!");
  } else {
    event.waitUntil(
      clients
        .matchAll()
        .then(clis => {
          const clientUsingApp = clis.find(cli => {
            return cli.visibilityState === "visible"
          })
          if (clientUsingApp) {
            clientUsingApp.navigate(notification.data.openURL);
            clientUsingApp.focus();
          } else {
            clients.openWindow(notification.data.openURL);
          }
        })
    )
  }
  notification.close();
})

self.addEventListener("notificationclose", event => {
  console.log("Notification was closed", event);
})

