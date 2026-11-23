import Image from "next/image"
import { giftGuideContent } from "../_data"

export function PackagingSection() {
    const { packaging } = giftGuideContent

    return (
        <section id="packaging" className="section">
            <div className="container-site">
                <div className="section-header">
                    <h2 className="text-heading-lg font-light mb-4">
                        {packaging.titleTop} <em>{packaging.titleEm}</em>
                    </h2>
                    <p className="text-muted-foreground">{packaging.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
                    {packaging.images.map((image) => (
                        <figure key={image.src} className="group flex flex-col gap-field">
                            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                                {/* alt="" — the visible caption already describes the image; repeating it doubles what screen readers announce */}
                                <Image
                                    src={image.src}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 25vw, 50vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                />
                            </div>
                            <figcaption className="text-small text-muted-foreground">{image.alt}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}
