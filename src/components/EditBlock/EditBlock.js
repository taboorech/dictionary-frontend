import { useEffect, useRef } from 'react';
import './EditBlock.scss';

export default function EditBlock(props) {

  const dialog = useRef();

  const closeDialog = (event) => {
    const currentElement = event.target;

    if(currentElement.nodeName !== "DIALOG") {
      return;
    }

    const elemSettings = currentElement.getBoundingClientRect();
    const elemOffsetTop = currentElement.offsetTop;
    const cursorX = event.pageX;
    const cursorY = event.pageY;

    if(
      (cursorX > elemSettings.x && 
      cursorX < (elemSettings.x + elemSettings.width)) &&
      (cursorY > elemOffsetTop &&
      cursorY < (elemOffsetTop + elemSettings.height))
    ){
      return;
    }

    currentElement.classList.add("hidden");

    const onAnimationEnd = () => {
      props.onDialogClose && props.onDialogClose();
      currentElement.classList.remove("hidden");
      currentElement.removeEventListener("animationend", onAnimationEnd);
    }

    currentElement.addEventListener("animationend", onAnimationEnd);
  }

  useEffect(() => {
    if(props.isOpen) {
      return dialog.current.showModal();
    }
    return dialog.current.close();
  }, [props.isOpen]);

  useEffect(() => {
    if(props.toClose) {
      dialog.current.click();
    }
  }, [props.toClose]);

  return (
    <dialog ref={dialog} className={"EditBlock row ".concat(props.className)} style={props.style} onClick={closeDialog}>
      {props.children}
    </dialog>
  )
}