import { classMerge } from "../utils/classMerge"

type Props = React.ComponentProps<"input"> & {
    variant?: "base" | "login"
}

const variants = {
    input: {
        base: "py-3 rounded-[10px] text-base outline-orange-500 border",
        login: "py-3.75 rounded-[20px] text-xl bg-gray-100 outline-0 shadow-md",
    }
}

export function Input({ className, variant = "base", type = "text", ...props }: Props) {
    return (
        <input 
            className={
                classMerge([
                    "px-5 placeholder:text-gray-500",
                    className,
                    variants.input[variant]
                ])
            }
        {...props} />
    )
}