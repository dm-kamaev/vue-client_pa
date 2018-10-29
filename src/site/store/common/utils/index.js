export function checkCookies(cookies) {
  return cookies.every((item) => {
    return localStorage[item.name]
  })
}
