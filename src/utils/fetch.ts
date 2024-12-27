import type { Words, Gallery } from '@/types/types'

export const fetchDict = async function (path: string): Promise<Words> {
  const res = await fetch(path)
  const words: Words = await res.json()
  return words
}

export const fetchGallery = async function (path: string): Promise<Gallery> {
  const res = await fetch(path)
  const gallery = await res.json()
  return gallery[0]
}
