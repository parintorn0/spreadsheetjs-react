export interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode,
    description?: string,
    enableHover?: boolean,
    checked?: boolean,
}