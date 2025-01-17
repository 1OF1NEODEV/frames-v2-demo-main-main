import { forwardRef } from "react"
import { cn } from "~/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "default" | "ghost" | "icon";
  size?: "default" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      icon: "h-10 w-10 p-0"
    }
    
    const sizes = {
      default: "h-10 py-2 px-4",
      icon: "h-10 w-10"
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
