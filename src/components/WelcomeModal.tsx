import { useRef, useEffect } from "react";

export default function WelcomeModal({onClose}: WelcomeModalProps) {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!modalRef.current || !overlayRef.current) return;

        overlayRef.current.classList.add("bg-transparent");
        modalRef.current.classList.add("top-512");
        let timeout = setTimeout(() => {
            if(!modalRef.current || !overlayRef.current) return;

            overlayRef.current.classList.remove("bg-transparent");
            modalRef.current.classList.remove("top-512");
        }, 4);

        return () => {
            clearTimeout(timeout);
        }
    }, [modalRef, overlayRef])

    return (
        <div className="fixed inset-0 z-20 bg-neutral-600/70 flex items-center justify-center transition" ref={overlayRef}>
			<div className="w-lg h-96 rounded-2xl px-6 py-4 bg-gray-100 flex flex-col relative [box-shadow:0_1px_2px_black,inset_0_1px_2px_white] selection:bg-green-800 selection:text-neutral-100 [transition:top_250ms_ease] top-0" ref={modalRef}>
                <p>Welcome!</p>
            </div>
        </div>
    );
}