import React, { ReactNode } from 'react';
import styles from './CheckInfoListItem.module.scss';

interface ListItemProps {
  heading: string,
  info?: string,
  children?: ReactNode
}

const CheckInfoListItem = (props: ListItemProps) => {
  const { heading, info, children } = props;
  return (
    <li>
      <p className={styles.heading}>{heading}</p>
      <p className={styles.info}>{info || children}</p>
    </li>
  );
}

export default CheckInfoListItem;
