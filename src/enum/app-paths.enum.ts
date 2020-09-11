export enum XCheckPath {
  TASKS = '/tasks',
  SESSIONS = '/sessions',
  REQUESTS = '/requests',
  REVIEWS = '/reviews',
  DEBATES = '/debates',
}

export const PathMap: any = {
    [XCheckPath.TASKS]: '1' ,
    [XCheckPath.REQUESTS]: '2',
    [XCheckPath.SESSIONS]: '3',
    [XCheckPath.REVIEWS]: '4' ,
    [XCheckPath.DEBATES]: '5'
}
