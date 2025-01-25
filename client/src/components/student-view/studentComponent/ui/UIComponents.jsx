import React, { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "default",
      size = "md",
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

const Input = forwardRef(
  ({ type = "text", size = "md", error, className = "", ...props }, ref) => {
    const baseStyles =
      "flex w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const sizes = {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    };

    const errorStyles = error
      ? "border-destructive focus-visible:ring-destructive"
      : "";

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={`${baseStyles} ${sizes[size]} ${errorStyles} ${className}`}
          {...props}
        />
        {error && (
          <span className="absolute -bottom-5 left-0 text-xs text-destructive">
            {error}
          </span>
        )}
      </div>
    );
  }
);

const Label = forwardRef(
  ({ children, required = false, className = "", ...props }, ref) => {
    const baseStyles =
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

    return (
      <label ref={ref} className={`${baseStyles} ${className}`} {...props}>
        {children}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
    );
  }
);

// Add display names for better debugging
Button.displayName = "Button";
Input.displayName = "Input";
Label.displayName = "Label";

// Export the components
export { Button, Input, Label };
