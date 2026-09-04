import type { InputHTMLAttributes } from "react";

const CustomSearch = (props: InputHTMLAttributes<HTMLInputElement>) => {

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    
  }
  return (
    <input
      type="search"
      {...props}
       className={`p-2.5 rounded-2xl bg-gray-200 outline-0 ${props.className}`}
      //onChange={(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => onChangeHandler(e)}
    />
  );
};

export default CustomSearch;
