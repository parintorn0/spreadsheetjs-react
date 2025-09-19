import Class from "./Button.module.css"

import type { ButtonProps } from "./Button.interface"

const Button = ({
    onClick,
    children,
    description,
    enableHover=true,
    checked=false,
}: ButtonProps) => {
    return (
        <div className={`${Class.btn} ${enableHover ? Class.hasHover : ""} ${checked ? Class.checked : ""}`}>
            <button className={Class.icon}
            onClick={onClick}
            >
                {children}
            </button>
            {description && (
                <div
                    className={Class.btnHover}
                >
                    {description}
                </div>
            )}
        </div>
    )
}

export default Button