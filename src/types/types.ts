export type Word = {
  id: string
  english: string
  pronunciation: string
  chinese: string
  unit: string
}

export type Words = Array<Word>

export type UnitToWords = {
  [key: string]: Words
}
