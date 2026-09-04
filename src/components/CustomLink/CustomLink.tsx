import type { FC } from "react";
import { NavLink, type NavLinkProps } from "react-router";

const CustomLink: FC<NavLinkProps> = ({ className, ...props }) => {
  return (
    <NavLink
      {...props}
      className={(state) => {
        const passedClassName =
          typeof className === "function" ? className(state) : className;

        return [
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
