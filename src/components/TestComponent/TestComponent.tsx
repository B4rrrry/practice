import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import cls from "./TestComponent.module.scss";

const TestComponent = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className={cls.TestComponent}>
      <h1 className="" data-testid="testComp">
        Hello
      </h1>
      <CustomButton data-testid="btn" onClick={() => setCounter(prev => prev + 1)}>Add </CustomButton>
      <p data-testid="counter">{counter}</p>
    </div>
  );
};
export default TestComponent;
