import Image from 'next/image';

export type EditorialImage = {
  asset: string;
  alt?: string;
  position?: string;
};

export function EditorialPhoto({ image, sizes, label, priority = false }: {
  image: EditorialImage; sizes: string; label?: string; priority?: boolean;
}) {
  return (
    <figure className="editorial-photo">
      <div className="editorial-photo-frame">
        <Image src={`/assets/editorial/${image.asset}.webp`} alt={image.alt ?? ''} fill sizes={sizes}
          loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined}
          style={image.position ? { objectPosition: image.position } : undefined} />
      </div>
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}
