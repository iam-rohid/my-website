import { FC, PropsWithChildren } from "react";
import Sidebar from "../common/sidebar";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container xl:max-w-screen-xl mx-auto flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default BaseLayout;
