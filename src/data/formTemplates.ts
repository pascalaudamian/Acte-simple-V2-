import { FormTemplate } from '../types';

export const FORM_TEMPLATES: FormTemplate[] = [
  {
    id: 'declaratie-luare-in-spatiu',
    title: {
      ro: 'Declarație de primire în spațiul locativ (găzduire buletin)',
      en: 'Declaration of accommodation hosting (for ID address registration)'
    },
    category: 'identitate',
    description: {
      ro: 'Formular utilizat la Serviciul de Evidență a Persoanelor (SPCLEP) când solicitantul nu este proprietarul locuinței și este luat în spațiu de către proprietar.',
      en: 'Official form required when the applicant does not own the dwelling and is hosted by the homeowner at the Registry Desk.'
    },
    officialTarget: 'Serviciul Public Comunitar Local de Evidență a Persoanelor (SPCLEP)',
    fields: [
      {
        id: 'proprietar_nume',
        label: { ro: 'Nume și prenume proprietar găzduitor', en: 'Host owner full name' },
        placeholder: { ro: 'ex. Popescu Ion', en: 'e.g. Popescu Ion' },
        type: 'text',
        required: true,
        helpText: { ro: 'Numele complet așa cum apare în actul de identitate și actul de proprietate.', en: 'Full name as shown on national ID and property deed.' }
      },
      {
        id: 'proprietar_cnp',
        label: { ro: 'CNP proprietar', en: 'Host owner CNP' },
        placeholder: { ro: '13 cifre', en: '13 digits' },
        type: 'cnp',
        required: true
      },
      {
        id: 'proprietar_ci_serie',
        label: { ro: 'Serie și număr act de identitate proprietar', en: 'Host owner ID series & number' },
        placeholder: { ro: 'ex. RX 123456', en: 'e.g. RX 123456' },
        type: 'text',
        required: true
      },
      {
        id: 'adresa_locuinta',
        label: { ro: 'Adresa exactă a imobilului (stradă, nr, bloc, sc, ap, localitate, județ)', en: 'Full residential property address' },
        placeholder: { ro: 'Str. Libertății nr. 10, Bl. A1, Sc. 1, Ap. 4, București Sector 1', en: 'Full address' },
        type: 'textarea',
        required: true
      },
      {
        id: 'act_proprietate_detalii',
        label: { ro: 'Actul doveditor al spațiului locativ (tip, număr și dată)', en: 'Property title deed details (contract, date, notary)' },
        placeholder: { ro: 'Contract de vânzare-cumpărare nr. 1234 din data de 15.05.2018', en: 'e.g. Sales Deed no. 1234 from 15.05.2018' },
        type: 'text',
        required: true
      },
      {
        id: 'solicitant_nume',
        label: { ro: 'Nume și prenume persoană primită în spațiu', en: 'Hosted person full name' },
        placeholder: { ro: 'ex. Ionescu Maria', en: 'e.g. Ionescu Maria' },
        type: 'text',
        required: true
      },
      {
        id: 'solicitant_cnp',
        label: { ro: 'CNP persoană primită în spațiu', en: 'Hosted person CNP' },
        placeholder: { ro: '13 cifre', en: '13 digits' },
        type: 'cnp',
        required: true
      }
    ]
  },
  {
    id: 'declaratie-pierdere-act',
    title: {
      ro: 'Declarație pe proprie răspundere privind pierderea / deteriorarea actului de identitate',
      en: 'Statutory declaration of lost / damaged ID card'
    },
    category: 'identitate',
    description: {
      ro: 'Declarație obligatorie la dosarul de eliberare a unui nou act de identitate atunci când cel anterior nu mai poate fi prezentat.',
      en: 'Mandatory formal statement when the previous ID card cannot be physically surrendered due to loss.'
    },
    officialTarget: 'Serviciul Public Comunitar Local de Evidență a Persoanelor (SPCLEP)',
    fields: [
      {
        id: 'declarant_nume',
        label: { ro: 'Nume și prenume declarant', en: 'Declarant full name' },
        type: 'text',
        required: true
      },
      {
        id: 'declarant_cnp',
        label: { ro: 'CNP declarant', en: 'Declarant CNP' },
        type: 'cnp',
        required: true
      },
      {
        id: 'data_pierderii',
        label: { ro: 'Data aproximativă a pierderii / constatării lipsei actului', en: 'Approximate date of loss' },
        type: 'date',
        required: true
      },
      {
        id: 'imprejurari_pierdere',
        label: { ro: 'Împrejurările în care s-a pierdut actul de identitate', en: 'Circumstances of loss' },
        placeholder: { ro: 'ex. Actul a fost pierdut în mijloacele de transport în comun sau într-o zonă comercială...', en: 'e.g. Lost in public transit or retail area...' },
        type: 'textarea',
        required: true
      }
    ]
  },
  {
    id: 'cerere-duplicat-cnas',
    title: {
      ro: 'Cerere eliberare card duplicat / adeverință de asigurat CNAS',
      en: 'Application for duplicate health card / CNAS replacement certificate'
    },
    category: 'sanatate',
    description: {
      ro: 'Formular adresat Casei de Asigurări de Sănătate pentru eliberarea adeverinței înlocuitoare și tipărirea unui nou card.',
      en: 'Application submitted to the County Health Insurance House for replacement certificate and card reprint.'
    },
    officialTarget: 'Casa de Asigurări de Sănătate Județeană / CASMB',
    fields: [
      {
        id: 'asigurat_nume',
        label: { ro: 'Nume și prenume solicitant', en: 'Applicant full name' },
        type: 'text',
        required: true
      },
      {
        id: 'asigurat_cnp',
        label: { ro: 'CNP solicitant', en: 'Applicant CNP' },
        type: 'cnp',
        required: true
      },
      {
        id: 'asigurat_telefon',
        label: { ro: 'Număr de telefon de contact', en: 'Contact phone number' },
        type: 'text',
        required: true
      },
      {
        id: 'asigurat_email',
        label: { ro: 'Adresă de email (pentru primirea adeverinței în format electronic)', en: 'Email address (for digital certificate receipt)' },
        type: 'text',
        required: true
      },
      {
        id: 'motiv_solicitare',
        label: { ro: 'Motivul solicitării duplicatului', en: 'Reason for duplicate request' },
        type: 'select',
        options: [
          { value: 'pierdere', label: { ro: 'Pierdere act', en: 'Loss' } },
          { value: 'furt', label: { ro: 'Furt', en: 'Theft' } },
          { value: 'defectare', label: { ro: 'Defectare cip / card fizic', en: 'Card chip malfunction' } },
          { value: 'schimbare_nume', label: { ro: 'Schimbare nume / date personale', en: 'Name change' } }
        ],
        required: true
      }
    ]
  }
];
