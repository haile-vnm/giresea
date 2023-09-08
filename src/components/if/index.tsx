import { ReactNode } from 'react';

interface IfProps {
  condition: unknown;
  children: ReactNode;
  else?: ReactNode;
}
export default function If({
  condition,
  children,
  else: elseElement,
}: IfProps) {
  if (condition) {
    return children;
  }

  if (elseElement) {
    return elseElement;
  }

  return null;
}
