import Class from "./DropdownButton.module.css"
import type { DropDownButtonProps } from "./DropdownButton.interface";
import { useEffect, useRef, useState } from "react";

const DropdownButton = ({
    children,
    button,
    allowButtonOpen = false,
}: DropDownButtonProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const toggle = (): void => setIsOpen(prev=>!prev)
    const close = (): void => setIsOpen(false)

    useEffect(() => {
        const closeWhenNotRelated = (e: MouseEvent): void => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                close()
            }
        }
        document.addEventListener('mousedown', closeWhenNotRelated)
        return () => {
            document.removeEventListener('mousedown', closeWhenNotRelated)
        }
    }, [isOpen])


    return (
        <div className={Class.dropdown} ref={ref}>
            <div className={Class.dropdownContainer}>
                <div className={Class.btn} onClick={() => allowButtonOpen ? toggle() : close()}>
                    {button}
                </div>
                <div className={`${Class.dropdownContent} ${isOpen ? Class.open : ''}`}>
                    {children}
                </div>
            </div>
            <button
            className={Class.toggleButton}
            onMouseDown={toggle}
            >
                {isOpen ? <span>▲</span> : <span>▼</span>}
            </button>
        </div>
    )
}

export default DropdownButton