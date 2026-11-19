import { sectorsOnHome } from './homepage-content';

export const featuredProjectImages: Record<string, { asset: string; position?: string }> = {
  'al-rayyan': { asset: 'water-study', position: '50% 54%' },
  'al-jawhariya': { asset: 'fragrance-study', position: '50% 54%' },
};

export function sectorImage(slug: string) {
  const image = sectorsOnHome.find((sector) => sector.slug === slug)?.image;
  return image ? { asset: image } : undefined;
}
