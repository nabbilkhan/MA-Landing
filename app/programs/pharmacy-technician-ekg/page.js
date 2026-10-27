import catalog from '../../../content/catalog/ibhe-r2.json';
import { ProgramCatalogPage } from '../../components/AcademicCatalog';

const program = catalog.programs.find(item => item.slug === 'pharmacy-technician-ekg');

export const metadata = {
  title: `${program.name} | Academic Catalog | Mentor Agile`,
  description: `${program.length}, ${program.instruction}. Tuition: ${program.tuition}. Read the curriculum, admissions, calendar, refund policy, and certification requirements.`,
  openGraph: {
    title: `${program.name} | Academic Catalog | Mentor Agile`,
    description: `${program.length}. Tuition: ${program.tuition}. Curriculum, enrollment policies, and certification information.`,
    url: `/programs/${program.slug}/`,
  },
  alternates: { canonical: '/programs/pharmacy-technician-ekg/' },
};

export default function ProgramPage() {
  return <ProgramCatalogPage program={program} />;
}
