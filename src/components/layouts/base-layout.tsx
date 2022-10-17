import { FC, PropsWithChildren } from "react";
import Sidebar from "../common/sidebar";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container xl:max-w-screen-xl mx-auto flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default BaseLayout;
