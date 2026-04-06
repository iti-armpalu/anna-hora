"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
    value: string;
    className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch {
            console.error("Copy failed");
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-2 text-stone-900 hover:text-stone-700 transition-colors ${className}`}
        >
            <span>{value}</span>

            {copied ? (
                <span className="text-[11px] tracking-wide text-stone-400">
                    Copied
                </span>
            ) : (
                <Copy className="w-4 h-4 text-stone-400" />
            )}
        </button>
    );
}