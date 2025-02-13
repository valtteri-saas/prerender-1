import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[1320px] mx-auto w-full">
      {children}
    </div>
  );
}
