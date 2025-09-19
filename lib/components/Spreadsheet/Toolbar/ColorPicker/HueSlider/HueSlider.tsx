import Class from "./HueSlider.module.css"
import type { HueSliderProps } from "./HueSlider.interface"

const HueSlider = ({
    currentColor,
    setCurrentColor,
}: HueSliderProps) => {

    const startDraggingHue = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const el = e.target as HTMLDivElement
        const rect = el.getBoundingClientRect()
        const n = e.clientX - rect.left
        const x = Math.min(rect.width, Math.max(0, n))
        const h = (x / rect.width) * 360
        setCurrentColor(prev=> ({
            ...prev,
            hsv: {
                ...prev.hsv,
                h,
            },
        }))
    }
    
    return (
        <div className={Class.hueSlider}
        onMouseDown={startDraggingHue}
        >
            <div className={Class.hueLine}>
            </div>
            <div
            className={Class.huePointer}
            style={{
                marginLeft: `calc(${(currentColor.hsv.h / 360) * 100}px - 2px)`
            }}
            />
        </div>
    )
}

export default HueSlider