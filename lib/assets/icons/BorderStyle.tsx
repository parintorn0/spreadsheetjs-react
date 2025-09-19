import type { IconProps } from "./Icon.interface"

export const BorderSolid = ({
    width,
    height,
}: IconProps) => (
    <svg height={height} width={width} viewBox="0 0 360 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="black" strokeWidth="16">
            <path
                strokeLinecap="round"
                d="M10 12 l340 0"
            />
        </g>
    </svg>
)

export const BorderDotted = ({
    width,
    height,
}: IconProps) => (
    <svg height={height} width={width} viewBox="0 0 360 24" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="12" x2="360" y2="12"
            stroke="black"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="0, 20"
        />
    </svg>
)

export const BorderDashed = ({
    width,
    height,
}: IconProps) => (
    <svg height={height} width={width} viewBox="0 0 360 24" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="12" x2="350" y2="12"
            stroke="black"
            strokeWidth="8"
            strokeDasharray="40, 10"
        />
    </svg>
)