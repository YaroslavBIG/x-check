export enum SessionStatus {
  DRAFT = 'DRAFT',
  REQUESTS_GATHERING = 'REQUESTS_GATHERING',
  CROSS_CHECK = 'CROSS_CHECK',
  COMPLETED = 'COMPLETED'
}

export const FRIENDLY_STATUS = {
  [SessionStatus.DRAFT]: 'DRAFT',
  [SessionStatus.REQUESTS_GATHERING]: 'OPEN',
  [SessionStatus.CROSS_CHECK]: 'CROSS CHECK',
  [SessionStatus.COMPLETED]: 'COMPLETED'
};

export const COLORS = {
  [FRIENDLY_STATUS[SessionStatus.DRAFT]]: 'default',
  [FRIENDLY_STATUS[SessionStatus.REQUESTS_GATHERING]]: 'gold',
  [FRIENDLY_STATUS[SessionStatus.CROSS_CHECK]]: 'geekblue',
  [FRIENDLY_STATUS[SessionStatus.COMPLETED]]: 'green'
};
