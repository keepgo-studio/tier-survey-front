"use client";

import Button from "../components/Button";
import Frame from "../components/Frame";
import { Inter } from "../fonts/fonts";
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

  const asyncOpenClose = async (title: string, content?: React.ReactNode) => {
    setContents((
      <>
        <h4 className="text-2xl uppercase font-bold">{title}</h4>
        <div className="h-8"/>
        {content && <div className="">{content}</div>}
        <div className="h-12"/>
      </>
    ));

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
      color: 'white',
      padding: 0,
      border: 'none',
      background: 'transparent'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      backdropFilter: 'blur(4px)',
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
        className={Inter.className}
      >
        <Frame className="bg-dark-black min-w-[400px] min-h-[180px] !p-9 flex flex-col justify-between max-w-md">
          {contents}

          <div className="h-2"/>

          <div className="w-full flex items-center justify-end gap-4">
            <Button className="bg-blue" onClick={confirmBtnListener}>confirm</Button>
            <Button className="bg-gray" onClick={cancelBtnListener}>cancel</Button>
          </div>
        </Frame>
      </ReactModal>
    );
  };

  const AlertModal = () => {
    return (
      <ReactModal 
        isOpen={isOpen} 
        ariaHideApp={false}
        style={modalStyle}
        className={Inter.className}
      >
        <Frame className="bg-dark-black min-w-[400px] min-h-[180px] !p-9 flex flex-col justify-between max-w-md">
          {contents}

          <div className="h-6"/>

          <div className="w-full flex items-center justify-end">
            <Button className="bg-gray justify-self-end" onClick={confirmBtnListener}>ok</Button>
          </div>
        </Frame>
      </ReactModal>
    );
  }

  return {
    asyncOpenClose,
    ConfirmModal,
    AlertModal
  };
}
