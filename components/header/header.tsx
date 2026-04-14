import Link from "next/link";
import Image from "next/image";

import { navigation } from "@/lib/config/navigation";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";
import { QuickActions } from "./quick-actions";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-stone-200 bg-neutral-50/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between lg:h-20">
                    <Link
                        href="/"
                        aria-label="ANNA HORA - Return to homepage"
                        className="relative block h-10 w-32 sm:h-12 sm:w-40 lg:h-16 lg:w-60"
                    >
                        <Image
                            src="/anna-hora-logo-2026-04.png"
                            alt="ANNA HORA logo"
                            fill
                            priority
                            className="object-contain object-left"
                            sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                        />
                    </Link>

                    <nav aria-label="Primary" className="hidden lg:block">
                        <DesktopNav items={navigation} />
                    </nav>

                    <div className="flex items-center">
                        <QuickActions />
                        <div className="lg:hidden">
                            <MobileNav items={navigation} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}