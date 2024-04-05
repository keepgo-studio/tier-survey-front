"use client";

import Button from "@shared-inner/components/Button";
import { useCallback, useRef, useState } from "react";
import ReactModal from "react-modal";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [contents, setContents] = useState<React.ReactNode>();
  const isConfirmedRef = useRef(false);
  const lifeCycleRef = useRef(false);

  const DURATION = 200;

  const wait = () => {
    return new Promise((res) => {
      const loop = () => {
        setTimeout(() => {
          if (lifeCycleRef.current === false) {
            return res(true);
          }
          loop();
        }, DURATION);
      };

      loop();
    });
  };

  const asyncOpenClose = async (contents?: React.ReactNode) => {
    if (contents) setContents(contents);

    setIsOpen(true);
    lifeCycleRef.current = true;

    await wait();

    return isConfirmedRef.current;
  };

  const confirmBtnListener = useCallback(() => {
    setIsOpen(false);
    isConfirmedRef.current = true;
    lifeCycleRef.current = false;
  }, []);

  const cancelBtnListener = useCallback(() => {
    setIsOpen(false);
    isConfirmedRef.current = false;
    lifeCycleRef.current = false;
  }, []);
  
  const modalStyle = {
    content: {
      height: 'fit-content',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  } as ReactModal.Styles;

  const ConfirmModal = () => {
    return (
      <ReactModal 
        isOpen={isOpen} 
        ariaHideApp={false}
        style={modalStyle}
      >
        {contents}
        <Button theme="blue" onClick={confirmBtnListener}>confirm</Button>
        <Button onClick={cancelBtnListener}>cancel</Button>
      </ReactModal>
    );
  };

  const AlertModal = () => {
    return (
      <ReactModal 
        isOpen={isOpen} 
        ariaHideApp={false}
        style={modalStyle}
      >
        {contents}
        <Button onClick={confirmBtnListener}>ok</Button>
      </ReactModal>
    );
  }

  return {
    asyncOpenClose,
    ConfirmModal,
    AlertModal
  };
}
