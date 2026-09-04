import type { InputHTMLAttributes } from "react";

const CustomSearch = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="search"
      {...props}
       className={`p-2.5 rounded-2xl bg-gray-200 outline-0 ${props.className}`}
    />
  );
};

export default CustomSearch;
