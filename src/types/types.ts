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

export type Dict = {
  id: string
  nick: string
  name: string
  path: string
  imgPath: string
}
export type Gallery = {
  [index: string]: Array<Dict>
}

export type Settings = {
  [key: string]: string | number
  loopNums: number
  audioType: string
}
