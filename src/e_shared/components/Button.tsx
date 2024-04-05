import React from 'react'

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  theme?: 'prime' | 'blue' | 'red';
};

export default function Button({ 
  children,
  theme = 'prime',
  ...props 
} : ButtonProps) {
  
  if (props.disabled) {
    return (
      <button {...props} className='bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed'>
        {children}
      </button>
    );
  }
  
  switch(theme) {
    default:
    case "prime": 
      return (
        <button {...props} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
          {children}
        </button>
      );
    case "blue":
      return (
        <button {...props} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          {children}
        </button>
      )
    case "red":
      return (
        <button {...props} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
          {children}
        </button>
      )
  }
  
}
