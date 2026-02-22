import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching"

import { skipWaiting } from "workbox-core"

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute([
  ...self.__WB_MANIFEST,
  {
    url: "/images/favicon.ico",
    revision: null,
  },
  {
    url: "/images/logo.svg",
    revision: null,
  },
])

skipWaiting()
