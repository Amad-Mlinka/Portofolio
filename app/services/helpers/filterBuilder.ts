import { ExperienceFilter } from "@/app/interfaces/experience/ExperienceFilter";

export function buildFiltersFromQuery(searchParams: URLSearchParams): Partial<ExperienceFilter> {
  const filter: Partial<ExperienceFilter> = {};

  if (searchParams.has('title')) {
    filter.title = searchParams.get('title') || undefined;
  }
  if (searchParams.has('company')) {
    filter.company = searchParams.get('company') || undefined;
  }
  if (searchParams.has('location')) {
    filter.location = searchParams.get('location') || undefined;
  }
  if (searchParams.has('duration')) {
    filter.duration = searchParams.get('duration') || undefined;
  }
  if (searchParams.has('typeId')) {
    filter.typeId = Number(searchParams.get('typeId'));
  }
  if (searchParams.has('isActive')) {
    filter.isActive = searchParams.get('isActive') === 'true';
  }
  if (searchParams.has('techStack')) {
    const techStack = searchParams.get('techStack') || '';
    filter.techStack = techStack.split(',').map(tech => tech.trim());
  }

  return filter;
}