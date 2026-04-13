import Image from "next/image"
import { giftGuideContent } from "../_data"

export function PackagingSection() {
    const { packaging } = giftGuideContent

    return (
        <section id="packaging" className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
                            {packaging.titleTop}
                            <br />
                            <em className="font-serif italic">{packaging.titleEm}</em>
                        </h2>
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">{packaging.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {packaging.images.map((img) => (
                            <div key={img.src} className="group">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    />
                                </div>
                                <p className="mt-3 text-sm text-stone-600">{img.alt}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}