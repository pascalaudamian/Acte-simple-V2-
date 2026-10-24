import { OfficeService } from '../types';

export const OFFICE_SERVICES: OfficeService[] = [
  { id: 'identity', procedureIds: ['buletin-14-ani', 'buletin-schimbare'], label: { ro: 'Carte de identitate', en: 'Identity card' }, institutionNames: ['Evidența Persoanelor'] },
  { id: 'passport', procedureIds: ['pasaport-electronic'], label: { ro: 'Pașaport', en: 'Passport' }, institutionNames: ['Direcția Generală de Pașapoarte'] },
  { id: 'criminal-record', procedureIds: ['cazier-judiciar'], label: { ro: 'Cazier judiciar', en: 'Criminal record certificate' }, institutionNames: ['Poliția Română'] },
  { id: 'driving-licence', procedureIds: ['permis-conducere-schimbare'], label: { ro: 'Permis de conducere', en: 'Driving licence' }, institutionNames: ['DRPCIV'] },
  { id: 'vehicle-registration', procedureIds: ['inmatriculare-auto'], label: { ro: 'Înmatriculare auto', en: 'Vehicle registration' }, institutionNames: ['DRPCIV'] },
  { id: 'immigration', procedureIds: ['rezidenta-ue', 'permis-sedere-non-ue-munca'], label: { ro: 'Imigrare și rezidență', en: 'Immigration and residence' }, institutionNames: ['Inspectoratul General pentru Imigrări'] },
  { id: 'tax-id', procedureIds: ['nif-nerezidenti'], label: { ro: 'NIF pentru nerezidenți', en: 'Tax ID for non-residents' }, institutionNames: ['ANAF'] },
  { id: 'health-card', procedureIds: ['card-sanatate-cnas'], label: { ro: 'Card european de sănătate', en: 'European health card' }, institutionNames: ['CNAS'] }
];
