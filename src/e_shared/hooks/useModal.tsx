"use client";

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
      position: 'relative',
      height: 'fit-content',
      backgroundColor: '#222831',
      color: 'white',
      padding: 36,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      backdropFilter: 'blur(2px)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      inset: 0
    }
  } as ReactModal.Styles;

  const ConfirmModal = () => {
    return (
      <ReactModal 
        isOpen={isOpen} 
        ariaHideApp={false}
        style={modalStyle}
      >
        <div>
          {contents}

          <div className="h-10"/>

          <div className="flex items-end gap-4">
            <button className="button-prime" onClick={confirmBtnListener}>confirm</button>
            <button onClick={cancelBtnListener}>cancel</button>
          </div>
        </div>
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

        <div className="h-10"/>

        <button onClick={confirmBtnListener}>ok</button>
      </ReactModal>
    );
  }

  return {
    asyncOpenClose,
    ConfirmModal,
    AlertModal
  };
}
