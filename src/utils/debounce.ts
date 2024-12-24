export default function (callback: () => void, time: number) {
  let timeout: number | null = null
  return function () {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback()
    }, time)
  }
}
