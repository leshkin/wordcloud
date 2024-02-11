export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === '/en') {
    return navigateTo('/', { redirectCode: 301 })
  }
})
