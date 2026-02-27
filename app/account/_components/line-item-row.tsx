import Image from "next/image";

export type MinimalLineItem = {
  id: string;
  title: string;
  imageUrl: string | null;
  imageAlt?: string | null;
};

export function LineItemRow({ item }: { item: MinimalLineItem }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-md overflow-hidden bg-stone-100 shrink-0">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            width={64}
            height={64}
            alt={item.imageAlt ?? item.title}
            className="w-16 h-16 object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-stone-900 truncate">
          {item.title}
        </p>
      </div>
    </div>
  );
}