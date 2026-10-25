import { AdministrativeDomainDefinition, LifeEventDefinition } from '../types';

export const ADMINISTRATIVE_DOMAINS: AdministrativeDomainDefinition[] = [
  {
    id: 'civil_status',
    name: {
      ro: 'Stare Civilă & Cetățeni',
      en: 'Civil Status & Citizen Records'
    },
    shortDescription: {
      ro: 'Înregistrare naștere, căsătorie civilă, deces, schimbare de nume și transcrierea certificatelor emise în străinătate.',
      en: 'Birth registration, civil marriage, death certificates, name change, and transcription of foreign civil status acts.'
    },
    officialPortalReference: 'https://dgep.mai.gov.ro/',
    badgeColor: 'sky'
  },
  {
    id: 'social_benefits',
    name: {
      ro: 'Beneficii Familiale & Asistență Socială',
      en: 'Family Benefits & Social Welfare'
    },
    shortDescription: {
      ro: 'Alocația de stat pentru copii, indemnizația pentru creșterea copilului (ICC), stimulent de inserție și Venitul Minim de Incluziune (VMI).',
      en: 'State child allowance, parental child-raising indemnity, insertion incentive, and Minimum Inclusion Income (VMI).'
    },
    officialPortalReference: 'https://www.mmanpis.ro/',
    badgeColor: 'emerald'
  },
  {
    id: 'employment',
    name: {
      ro: 'Muncă, Șomaj & Formare Profesională',
      en: 'Employment, Unemployment & Training'
    },
    shortDescription: {
      ro: 'Înregistrare persoane în căutare de muncă, indemnizație de șomaj, extras din registrul salariaților (Revisal/REGES) și cursuri de calificare.',
      en: 'Jobseeker registration, unemployment indemnities, employment register extracts (Revisal/REGES), and vocational training.'
    },
    officialPortalReference: 'https://www.anofm.ro/',
    badgeColor: 'blue'
  },
  {
    id: 'pensions',
    name: {
      ro: 'Pensii & Asigurări Sociale',
      en: 'Pensions & Social Insurance'
    },
    shortDescription: {
      ro: 'Pensie pentru limită de vârstă conform noii Legi 360/2023, pensie comunitară/internațională pentru perioade lucrate în UE și bilete de tratament.',
      en: 'Old-age retirement under Law 360/2023, cross-border EU bilateral pensions, disability pensions, and spa vouchers.'
    },
    officialPortalReference: 'https://www.cnpp.ro/',
    badgeColor: 'indigo'
  },
  {
    id: 'education',
    name: {
      ro: 'Educație & Recunoaștere Diplome',
      en: 'Education & Diploma Recognition'
    },
    shortDescription: {
      ro: 'Recunoașterea și echivalarea diplomelor universitare și preuniversitare străine (CNRED), înscriere la școală/grădiniță și burse școlare.',
      en: 'Academic recognition of foreign diplomas and professional qualifications (CNRED), school enrolment, and student scholarships.'
    },
    officialPortalReference: 'https://cnred.edu.ro/',
    badgeColor: 'violet'
  },
  {
    id: 'cadastre_housing',
    name: {
      ro: 'Proprietate, Cadastru & Urbanism',
      en: 'Property, Cadastre & Urbanism'
    },
    shortDescription: {
      ro: 'Extras de carte funciară pentru informare online (ANCPI), intabulare drept de proprietate și certificat de urbanism pentru construire.',
      en: 'Land register extracts online (ANCPI), ownership deed registration, and urban planning / building permits.'
    },
    officialPortalReference: 'https://epay.ancpi.ro/',
    badgeColor: 'amber'
  },
  {
    id: 'justice_petitions',
    name: {
      ro: 'Justiție, Cazier, Certificate & Petiții',
      en: 'Justice, Certificates, Petitions & Appeals'
    },
    shortDescription: {
      ro: 'Cazier judiciar fizic și online pe HUB MAI, apostila de la Haga la Prefectură, sesizări către Avocatul Poporului și CNCD.',
      en: 'Criminal record certificates online via HUB MAI, Hague Apostille at Prefecture, civic petitions to Ombudsman and anti-discrimination.'
    },
    officialPortalReference: 'https://hub.mai.gov.ro/',
    badgeColor: 'teal'
  },
  {
    id: 'business_registry',
    name: {
      ro: 'Înregistrare Firme & Autorizații (ONRC)',
      en: 'Business Registry & Company Setup'
    },
    shortDescription: {
      ro: 'Înființare societate comercială (SRL), autorizare Persoană Fizică Autorizată (PFA), depunere declarații beneficiari reali și NIF nerezidenți.',
      en: 'Company incorporation (SRL) via ONRC portal, Sole Trader (PFA) licensing, ultimate beneficial owners registry, and tax ID.'
    },
    officialPortalReference: 'https://myportal.onrc.ro/',
    badgeColor: 'rose'
  },
  {
    id: 'environment_agriculture',
    name: {
      ro: 'Mediu, Agricultură & Sanitar-Veterinar',
      en: 'Environment, Agriculture & Veterinary'
    },
    shortDescription: {
      ro: 'Cereri anuale de plată pentru subvenții agricole (APIA), fonduri dezvoltare rurală (AFIR) și microcipare/pașapoarte pentru animale de companie (ANSVSA).',
      en: 'Direct agricultural subsidy applications (APIA), rural development support (AFIR), and pet passports / microchip registry (ANSVSA).'
    },
    officialPortalReference: 'https://www.apia.org.ro/',
    badgeColor: 'lime'
  },
  {
    id: 'citizenship_travel',
    name: {
      ro: 'Cetățenie, Călătorie & Transfrontalier',
      en: 'Citizenship, Travel & Cross-Border'
    },
    shortDescription: {
      ro: 'Redobândire cetățenie română (Art. 11 Legea 21/1991), pașapoarte electronice, vize de lungă ședere (eviza.mae.ro) și certificate de rezidență.',
      en: 'Romanian citizenship restoration (Art. 11), biometric passports, long-stay visas (eviza.mae.ro), and cross-border residence.'
    },
    officialPortalReference: 'https://cetatenie.just.ro/',
    badgeColor: 'cyan'
  }
];

