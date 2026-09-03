import type { FC } from "react";
import { NavLink, type NavLinkProps } from "react-router";

import cls from "./CustomLink.module.scss";

const CustomLink: FC<NavLinkProps> = ({ className, ...props }) => {
  return (
    <NavLink
      {...props}
      className={(state) => {
        const passedClassName =
          typeof className === "function" ? className(state) : className;

        return [
          cls.root,
          state.isActive ? "font-bold text-xl" : "text-xl",
          passedClassName,
        ]
          .filter(Boolean)
          .join(" ");
      }}
    />
  );
};

export default CustomLink;
