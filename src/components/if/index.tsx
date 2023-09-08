import { ReactElement } from 'react';

interface IfProps {
  condition: unknown;
  children: ReactElement;
  else?: ReactElement;
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

  return <></>;
}