export const LIFE_EVENTS: LifeEventDefinition[] = [
  {
    id: 'having_a_child',
    iconName: 'Baby',
    title: {
      ro: 'Avem un copil / Nașterea copilului',
      en: 'Having a Child / Newborn Care'
    },
    description: {
      ro: 'Înregistrarea nașterii, obținerea certificatului de naștere, alocația de stat pentru copii și concediul / indemnizația de creștere a copilului.',
      en: 'Birth registration, obtaining the birth certificate, universal state child allowance, and parental leave indemnity.'
    },
    targetAudience: ['all', 'ro-citizen', 'family-member', 'eu-citizen', 'non-eu'],
    recommendedDomains: ['civil_status', 'social_benefits']
  },
  {
    id: 'getting_married',
    iconName: 'Heart',
    title: {
      ro: 'Ne căsătorim / Căsătorie civilă',
      en: 'Getting Married / Civil Union'
    },
    description: {
      ro: 'Depunerea dosarului de căsătorie la primărie, analize medicale prenupțiale, schimbarea numelui și actualizarea actelor de identitate.',
      en: 'Filing marriage declaration at city hall, prenuptial medical checks, surname change, and updating ID documents.'
    },
    targetAudience: ['all', 'ro-citizen', 'eu-citizen', 'family-member', 'non-eu'],
    recommendedDomains: ['civil_status']
  },
  {
    id: 'starting_a_business',
    iconName: 'Building2',
    title: {
      ro: 'Deschid o firmă sau lucrez ca PFA',
      en: 'Starting a Business / Freelancer (PFA)'
    },
    description: {
      ro: 'Înregistrarea online a unui SRL sau PFA la Registrul Comerțului (ONRC), obținerea CUI-ului, autorizarea sediului și înregistrarea la ANAF.',
      en: 'Incorporating an LLC (SRL) or Sole Trader (PFA) through ONRC, obtaining tax registration, and opening business accounts.'
    },
    targetAudience: ['all', 'ro-citizen', 'eu-citizen', 'non-eu'],
    recommendedDomains: ['business_registry']
  },
  {
    id: 'buying_selling_property',
    iconName: 'Home',
    title: {
      ro: 'Cumpăr o locuință / Construiesc o casă',
      en: 'Buying Property / Building a Home'
    },
    description: {
      ro: 'Extras de carte funciară online la ANCPI, intabulare la notar, certificat fiscal de la primărie și certificat de urbanism pentru construcție.',
      en: 'Online land register extracts via ANCPI, notary title registration, local property tax certificates, and building permits.'
    },
    targetAudience: ['all', 'ro-citizen', 'eu-citizen', 'non-eu'],
    recommendedDomains: ['cadastre_housing']
  },
  {
    id: 'facing_unemployment',
    iconName: 'Briefcase',
    title: {
      ro: 'Am pierdut locul de muncă / Caut de lucru',
      en: 'Unemployment / Seeking a Job'
    },
    description: {
      ro: 'Înregistrarea la agenția județeană pentru ocuparea forței de muncă (AJOFM), stabilirea indemnizației de șomaj și extras Revisal.',
      en: 'Registration at local labor agency (AJOFM), unemployment benefit applications, and employment record extraction.'
    },
    targetAudience: ['ro-citizen', 'eu-citizen', 'non-eu'],
    recommendedDomains: ['employment']
  },
  {
    id: 'retiring',
    iconName: 'Clock',
    title: {
      ro: 'Mă pensionez / Ies la pensie',
      en: 'Retirement & Pension Claims'
    },
    description: {
      ro: 'Cerere de înscriere la pensie pentru limită de vârstă la Casa Județeană de Pensii (CNPP) și valorificarea anilor munciți în străinătate.',
      en: 'Old-age retirement application under Law 360/2023, pension dossier submission, and aggregating bilateral cross-border EU work periods.'
    },
    targetAudience: ['ro-citizen', 'eu-citizen', 'non-eu'],
    recommendedDomains: ['pensions']
  },
  {
    id: 'starting_school_university',
    iconName: 'GraduationCap',
    title: {
      ro: 'Studii & Echivalare diplome din străinătate',
      en: 'Education & Foreign Diploma Recognition'
    },
    description: {
      ro: 'Atestatul de echivalare sau recunoaștere a diplomelor universitare / preuniversitare străine prin CNRED și înscriere școlară.',
      en: 'Equivalence and recognition of foreign diplomas and degrees via CNRED (Ministry of Education) and school enrollment.'
    },
    targetAudience: ['ro-citizen', 'eu-citizen', 'non-eu', 'family-member'],
    recommendedDomains: ['education']
  },
  {
    id: 'returning_to_romania',
    iconName: 'PlaneLanding',
    title: {
      ro: 'Mă întorc în România (Diaspora)',
      en: 'Returning to Romania (Diaspora)'
    },
    description: {
      ro: 'Transcrierea certificatelor străine (naștere, căsătorie), schimbarea buletinului, înmatricularea mașinii aduse din străinătate și cardul CNAS.',
      en: 'Transcribing foreign birth/marriage records, getting a resident ID card, re-registering vehicles, and reactivating health insurance.'
    },
    targetAudience: ['ro-citizen', 'family-member'],
    recommendedDomains: ['civil_status', 'citizenship_travel', 'education']
  },
  {
    id: 'acquiring_citizenship',
    iconName: 'ShieldAlert',
    title: {
      ro: 'Cetățenie română & Vize internaționale',
      en: 'Romanian Citizenship & Long-Stay Visas'
    },
    description: {
      ro: 'Dosarul de redobândire a cetățeniei la Autoritatea Națională pentru Cetățenie (ANC) sau cererea de viză de lungă ședere (Tip D pe eviza.mae.ro).',
      en: 'Citizenship restoration file at the National Citizenship Authority (ANC) or long-stay visa application via eviza.mae.ro.'
    },
    targetAudience: ['non-eu', 'eu-citizen', 'family-member'],
    recommendedDomains: ['citizenship_travel']
  },
  {
    id: 'moving_relocating',
    iconName: 'MapPin',
    title: {
      ro: 'Schimb adresa / Mă mut în alt oraș',
      en: 'Moving Address / Relocating Locally'
    },
    description: {
      ro: 'Schimbare carte de identitate cu noul domiciliu, viză de flotant (reședință), înregistrare fiscală auto la primărie și transfer medic de familie.',
      en: 'New national ID card with changed address, temporary residence sticker (flotant), vehicle tax transfer, and GP registration.'
    },
    targetAudience: ['all', 'ro-citizen', 'eu-citizen', 'non-eu'],
    recommendedDomains: ['civil_status']
  }
];
