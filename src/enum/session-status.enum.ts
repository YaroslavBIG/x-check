export enum SessionStatus {
  DRAFT = 'DRAFT',
  REQUESTS_GATHERING = 'REQUESTS_GATHERING',
  CROSS_CHECK = 'CROSS_CHECK',
  COMPLETED = 'COMPLETED'
}

export const COLORS = {
  [SessionStatus.DRAFT]: 'default',
  [SessionStatus.REQUESTS_GATHERING]: 'gold',
  [SessionStatus.CROSS_CHECK]: 'geekblue',
  [SessionStatus.COMPLETED]: 'green'
};
