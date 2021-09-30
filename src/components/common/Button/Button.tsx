import React from 'react';
import './Button.scss';

interface ButtonProps {
  children?: JSX.Element | null;
  text?: string | null;
  onClick: () => void;
  dataProps?: object;
  type?: string;
  className?: string;
}

const Button = ({
  children,
  text = '',
  onClick,
  dataProps = {},
  type = 'primary',
  className = '',
}: ButtonProps) => {
  let style = `center ${className}`;
  if (type === 'primary') style += ' primary';
  if (type === 'disabled') style += ' disabled';

  const content = children || text;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={type === 'disabled'}
      className={style}
      {...dataProps}
    >
      {content}
    </button>
  );
};

export default Button;