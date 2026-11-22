import { classMerge } from "../utils/classMerge"

type Props = React.ComponentProps<"button"> & {
    variant?: "base" | "icon"
    colorVariant?: "orange" | "blue" | "purple"
}

const variants = {
    button: {
        base: "px-4",
        icon: "px-3 gap-1.25 [&_svg]:size-[24px]",
    }
}

const colorVariants = {
    button: {
        orange: "bg-orange-500 hover:bg-orange-700 transition ease-linear",
        blue: "bg-blue-500 hover:bg-blue-700 transition ease-linear",
        purple: "bg-purple-500 hover:bg-purple-700 transition ease-linear"
    }
}

export function Button({ children, className, variant = "base", colorVariant = "orange", ...props }: Props) {
     return (
        <button className={
            classMerge([
                "flex justify-center items-center py-2 rounded-[10px] text-xl text-white cursor-pointer",
                className,
                variants.button[variant],
                colorVariants.button[colorVariant]
            ])
        } 
        {...props}>
            {children}
        </button>
     );
}