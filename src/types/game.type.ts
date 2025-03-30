export interface GAME_DATA_RESPONSE {
  phrase: string
  clues: CluesList
}

export type CluesList = Array<Clue>

export interface Clue {
  statement: string
  answer: string
  index: number
}

export type Values = Record<string, number>

export enum GAME_RESULT {
  DEFAULT,
  ERROR,
  WIN,
}

export type TypedValues = Record<number, string>
