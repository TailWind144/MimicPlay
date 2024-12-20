export default function (time: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(0)
    }, time)
  })
}
