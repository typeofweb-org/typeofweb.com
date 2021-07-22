export const Button = (props: JSX.IntrinsicElements['button']) => {
  return (
    <button
      {...props}
      className={`block mt-1 bg-green-700 text-gray-100 text-2xl rounded-md py-2 focus:ring focus:bg-green-600 focus:ring-blue-100 focus:ring-offset-2 focus:ring-opacity-50 outline-none transition-all ${
        props.className ?? ''
      }`}
    />
  );
};
