import { classMerge } from "../utils/classMerge"

type Props = React.ComponentProps<"select"> & {
    variant?: "base" | "small"
}

const variants = {
    select: {
        base: "px-5 py-3 rounded-[10px] text-xl bg-position-[right_1.25rem_center]",
        small: "px-2.5 py-2 rounded-[5px] text-sm bg-position-[right_0.625rem_center]",
    }
}

export function SelectButton({ children, className, variant = "base", ...props }: Props) {
    return (
        <select className={
            classMerge([
                "w-full border border-black",
                className,
                variants.select[variant]
            ])
        } {...props}>
            {children}
        </select>
    )
}