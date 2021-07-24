export const Checkbox = ({
  children,
  label,
  ...props
}: Omit<JSX.IntrinsicElements['input'], 'type'> & { readonly label: 'tiny' | 'normal' }) => {
  return (
    <label className={`flex flex-row gap-4 items-center w-full font-sans text-sm`}>
      <input
        {...props}
        type="checkbox"
        className={`block mt-1 w-6 h-6 text-green-700 focus:border-blue-200 border-gray-300 rounded-md shadow-sm transition-shadow focus:ring-offset-2 focus:ring focus:ring-blue-100 focus:ring-opacity-50 ${
          props.className ?? ''
        }`}
      />
      <span className={label === 'tiny' ? 'font-serif text-gray-700 text-tiny font-normal' : ''}>{children}</span>
    </label>
  );
};
