import {ReactNode, useLayoutEffect, useRef} from 'react';

interface DialogProps {
    children: ReactNode;
    onClose?: () => void;
    isOpen: boolean;
}

export const Dialog = ({children, onClose, isOpen}: DialogProps) => {
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
        <dialog className="z-10" closedby="any" ref={dialogRef}>
            {children}
        </dialog>
    )
}

const Header = ({children, onClose}: Partial<DialogProps>) => {
    return <div className="w-full">{children}</div>
}

Dialog.Header = Header;