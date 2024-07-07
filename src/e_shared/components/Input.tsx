import React from "react";
import { MdError } from "react-icons/md";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function ErrorMsg({ children }: {children: React.ReactNode}) {
  return (
    <p className="flex items-center gap-1 py-1 text-sm text-red-400 font-bold">
      <MdError />
      <span>{children}</span>
    </p>
  )
}

function NumberInput({ placeholder, min, max, ...props }: InputProps) {
  let errorMsg = 'Number should be';

  if (typeof min === 'number') {
    errorMsg += ` ${min} ≤ `;
  }

  errorMsg += "N";

  if (typeof max === 'number') {
    errorMsg += ` ≤ ${max}`;
  }

  const isValid = () => {
    if (typeof min === 'number' && Number(props.value) < min) {
      return false;
    }

    if (typeof max === 'number' && max < Number(props.value)) {
      return false;
    }

    return true;
  }


  return (
    <section className="bg-prime-deep-dark pt-3">
      <div className="relative py-3 px-4">
        <input
          className="relative block w-full h-7 bg-transparent z-10 outline-none peer text-white"
          {...props}
        />
        <div
          className={`
          absolute
          top-0
          left-0
          w-full
          h-full
          outline-1
          outline
          text-gray-500
          rounded-md
          peer-focus-visible:outline-2
          peer-focus-visible:outline-purple-400
          ${!isValid() ? "!outline-red-400" : ""}
        `}
        />
      </div>

      {!isValid() && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </section>
  );
}

function TextInput({ placeholder, ...props }: InputProps) {
  return (
    <section className="bg-prime-deep-dark pt-3">
      <div className="relative py-3 px-4">
        <input
          className="relative block w-full h-7 bg-transparent z-10 outline-none peer text-white"
          {...props}
        />

        <label
          className={`
            absolute -translate-y-1/2 left-3 duration-150 px-2 bg-prime-deep-dark z-[1] text-gray-500
            peer-focus-visible:top-0  
            peer-focus-visible:text-[13px] 
            peer-focus-visible:text-purple-400
            ${!props.value ? "top-1/2" : "top-0 scale-90 text-purple-400"}
          `}
        >
          {placeholder}
        </label>

        <div
          className={`
          absolute
          top-0
          left-0
          w-full
          h-full
          outline-1
          outline
          text-gray-500
          rounded-md
          peer-focus-visible:outline-2
          peer-focus-visible:outline-purple-400
        `}
        />
      </div>
    </section>
  );
}

export default function Input(props: InputProps) {
  if (props.type === "number") {
    return <NumberInput {...props} />
  }

  return <TextInput {...props} />  
}
