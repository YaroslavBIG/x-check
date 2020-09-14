export const insertToArrayByIndex = (arr: Array<string>, index: number, newItem: string) => {
  if(index < arr.length) {
   return ([
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
])}
  return ([ ...arr, newItem ])
}
