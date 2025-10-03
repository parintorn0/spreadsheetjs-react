import type { IconProps } from "./Icon.interface"

const TextColor = ({
    width,
    height,
}: IconProps) => (
    <svg fill="#000000" width={`${width || 24}px`} height={`${height || 24}px`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m11.307 4-6 16h2.137l1.875-5h6.363l1.875 5h2.137l-6-16h-2.387zm-1.239 9L12.5 6.515 14.932 13h-4.864z" />
    </svg>
)

export default TextColor