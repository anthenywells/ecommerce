import React from "react";
import Menu from "./Menu";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="p-5 bg-light mb-3">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={`container-fluid ${className}`}>{children}</div>
  </div>
);

export default Layout;
