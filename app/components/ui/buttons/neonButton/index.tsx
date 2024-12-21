import Link from 'next/link';
import styles from './NeonButton.module.scss';

interface NeonButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function NeonButton({ href, onClick, children, className = '', type = 'button' }: NeonButtonProps) {
  const combinedClassName = `${styles.ue_neon_btn} ${className}`;

  // Render as a link if href is provided
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  // Otherwise, render as a button
  return (
    <button type={type} className={combinedClassName} onClick={onClick}>
      {children}
    </button>
  );
}
