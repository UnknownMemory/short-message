"use client"

import {ReactNode, useLayoutEffect, useRef} from 'react';

interface DialogProps {
    children: ReactNode;
    width: string;
    onClose?: () => void;
    isOpen: boolean;
}

export const Dialog = ({children, onClose, isOpen, width}: DialogProps) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useLayoutEffect(() => {
        if (dialogRef.current?.open && !isOpen) {
            dialogRef.current.close();
            if(onClose){
                onClose()
            }
        } else if (!dialogRef.current?.open && isOpen) {
            dialogRef.current?.showModal();
        }
    }, [isOpen, onClose]);

    return (
        <dialog className={`z-10 ${width} dark:bg-black rounded-xl border-sm-dark-gray border`} closedby="any" ref={dialogRef} onClose={onClose}>
            {children}
        </dialog>
    )
}


interface DialogHeaderProps {
    children: ReactNode;
    title: string;
    onClose?: () => void;
    isOpen: boolean;
}

const Header = ({children, title, onClose}: DialogHeaderProps) => {
    return (
        <div className="dark:bg-black dark:text-sm-white md:p-3 flex justify-between w-full rounded-xl">
            <div></div>
            {title}
            <div></div>
        </div>
    )
}

Dialog.Header = Header;