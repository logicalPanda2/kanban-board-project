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
			<div className="w-lg h-96 rounded-2xl px-6 py-4 bg-gray-100 flex flex-col relative [box-shadow:0_1px_2px_black,inset_0_1px_2px_white] selection:bg-green-800 selection:text-neutral-100 [transition:top_250ms_ease] top-0 mx-4" ref={modalRef}>
                <p className="text-3xl text-center">Welcome!</p>
                <ul className="list-disc mx-4 mt-4">
                    <li className="mb-2">Make and track your tasks easily with this kanban-style task tracker.</li>
                    <li className="mb-2">To change a task's status, use the arrows in the bottom of each task. You can also drag and drop tasks in desktop.</li>
                    <li className="mb-2">The tags 
                        <div className="rounded-full inline-block w-3 h-3 border border-solid border-gray-800 bg-white mx-1"></div>
                        <div className="rounded-full inline-block w-3 h-3 border border-solid border-gray-800 bg-green-500 mx-1"></div>
                        <div className="rounded-full inline-block w-3 h-3 border border-solid border-gray-800 bg-amber-500 mx-1"></div>
                        <div className="rounded-full inline-block w-3 h-3 border border-solid border-gray-800 bg-red-500 mx-1"></div>, shown on the top right corner, do not inherently carry any meaning. They are whatever you think they are, be it priority, difficulty, time taken, you name it.
                    </li>
                    <li>Good luck with your work!</li>
                </ul>
                <div className="absolute top-5 right-6 hover:bg-gray-300 focus-within:bg-gray-300 transition rounded-full focus-within:outline-0">
                    <button onClick={onClose} className="px-3 py-1 transform-[scaleX(1.4)] font-semibold focus-visible:outline-0" aria-label="close">X</button>
                </div>
            </div>
        </div>
    );
}