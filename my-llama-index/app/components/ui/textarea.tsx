import * as React from "react";
import { cn } from "./lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full bg-transparent text-xl placeholder:text-xl placeholder:font-playfair placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
        style={{
          fontFamily: "'Playfair Display', serif",
          ...props.style,
        }}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
