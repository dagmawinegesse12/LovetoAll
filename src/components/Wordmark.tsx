interface WordmarkProps {
  size?: number;
  dark?: boolean;
}

export default function Wordmark({ size = 22, dark = true }: WordmarkProps) {
  return (
    <span
      className="wordmark"
      style={{
        fontSize: size,
        letterSpacing: '0.22em',
        color: dark ? 'var(--ink)' : 'var(--paper)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      Love&nbsp;to&nbsp;All
    </span>
  );
}
