interface NumberBulletProps {
  number: number;
}

export function NumberBullet({ number }: NumberBulletProps) {
  return (
    <div className="from-primary-lighter to-primary outline-primary-dark/50 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-linear-to-b outline">
      <span className="text-primary-foreground text-2xl font-bold">{number}</span>
    </div>
  );
}
