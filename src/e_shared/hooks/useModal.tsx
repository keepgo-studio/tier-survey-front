"use client";

import { useCallback, useRef, useState } from "react";
import ReactModal from "react-modal";

export default function useModal(modalContents: React.ReactNode) {
  const [isOpen, setIsOpen] = useState(false);
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

  const asyncOpenClose = async () => {
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

  const Modal = () => {
    return (
      <ReactModal isOpen={isOpen} ariaHideApp={false}>
        {modalContents}
        <button onClick={confirmBtnListener}>confirm</button>
        <button onClick={cancelBtnListener}>cancel</button>
      </ReactModal>
    );
  };

  return {
    asyncOpenClose,
    Modal,
  };
}
