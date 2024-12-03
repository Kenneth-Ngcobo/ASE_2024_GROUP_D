import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

/**
 * Variants for the button component styles.
 * @param {Object} props - The component props.
 * @param {string} props.variant - The style variant of the button.
 * @param {string} props.size - The size variant of the button.
 * @returns {string} The CSS class for the button component.
 */
const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-[#fcfde2] text-[#020123] shadow hover:bg-[#fc9d4f] dark:bg-[#fcfde2] dark:hover:bg-[#b05103]",
                outline:
                    "border border-input bg-[#fcfde2] shadow-sm hover:bg-[#fc9d4f] hover:text-[#020123]",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

/**
 * Button component for various use cases.
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {string} [props.variant] - The style variant of the button.
 * @param {string} [props.size] - The size variant of the button.
 * @param {boolean} [props.asChild] - Whether the button should render as another component.
 * @returns {JSX.Element} The rendered button component.
 * @param {...Object} props.rest - Additional props for the button.
 */
const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
