"use client"
import {ReactNode, useLayoutEffect, useRef} from 'react';
import {XMarkIcon} from "@heroicons/react/16/solid";

interface DialogProps {
    children: ReactNode;
    customStyle: string;
    onClose?: () => void;
    isOpen: boolean;
}

export const Dialog = ({children, onClose, isOpen, customStyle}: DialogProps) => {
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
        <dialog className={`z-10 ${customStyle} dark:bg-black rounded-xl border-sm-dark-gray border`} closedby="any" ref={dialogRef} onClose={onClose}>
            {children}
        </dialog>
    )
}


interface DialogHeaderProps {
    title: string;
    onClose?: () => void;
    formId?: string;
}

const Header = ({title, onClose, formId}: DialogHeaderProps) => {
    return (
        <div className="dark:bg-black dark:text-sm-white p-3 grid grid-cols-3 items-center w-full rounded-xl">
            <XMarkIcon className="dark:text-sm-white size-6 cursor-pointer" onClick={onClose}></XMarkIcon>
            <div className="text-center">{title}</div>
            <div className="flex justify-end">
                <button className="btn-light" form={formId}>Save</button>
            </div>
        </div>
    )
}

Dialog.Header = Header;