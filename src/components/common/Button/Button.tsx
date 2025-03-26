import { ReactNode, MouseEventHandler } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

const Button = ({ onClick, disabled = false, children, className = '' }: ButtonProps) => {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export { Button };