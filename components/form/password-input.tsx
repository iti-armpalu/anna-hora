"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  name?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
};

export function PasswordInput({
  name = "password",
  placeholder = "Password",
  required = false,
  autoComplete = "current-password",
  className = "",
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={visible ? "text" : "password"}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full border px-3 py-2 pr-10 rounded bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 ${className}`}
      />

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-stone-500 hover:text-stone-700"
      >
        {visible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
