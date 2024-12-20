export default function (callback: () => void, time: number) {
  let timeout: number | null = null
  return function () {
    if (!timeout) {
      callback()
      timeout = setTimeout(() => {
        timeout = null
      }, time)
    }
  }
}