export const insertToArrayByIndex = (arr: Array<any>, index: number, newItem: any) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
]
