interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="container mx-auto w-full max-w-2xl p-6 lg:p-8">{children}</div>;
}
