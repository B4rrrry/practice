import type { Dispatch, FC, SetStateAction } from "react";
import cls from "./Modal.module.scss";
import { createPortal } from "react-dom";


type ModalProps = {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  className: string;
};

const Modal: FC<ModalProps> = (props) => {
  const { children, setIsShow, className } = props;

 

  const modalContainer = document.getElementById("modal-root");
  modalContainer!.style.display = 'flex'

  return createPortal(
    <div className={`${cls.Modal} ${className}`}>
      {children}

    </div>,
    modalContainer!,
  );
};
export default Modal;
