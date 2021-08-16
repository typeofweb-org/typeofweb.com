import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(({ children, ...props }, ref) => {
  return (
    <label className="w-full font-sans text-sm">
      {children}
      <input
        ref={ref}
        {...props}
        className={`block mt-1 w-full py-[0.3rem] focus:border-blue-200 border-gray-300 rounded-md shadow-sm transition-shadow focus:ring-offset-2 focus:ring focus:ring-blue-100 focus:ring-opacity-50 ${
          props.className ?? ''
        }`}
      />
    </label>
  );
});
Input.displayName = 'Input';
