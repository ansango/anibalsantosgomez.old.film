import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Structure: FC<Props> = ({ children }) => {
  return <div className="w-full max-w-6xl mx-auto">{children}</div>;
};

export default Structure;
