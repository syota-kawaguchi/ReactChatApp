import React, { useCallback, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css"

type Props = {
    isOpen: boolean;
    onClose: VoidFunction;
    children: React.ReactNode | React.ReactNode[];
}

export const Dialog = ({isOpen, children, onClose} : Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect((): void => {
        const dialogElement = dialogRef.current;
        if (!dialogElement) return;
        if (isOpen) {
            if (dialogElement.hasAttribute("open")) {
                return;
            }
            dialogElement.showModal();
        }
        else {
            if (!dialogElement.hasAttribute("open")) {
                return;
            }
            dialogElement.close();
        }
    }, [isOpen])

    const handleClickDialog = useCallback(
        (): void => onClose(),
        [onClose]
    );

    const handleClickContent = useCallback(
        (event: React.MouseEvent<HTMLDivElement>): void => event.stopPropagation(),
        []
    );
    
    return (
        <dialog
            className="w-96 mx-auto rounded"
            ref={dialogRef}
            onClick={handleClickDialog}
        >
            <div className="" onClick={handleClickContent}>
                {children}
            </div>
        </dialog>
    );
}