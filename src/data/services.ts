import { AdministrativeService } from '../types';

export const ADMINISTRATIVE_SERVICES: AdministrativeService[] = [
  {
    id: 'serv-buletin',
    code: 'identitate_buletin',
    category: 'identitate',
    title: {
      ro: 'Cărți de Identitate & Evidența Persoanelor (Buletin)',
      en: 'National Identity Cards & Civil Registry (SPCLEP)'
    },
    responsibleAuthority: 'Serviciul Public Comunitar Local de Evidență a Persoanelor (SPCLEP) / DGEP',
    relatedProcedureIds: ['buletin-14-ani', 'buletin-schimbare'],
    onlineServiceUrl: 'https://hub.mai.gov.ro',
    description: {
      ro: 'Eliberare prima carte de identitate la 14 ani, reînnoire la expirare, schimbare domiciliu, pierdere sau furt.',
      en: 'First issue at 14, renewal upon expiration, change of address, loss or theft.'
    }
  },
  {
    id: 'serv-pasapoarte',
    code: 'pasapoarte',
    category: 'identitate',
    title: {
      ro: 'Pașapoarte Simple Electronice & Temporare',
      en: 'Electronic & Temporary Passports (DGP)'
    },
    responsibleAuthority: 'Serviciul Public Comunitar de Pașapoarte / Direcția Generală de Pașapoarte',
    relatedProcedureIds: ['pasaport-electronic'],
    onlineServiceUrl: 'https://epasapoarte.ro',
    description: {
      ro: 'Preluare date biometrice și eliberare pașaport biometric pentru adulți și minori.',
      en: 'Biometric capture and passport issuance for adults and minors.'
    }
  },
  {
    id: 'serv-permise-auto',
    code: 'permise_auto',
    category: 'auto',
    title: {
      ro: 'Permise de Conducere (Preschimbare & Duplicate)',
      en: 'Driving Licenses (Renewal & Exchanges)'
    },
    responsibleAuthority: 'Serviciul Public Comunitar Regim Permise de Conducere și Înmatriculare a Vehiculelor (DGPCIV)',
    relatedProcedureIds: ['permis-conducere-schimbare'],
    onlineServiceUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/',
    description: {
      ro: 'Preschimbare permis românesc expirat, duplicat pierdere/furt sau preschimbare permise străine.',
      en: 'Renewal of expired licenses, duplicate for loss, or exchange of foreign licenses.'
    }
  },
  {
    id: 'serv-inmatriculari',
    code: 'inmatriculari_auto',
    category: 'auto',
    title: {
      ro: 'Înmatriculări Vehicule & Transcriere Proprietate',
      en: 'Vehicle Registration & Ownership Transfer'
    },
    responsibleAuthority: 'Serviciul Public Comunitar Regim Permise de Conducere și Înmatriculare a Vehiculelor (DGPCIV)',
    relatedProcedureIds: ['inmatriculare-auto'],
    onlineServiceUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/',
    description: {
      ro: 'Înmatriculare autoturisme noi sau second-hand, transcriere drept de proprietate, radiere și plăcuțe.',
      en: 'New or used car registration, ownership transfer, deregistration, and license plates.'
    }
  },
  {
    id: 'serv-imigrare-igi',
    code: 'imigrare_rezidenta',
    category: 'imigrare',
    title: {
      ro: 'Imigrări, Rezidență UE & Permise de Ședere Non-UE',
      en: 'Immigration, EU Residence & Non-EU Permits (IGI)'
    },
    responsibleAuthority: 'Inspectoratul General pentru Imigrări (IGI) — Serviciile Județene pentru Imigrări',
    relatedProcedureIds: ['rezidenta-ue', 'permis-sedere-non-ue-munca'],
    onlineServiceUrl: 'https://portaligi.mai.gov.ro',
    description: {
      ro: 'Înregistrare rezidență cetățeni UE/SEE (CNP românesc), prelungire drept de ședere și permis unic de muncă Non-UE.',
      en: 'EU residency certificates (Romanian CNP), stay extension, and Non-EU single work permits.'
    }
  },
  {
    id: 'serv-cazier',
    code: 'justitie_cazier',
    category: 'justitie',
    title: {
      ro: 'Certificate de Cazier Judiciar',
      en: 'Criminal Record Certificates'
    },
    responsibleAuthority: 'Poliția Română — Ghișeele Cazier Judiciar din cadrul IPJ / Poliția Capitalei',
    relatedProcedureIds: ['cazier-judiciar'],
    onlineServiceUrl: 'https://hub.mai.gov.ro',
    description: {
      ro: 'Eliberare pe loc a certificatului de cazier judiciar fizic (sau descărcare online prin HUB MAI).',
      en: 'Instant physical criminal record certificate issue (or digital download via HUB MAI).'
    }
  },
  {
    id: 'serv-taxe-anaf',
    code: 'taxe_nif',
    category: 'taxe',
    title: {
      ro: 'Înregistrare Fiscală NIF & Administrația Fiscală (ANAF)',
      en: 'Taxpayer Registration NIF & Revenue Services (ANAF)'
    },
    responsibleAuthority: 'Agenția Națională de Administrare Fiscală (ANAF) — Administrațiile Finanțelor Publice',
    relatedProcedureIds: ['nif-nerezidenti'],
    onlineServiceUrl: 'https://www.anaf.ro/programari/',
    description: {
      ro: 'Atribuire NIF pentru nerezidenți (Formular 030), certificate fiscale și asistență contribuabili.',
      en: 'NIF tax number for non-residents (Form 030), tax clearance certificates, and taxpayer services.'
    }
  },
  {
    id: 'serv-sanatate-cnas',
    code: 'sanatate_cnas',
    category: 'sanatate',
    title: {
      ro: 'Asigurări Sociale de Sănătate & Card CNAS',
      en: 'Health Insurance & National Health Card (CNAS)'
    },
    responsibleAuthority: 'Casa Națională de Asigurări de Sănătate / Casele Județene de Asigurări (CASMB)',
    relatedProcedureIds: ['card-sanatate-cnas'],
    onlineServiceUrl: 'https://cnas.ro/verificare-asigurati/',
    description: {
      ro: 'Adeverințe înlocuitoare de asigurat, duplicat card național de sănătate și evidență asigurați.',
      en: 'Replacement health certificates, duplicate health cards, and insured status validation.'
    }
  },
  {
    id: 'serv-stare-civila',
    code: 'stare_civila',
    category: 'stare-civila',
    title: {
      ro: 'Stare Civilă (Naștere, Căsătorie, Deces, Transcrieri)',
      en: 'Civil Registry (Birth, Marriage, Death, Transcriptions)'
    },
    responsibleAuthority: 'Serviciul de Stare Civilă din cadrul Primăriilor / SPCLEP',
    relatedProcedureIds: ['certificat-nastere-copil', 'casatorie-civila', 'transcriere-acte-stare-civila-diaspora'],
    onlineServiceUrl: 'https://dgep.mai.gov.ro/',
    description: {
      ro: 'Înregistrare nou-născuți, depunere dosar căsătorie civilă, eliberare certificate de stare civilă și transcriere acte din străinătate.',
      en: 'Newborn civil registration, marriage declaration, issuing certificates, and foreign certificate transcription.'
    }
  },
  {
    id: 'serv-social-anpis',
    code: 'asistenta_sociala',
    category: 'social',
    title: {
      ro: 'Beneficii Familiale & Asistență Socială (AJPIS)',
      en: 'Family Benefits & Social Welfare (AJPIS)'
    },
    responsibleAuthority: 'Agenția Județeană pentru Plăți și Inspecție Socială (AJPIS / ANPIS)',
    relatedProcedureIds: ['alocatie-stat-copii', 'indemnizatie-crestere-copil', 'venit-minim-incluziune'],
    onlineServiceUrl: 'https://www.mmanpis.ro/',
    description: {
      ro: 'Alocația de stat pentru copii, indemnizația pentru creșterea copilului (ICC), stimulent de inserție și Venit Minim de Incluziune.',
      en: 'State child allowance, child-raising parental indemnity, work insertion bonus, and Minimum Inclusion Income.'
    }
  },
  {
    id: 'serv-somaj-anofm',
    code: 'ocupare_somaj',
    category: 'munca',
    title: {
      ro: 'Ocuparea Forței de Muncă & Șomaj (AJOFM)',
      en: 'Employment & Unemployment Services (AJOFM)'
    },
    responsibleAuthority: 'Agenția Județeană pentru Ocuparea Forței de Muncă (AJOFM / ANOFM)',
    relatedProcedureIds: ['indemnizatie-somaj', 'extras-revisal-vechime'],
    onlineServiceUrl: 'https://www.anofm.ro/',
    description: {
      ro: 'Înregistrare persoane în căutare de loc de muncă, stabilirea indemnizației de șomaj și reconversie profesională.',
      en: 'Jobseeker registration, unemployment benefit determinations, and state-subsidized vocational retraining.'
    }
  },
  {
    id: 'serv-pensii-cnpp',
    code: 'pensii_sociale',
    category: 'pensii',
    title: {
      ro: 'Pensii & Drepturi de Asigurări Sociale (Casa Județeană de Pensii)',
      en: 'Pensions & Social Insurance Rights (County Pension House)'
    },
    responsibleAuthority: 'Casa Națională de Pensii Publice (CNPP) — Casele Județene de Pensii (CJP)',
    relatedProcedureIds: ['pensie-limita-varsta', 'pensie-comunitara-internationala'],
    onlineServiceUrl: 'https://www.cnpp.ro/',
    description: {
      ro: 'Înscriere la pensie pentru limită de vârstă (Legea 360/2023), recalculări, pensii comunitare internaționale și bilete tratament.',
      en: 'Old-age retirement enrollment under Law 360/2023, EU bilateral cross-border pensions, and social insurance calculations.'
    }
  },
  {
    id: 'serv-cadastru-ancpi',
    code: 'cadastru_publicitate',
    category: 'proprietate',
    title: {
      ro: 'Cadastru & Carte Funciară (ANCPI / OCPI)',
      en: 'Cadastre & Land Registry (ANCPI / OCPI)'
    },
    responsibleAuthority: 'Agenția Națională de Cadastru și Publicitate Imobiliară — Oficiile Județene (OCPI)',
    relatedProcedureIds: ['extras-carte-funciara-online', 'certificat-urbanism'],
    onlineServiceUrl: 'https://epay.ancpi.ro/',
    description: {
      ro: 'Eliberare extrase de carte funciară pentru informare pe loc online, extras de plan cadastral și intabulare proprietăți.',
      en: 'Instant online land book extracts for information, cadastral plan extracts, and ownership deed title registrations.'
    }
  },
  {
    id: 'serv-onrc-firme',
    code: 'registrul_comertului',
    category: 'afaceri',
    title: {
      ro: 'Registrul Comerțului — Înființare Firme & PFA (ONRC)',
      en: 'Trade Register — Company Incorporation & Freelancers (ONRC)'
    },
    responsibleAuthority: 'Oficiul Național al Registrului Comerțului (ONRC) — Oficiile Județene (ORC)',
    relatedProcedureIds: ['infiintare-srl-onrc', 'infiintare-pfa-onrc'],
    onlineServiceUrl: 'https://myportal.onrc.ro/',
    description: {
      ro: 'Înregistrare SRL, autorizare PFA, depunere acte constitutive, rezervare denumire și mențiuni societăți comerciale.',
      en: 'LLC (SRL) incorporation, PFA sole trader licensing, articles of association, name reservations, and corporate amendments.'
    }
  },
  {
    id: 'serv-educatie-cnred',
    code: 'educatie_echivalare',
    category: 'educatie',
    title: {
      ro: 'Recunoaștere Diplome & Echivalare Studii (CNRED / MEC)',
      en: 'Diploma Recognition & Degree Equivalence (CNRED / MEC)'
    },
    responsibleAuthority: 'Centrul Național de Recunoaștere și Echivalare a Diplomelor (CNRED) / Ministerul Educației',
    relatedProcedureIds: ['echivalare-diplome-cnred', 'inscriere-invatamant-primar'],
    onlineServiceUrl: 'https://cnred.edu.ro/',
    description: {
      ro: 'Echivalare și recunoaștere diplome universitare, master, doctorat și bacalaureat obținute în străinătate.',
      en: 'Academic recognition and equivalence certificates for foreign higher education degrees and high-school diplomas.'
    }
  },
  {
    id: 'serv-apostila-prefectura',
    code: 'apostila_haga',
    category: 'justitie',
    title: {
      ro: 'Apostila Convenției de la Haga (Instituția Prefectului)',
      en: 'Hague Apostille Certification (County Prefecture)'
    },
    responsibleAuthority: 'Instituția Prefectului Județului / Municipiului București — Biroul Apostilă',
    relatedProcedureIds: ['apostila-haga-prefectura', 'petitie-avocatul-poporului'],
    onlineServiceUrl: 'https://prefecturabucuresti.mai.gov.ro/',
    description: {
      ro: 'Apostilarea actelor oficiale administrative emise în România pentru a fi recunoscute în statele semnatare ale Convenției de la Haga.',
      en: 'Hague Apostille legalization on Romanian official administrative and educational documents for international recognition.'
    }
  },
  {
    id: 'serv-agricultura-apia',
    code: 'agricultura_subventii',
    category: 'agricultura',
    title: {
      ro: 'Subvenții Agricole & Fonduri Rurale (APIA / AFIR)',
      en: 'Agricultural Subsidies & Rural Support (APIA / AFIR)'
    },
    responsibleAuthority: 'Agenția de Plăți și Intervenție pentru Agricultură (APIA) / AFIR',
    relatedProcedureIds: ['subventii-apia-fermier', 'inregistrare-animale-ansvsa'],
    onlineServiceUrl: 'https://www.apia.org.ro/',
    description: {
      ro: 'Depunere cerere unică de plată pentru fermieri, plăți directe pe suprafață, sprijin cuplat zootehnic și fonduri europene.',
      en: 'Unified direct payment subsidy applications for farmers, land plot grants, animal headage aid, and rural grants.'
    }
  },
  {
    id: 'serv-cetatenie-anc',
    code: 'cetatenie_anc',
    category: 'cetatenie',
    title: {
      ro: 'Autoritatea Națională pentru Cetățenie (ANC)',
      en: 'National Citizenship Authority (ANC)'
    },
    responsibleAuthority: 'Autoritatea Națională pentru Cetățenie — Ministerul Justiției',
    relatedProcedureIds: ['redobandire-cetatenie-romana', 'viza-lunga-sedere-romania'],
    onlineServiceUrl: 'https://cetatenie.just.ro/',
    description: {
      ro: 'Dosare de redobândire a cetățeniei române (Art. 11), acordare cetățenie la cerere (Art. 8) și depunerea jurământului de credință.',
      en: 'Restoration of Romanian citizenship (Art. 11), naturalization applications (Art. 8), and oath of allegiance ceremonies.'
    }
  }
];
