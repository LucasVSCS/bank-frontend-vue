import Cookie from 'js-cookie'

export default {
  auth (to, from, next) {
    const token = Cookie.get('_capg-bank_token')

    if (!token) {
      next('/login')
    }

    next()
  }
}
