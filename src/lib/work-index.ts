import { featuredProjects } from './editorial-content';
import { featuredProjectImages } from './editorial-media';
import { projectConcepts } from './homepage-content';

export const workIndex = [
  ...featuredProjects.map((project) => ({
    slug: project.slug,
    name: project.client,
    label: 'دراسة مشروع',
    title: project.title,
    summary: project.summary,
    sector: project.sector,
    group: project.group,
    image: featuredProjectImages[project.slug],
  })),
  ...projectConcepts.map((project) => ({
    slug: project.slug,
    name: project.name,
    label: 'تصوّر إبداعي',
    title: project.title,
    summary: project.summary,
    image: { asset: project.image },
    sector: project.sectorSlug,
    group: project.serviceGroup,
  })),
];

export type WorkSummary = (typeof workIndex)[number];
