import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS merging.
 *
 * @param {...(string|false|undefined)} inputs - List of class names or conditions.
 * @returns {string} The combined class names.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
