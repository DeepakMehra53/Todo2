import type { ChangeEvent, ReactNode } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: ReactNode;
}

export const InputField = ({
  label,
  placeholder,
  onChange,
  type,
  icon,
}: InputProps) => {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        {label}
      </label>
      <div className="relative mb-6">
        {icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type || "text"}
          id="input-group-1"
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};
