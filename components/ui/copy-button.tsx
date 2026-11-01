"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

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
            className={cn("flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors", className)}
        >
            <span>{value}</span>

            {copied ? (
                <span className="text-[11px] tracking-wide text-muted-foreground">
                    Copied
                </span>
            ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
            )}
        </button>
    );
}