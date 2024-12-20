import type { Words } from '@/types/types'
export default async function (path: string): Promise<Words> {
  const res = await fetch(path)
  const words: Words = await res.json()
  return words
}
