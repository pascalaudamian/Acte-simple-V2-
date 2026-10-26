import { Procedure } from '../types';
import { EXTENDED_PROCEDURES } from './extendedProcedures';

const BASE_PROCEDURES: Procedure[] = [
  {
    id: 'buletin-14-ani',
    slug: 'buletin-prima-eliberare-14-ani',
    category: 'identitate',
    audience: ['ro-citizen', 'family-member'],
    title: {
      ro: 'Carte de identitate — Prima eliberare la împlinirea vârstei de 14 ani',
      en: 'National Identity Card — First issue at age 14'
    },
    shortSummary: {
      ro: 'Ghid complet pentru minorii cetățeni români care au împlinit 14 ani și solicită primul act de identitate, însoțiți de un părinte sau reprezentant legal.',
      en: 'Complete guide for 14-year-old Romanian citizens applying for their first national ID card, accompanied by a parent or legal guardian.'
    },
    targetWho: {
      ro: 'Cetățeni români care au împlinit vârsta de 14 ani, cu domiciliul în România, în termen de maximum 15 zile de la împlinirea vârstei.',
      en: 'Romanian citizens who have reached 14 years of age, residing in Romania, within 15 days of their 14th birthday.'
    },
    prerequisites: {
      ro: [
        'Minorul trebuie să fi împlinit 14 ani.',
        'Prezența obligatorie a minorului și a cel puțin unuia dintre părinți sau a reprezentantului legal.',
        'Actul de identitate al părintelui însoțitor trebuie să fie valabil.',
        'Dovada adresei de domiciliu (actul de proprietate al locuinței).'
      ],
      en: [
        'The applicant must have reached 14 years of age.',
        'Mandatory physical presence of the minor and at least one parent or legal guardian.',
        'Valid ID card of the accompanying parent.',
        'Proof of residential address (property title deed or lease contract registered with tax authorities).'
      ]
    },
    institution: {
      name: 'Direcția Generală de Evidență a Persoanelor (Serviciul Public Comunitar Local de Evidență a Persoanelor - SPCLEP)',
      shortName: 'Evidența Persoanelor (SPCLEP)',
      officialUrl: 'http://dgep.mai.gov.ro',
      bookingUrl: 'https://hub.mai.gov.ro'
    },
    legalBasis: {
      law: 'Ordonanța de Urgență a Guvernului nr. 97/2005 privind evidența, domiciliul, reședința și actele de identitate ale cetățenilor români (republicată)',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/63212'
    },
    processingTime: {
      standard: '10–15 zile lucrătoare (poate varia în funcție de primăria de sector/localitate)',
      urgent: 'Nu există procedură legală de urgență cu suprataxă, însă se pot emite adeverințe provizorii în cazuri speciale justificate.',
      legalDeadline: 'Maximum 30 de zile de la depunerea cererii conform OUG 97/2005'
    },
    fees: [
      {
        amount: 7,
        currency: 'RON',
        description: {
          ro: 'Contravaloare carte de identitate',
          en: 'National ID card administrative fee'
        },
        paymentMethods: ['Ghișeul.ro', 'CEC Bank', 'Terminal SelfPay', 'Casieria Primăriei']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cerere-14',
        name: {
          ro: 'Cerere pentru eliberarea actului de identitate (semnată în fața funcționarului)',
          en: 'Application form for the identity card (signed in front of the officer)'
        },
        description: {
          ro: 'Se completează de minor și se semnează de către minor și părinte în fața funcționarului SPCLEP. Formularul tip se obține gratuit la ghișeu sau se poate descărca de pe site-ul primăriei locale.',
          en: 'Filled by the minor and co-signed by the minor and parent before the public desk officer. Available on-site or downloaded from the local municipality website.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-cert-nastere',
        name: {
          ro: 'Certificatul de naștere al minorului',
          en: 'Minor\'s birth certificate'
        },
        description: {
          ro: 'Certificatul de naștere emis de autoritățile române (original și fotocopie).',
          en: 'Original Romanian civil status birth certificate and 1 photocopy.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-ci-parinti',
        name: {
          ro: 'Actul de identitate al părintelui însoțitor',
          en: 'Accompanying parent\'s identity card'
        },
        description: {
          ro: 'Cartea de identitate valabilă a părintelui care însoțește minorul la depunere (original și fotocopie).',
          en: 'Valid ID card of the parent accompanying the minor (original and 1 photocopy).'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-cert-casatorie-parinti',
        name: {
          ro: 'Certificatul de căsătorie al părinților sau hotărârea de divorț / acord notarial',
          en: 'Parents\' marriage certificate or court divorce decree / custody agreement'
        },
        description: {
          ro: 'Original și fotocopie. În caz de divorț, documentul prin care se atestă căruia dintre părinți i-a fost încredințat minorul sau la care s-a stabilit domiciliul acestuia.',
          en: 'Original and 1 photocopy. In case of divorce, court judgment establishing parental custody and residential address.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-spatiu-locativ',
        name: {
          ro: 'Documentul cu care se face dovada adresei de domiciliu (actul spațiului locativ)',
          en: 'Proof of residential address (housing deed or lease contract)'
        },
        description: {
          ro: 'Contract de vânzare-cumpărare, contract de donație, certificat de moștenitor sau contract de închiriere înregistrat la ANAF. Dacă părintele nu este proprietar, este necesară prezența proprietarului pentru declarația de primire în spațiu.',
          en: 'Deed of purchase, donation, inheritance certificate, or lease registered with ANAF. If the parent does not own the dwelling, the landlord must be present to sign the hosting declaration.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-chitanta-taxa',
        name: {
          ro: 'Dovada achitării taxei de 7 RON',
          en: 'Proof of payment for the 7 RON fee'
        },
        description: {
          ro: 'Chitanța fiscală eliberată de primărie, terminal SelfPay sau confirmarea de plată electronică pe Ghiseul.ro.',
          en: 'Receipt issued by the municipal treasury, SelfPay terminal, or electronic receipt from Ghiseul.ro.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Verifică actele și fă programare online (unde este disponibil)',
          en: 'Check your documents and schedule an online appointment (where available)'
        },
        description: {
          ro: 'Multe servicii locale SPCLEP (București, Cluj, Timișoara, Iași etc.) funcționează pe bază de programare prealabilă pe portalul primăriei locale sau pe hub.mai.gov.ro.',
          en: 'Many local SPCLEP registry offices (Bucharest sectors, Cluj, Timisoara, Iasi) require an advance appointment on the local municipality portal or hub.mai.gov.ro.'
        },
        locationOrUrl: 'https://hub.mai.gov.ro'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Plătește taxa de 7 RON',
          en: 'Pay the 7 RON administrative fee'
        },
        description: {
          ro: 'Poți plăti online pe Ghișeul.ro la secțiunea Taxe Evidența Persoanelor sau la aparatele SelfPay din apropierea sediului.',
          en: 'Pay online at Ghiseul.ro or at SelfPay payment kiosks located near the registry offices.'
        },
        locationOrUrl: 'https://www.ghiseul.ro'
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Prezentarea fizică la ghișeu împreună cu părintele',
          en: 'In-person submission at the desk with the parent'
        },
        description: {
          ro: 'Minorul și părintele se prezintă la ghișeu cu toate originalele și copiile. Se realizează preluarea imaginii faciale (fotografia) pe loc în mod gratuit.',
          en: 'The minor and parent appear with all original documents and photocopies. Digital portrait photography is captured on-site free of charge.'
        }
      },
      {
        stepNumber: 4,
        title: {
          ro: 'Ridicarea cărții de identitate',
          en: 'Collecting the national identity card'
        },
        description: {
          ro: 'După termenul comunicat (aprox. 10–15 zile), minorul sau părintele ridică noul buletin, pe baza recipisei primite la depunere.',
          en: 'After the communicated timeframe (around 10–15 days), the minor or parent collects the new card using the receipt slip.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Cererea trebuie depusă în termen de maximum 15 zile de la împlinirea vârstei de 14 ani. Depășirea termenului poate atrage sancțiuni contravenționale conform OUG 97/2005.',
        en: 'The application must be filed within 15 days of turning 14. Exceeding this legal deadline may incur administrative fines under GEO 97/2005.'
      },
      {
        ro: 'Dacă părinții au domicilii diferite, minorul va avea domiciliul la părintele la care locuiește statornic sau conform acordului scris al ambilor părinți dat în fața funcționarului.',
        en: 'If parents live at separate addresses, the minor\'s official address is established with the parent with whom they reside or by written consent of both parents before the officer.'
      }
    ],
    lastVerifiedDate: '2026-03-15',
    verificationStatus: 'verified',
    officialServiceUrl: 'http://dgep.mai.gov.ro/acte-necesare-eliberare-carte-identitate-la-implinirea-varstei-de-14-ani/',
    isOnlineSubmissionPossible: false,
    onlineServiceNotes: {
      ro: 'Depunerea cererii și fotografierea biometrică necesită prezența fizică obligatorie la sediul SPCLEP. Doar programarea și plata taxei se pot efectua online.',
      en: 'Filing and biometric photography require mandatory physical presence at the SPCLEP office. Only appointments and fee payment can be handled online.'
    }
  },
  {
    id: 'buletin-schimbare',
    slug: 'buletin-schimbare-expirare-pierdere',
    category: 'identitate',
    audience: ['ro-citizen'],
    title: {
      ro: 'Schimbare Carte de Identitate — Expirare, Pierdere, Furt sau Schimbare Domiciliu',
      en: 'Renewal of National Identity Card — Expiration, Loss, Theft or Change of Address'
    },
    shortSummary: {
      ro: 'Procedura completă pentru reînnoirea cărții de identitate a cetățenilor români adulți în caz de expirare a termenului de valabilitate, furt, pierdere sau mutare la o nouă adresă.',
      en: 'Comprehensive procedure for renewing Romanian national ID cards due to expiration, loss, theft, deterioration, or address change.'
    },
    targetWho: {
      ro: 'Cetățeni români cu vârsta de peste 18 ani al căror act de identitate a expirat, va expira în următoarele 180 de zile, a fost pierdut/furat, sau care și-au schimbat domiciliul.',
      en: 'Romanian citizens aged 18+ whose ID card has expired, will expire within the next 180 days, has been lost/stolen, or who have moved residence.'
    },
    prerequisites: {
      ro: [
        'Cererea se poate depune cu cel mult 180 de zile înainte de expirarea cărții de identitate existente.',
        'Prezența titularului în persoană la SPCLEP arondat noului domiciliu.',
        'Dovada spațiului locativ (act de proprietate, contract închiriere înregistrat ANAF).'
      ],
      en: [
        'Application can be filed up to 180 days prior to the expiration date.',
        'In-person attendance at the local SPCLEP registry corresponding to the home address.',
        'Proof of residence (property deed, lease registered with ANAF).'
      ]
    },
    institution: {
      name: 'Direcția Generală de Evidență a Persoanelor (SPCLEP)',
      shortName: 'Evidența Persoanelor',
      officialUrl: 'http://dgep.mai.gov.ro',
      bookingUrl: 'https://hub.mai.gov.ro'
    },
    legalBasis: {
      law: 'OUG nr. 97/2005 (republicată), art. 19',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/63212'
    },
    processingTime: {
      standard: '7–15 zile lucrătoare',
      legalDeadline: 'Maximum 30 de zile lucrătoare'
    },
    fees: [
      {
        amount: 7,
        currency: 'RON',
        description: {
          ro: 'Contravaloare carte de identitate simplă (format clasic)',
          en: 'Administrative fee for standard identity card'
        },
        paymentMethods: ['Ghișeul.ro', 'CEC Bank', 'SelfPay', 'Casieria Direcției Fiscale']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cerere-schimbare',
        name: {
          ro: 'Cerere pentru eliberarea actului de identitate',
          en: 'Application form for renewal of ID'
        },
        description: {
          ro: 'Formular tip completat de titular și semnat la ghișeu.',
          en: 'Standard application completed and signed at the service desk.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-vechiul-buletin',
        name: {
          ro: 'Actul de identitate anterior (sau dovada eliberată de poliție în caz de furt)',
          en: 'Previous ID card (or police declaration in case of theft)'
        },
        description: {
          ro: 'Original. În caz de pierdere, se completează declarație pe proprie răspundere la ghișeu.',
          en: 'Original. In case of loss, a formal statutory declaration is signed at the counter.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-cert-nastere-adult',
        name: {
          ro: 'Certificatul de naștere',
          en: 'Birth certificate'
        },
        description: {
          ro: 'Original și fotocopie.',
          en: 'Original and 1 photocopy.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-cert-casatorie-adult',
        name: {
          ro: 'Certificatul de căsătorie / sentință de divorț (dacă este cazul)',
          en: 'Marriage certificate / divorce decree (if applicable)'
        },
        description: {
          ro: 'Original și fotocopie pentru persoanele căsătorite, divorțate sau văduve.',
          en: 'Original and 1 photocopy for married, divorced, or widowed individuals.'
        },
        isMandatory: false,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-spatiu-adult',
        name: {
          ro: 'Documentul cu care se face dovada adresei de domiciliu',
          en: 'Proof of residential address'
        },
        description: {
          ro: 'Contract vânzare-cumpărare / donație / moștenire. Dacă titularul nu este proprietar, proprietarul trebuie să fie prezent cu buletinul său pentru declarația de primire în spațiu.',
          en: 'Property deed. If applicant is not the homeowner, the owner must attend in person to sign the hosting statement.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-taxa-7',
        name: {
          ro: 'Dovada achitării taxei de 7 RON',
          en: 'Proof of 7 RON fee payment'
        },
        description: {
          ro: 'Chitanță Ghișeul.ro sau eliberată la automatele de plată.',
          en: 'Receipt from Ghiseul.ro or municipal kiosk.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Pregătirea dosarului și plata taxei pe Ghișeul.ro',
          en: 'Prepare document folder and pay the 7 RON fee on Ghiseul.ro'
        },
        description: {
          ro: 'Plătește online taxa de 7 RON și pregătește copiile certificatelor și ale actului de proprietate.',
          en: 'Pay 7 RON online and prepare photocopies of civil status documents and residential deed.'
        },
        locationOrUrl: 'https://www.ghiseul.ro'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Programare online la SPCLEP-ul arondat domiciliului',
          en: 'Schedule online appointment at your designated SPCLEP'
        },
        description: {
          ro: 'Selectează data și ora dorite pe portalul primăriei sau HUB MAI.',
          en: 'Select date and time slot on municipality website or HUB MAI.'
        },
        locationOrUrl: 'https://hub.mai.gov.ro'
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Depunerea dosarului și fotografierea',
          en: 'Filing documents and portrait capture'
        },
        description: {
          ro: 'Prezentare la ghișeu, preluarea imaginii faciale și eliberarea tichetului de ridicare.',
          en: 'Counter verification, digital face photography, and pickup slip issue.'
        }
      },
      {
        stepNumber: 4,
        title: {
          ro: 'Ridicarea noului act de identitate',
          en: 'Collect new national ID'
        },
        description: {
          ro: 'Ridicarea se face personal pe baza tichetului și a vechiului buletin (care se predă pentru anulare).',
          en: 'Collect in person with the receipt slip and previous ID (which is surrendered for cancellation).'
        }
      }
    ],
    warnings: [
      {
        ro: 'Dacă buletinul a expirat de mai mult de 15 zile, se poate aplica o amendă contravențională între 40 și 80 RON conform legii.',
        en: 'If the ID card has been expired for more than 15 days, an administrative fine of 40–80 RON may be assessed according to legal provisions.'
      }
    ],
    lastVerifiedDate: '2026-03-20',
    verificationStatus: 'verified',
    officialServiceUrl: 'http://dgep.mai.gov.ro/acte-necesare-eliberare-carte-identitate-la-expirarea-termenului-de-valabilitate/',
    isOnlineSubmissionPossible: false
  },
  {
    id: 'pasaport-electronic',
    slug: 'pasaport-simplu-electronic',
    category: 'identitate',
    audience: ['ro-citizen', 'family-member', 'all'],
    title: {
      ro: 'Pașaport Simplu Electronic pentru Adulți și Minori',
      en: 'Simple Electronic Passport for Adults and Minors'
    },
    shortSummary: {
      ro: 'Procedura oficială de obținere sau reînnoire a pașaportului românesc biometric prin programare pe platforma oficială epasapoarte.ro / hub.mai.gov.ro.',
      en: 'Official procedure to apply for or renew a Romanian biometric electronic passport via online booking at epasapoarte.ro / hub.mai.gov.ro.'
    },
    targetWho: {
      ro: 'Cetățeni români care călătoresc în afara Uniunii Europene sau care doresc un document de călătorie internațional valabil (valabilitate 10 ani pentru persoane peste 18 ani, 5 ani pentru minori între 12-18 ani, 3 ani sub 12 ani).',
      en: 'Romanian citizens traveling internationally (validity: 10 years for adults 18+, 5 years for youths 12–18, 3 years for children under 12).'
    },
    prerequisites: {
      ro: [
        'Cetățenie română.',
        'Carte de identitate valabilă în original (pentru adulți).',
        'Pentru minori este obligatorie prezența ambilor părinți sau procură notarială din partea părintelui absent.',
        'Plata taxei de pașaport anterior prezentării la ghișeu.'
      ],
      en: [
        'Romanian citizenship.',
        'Valid original national ID card (for adults).',
        'For minors under 18, both parents must attend in person or provide a notarized power of attorney.',
        'Prior payment of the statutory passport fee.'
      ]
    },
    institution: {
      name: 'Direcția Generală de Pașapoarte (Ministerul Afacerilor Interne)',
      shortName: 'Pașapoarte (MAI)',
      officialUrl: 'https://pasapoarte.mai.gov.ro',
      bookingUrl: 'https://epasapoarte.ro'
    },
    legalBasis: {
      law: 'Legea nr. 248/2005 privind regimul liberei circulații a cetățenilor români în străinătate',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/63897'
    },
    processingTime: {
      standard: '5 zile lucrătoare (depuneri în România)',
      urgent: 'Nu există procedură de urgență pentru pașaportul electronic; pentru urgențe medicale sau de serviciu justificate cu acte se poate emite pașaport simplu temporar (valabil 1 an) în 3 zile lucrătoare.',
      legalDeadline: 'Maximum 15 zile lucrătoare pe teritoriul României'
    },
    fees: [
      {
        amount: 258,
        currency: 'RON',
        description: {
          ro: 'Taxă pașaport simplu electronic pentru persoane cu vârsta de peste 12 ani (valabil 5 sau 10 ani)',
          en: 'Fee for electronic passport for persons aged 12 and older'
        },
        paymentMethods: ['Ghișeul.ro', 'CEC Bank', 'Terminal SelfPay', 'Mandat Poștal']
      },
      {
        amount: 234,
        currency: 'RON',
        description: {
          ro: 'Taxă pașaport simplu electronic pentru minori sub 12 ani (valabil 3 ani)',
          en: 'Fee for electronic passport for children under 12'
        },
        paymentMethods: ['Ghișeul.ro', 'CEC Bank', 'Terminal SelfPay']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-ci-pasaport',
        name: {
          ro: 'Cartea de identitate sau cartea de identitate provizorie (în termen de valabilitate)',
          en: 'Original valid national ID card'
        },
        description: {
          ro: 'În original. Pentru minorii sub 14 ani se prezintă certificatul de naștere în original.',
          en: 'Original. For children under 14, original birth certificate is presented.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-chitanta-pasaport',
        name: {
          ro: 'Dovada achitării taxei de pașaport (chitanță fizică sau extras pe Ghiseul.ro)',
          en: 'Proof of fee payment (258 RON or 234 RON)'
        },
        description: {
          ro: 'Trebuie să conțină numele, prenumele și CNP-ul titularului pașaportului.',
          en: 'Must specify the applicant\'s full name and Romanian CNP.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-pasaport-anterior',
        name: {
          ro: 'Pașaportul anterior (dacă există)',
          en: 'Previous passport (if held)'
        },
        description: {
          ro: 'Se prezintă pentru anulare fizică la ghișeu.',
          en: 'Presented for physical cancellation at the counter.'
        },
        isMandatory: false,
        isOriginalRequired: true,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Programare online obligatorie pe epasapoarte.ro',
          en: 'Mandatory online booking at epasapoarte.ro'
        },
        description: {
          ro: 'Alege orice serviciu public comunitar de pașapoarte din țară (nu depinde de adresa din buletin). Introdu datele corecte și confirmă pe email în maximum 2 ore.',
          en: 'Choose any passport service in Romania (not restricted to home county). Enter accurate data and verify via email link within 2 hours.'
        },
        locationOrUrl: 'https://epasapoarte.ro'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Achitarea taxei pe Ghișeul.ro',
          en: 'Pay fee on Ghiseul.ro'
        },
        description: {
          ro: 'Selectează Direcția Generală de Pașapoarte, introdu CNP-ul beneficiarului și plătește cu cardul fără comision.',
          en: 'Select General Directorate for Passports, enter applicant CNP, and pay securely by debit/credit card.'
        },
        locationOrUrl: 'https://www.ghiseul.ro'
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Prezentarea la ghișeu pentru preluarea datelor biometrice',
          en: 'In-person biometric data capture'
        },
        description: {
          ro: 'Prezintă-te cu 10 minute înainte de ora programată. Se preiau amprentele digitale (pentru cei peste 12 ani), semnătura electronică și fotografia.',
          en: 'Arrive 10 minutes prior to scheduled slot. Fingerprints (age 12+), electronic signature, and photo are captured.'
        }
      },
      {
        stepNumber: 4,
        title: {
          ro: 'Urmărirea stadiului și ridicarea pașaportului',
          en: 'Status tracking and collection'
        },
        description: {
          ro: 'Poți verifica stadiul emiterii pe pasapoarte.mai.gov.ro/status-pasaport. Poți opta și pentru livrarea prin curier la domiciliu (contra cost, aprox. 15 RON).',
          en: 'Track status at pasapoarte.mai.gov.ro/status-pasaport. You may also opt for home courier delivery (approx. 15 RON).'
        },
        locationOrUrl: 'https://pasapoarte.mai.gov.ro/status-pasaport/'
      }
    ],
    warnings: [
      {
        ro: 'Atenție: Confirmarea programării pe email este obligatorie în termen de 2 ore de la transmitere, altfel programarea se anulează automat.',
        en: 'Warning: Email confirmation of your appointment is required within 2 hours, otherwise the reservation is automatically voided.'
      }
    ],
    lastVerifiedDate: '2026-03-10',
    verificationStatus: 'verified',
    officialServiceUrl: 'https://epasapoarte.ro',
    isOnlineSubmissionPossible: false
  },
  {
    id: 'cazier-judiciar',
    slug: 'certificat-cazier-judiciar',
    category: 'justitie',
    audience: ['ro-citizen', 'eu-citizen', 'non-eu', 'all'],
    title: {
      ro: 'Certificat de Cazier Judiciar — Online sau la Ghișeu',
      en: 'Criminal Record Certificate — Online via HUB MAI or in Person'
    },
    shortSummary: {
      ro: 'Cum obții gratuit certificatul de cazier judiciar românesc în format digital pe hub.mai.gov.ro (integrat cu Ghișeul.ro) sau pe loc la orice secție de poliție.',
      en: 'How to obtain a free Romanian criminal record certificate digitally on hub.mai.gov.ro (via Ghiseul.ro auth) or immediately at police desks.'
    },
    targetWho: {
      ro: 'Orice persoană fizică care are nevoie de dovada antecedentelor penale pentru angajare, școală de șoferi, concursuri publice, adopții sau alte demersuri legale.',
      en: 'Any individual needing proof of clean criminal record for employment, driving license, public examination, or legal procedures.'
    },
    prerequisites: {
      ro: [
        'Pentru obținerea online: cont validat pe Ghiseul.ro (cu card bancar emis pe numele solicitantului) sau autentificare prin hub.mai.gov.ro.',
        'Pentru obținerea fizică: act de identitate valabil prezentat la orice ghișeu de cazier din țară.',
        'Certificatul este gratuit conform Legii nr. 1/2017 (taxa a fost eliminată).'
      ],
      en: [
        'For online issue: validated account on Ghiseul.ro or authenticated account on hub.mai.gov.ro.',
        'For in-person issue: valid original identity document at any designated police precinct in Romania.',
        'The certificate is completely free of charge (statutory fees abolished by Law 1/2017).'
      ]
    },
    institution: {
      name: 'Inspectoratul General al Poliției Române (IGPR) — Direcția Cazier Judiciar, Statistică și Evidențe Operative',
      shortName: 'Poliția Română (HUB MAI)',
      officialUrl: 'https://hub.mai.gov.ro',
      bookingUrl: 'https://hub.mai.gov.ro/serviciu/cazier'
    },
    legalBasis: {
      law: 'Legea nr. 290/2004 privind cazierul judiciar (republicată, cu modificările aduse de Legea nr. 3/2023 pentru digitalizare)',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/53066'
    },
    processingTime: {
      standard: 'Online: Instant (câteva minute) / La ghișeu: Pe loc (eliberare imediată)',
      legalDeadline: 'Maximum 3 zile lucrătoare dacă sunt necesare verificări suplimentare în baze de date județene'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Serviciu gratuit (taxa a fost eliminată prin Legea nr. 1/2017)',
          en: 'Free civic service (all fees eliminated by law)'
        },
        paymentMethods: ['Gratuit']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-ci-cazier',
        name: {
          ro: 'Actul de identitate (Carte de Identitate, Pașaport sau Permis de Ședere IGI)',
          en: 'Valid identity document (ID card, Passport, or IGI residence permit)'
        },
        description: {
          ro: 'În original. La depunerea fizică funcționarul verifică identitatea și completează cererea electronică.',
          en: 'Original. At counter, the officer scans the document and prints the declaration.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Varianta 1 (Online - Recomandat): Autentificare pe hub.mai.gov.ro',
          en: 'Option 1 (Online - Recommended): Sign in to hub.mai.gov.ro'
        },
        description: {
          ro: 'Accesează portalul hub.mai.gov.ro și autentifică-te prin contul Ghișeul.ro. Dacă nu ai cont Ghișeul.ro, îl poți crea instant cu un card bancar personal.',
          en: 'Go to hub.mai.gov.ro and authenticate via your verified Ghiseul.ro profile.'
        },
        locationOrUrl: 'https://hub.mai.gov.ro'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Generarea certificatului PDF cu semnătură digitală',
          en: 'Generate digitally signed PDF certificate'
        },
        description: {
          ro: 'Selectează serviciul "Cazier Judiciar", alege motivul solicitării și apasă "Emite cazier". Documentul PDF semnat electronic cu sigiliul Poliției Române este descărcat instant.',
          en: 'Select "Cazier Judiciar", state purpose, and click "Issue". The digitally sealed PDF document is downloaded immediately.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Varianta 2 (La Ghișeu): Prezentare la orice secție de poliție',
          en: 'Option 2 (In Person): Visit any police precinct criminal records counter'
        },
        description: {
          ro: 'Dacă nu ai cont online, mergi cu buletinul la orice ghișeu de cazier judiciar. Se eliberează pe loc, tipărit și ștampilat.',
          en: 'If no online account is held, walk in with your ID card. It is printed and stamped immediately at the desk.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Valabilitatea certificatului de cazier judiciar este de 6 luni de la data emiterii, conform legii.',
        en: 'The criminal record certificate remains legally valid for 6 months from the date of issue.'
      },
      {
        ro: 'Certificatul descărcat online are valoare juridică deplină exclusiv în formatul său electronic PDF original cu semnătură digitală calificată. Tipărit pe hârtie fără ștampilă umedă își pierde calitatea de original.',
        en: 'The digital certificate has legal validity only in its native digital PDF form with embedded cryptographic seal.'
      }
    ],
    lastVerifiedDate: '2026-03-22',
    verificationStatus: 'verified',
    officialServiceUrl: 'https://hub.mai.gov.ro',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Serviciu 100% digital disponibil pentru cetățenii români fără cazier penal. Persoanele cu înscrisuri în cazier trebuie să se prezinte fizic la ghișeu.',
      en: '100% digital service for applicants with clean records. Individuals with criminal entries must apply in person.'
    }
  },
  {
    id: 'permis-conducere-schimbare',
    slug: 'preschimbare-permis-conducere',
    category: 'auto',
    audience: ['ro-citizen', 'eu-citizen', 'non-eu', 'all'],
    title: {
      ro: 'Preschimbare Permis de Conducere Românesc (Expirat, Deteriorat sau Nume Schimbat)',
      en: 'Renewal / Exchange of Romanian Driving License'
    },
    shortSummary: {
      ro: 'Pașii oficiali pentru preschimbarea permisului de conducere auto românesc expirat, fișa medicală obligatorie, plata taxei și programarea la DGPCIV.',
      en: 'Official steps to renew an expired Romanian driving license: required medical clearance, fee payment, and DGPCIV booking.'
    },
    targetWho: {
      ro: 'Deținători de permis auto românesc a cărui valabilitate a expirat sau urmează să expire, permis deteriorat sau persoane care și-au schimbat numele.',
      en: 'Holders of Romanian driving licenses that are expired, about to expire, damaged, or whose name has changed.'
    },
    prerequisites: {
      ro: [
        'Fișă medicală auto (pentru permis expirat) eliberată de o unitate medicală autorizată.',
        'Achitarea taxei de permis de 89 RON.',
        'Carte de identitate valabilă în original.',
        'Notă: Dacă permisul este încă valabil și se solicită duplicat pentru pierdere/deteriorare/schimbare nume, NU este necesară fișa medicală, dar noul permis va avea valabilitatea celui inițial.'
      ],
      en: [
        'Medical clearance certificate (for expired licenses) from an authorized clinic.',
        'Payment of the 89 RON driving license fee.',
        'Valid original ID card.',
        'Note: If license is still valid and duplicate is requested for loss/damage/name change, medical exam is NOT required, but new license keeps the original expiration date.'
      ]
    },
    institution: {
      name: 'Direcția Generală Permise de Conducere și Înmatriculări (DGPCIV)',
      shortName: 'Permise Auto (DGPCIV)',
      officialUrl: 'https://dgpci.mai.gov.ro',
      bookingUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/'
    },
    legalBasis: {
      law: 'OUG nr. 195/2002 privind circulația pe drumurile publice (Codul Rutier), Ordinul MAI nr. 123/2013',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/39826'
    },
    processingTime: {
      standard: '3–5 zile lucrătoare (livrare prin Poșta Română la domiciliu sau ridicare la ghișeu)',
      legalDeadline: 'Maximum 30 de zile'
    },
    fees: [
      {
        amount: 89,
        currency: 'RON',
        description: {
          ro: 'Contravaloare permis de conducere auto',
          en: 'Driving license document fee'
        },
        paymentMethods: ['Ghișeul.ro', 'dgpci.mai.gov.ro', 'Terminal SelfPay', 'CEC Bank']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cerere-permis',
        name: {
          ro: 'Cererea tip (se generează automat și se semnează la ghișeu)',
          en: 'Standard application form (auto-generated at the counter)'
        },
        description: {
          ro: 'Nu trebuie completat un formular pe hârtie în avans; funcționarul tipărește datele din sistem.',
          en: 'No advance manual form required; desk officer prints directly from registry.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-ci-permis',
        name: {
          ro: 'Actul de identitate valabil',
          en: 'Valid national ID card'
        },
        description: {
          ro: 'Original și copie.',
          en: 'Original and photocopy.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-permis-vechi',
        name: {
          ro: 'Permisul de conducere anterior',
          en: 'Current / previous driving license'
        },
        description: {
          ro: 'Originalul (se predă la ghișeu). În caz de furt sau pierdere se dă o declarație pe proprie răspundere la ghișeu.',
          en: 'Original surrendered at desk. If lost or stolen, sign declaration at desk.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-fisa-medicala',
        name: {
          ro: 'Fișa medicală auto (Certificat medical)',
          en: 'Official driver medical clearance certificate'
        },
        description: {
          ro: 'Original și copie. Emisă de o policlinică autorizată de Ministerul Sănătății, cu toate avizele de specialitate (oftalmologie, ORL, neurologie, psihiatrie etc.) și concluzia "Apt conducere auto". Valabilă 1 an.',
          en: 'Original and copy. Issued by a Ministry of Health authorized clinic with all required specialty endorsements. Valid for 1 year.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-taxa-89',
        name: {
          ro: 'Dovada plății taxei de 89 RON',
          en: 'Proof of 89 RON fee payment'
        },
        description: {
          ro: 'Chitanță Ghișeul.ro sau extras bancar.',
          en: 'Receipt from Ghiseul.ro or payment terminal.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Obține fișa medicală auto',
          en: 'Complete the medical examination'
        },
        description: {
          ro: 'Efectuează controlul medical la o clinică autorizată. Asigură-te că fișa este ștampilată cu "Apt" pentru categoriile pe care le deții.',
          en: 'Schedule your medical examination at an accredited clinic for your driving license categories.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Plătește taxa de 89 RON pe Ghișeul.ro',
          en: 'Pay the 89 RON fee on Ghiseul.ro'
        },
        description: {
          ro: 'Plata se înregistrează electronic direct în sistemul DGPCIV.',
          en: 'Electronic payment is automatically matched in DGPCIV system.'
        },
        locationOrUrl: 'https://www.ghiseul.ro'
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Programare online la serviciul DGPCIV județean',
          en: 'Online booking on dgpci.mai.gov.ro'
        },
        description: {
          ro: 'Alege județul de domiciliu, selectează serviciul "Preschimbare permis românesc" și alege intervalul orar.',
          en: 'Select county, choose service "Preschimbare permis romanesc", and pick an available time slot.'
        },
        locationOrUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/'
      },
      {
        stepNumber: 4,
        title: {
          ro: 'Depunerea actelor și primirea dovezii provizorii',
          en: 'Submission and receipt of temporary driving permit'
        },
        description: {
          ro: 'După depunere primești o dovadă înlocuitoare a permisului valabilă 15-30 de zile cu drept de circulație pe teritoriul României.',
          en: 'Upon submission you receive a temporary 15–30 day driving authorization valid in Romania.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Conducerea pe drumurile publice cu permisul expirat constituie contravenție și se sancționează cu amendă (clasa a III-a de sancțiuni, 6-8 puncte amendă) conform OUG 195/2002.',
        en: 'Driving with an expired license is an administrative infraction penalized with penalty points and a fine under the Highway Code.'
      }
    ],
    lastVerifiedDate: '2026-03-18',
    verificationStatus: 'verified',
    officialServiceUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/formular/permise',
    isOnlineSubmissionPossible: false
  },
  {
    id: 'rezidenta-ue',
    slug: 'certificat-inregistrare-rezidenta-ue',
    category: 'imigrare',
    audience: ['eu-citizen', 'family-member'],
    title: {
      ro: 'Certificat de Înregistrare a Rezidenței pentru Cetățeni UE / SEE / Elveția',
      en: 'Registration Certificate for EU / EEA / Swiss Citizens in Romania'
    },
    shortSummary: {
      ro: 'Procedura legală obligatorie prin care cetățenii Uniunii Europene care locuiesc în România mai mult de 3 luni își înregistrează rezidența la Inspectoratul General pentru Imigrări (IGI) și primesc CNP românesc.',
      en: 'Mandatory procedure for EU/EEA/Swiss citizens residing in Romania for more than 90 days to register residency at IGI and receive a Romanian CNP.'
    },
    targetWho: {
      ro: 'Cetățeni ai țărilor din Uniunea Europeană (UE), Spațiul Economic European (SEE: Norvegia, Islanda, Liechtenstein) sau Confederația Elvețiană care locuiesc în România pentru muncă, studii, activități independente sau ca persoane cu resurse proprii.',
      en: 'Citizens of EU/EEA countries or Switzerland staying in Romania for employment, business, studies, or self-sufficiency longer than 3 months.'
    },
    prerequisites: {
      ro: [
        'Ședere în România mai mare de 90 de zile.',
        'Pașaport național valabil sau carte de identitate națională.',
        'Dovada motivului șederii: contract individual de muncă înregistrat în Revisal, adeverință de la universitate/școală, certificat constatator firmă, sau extras de cont bancar dovedind mijloace de subzistență + asigurare de sănătate.',
        'Dovada adresei de reședință în România (contract de închiriere sau comodat).'
      ],
      en: [
        'Stay in Romania exceeding 90 days.',
        'Valid national passport or national ID card.',
        'Proof of grounds for stay: registered employment contract, university enrollment certificate, or bank statement demonstrating sufficient funds + health insurance.',
        'Proof of residential address in Romania (lease agreement or hosting deed).'
      ]
    },
    institution: {
      name: 'Inspectoratul General pentru Imigrări (Ministerul Afacerilor Interne)',
      shortName: 'Imigrări (IGI)',
      officialUrl: 'https://igi.mai.gov.ro',
      bookingUrl: 'https://portaligi.mai.gov.ro'
    },
    legalBasis: {
      law: 'Ordonanța de Urgență a Guvernului nr. 102/2005 privind libera circulație pe teritoriul României a cetățenilor statelor membre ale Uniunii Europene',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/63346'
    },
    processingTime: {
      standard: 'Se eliberează de regulă în aceeași zi (pe loc) sau în maximum 3 zile lucrătoare',
      legalDeadline: 'Eliberare în aceeași zi conform art. 14 din OUG 102/2005 dacă dosarul este complet'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Certificatul de înregistrare se eliberează gratuit (fără taxe consulare)',
          en: 'Registration certificate is issued free of administrative fee'
        },
        paymentMethods: ['Gratuit']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cerere-igi-ue',
        name: {
          ro: 'Cerere tip de înregistrare a rezidenței (Anexa 2 din OUG 102/2005)',
          en: 'Standard registration application form (Annex 2)'
        },
        description: {
          ro: 'Completată și semnată de solicitant. Disponibilă pe portaligi.mai.gov.ro.',
          en: 'Filled and signed by applicant; available via portaligi.mai.gov.ro.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-pasaport-ue',
        name: {
          ro: 'Documentul de identitate național sau pașaportul',
          en: 'Valid national passport or EU national ID card'
        },
        description: {
          ro: 'Original și fotocopie.',
          en: 'Original and 1 photocopy.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-scop-ue',
        name: {
          ro: 'Dovada motivului șederii (muncă / studii / resurse proprii)',
          en: 'Proof of grounds (employment / education / self-sufficient funds)'
        },
        description: {
          ro: 'Pentru angajați: Contract individual de muncă sau adeverință de la angajator cu salariul și extras din registrul general de evidență a salariaților (Revisal). Pentru studenți: adeverință facultate + card european de sănătate (EHIC) + declarație de resurse.',
          en: 'For workers: Registered employment contract and employer certificate. For students: University acceptance + European Health Insurance Card (EHIC) + proof of subsistence.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-spatiu-igi',
        name: {
          ro: 'Dovada adresei de reședință în România',
          en: 'Proof of residential address in Romania'
        },
        description: {
          ro: 'Contract de închiriere înregistrat sau act de proprietate / comodat încheiat în formă legală.',
          en: 'Registered rental lease agreement or property deed.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Crearea contului pe portalul IGI (portaligi.mai.gov.ro)',
          en: 'Create account on official IGI portal (portaligi.mai.gov.ro)'
        },
        description: {
          ro: 'Încarcă documentele scanate în aplicație. Sistemul verifică preliminar dosarul și îți permite să selectezi ziua și ora programării la formațiunea județeană IGI.',
          en: 'Upload scanned documents for preliminary verification and schedule your counter appointment.'
        },
        locationOrUrl: 'https://portaligi.mai.gov.ro'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Prezentarea la ghișeul IGI cu dosarul original',
          en: 'Attend in person with original document folder'
        },
        description: {
          ro: 'Ofițerul verifică originalele documentelor încărcate pe portal.',
          en: 'The immigration officer checks the original documents against uploaded scans.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Eliberarea certificatului de înregistrare și alocarea CNP-ului',
          en: 'Issuance of Certificate and Romanian CNP allocation'
        },
        description: {
          ro: 'Se eliberează certificatul tipărit (format cartonat) care conține Codul Numeric Personal (CNP) românesc, esențial pentru taxe, bănci și CNAS.',
          en: 'You receive the paper registration certificate stamped with your Romanian Personal Identification Number (CNP).'
        }
      }
    ],
    warnings: [
      {
        ro: 'Înregistrarea este obligatorie în termen de maximum 3 luni de la data intrării pe teritoriul României. Nerespectarea termenului constituie contravenție.',
        en: 'Registration is legally mandatory within 3 months of entering Romanian territory.'
      }
    ],
    lastVerifiedDate: '2026-03-25',
    verificationStatus: 'verified',
    officialServiceUrl: 'https://portaligi.mai.gov.ro',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Documentele se transmit online prin portaligi.mai.gov.ro pentru pre-validare, dar prezentarea fizică o singură dată este necesară pentru prezentarea originalelor și ridicarea certificatului.',
      en: 'Initial filing is submitted online via portaligi.mai.gov.ro; a single in-person visit is required for document verification and certificate pickup.'
    }
  },
  {
    id: 'permis-sedere-non-ue-munca',
    slug: 'permis-sedere-temporara-non-ue-angajare',
    category: 'imigrare',
    audience: ['non-eu'],
    title: {
      ro: 'Permis de Ședere Temporară pentru Cetățeni Non-UE (Permis Unic pentru Muncă)',
      en: 'Single Residence and Work Permit for Non-EU Citizens (Employment)'
    },
    shortSummary: {
      ro: 'Ghid detaliat pentru obținerea permisului unic de ședere și muncă eliberat de IGI pentru resortisanții țărilor terțe (Non-UE) care dețin viză de lungă ședere tip D/AM.',
      en: 'Detailed guide to obtaining a Single Work & Residence Permit issued by IGI for Non-EU third-country nationals holding a D/AM long-stay visa.'
    },
    targetWho: {
      ro: 'Cetățeni din afara Uniunii Europene care au intrat în România cu viză de lungă ședere pentru angajare (D/AM) obținută pe baza avizului de angajare emis de IGI angajatorului.',
      en: 'Non-EU nationals who entered Romania on a valid D/AM long-stay visa based on an employer work authorization.'
    },
    prerequisites: {
      ro: [
        'Viză de lungă ședere D/AM valabilă.',
        'Aviz de angajare emis de IGI la solicitarea companiei angajatoare.',
        'Contract individual de muncă cu normă întreagă înregistrat în Revisal.',
        'Adeverință medicală emisă în România care atestă că persoana nu suferă de boli care pun în pericol sănătatea publică.',
        'Dovada spațiului de locuit în România (contract de închiriere înregistrat).',
        'Cererea trebuie depusă cu cel puțin 30 de zile înainte de expirarea dreptului de ședere conferit de viză.'
      ],
      en: [
        'Valid D/AM long-stay employment visa.',
        'Work notice (aviz de angajare) issued by IGI to the Romanian company.',
        'Registered full-time employment contract.',
        'Romanian medical fitness certificate.',
        'Proof of accommodation (registered rental contract).',
        'Application must be filed at least 30 days prior to visa expiration.'
      ]
    },
    institution: {
      name: 'Inspectoratul General pentru Imigrări (IGI)',
      shortName: 'Imigrări (IGI)',
      officialUrl: 'https://igi.mai.gov.ro',
      bookingUrl: 'https://portaligi.mai.gov.ro'
    },
    legalBasis: {
      law: 'Ordonanța de Urgență a Guvernului nr. 194/2002 privind regimul străinilor în România (republicată)',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/40981'
    },
    processingTime: {
      standard: '30–45 de zile calendaristice de la data înregistrării cererii la ghișeu',
      legalDeadline: 'Maximum 45 de zile (poate fi prelungit cu 15 zile pentru verificări)'
    },
    fees: [
      {
        amount: 259,
        currency: 'RON',
        description: {
          ro: 'Contravaloare permis de ședere plasticat cu cip biometric',
          en: 'Biometric plastic residence card production fee'
        },
        paymentMethods: ['Trezoreria Statului', 'Ghișeul.ro', 'CEC Bank']
      },
      {
        amount: 120,
        currency: 'EUR',
        description: {
          ro: 'Taxă consulară de prelungire a dreptului de ședere (echivalent în RON la cursul BNR)',
          en: 'Consular fee for residence extension (in RON at official NBR exchange rate)'
        },
        paymentMethods: ['Trezoreria Statului', 'CEC Bank']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cerere-permis-unic',
        name: {
          ro: 'Cerere de prelungire a dreptului de ședere temporară pentru muncă',
          en: 'Application for temporary residence permit for employment'
        },
        description: {
          ro: 'Generată prin portaligi.mai.gov.ro și semnată de solicitant.',
          en: 'Generated via portaligi.mai.gov.ro and signed by applicant.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-pasaport-non-ue',
        name: {
          ro: 'Pașaportul național cu viza D/AM aplicată',
          en: 'Original national passport with valid D/AM visa sticker'
        },
        description: {
          ro: 'Original și copii ale paginilor cu date personale, viză și ștampila de intrare în România.',
          en: 'Original and copies of bio page, visa page, and entry stamp.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-cim-revisal',
        name: {
          ro: 'Contractul de muncă și extrasul Revisal semnat de angajator',
          en: 'Employment contract and official Revisal registry extract'
        },
        description: {
          ro: 'CIM cu normă întreagă și salariul cel puțin la nivelul salariului de bază minim brut pe țară garantat în plată.',
          en: 'Full-time employment contract meeting at least statutory national gross minimum wage.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-aviz-angajare',
        name: {
          ro: 'Avizul de angajare emis de IGI în copie',
          en: 'Copy of initial work authorization issued by IGI'
        },
        description: {
          ro: 'Documentul obținut inițial de angajator.',
          en: 'The document previously secured by the sponsoring employer.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      },
      {
        id: 'doc-fisa-med-straini',
        name: {
          ro: 'Adeverință medicală eliberată de o clinică românească',
          en: 'Medical certificate issued by a Romanian healthcare facility'
        },
        description: {
          ro: 'Atestă că solicitantul este apt clinic de muncă și nu suferă de boli contagioase.',
          en: 'Certifies applicant is clinically fit for work and free of contagious conditions.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-dovada-cazare',
        name: {
          ro: 'Dovada deținerii legale a spațiului de locuit',
          en: 'Proof of legal residential accommodation'
        },
        description: {
          ro: 'Contract de închiriere înregistrat la ANAF sau contract de comodat autentificat la notar.',
          en: 'Rental lease registered with ANAF or notarized accommodation agreement.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-chitante-taxe-igi',
        name: {
          ro: 'Dovada achitării taxei de card (259 RON) și taxei consulare (120 EUR în RON)',
          en: 'Proof of payment for 259 RON card fee and 120 EUR consular fee'
        },
        description: {
          ro: 'Chitanțe de plată la Trezoreria Statului.',
          en: 'Official state treasury receipts.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Încărcarea dosarului pe portaligi.mai.gov.ro',
          en: 'Upload application on portaligi.mai.gov.ro'
        },
        description: {
          ro: 'Creează dosarul electronic cu cel puțin 30 de zile înainte de expirarea vizei. Încarcă toate documentele traduse și legalizate unde este cazul.',
          en: 'Submit online file at least 30 days prior to visa expiry with all required translated and authenticated documents.'
        },
        locationOrUrl: 'https://portaligi.mai.gov.ro'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Prezentarea la programare pentru preluarea datelor biometrice',
          en: 'In-person appointment for biometric capture'
        },
        description: {
          ro: 'Prezintă-te la data stabilită la serviciul județean IGI cu toate originalele. Se preiau fotografia facială și amprentele digitale.',
          en: 'Attend scheduled IGI appointment with all originals. Digital photo and fingerprints are captured.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Ridicarea permisului de ședere (Permis Unic)',
          en: 'Collection of the Biometric Residence Permit'
        },
        description: {
          ro: 'După soluționare (cca. 30-45 zile), ridică cardul de plastic de la ghișeul IGI. Acesta conține CNP-ul tău de rezident și atestă dreptul de munc��.',
          en: 'Collect the plastic residence card after notification. It contains your resident CNP and confirms full work rights.'
        }
      }
    ],
    warnings: [
      {
        ro: 'CRITIC: Cererea depusă cu mai puțin de 30 de zile înainte de expirarea vizei atrage sancțiune contravențională sau revocarea dreptului de ședere cu obligarea la părăsirea teritoriului!',
        en: 'CRITICAL: Applications submitted fewer than 30 days prior to visa expiration are subject to fines and may lead to deportation orders!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    officialServiceUrl: 'https://portaligi.mai.gov.ro',
    isOnlineSubmissionPossible: true
  },
  {
    id: 'inmatriculare-auto',
    slug: 'inmatriculare-auto-second-hand',
    category: 'auto',
    audience: ['ro-citizen', 'eu-citizen', 'non-eu', 'all'],
    title: {
      ro: 'Înmatriculare Autovehicul (Transcriere Drept de Proprietate)',
      en: 'Vehicle Registration & Ownership Transfer in Romania'
    },
    shortSummary: {
      ro: 'Procedura legală pas cu pas pentru transcrierea și înmatricularea unui autoturism cumpărat în România: luarea în evidență la Taxe Locale și depunerea dosarului la DGPCIV.',
      en: 'Step-by-step procedure for vehicle registration and ownership title transfer in Romania: municipal tax roll registration followed by DGPCIV filing.'
    },
    targetWho: {
      ro: 'Orice persoană fizică sau juridică care a achiziționat un autovehicul înmatriculat în România sau importat din UE și dorește înmatricularea pe numele său.',
      en: 'Individuals or companies that purchased a motor vehicle in Romania or imported from EU seeking legal registration in their name.'
    },
    prerequisites: {
      ro: [
        'Contract de înstrăinare-dobândire (sau factură fiscală) cu viza organului fiscal local de la vânzător și cumpărător.',
        'Înregistrarea prealabilă a vehiculului la Direcția de Impozite și Taxe Locale (DITL) a cumpărătorului.',
        'Asigurare obligatorie RCA valabilă încheiată pe numele noului proprietar.',
        'Inspecție Tehnică Periodică (ITP) valabilă menționată în certificatul de înmatriculare.'
      ],
      en: [
        'Standard bill of sale (contract de înstrăinare-dobândire) stamped by the municipal tax authorities of both seller and buyer.',
        'Prior registration on the buyer\'s local municipal tax roll (DITL).',
        'Valid mandatory MTPL (RCA) motor insurance policy issued in the buyer\'s name.',
        'Valid periodic technical inspection (ITP) recorded in the vehicle registration certificate.'
      ]
    },
    institution: {
      name: 'Direcția Generală Permise de Conducere și Înmatriculări (DGPCIV) și Direcțiile de Impozite și Taxe Locale (DITL)',
      shortName: 'Înmatriculări Auto (DGPCIV)',
      officialUrl: 'https://dgpci.mai.gov.ro',
      bookingUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/'
    },
    legalBasis: {
      law: 'Ordinul MAI nr. 1501/2006 privind procedura înmatriculării, înregistrării, radierii și eliberării autorizației de circulație provizorie',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/77402'
    },
    processingTime: {
      standard: '2–3 zile lucrătoare',
      legalDeadline: 'Termen legal de declarare și transcriere: maximum 90 de zile de la data dobândirii'
    },
    fees: [
      {
        amount: 49,
        currency: 'RON',
        description: {
          ro: 'Contravaloare certificat de înmatriculare (talon auto)',
          en: 'Registration card (talon) statutory fee'
        },
        paymentMethods: ['Ghișeul.ro', 'dgpci.mai.gov.ro', 'SelfPay']
      },
      {
        amount: 40,
        currency: 'RON',
        description: {
          ro: 'Plăcuțe de înmatriculare la rând (sau 85 RON pentru număr preferențial)',
          en: 'Standard license plates (or 85 RON for custom personalized number)'
        },
        paymentMethods: ['Ghișeul.ro', 'La ghișeu DGPCIV']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cerere-inmatriculare',
        name: {
          ro: 'Cerere de înmatriculare auto',
          en: 'Vehicle registration application form'
        },
        description: {
          ro: 'Completată și semnată de noul proprietar.',
          en: 'Completed and signed by new registered owner.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-contract-vanzare',
        name: {
          ro: 'Contract de înstrăinare-dobândire (5 exemplare originale vizate DITL)',
          en: 'Vehicle bill of sale contract (stamped by tax authority)'
        },
        description: {
          ro: 'Trebuie să aibă aplicată ștampila "Scoatere din evidență" de la vânzător și "Luare în evidență" de la cumpărător.',
          en: 'Must carry official stamp indicating tax deregistration by seller and registration by buyer.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-civ',
        name: {
          ro: 'Cartea de Identitate a Vehiculului (CIV)',
          en: 'Vehicle Identity Card (CIV)'
        },
        description: {
          ro: 'Original și fotocopie.',
          en: 'Original and 1 photocopy.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-talon-vechi',
        name: {
          ro: 'Certificatul de înmatriculare anterior (talonul) cu mențiunea de înstrăinare',
          en: 'Previous vehicle registration document with transfer endorsement'
        },
        description: {
          ro: 'Pe verso vânzătorul trebuie să fi completat: "Înstrăinat către [Nume Cumpărător] la data de [Data]" și să fi semnat.',
          en: 'Back side must be endorsed: "Înstrăinat către..." with seller\'s signature and date.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-rca',
        name: {
          ro: 'Polița de asigurare RCA valabilă pe numele noului proprietar',
          en: 'Valid mandatory RCA insurance policy in buyer\'s name'
        },
        description: {
          ro: 'Original și copie. Valabilă cel puțin 1 lună de la data depunerii.',
          en: 'Original and copy, minimum 1 month validity.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-ci-cumparator',
        name: {
          ro: 'Actul de identitate al noului proprietar',
          en: 'Identity card of buyer'
        },
        description: {
          ro: 'Original și copie.',
          en: 'Original and copy.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-chitante-auto',
        name: {
          ro: 'Dovada plății taxei de certificat (49 RON) și plăcuțe',
          en: 'Proof of fee payments (49 RON certificate + plates fee)'
        },
        description: {
          ro: 'Chitanțe Ghișeul.ro sau eliberate la automate.',
          en: 'Receipts from Ghiseul.ro or kiosk.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Înregistrarea la Direcția de Impozite și Taxe Locale (DITL)',
          en: 'Register with local municipal tax office (DITL)'
        },
        description: {
          ro: 'Mergi la direcția de taxe a primăriei tale în maximum 30 de zile de la cumpărare pentru a lua vehiculul în evidență fiscală și a primi ștampila pe contract.',
          en: 'Visit your local municipal tax office within 30 days to enter vehicle on tax roll and get contract stamped.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Încheierea asigurării RCA pe numele noului proprietar',
          en: 'Purchase RCA insurance in buyer\'s name'
        },
        description: {
          ro: 'Asigurarea se încheie folosind seria de șasiu (VIN) a autoturismului.',
          en: 'Policy is issued referencing the Vehicle Identification Number (VIN).'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Programare online la DGPCIV județean',
          en: 'Schedule online appointment at DGPCIV'
        },
        description: {
          ro: 'Programează-te pe dgpci.mai.gov.ro la serviciul Înmatriculare / Transcriere.',
          en: 'Book time slot on dgpci.mai.gov.ro for vehicle registration / title transfer.'
        },
        locationOrUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/'
      },
      {
        stepNumber: 4,
        title: {
          ro: 'Depunerea dosarului și ridicarea noului talon și plăcuțelor',
          en: 'Submit file and collect new registration card and plates'
        },
        description: {
          ro: 'Primești pe loc o dovadă înlocuitoare a certificatului valabilă 15 zile. Talonul final și CIV-ul completat se ridică după 2-3 zile sau se livrează prin poștă.',
          en: 'You receive a 15-day temporary permit immediately. New official registration certificate is ready in 2–3 days.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Atenție: Legea prevede suspendarea automată a înmatriculării vehiculului dacă transcrierea nu a fost realizată în termen de 90 de zile de la data dobândirii menționată în contract!',
        en: 'Caution: Registration is automatically suspended by law if ownership title transfer is not finalized within 90 days from purchase date!'
      }
    ],
    lastVerifiedDate: '2026-03-12',
    verificationStatus: 'verified',
    officialServiceUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/formular/inmatriculari',
    isOnlineSubmissionPossible: false
  },
  {
    id: 'nif-nerezidenti',
    slug: 'obtinere-nif-persoane-fizice-straine',
    category: 'afaceri',
    audience: ['eu-citizen', 'non-eu', 'all'],
    title: {
      ro: 'Obținere NIF (Număr de Identificare Fiscală) pentru Nerezidenți la ANAF',
      en: 'Tax Identification Number (NIF) for Non-Residents at ANAF'
    },
    shortSummary: {
      ro: 'Ghid pentru cetățenii străini care nu dețin CNP românesc și au nevoie de NIF pentru cumpărarea unei proprietăți, deschiderea unui cont bancar, dividende sau înființarea unei companii.',
      en: 'Guide for foreign nationals without a Romanian CNP needing a Tax Identification Number (NIF) from ANAF to buy property, open bank accounts, or establish companies.'
    },
    targetWho: {
      ro: 'Cetățeni străini nerezidenți (UE sau Non-UE) care realizează venituri în România sau desfășoară operațiuni cu relevanță fiscală (achiziție imobile, asociat în SRL, moșteniri) și nu au domiciliul/rezidența în România.',
      en: 'Non-resident foreign nationals (EU or non-EU) deriving income, buying real estate, investing as shareholders in Romanian LLCs, or opening bank accounts.'
    },
    prerequisites: {
      ro: [
        'Pașaport național valabil (sau carte de identitate UE).',
        'Completarea formularului ANAF 030 (pentru persoane fizice fără CNP).',
        'Justificarea motivului solicitării (promisiune de vânzare-cumpărare, statut societate, adresă bancă etc.).',
        'Dacă se depune prin mandatar: procură notarială tradusă și legalizată/apostilată.'
      ],
      en: [
        'Valid national passport or EU ID card.',
        'Completed ANAF Form 030 (Declaration of tax registration for individuals without CNP).',
        'Justification of fiscal interest (real estate agreement, company formation deed, bank letter).',
        'If filed via representative: notarized power of attorney with certified Romanian translation.'
      ]
    },
    institution: {
      name: 'Agenția Națională de Administrare Fiscală (ANAF)',
      shortName: 'Fisc (ANAF)',
      officialUrl: 'https://www.anaf.ro',
      bookingUrl: 'https://www.anaf.ro/programari/'
    },
    legalBasis: {
      law: 'Legea nr. 207/2015 privind Codul de procedură fiscală, art. 82',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/170138'
    },
    processingTime: {
      standard: '10–30 de zile calendaristice',
      legalDeadline: 'Maximum 45 de zile'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Atribuirea NIF este un serviciu fiscal gratuit',
          en: 'Assignment of NIF is a free tax authority service'
        },
        paymentMethods: ['Gratuit']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-d030',
        name: {
          ro: 'Declarația 030 — Declarație de înregistrare fiscală pentru persoane fizice care nu dețin CNP',
          en: 'ANAF Form 030 — Tax registration declaration for individuals without CNP'
        },
        description: {
          ro: 'Completată în limba română în 2 exemplare originale.',
          en: 'Completed in Romanian in 2 original copies.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-pasaport-nif',
        name: {
          ro: 'Copia pașaportului sau a cărții de identitate naționale',
          en: 'Certified copy of national passport or EU identity card'
        },
        description: {
          ro: 'Cu traducere autorizată în limba română (solicitată frecvent de administrațiile fiscale județene).',
          en: 'Accompanied by certified Romanian translation.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-justificare-nif',
        name: {
          ro: 'Documente justificative privind necesitatea NIF',
          en: 'Supporting documents justifying fiscal need'
        },
        description: {
          ro: 'Exemplu: antecontract vânzare-cumpărare imobil, hotărâre AGA / act constitutiv pentru înființare firmă, adeverință de la bancă.',
          en: 'Preliminary real estate sales agreement, company articles of incorporation, or bank certificate.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Completarea Declarației 030 ANAF',
          en: 'Complete ANAF Form 030'
        },
        description: {
          ro: 'Descarcă formularul de pe site-ul anaf.ro și completează datele de identificare, domiciliul din străinătate și motivul înregistrării.',
          en: 'Download form from anaf.ro and fill identification details, foreign address, and justification.'
        },
        locationOrUrl: 'https://www.anaf.ro'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Depunerea la administrația fiscală competentă',
          en: 'Submit to competent territorial tax administration'
        },
        description: {
          ro: 'Dosarul se depune la registratura administrației fiscale pe a cărei rază se află imobilul sau sediul societății, personal, prin împuternicit sau prin Spațiul Privat Virtual (SPV) al reprezentantului fiscal.',
          en: 'Submit to the local ANAF office where property is situated or company registered, in person, by proxy, or via SPV.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Ridicarea Certificatului de Înregistrare Fiscală cu NIF',
          en: 'Collect Tax Registration Certificate'
        },
        description: {
          ro: 'ANAF emite Certificatul de Înregistrare Fiscală pe format A4 cartonat, care conține numărul din 13 cifre ce începe de regulă cu cifra 9.',
          en: 'ANAF issues the formal Tax Certificate carrying the unique 13-digit NIF starting typically with digit 9.'
        }
      }
    ],
    warnings: [
      {
        ro: 'NIF-ul nu conferă drept de muncă sau drept de ședere în România. Este un identificator exclusiv fiscal.',
        en: 'NIF confers no residency or work authorization in Romania; it serves exclusively as a tax identifier.'
      }
    ],
    lastVerifiedDate: '2026-03-05',
    verificationStatus: 'verified',
    officialServiceUrl: 'https://www.anaf.ro/anaf/internet/ANAF/asistenta_contribuabili/persoane_fizice/inregistrare_persoane_fizice/declaratii_inregistrare_modificare/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Depunerea online este posibilă prin intermediul unui împuternicit (avocat, notar sau contabil) care deține semnătură electronică calificată înrolată în SPV.',
      en: 'Online filing is accessible via an authorized proxy (attorney, notary, or chartered accountant) enrolled in ANAF SPV.'
    }
  },
  {
    id: 'card-sanatate-cnas',
    slug: 'duplicat-card-sanatate-adeverinta-cnas',
    category: 'sanatate',
    audience: ['ro-citizen', 'eu-citizen', 'non-eu', 'all'],
    title: {
      ro: 'Adeverință de Asigurat sau Duplicat Card Național de Sănătate (CNAS)',
      en: 'Health Insurance Certificate or Duplicate Health Card (CNAS)'
    },
    shortSummary: {
      ro: 'Cum soliciți eliberarea duplicatului cardului național de sănătate în caz de pierdere, furt sau defectare, și cum obții adeverința înlocuitoare pentru acces la servicii medicale.',
      en: 'How to request a duplicate national health insurance card in case of loss, theft, or damage, and receive an interim certificate for immediate healthcare access.'
    },
    targetWho: {
      ro: 'Persoane asigurate în sistemul public de asigurări sociale de sănătate din România (salariați, pensionari, studenți, coasigurați) al căror card s-a pierdut, a fost furat sau s-a defectat.',
      en: 'Individuals insured in Romanian public health system (employees, pensioners, students) whose card is lost, stolen, or malfunctioning.'
    },
    prerequisites: {
      ro: [
        'Calitatea de asigurat activ în sistemul CNAS (verificabilă online pe cnas.ro/verificare-asigurati).',
        'Achitarea taxei de duplicat card (15,41 RON).',
        'Cerere tip depusă la Casa de Asigurări de Sănătate județeană (CASMB în București).'
      ],
      en: [
        'Active insured status in CNAS registry (checkable at cnas.ro/verificare-asigurati).',
        'Payment of duplicate card statutory fee (15.41 RON).',
        'Application submitted to the competent county health insurance house.'
      ]
    },
    institution: {
      name: 'Casa Națională de Asigurări de Sănătate (CNAS) / Casele Județene de Asigurări de Sănătate',
      shortName: 'Sănătate (CNAS)',
      officialUrl: 'https://cnas.ro',
      bookingUrl: 'https://www.casmb.ro'
    },
    legalBasis: {
      law: 'Legea nr. 95/2006 privind reforma în domeniul sănătății (Titlul VIII) și Ordinul președintelui CNAS nr. 502/2015',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/71120'
    },
    processingTime: {
      standard: 'Adeverința înlocuitoare: Eliberare pe loc sau în 24-48 ore prin email. Cardul duplicat: 30–60 de zile.',
      legalDeadline: 'Adeverința este valabilă 90 de zile până la tipărirea noului card'
    },
    fees: [
      {
        amount: 15.41,
        currency: 'RON',
        description: {
          ro: 'Contravaloare card duplicat și cheltuieli de distribuire',
          en: 'Cost of duplicate card and delivery'
        },
        paymentMethods: ['Ghișeul.ro', 'Trezorerie', 'Casieria CAS Județeană']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cerere-cnas',
        name: {
          ro: 'Cerere pentru eliberarea cardului duplicat',
          en: 'Application for duplicate health card'
        },
        description: {
          ro: 'Formular tip în care se bifează motivul (pierdere, furt, defectare, schimbare date).',
          en: 'Standard form indicating reason (loss, theft, malfunction).'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-ci-cnas',
        name: {
          ro: 'Actul de identitate al asiguratului',
          en: 'Identity document of insured'
        },
        description: {
          ro: 'Copie simplă a cărții de identitate sau a permisului de ședere.',
          en: 'Photocopy of national ID or residence permit.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      },
      {
        id: 'doc-taxa-cnas',
        name: {
          ro: 'Dovada achitării taxei de 15,41 RON',
          en: 'Receipt for 15.41 RON fee payment'
        },
        description: {
          ro: 'Chitanță bancară sau extras cont beneficiar CAS Județeană.',
          en: 'Bank transfer receipt or treasury slip.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Verifică dacă ești asigurat activ',
          en: 'Verify your active insurance status'
        },
        description: {
          ro: 'Accesează instrumentul oficial de verificare de pe site-ul cnas.ro introducând CNP-ul tău.',
          en: 'Visit cnas.ro and enter your CNP to confirm active insurance coverage.'
        },
        locationOrUrl: 'https://cnas.ro'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Plătește taxa de 15,41 RON',
          en: 'Pay 15.41 RON fee'
        },
        description: {
          ro: 'Plata se face în contul CAS județene deschis la Trezorerie sau direct la casierie.',
          en: 'Pay to the designated county health insurance treasury account.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Transmite cererea online pe email sau depune la ghișeu',
          en: 'Submit application via email or at counter'
        },
        description: {
          ro: 'Cele mai multe case județene (inclusiv CASMB) primesc cererea scanată prin email dedicat (ex: cardnational@casmb.ro) și emit adeverința înlocuitoare semnată electronic în format PDF.',
          en: 'Most county branches accept scanned docs via email and return digitally signed interim certificates in PDF format.'
        }
      },
      {
        stepNumber: 4,
        title: {
          ro: 'Folosirea adeverinței înlocuitoare',
          en: 'Using the replacement certificate'
        },
        description: {
          ro: 'Adeverința are putere juridică egală cu a cardului pentru medici de familie, spitale și farmacii timp de 90 de zile.',
          en: 'The certificate guarantees full medical and pharmaceutical access for 90 days while card is manufactured.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Medicii de familie și spitalele nu pot refuza acordarea asistenței medicale de urgență chiar și în lipsa cardului sau adeverinței conform legii!',
        en: 'Emergency medical care cannot be refused by hospitals or family doctors under Romanian law, regardless of card possession!'
      }
    ],
    lastVerifiedDate: '2026-03-16',
    verificationStatus: 'verified',
    officialServiceUrl: 'https://cnas.ro/cardul-national-de-asigurari-de-sanatate/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Poate fi solicitat prin email cu transmiterea documentelor scanate către CAS județeană de apartenență.',
      en: 'Can be requested via official county CAS email addresses with scanned documents.'
    }
  }
];

export const PROCEDURES: Procedure[] = [
  ...BASE_PROCEDURES.map((p) => {
    let domain = p.administrativeDomain;
    let channel = p.submissionChannel;
    let events = p.lifeEvents;
    if (p.id.includes('buletin')) {
      domain = 'civil_status';
      channel = 'in_person';
      events = ['moving_relocating'];
    } else if (p.id.includes('pasaport')) {
      domain = 'citizenship_travel';
      channel = 'in_person';
      events = ['moving_abroad'];
    } else if (p.id.includes('cazier')) {
      domain = 'justice_petitions';
      channel = 'online';
      events = ['starting_a_job', 'starting_a_business'];
    } else if (p.id.includes('permis') || p.id.includes('inmatriculare')) {
      // Vehicle services must not inherit the property/cadastre domain;
      // otherwise they appear when users choose “Cumpăr o locuință”.
      domain = 'civil_status';
      channel = 'hybrid';
      events = ['moving_relocating'];
    } else if (p.id.includes('rezidenta') || p.id.includes('sedere')) {
      domain = 'citizenship_travel';
      channel = 'hybrid';
      events = ['acquiring_citizenship', 'moving_relocating'];
    } else if (p.id.includes('nif')) {
      domain = 'business_registry';
      channel = 'hybrid';
      events = ['starting_a_business'];
    } else if (p.id.includes('sanatate')) {
      domain = 'social_benefits';
      channel = 'online';
      events = ['managing_health'];
    }

    return {
      ...p,
      administrativeDomain: domain || 'civil_status',
      lifeEvents: events || ['moving_relocating'],
      submissionChannel: channel || (p.isOnlineSubmissionPossible ? 'online' : 'in_person'),
      editorialStatus: p.editorialStatus || 'verified',
      editorialReviewDate: p.editorialReviewDate || p.lastVerifiedDate,
      reviewedBy: p.reviewedBy || 'Comisia Editorială ActeSimple'
    };
  }),
  ...EXTENDED_PROCEDURES
];
