import { classMerge } from "../utils/classMerge"

type Props = React.ComponentProps<"label"> & {
    variant?: "base" | "login"
}

const variants = {
    label: {
        base: "text-xl mb-2.5",
        login: "text-2xl mb-4 text-white",
    }
}

export function Label({ children, className, variant = "base", ...props }: Props) {
    return (
        <label 
            className={
                classMerge([
                    "flex gap-0.5",
                    className,
                    variants.label[variant]
                ])
            }
        {...props}>{children}</label>
    )
}