import { Procedure } from '../types';

export const EXTENDED_PROCEDURES: Procedure[] = [
  // =========================================================================
  // 1. DOMENIUL: STARE CIVILĂ & CETĂȚENI (Civil Status)
  // =========================================================================
  {
    id: 'certificat-nastere-copil',
    slug: 'inregistrare-nastere-certificat-copil',
    category: 'stare-civila',
    administrativeDomain: 'civil_status',
    lifeEvents: ['having_a_child'],
    submissionChannel: 'in_person',
    audience: ['all', 'ro-citizen', 'family-member', 'eu-citizen', 'non-eu'],
    title: {
      ro: 'Înregistrarea nașterii și eliberarea certificatului de naștere',
      en: 'Birth Registration & Issuance of Child Birth Certificate'
    },
    shortSummary: {
      ro: 'Procedura oficială de declarare a nașterii copilului la serviciul de stare civilă al primăriei în raza căreia a avut loc nașterea și atribuirea CNP-ului.',
      en: 'Official birth declaration procedure at the municipal civil registry office where birth occurred, including Romanian CNP assignment.'
    },
    targetWho: {
      ro: 'Părinții nou-născutului (sau unul dintre aceștia), în termen de maximum 30 de zile de la data nașterii conform legislației.',
      en: 'Parents of the newborn (or one parent), legally required within 30 calendar days from the date of birth.'
    },
    prerequisites: {
      ro: [
        'Copilul a fost născut pe teritoriul României.',
        'Deținerea certificatului medical constatator al nașterii eliberat de maternitate.',
        'Actele de identitate valabile ale ambilor părinți.',
        'Certificatul de căsătorie al părinților (sau declarație comună de recunoaștere dacă părinții nu sunt căsătoriți).'
      ],
      en: [
        'The child was born within Romanian territory.',
        'Medical birth notification certificate issued and stamped by the maternity hospital.',
        'Valid identity documents of both parents.',
        'Parents’ marriage certificate (or joint declaration of paternity if unmarried).'
      ]
    },
    institution: {
      name: 'Serviciul Public Comunitar Local de Evidență a Persoanelor — Serviciul de Stare Civilă al Primăriei',
      shortName: 'Starea Civilă (Primărie)',
      officialUrl: 'https://dgep.mai.gov.ro/',
      bookingUrl: 'https://starecivila.primarias1.ro/'
    },
    legalBasis: {
      law: 'Legea nr. 119/1996 cu privire la actele de stare civilă (republicată cu modificările ulterioare)',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/8140'
    },
    processingTime: {
      standard: 'Eliberat pe loc la ghișeu în ziua depunerii declarației',
      legalDeadline: '30 de zile calendaristice de la data nașterii pentru declarare'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Înregistrarea nașterii și primul exemplar al certificatului de naștere sunt complet gratuite conform legii.',
          en: 'Birth registration and the first original certificate are legally free of administrative charge.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-constatator-nastere',
        name: {
          ro: 'Certificatul medical constatator al nașterii',
          en: 'Medical birth notification certificate'
        },
        description: {
          ro: 'Eliberat și parafat de unitatea sanitară / maternitatea unde a avut loc nașterea (formular tipizat original).',
          en: 'Issued and sealed by the hospital/maternity unit where birth occurred (original).'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-ci-parinti-nastere',
        name: {
          ro: 'Actele de identitate ale părinților',
          en: 'Identity documents of both parents'
        },
        description: {
          ro: 'Cărțile de identitate valabile ale părinților (original și fotocopie). Pentru cetățenii străini, pașaportul și permisul de ședere IGI.',
          en: 'Valid national ID cards (original and copies). For foreign nationals, passport and IGI residence permit.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-cert-casatorie-nastere',
        name: {
          ro: 'Certificatul de căsătorie al părinților (dacă este cazul)',
          en: 'Parents’ marriage certificate (if applicable)'
        },
        description: {
          ro: 'Certificatul de căsătorie emis de autoritățile române (original și fotocopie).',
          en: 'Original Romanian marriage certificate and 1 copy.'
        },
        isMandatory: false,
        isOriginalRequired: true,
        copyCount: 1
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Ridică certificatul medical constatator de la maternitate',
          en: 'Collect medical birth certificate from hospital'
        },
        description: {
          ro: 'La externare, solicită biroului de internări/statistică al spitalului certificatul constatator semnat și parafat de medicul neonatolog.',
          en: 'Upon discharge, request the signed medical birth certificate from the hospital administration.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Prezintă-te la Starea Civilă din sectorul/localitatea maternității',
          en: 'Visit the Civil Registry Office where the hospital is located'
        },
        description: {
          ro: 'Nașterea se declară obligatoriu la serviciul de stare civilă al primăriei pe raza căreia s-a produs nașterea (nu neapărat cea de domiciliu).',
          en: 'Birth must be registered at the civil registry corresponding to the hospital’s territorial jurisdiction.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Semnează declarația de naștere și ridică certificatul pe loc',
          en: 'Sign birth declaration and receive the birth certificate immediately'
        },
        description: {
          ro: 'Ofițerul de stare civilă înregistrează actul în registrul național, atribuie CNP-ul copilului și emite certificatul tipizat cu timbru sec.',
          en: 'The civil registrar records the act, assigns the Romanian CNP, and issues the official birth certificate.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Depășirea termenului legal de 30 de zile atrage necesitatea obținerii unei aprobări a primarului și avizul DGEP, putând întârzia eliberarea!',
        en: 'Exceeding the 30-day deadline requires mayoral administrative approval and DGEP clearance, resulting in processing delays!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-stare-civila',
    officialServiceUrl: 'https://dgep.mai.gov.ro/',
    isOnlineSubmissionPossible: false,
    onlineServiceNotes: {
      ro: 'Prezența fizică a cel puțin unuia dintre părinți este obligatorie pentru semnarea registrului de stare civilă cu cerneală specială.',
      en: 'Physical presence of at least one parent is mandatory to countersign the state civil register.'
    }
  },
  {
    id: 'casatorie-civila',
    slug: 'oficiere-casatorie-civila-primarie',
    category: 'stare-civila',
    administrativeDomain: 'civil_status',
    lifeEvents: ['getting_married'],
    submissionChannel: 'hybrid',
    audience: ['all', 'ro-citizen', 'eu-citizen', 'non-eu', 'family-member'],
    title: {
      ro: 'Căsătoria civilă — Depunerea dosarului și oficierea la primărie',
      en: 'Civil Marriage — Dossier Submission and Ceremony at City Hall'
    },
    shortSummary: {
      ro: 'Ghid pas cu pas pentru depunerea declarației de căsătorie, analizele medicale prenupțiale obligatorii și oficierea căsătoriei civile.',
      en: 'Step-by-step guide for filing the marriage declaration, mandatory prenuptial medical clearance, and civil ceremony.'
    },
    targetWho: {
      ro: 'Viitorii soți (cetățeni români sau cel puțin un soț cu domiciliul/reședința în localitatea primăriei alese).',
      en: 'Intending spouses (Romanian citizens or at least one spouse residing in the chosen municipality).'
    },
    prerequisites: {
      ro: [
        'Vârsta minimă legală de 18 ani (sau 16 ani cu încuviințarea părinților și aviz medical).',
        'Cel puțin unul dintre soți trebuie să aibă domiciliul sau reședința în municipiul/sectorul unde se depune dosarul.',
        'Certificatul medical prenupțial este valabil strict 14 zile calendaristice de la data emiterii până la oficiere.',
        'Declarația de căsătorie se depune obligatoriu cu 11 până la 14 zile calendaristice înainte de data oficierii.'
      ],
      en: [
        'Minimum legal age of 18 years.',
        'At least one spouse must hold registered residency or domicile in the chosen municipality.',
        'Prenuptial medical certificates are strictly valid for 14 calendar days up to ceremony date.',
        'Marriage declaration must be submitted between 11 and 14 days prior to wedding date.'
      ]
    },
    institution: {
      name: 'Serviciul de Stare Civilă al Primăriei de Domiciliu / Reședință',
      shortName: 'Starea Civilă',
      officialUrl: 'https://dgep.mai.gov.ro/',
      bookingUrl: 'https://starecivila.primarias1.ro/programari'
    },
    legalBasis: {
      law: 'Codul Civil al României (Legea 287/2009, art. 278-288) & Legea nr. 119/1996',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/109884'
    },
    processingTime: {
      standard: 'Oficierea are loc la termenul fixat (între a 11-a și a 14-a zi de la depunere)',
      legalDeadline: 'Obligatoriu minimum 10 zile de la afișarea publicației de căsătorie'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Oficierea căsătoriei în timpul săptămânii (luni-vineri) în sediul primăriei este complet gratuită conform legii.',
          en: 'Weekday ceremonies at city hall headquarters are legally free of charge.'
        },
        paymentMethods: ['Fără taxă']
      },
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Taxele pentru oficierea în weekend sau în locații speciale din afara sediului depind exclusiv de hotărârea consiliului local al fiecărei primării.',
          en: 'Weekend ceremony or off-site venue fees depend strictly on local municipal council regulations.'
        },
        paymentMethods: ['Casierie Primărie', 'Ghișeul.ro']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-ci-soti',
        name: {
          ro: 'Actele de identitate ale viitorilor soți',
          en: 'Identity documents of both spouses'
        },
        description: {
          ro: 'Original și fotocopie a cărților de identitate valabile.',
          en: 'Original and photocopies of valid national ID cards or passports.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-cert-nastere-soti',
        name: {
          ro: 'Certificatele de naștere ale viitorilor soți',
          en: 'Birth certificates of both spouses'
        },
        description: {
          ro: 'Original și fotocopie.',
          en: 'Original and photocopies.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-medical-prenuptial',
        name: {
          ro: 'Certificatele medicale prenupțiale',
          en: 'Prenuptial medical certificates'
        },
        description: {
          ro: 'Emise de medicul de familie cu mențiunea expresă „Se poate căsători”. Valabile strict 14 zile calendaristice.',
          en: 'Issued by family physician with the express stamp "Fit for marriage". Strictly valid for 14 calendar days.'
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
          ro: 'Efectuarea analizelor medicale prenupțiale',
          en: 'Prenuptial medical testing and certificate'
        },
        description: {
          ro: 'Programează vizita la medicul de familie cu maxim 14 zile înainte de data dorită a oficierii pentru analizele obligatorii (VDRL, radiografie pulmonară unde se solicită).',
          en: 'Visit your GP within 14 calendar days before wedding date for mandatory prenuptial testing.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Depunerea dosarului de căsătorie la primărie',
          en: 'Submit marriage file together at Civil Registry'
        },
        description: {
          ro: 'Ambii soți se prezintă personal cu exact 11–14 zile calendaristice înainte de data nunții pentru semnarea declarației și alegerea regimului matrimonial.',
          en: 'Both partners must appear together between 11 and 14 days prior to wedding date to declare marriage and chosen matrimonial property regime.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Oficierea căsătoriei și eliberarea certificatului',
          en: 'Civil marriage ceremony and certificate issuance'
        },
        description: {
          ro: 'Oficierea are loc în fața ofițerului de stare civilă și a doi martori majori cu acte de identitate valabile. Se înmânează certificatul de căsătorie.',
          en: 'Ceremony takes place before registrar and 2 adult witnesses with valid IDs. The marriage certificate is handed over.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Atenție la calculul termenului de 14 zile! Dacă certificatul medical expiră înainte de data oficierii, căsătoria nu poate avea loc legal!',
        en: 'Strict calendar timing: If prenuptial medical certificate expires even by one day before the ceremony, wedding cannot proceed!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-stare-civila',
    officialServiceUrl: 'https://dgep.mai.gov.ro/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Multe primării (ex: București S1-S6, Cluj, Timișoara, Iași) permit rezervarea datei și încărcarea documentelor online, însă prezența fizică este obligatorie la depunere și oficiere.',
      en: 'Most city halls allow online date reservation, but personal attendance is statutory for filing and ceremony.'
    }
  },
  {
    id: 'transcriere-acte-stare-civila-diaspora',
    slug: 'transcriere-certificate-nastere-casatorie-strainatate',
    category: 'stare-civila',
    administrativeDomain: 'civil_status',
    lifeEvents: ['returning_to_romania', 'having_a_child', 'getting_married'],
    submissionChannel: 'hybrid',
    audience: ['ro-citizen', 'family-member'],
    title: {
      ro: 'Transcrierea certificatelor de stare civilă obținute în străinătate (Naștere / Căsătorie)',
      en: 'Transcription of Foreign Civil Status Certificates (Birth / Marriage in Diaspora)'
    },
    shortSummary: {
      ro: 'Procedura obligatorie prin care actele de stare civilă eliberate de autorități străine cetățenilor români sunt transcrise în registrele românești pentru obținerea certificatului românesc și CNP.',
      en: 'Mandatory procedure for transcribing foreign birth or marriage certificates into Romanian civil registers to receive Romanian certificates and CNP.'
    },
    targetWho: {
      ro: 'Cetățeni români care s-au căsătorit sau ai căror copii s-au născut în străinătate, în termen de maximum 6 luni de la întoarcerea în țară sau primirea actului.',
      en: 'Romanian citizens who married abroad or whose children were born abroad, legally obliged to transcribe within 6 months.'
    },
    prerequisites: {
      ro: [
        'Cel puțin unul dintre titulari este cetățean român.',
        'Certificatul străin trebuie să fie legalizat cu Apostila de la Haga sau supralegalizat (cu excepția statelor scutite prin acorduri bilaterale sau Regulamentul UE 2016/1191).',
        'Traducere autorizată și legalizată notarial în limba română.'
      ],
      en: [
        'At least one parent / spouse is a Romanian citizen.',
        'Foreign certificate must bear Hague Apostille or consular legalization unless exempt under EU Regulation 2016/1191.',
        'Certified Romanian translation legalized by a notary public.'
      ]
    },
    institution: {
      name: 'Direcția Generală de Evidență a Persoanelor (SPCLEP de domiciliu) / Misiunile Diplomatice MAE',
      shortName: 'Evidența Persoanelor / Consulat',
      officialUrl: 'https://dgep.mai.gov.ro/',
      bookingUrl: 'https://econsulat.ro'
    },
    legalBasis: {
      law: 'Legea nr. 119/1996, art. 41 & Regulamentul UE 2016/1191',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/8140'
    },
    processingTime: {
      standard: '30–60 de zile lucrătoare la primăria de domiciliu (până la 90 de zile prin consulat)',
      legalDeadline: 'Maximum 60 de zile de la înregistrarea cererii conform legii'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Transcrierea propriu-zisă la primăria din România este scutită de taxe administrative de stat.',
          en: 'Transcription at Romanian local civil registry is free of state administrative fees.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cert-strain',
        name: {
          ro: 'Certificatul de naștere / căsătorie străin în original',
          en: 'Original foreign birth or marriage certificate'
        },
        description: {
          ro: 'Extras multilingv (extras conform Convenției de la Viena) sau certificat apostilat / supralegalizat.',
          en: 'Multilingual extract (Vienna Convention) or document bearing Hague Apostille / legalization.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-traducere-legalizata',
        name: {
          ro: 'Traducerea autorizată și legalizată notarial în limba română',
          en: 'Certified and notarized Romanian translation'
        },
        description: {
          ro: 'Efectuată de un traducător autorizat de Ministerul Justiției din România și legalizată notarial (nu este necesară pentru extrasele multilingve standard UE).',
          en: 'Done by a sworn translator and legalized by notary (exempt for multilingual standard EU forms).'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-ci-pasaport-parinti',
        name: {
          ro: 'Actele de identitate ale părinților / soților',
          en: 'Parents’ / spouses’ identity cards and passports'
        },
        description: {
          ro: 'Cărți de identitate sau pașapoarte CRDS (original și copie).',
          en: 'Romanian ID card or CRDS passport showing Romanian residency/domicile.'
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
          ro: 'Verifică dacă actul străin necesită Apostilă sau este extras multilingv',
          en: 'Check if document needs Hague Apostille or multilingual form'
        },
        description: {
          ro: 'Extrasele multilingve emise conform Convenției de la Viena (Formula A pentru naștere, Formula B pentru căsătorie) sunt recunoscute fără apostilă și fără traducere!',
          en: 'Multilingual civil status extracts (Vienna Convention Formula A/B) do NOT require apostille or translation in Romania!'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Depune cererea la primăria de domiciliu sau la consulatul român',
          en: 'Submit application at local city hall or Romanian consulate'
        },
        description: {
          ro: 'Depunerea se face personal sau prin împuternicit cu procură specială notarială la Serviciul de Stare Civilă.',
          en: 'Submit in person or via legal power of attorney at the municipal civil registry of your Romanian address.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Ridicarea certificatului românesc cu CNP atribuit',
          en: 'Collect Romanian certificate with assigned CNP'
        },
        description: {
          ro: 'După obținerea avizului DGEP județean, se eliberează certificatul românesc de naștere/căsătorie cu timbru sec.',
          en: 'Following county DGEP clearance, the official Romanian certificate is issued with a permanent CNP.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Copiii născuți în străinătate din cel puțin un părinte român sunt de drept cetățeni români, însă nu pot obține pașaport românesc până la transcrierea nașterii!',
        en: 'Children born abroad to Romanian parents are Romanian citizens by birth, but cannot obtain a Romanian passport until birth is transcribed!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-stare-civila',
    officialServiceUrl: 'https://dgep.mai.gov.ro/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Pentru românii aflați în străinătate, programarea se face online pe econsulat.ro, iar în țară prin portalul primăriei.',
      en: 'Consular bookings abroad must be registered online on econsulat.ro.'
    }
  },

  // =========================================================================
  // 2. DOMENIUL: BENEFICII FAMILIALE & ASISTENȚĂ SOCIALĂ (Social Benefits)
  // =========================================================================
  {
    id: 'alocatie-stat-copii',
    slug: 'alocatia-de-stat-pentru-copii-anpis',
    category: 'social',
    administrativeDomain: 'social_benefits',
    lifeEvents: ['having_a_child'],
    submissionChannel: 'online',
    audience: ['all', 'ro-citizen', 'family-member', 'eu-citizen', 'non-eu'],
    title: {
      ro: 'Alocația de stat pentru copii (Legea 61/1993)',
      en: 'Universal State Child Allowance (Law 61/1993)'
    },
    shortSummary: {
      ro: 'Beneficiul universal acordat lunar de statul român pentru toți copiii până la împlinirea vârstei de 18 ani (sau până la terminarea liceului).',
      en: 'Universal monthly financial benefit granted by the Romanian state to all resident children under 18 years of age.'
    },
    targetWho: {
      ro: 'Toți copiii cu domiciliul sau reședința legală în România, plătită unuia dintre părinți în cont bancar sau prin mandat poștal.',
      en: 'All children residing legally in Romania, paid to one parent via bank account or postal money order.'
    },
    prerequisites: {
      ro: [
        'Copilul deține certificat de naștere românesc cu CNP atribuit.',
        'Părintele solicitant locuiește legal în România cu copilul.',
        'Se depune în termen de 30 de zile de la naștere (plata se acordă retroactiv începând cu luna următoare nașterii).'
      ],
      en: [
        'The child holds a Romanian birth certificate with valid CNP.',
        'The applicant parent legally cohabits with the child in Romania.',
        'Application submitted within 30 days of birth (payment begins the month following birth).'
      ]
    },
    institution: {
      name: 'Agenția Națională pentru Plăți și Inspecție Socială (AJPIS) prin Direcțiile de Asistență Socială din Primării',
      shortName: 'AJPIS / Asistență Socială',
      officialUrl: 'https://www.mmanpis.ro/',
      bookingUrl: 'https://bucuresti.mmanpis.ro/'
    },
    legalBasis: {
      law: 'Legea nr. 61/1993 privind alocația de stat pentru copii, republicată cu indexările anuale',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/2428'
    },
    processingTime: {
      standard: '15–30 de zile de la transmiterea dosarului complet către AJPIS',
      legalDeadline: 'Plata se efectuează lunar între data de 8 și 10 a lunii'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Cererea și procesarea dosarului de alocație sunt complet gratuite.',
          en: 'Filing and processing child allowance is strictly free of charge.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-cerere-alocatie',
        name: {
          ro: 'Cerere tip pentru acordarea alocației de stat',
          en: 'Official state child allowance application form'
        },
        description: {
          ro: 'Formular tipizat completat și semnat de către părintele reprezentant legal.',
          en: 'Standard form filled and signed by the applying parent.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-cert-nastere-copil-alocatie',
        name: {
          ro: 'Certificatul de naștere al copilului',
          en: 'Child\'s birth certificate'
        },
        description: {
          ro: 'Fotocopie simplă a certificatului românesc de naștere cu CNP.',
          en: 'Simple photocopy of Romanian birth certificate showing CNP.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      },
      {
        id: 'doc-ci-parinti-alocatie',
        name: {
          ro: 'Cărțile de identitate ale ambilor părinți',
          en: 'Identity documents of both parents'
        },
        description: {
          ro: 'Fotocopii ale actelor de identitate valabile ale părinților.',
          en: 'Photocopies of parents\' valid national ID cards.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      },
      {
        id: 'doc-extras-cont-iban',
        name: {
          ro: 'Extras de cont bancar cu cod IBAN (pe numele solicitantului)',
          en: 'Bank account statement with IBAN (in applicant\'s name)'
        },
        description: {
          ro: 'Pentru virarea directă a alocației pe card bancar la orice bancă din România.',
          en: 'For direct electronic bank transfer to any licensed Romanian bank.'
        },
        isMandatory: false,
        isOriginalRequired: false,
        copyCount: 1,
        remarks: {
          ro: 'Dacă nu se anexează extras IBAN, alocația se achită prin mandat poștal la domiciliu.',
          en: 'If no IBAN is provided, allowance is delivered via home postal mail order.'
        }
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Completează cererea și anexează actele copilului și extrasul IBAN',
          en: 'Complete application and attach child certificate and bank IBAN'
        },
        description: {
          ro: 'Descarcă formularul tip de pe site-ul direcției de asistență socială a primăriei locale sau completează pe platforma digitală.',
          en: 'Download form from the local municipality social services portal or fill digital form.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Transmite dosarul online prin email sau platforma primăriei',
          en: 'Submit file online via email or municipal social portal'
        },
        description: {
          ro: 'Aproape toate primăriile și DGASPC-urile din România primesc dosarul scanat în format PDF pe email dedicat alocațiilor.',
          en: 'Almost all Romanian municipalities accept scanned PDF dossiers via dedicated public email.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Primirea deciziei AJPIS și virarea lunară',
          en: 'Receive AJPIS entitlement decision and monthly bank transfer'
        },
        description: {
          ro: 'AJPIS emite decizia administrativă, iar prima plată se virează automat pe card în luna următoare aprobării.',
          en: 'AJPIS issues the decision notice and automatic monthly disbursements occur on the 8th–10th of each month.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Valoarea alocației este indexată anual cu rata inflației în ianuarie: 719 lei/lună pentru copii 0–2 ani și 292 lei/lună pentru copii 2–18 ani.',
        en: 'Statutory indexing: 719 RON/month for ages 0–2 (and disabled), and 292 RON/month for children aged 2–18.'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-social-anpis',
    officialServiceUrl: 'https://www.mmanpis.ro/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Procedura poate fi derulată 100% online prin transmiterea documentelor scanate către Direcția de Asistență Socială (DGASPC) a localității de domiciliu.',
      en: 'Can be completed 100% online by emailing scanned documents to the local municipal social assistance department.'
    }
  },
  {
    id: 'indemnizatie-crestere-copil',
    slug: 'concediu-si-indemnizatie-crestere-copil-icc',
    category: 'social',
    administrativeDomain: 'social_benefits',
    lifeEvents: ['having_a_child'],
    submissionChannel: 'hybrid',
    audience: ['ro-citizen', 'eu-citizen', 'family-member', 'non-eu'],
    title: {
      ro: 'Concediul și indemnizația pentru creșterea copilului (ICC)',
      en: 'Parental Leave & Child-Raising Indemnity (ICC)'
    },
    shortSummary: {
      ro: 'Indemnizația lunară de 85% din media veniturilor nete realizate în ultimele 12 luni, acordată părintelui aflat în concediu de creștere a copilului până la vârsta de 2 ani.',
      en: 'Monthly financial allowance representing 85% of average net income over preceding 12 months, granted up to child\'s 2nd birthday.'
    },
    targetWho: {
      ro: 'Părintele care a realizat venituri impozabile (salarii, activități independente, PFA etc.) timp de minimum 12 luni în ultimii 2 ani anteriori nașterii copilului.',
      en: 'The parent who earned taxable income for at least 12 months during the 24 months preceding the child’s birth.'
    },
    prerequisites: {
      ro: [
        'Stagiu minim de cotizare: 12 luni de venituri profesionale în cele 24 de luni dinaintea nașterii copilului.',
        'Suspendarea contractului individual de muncă sau a activității profesionale pe perioada concediului.',
        'Depunerea cererii în termen de 60 de zile lucrătoare de la încheierea concediului de maternitate (post-natal de lăuzie).'
      ],
      en: [
        'Contribution requirement: at least 12 months of taxable professional income in the 24 months prior to childbirth.',
        'Formal employer suspension of employment contract for parental leave.',
        'File submission within 60 working days following post-maternity leave completion.'
      ]
    },
    institution: {
      name: 'Agenția Județeană pentru Plăți și Inspecție Socială (AJPIS) prin Direcțiile de Asistență Socială',
      shortName: 'AJPIS',
      officialUrl: 'https://www.mmanpis.ro/',
      bookingUrl: 'https://bucuresti.mmanpis.ro/'
    },
    legalBasis: {
      law: 'Ordonanța de Urgență a Guvernului nr. 111/2010 privind concediul și indemnizația lunară pentru creșterea copiilor',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/124239'
    },
    processingTime: {
      standard: '30–45 de zile lucrătoare pentru emiterea deciziei AJPIS',
      legalDeadline: 'Plata începe în luna următoare aprobării dosarului'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Procedura este gratuită.',
          en: 'Free of charge.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-adeverinta-venit-icc',
        name: {
          ro: 'Adeverință de venituri completată de angajator (Anexa 2 OUG 111/2010)',
          en: 'Employer salary contribution certificate (Annex 2)'
        },
        description: {
          ro: 'Documentul oficial completat și parafat de angajator cu defalcarea veniturilor nete pe ultimele 12 luni și decizia de suspendare a contractului de muncă.',
          en: 'Official certificate detailing monthly net income for the 12 months and contract suspension decision.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-cert-nastere-icc',
        name: {
          ro: 'Certificatul de naștere al copilului',
          en: 'Child\'s birth certificate'
        },
        description: {
          ro: 'Copie și original pentru verificare.',
          en: 'Photocopy with original for verification.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-extras-iban-icc',
        name: {
          ro: 'Extras de cont IBAN pe numele titularului cererii',
          en: 'Bank statement with IBAN in applicant\'s name'
        },
        description: {
          ro: 'Pentru virarea directă a indemnizației lunare pe contul bancar.',
          en: 'For direct monthly bank transfer.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Obține adeverința de venit și decizia de suspendare de la angajator',
          en: 'Obtain employer income certificate and leave decision'
        },
        description: {
          ro: 'Solicită departamentului HR/financiar completarea anexei tipizate OUG 111/2010 și decizia de suspendare a contractului conform art. 51 lit. a) din Codul Muncii.',
          en: 'Request HR department to issue statutory income certificate and employment suspension decree.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Depune dosarul la primăria de domiciliu (online sau la ghișeu)',
          en: 'Submit dossier to local municipal welfare desk'
        },
        description: {
          ro: 'Dosarul se depune la Direcția de Asistență Socială a localității de domiciliu, care îl transmite către AJPIS județeană.',
          en: 'File dossier with the municipal social service, which forwards it to the County AJPIS agency.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Calculul cuantumului și virarea lunară',
          en: 'Calculation of monthly benefit and disbursements'
        },
        description: {
          ro: 'Indemnizația reprezintă 85% din media netă (cu limită minimă legală de 1.651 lei și maximă de 8.500 lei/lună).',
          en: 'Benefit equals 85% of average net income (statutory minimum 1,651 RON, capped at 8,500 RON/month).'
        }
      }
    ],
    warnings: [
      {
        ro: 'Celălalt părinte are dreptul la cel puțin 2 luni de concediu netransferabil („luna tatălui”). Dacă nu este solicitat, indemnizația pentru acele 2 luni se pierde!',
        en: 'The non-primary parent has an entitlement of at least 2 non-transferable months. If not taken, indemnity for those 2 months lapses!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-social-anpis',
    officialServiceUrl: 'https://www.mmanpis.ro/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Se poate depune online prin portalurile direcțiilor de asistență socială municipale.',
      en: 'Can be submitted online through municipal social service portals.'
    }
  },

  // =========================================================================
  // 3. DOMENIUL: MUNCĂ & ȘOMAJ (Employment & Unemployment)
  // =========================================================================
  {
    id: 'indemnizatie-somaj',
    slug: 'inregistrare-somaj-indemnizatie-ajofm',
    category: 'munca',
    administrativeDomain: 'employment',
    lifeEvents: ['facing_unemployment'],
    submissionChannel: 'hybrid',
    audience: ['ro-citizen', 'eu-citizen', 'non-eu'],
    title: {
      ro: 'Înregistrarea ca șomer și obținerea indemnizației de șomaj',
      en: 'Unemployment Registration & Benefit Application (AJOFM)'
    },
    shortSummary: {
      ro: 'Procedura legală pentru înregistrarea ca persoană în căutare de muncă la Agenția Județeană pentru Ocuparea Forței de Muncă (AJOFM) și stabilirea indemnizației lunare de șomaj.',
      en: 'Statutory registration as a jobseeker at the County Employment Agency (AJOFM) and monthly unemployment insurance claims.'
    },
    targetWho: {
      ro: 'Persoane concediate din motive neimputabile lor sau ale căror contracte de muncă au încetat independent de voința lor (ex. desființare post, expirare contract determinat).',
      en: 'Individuals laid off for reasons beyond their control (e.g. redundancy, fixed-term contract expiration).'
    },
    prerequisites: {
      ro: [
        'Stagiu minim de cotizare: cel puțin 12 luni în ultimele 24 de luni anterioare depunerii cererii.',
        'Încetarea contractului de muncă să nu fi avut loc prin demisie sau acordul părților (cu excepțiile prevăzute de Legea 76/2002).',
        'Înregistrarea în termen de maximum 10 zile calendaristice de la încetarea raportului de muncă pentru a primi indemnizația de la data încetării.'
      ],
      en: [
        'Minimum contribution period: 12 months of insured employment within preceding 24 months.',
        'Termination was not voluntary resignation (subject to Law 76/2002 exceptions).',
        'Registration within 10 calendar days of contract termination to receive benefits starting from day 1.'
      ]
    },
    institution: {
      name: 'Agenția Națională pentru Ocuparea Forței de Muncă (ANOFM) — Agenția Județeană (AJOFM)',
      shortName: 'AJOFM / ANOFM',
      officialUrl: 'https://www.anofm.ro/',
      bookingUrl: 'https://www.anofm.ro/bucuresti/'
    },
    legalBasis: {
      law: 'Legea nr. 76/2002 privind sistemul asigurărilor pentru șomaj și stimularea ocupării forței de muncă',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/34008'
    },
    processingTime: {
      standard: '10–15 zile lucrătoare de la depunerea dosarului complet',
      legalDeadline: 'Plata începe lunar pe baza deciziei emise de AJOFM'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Serviciile publice de ocupare și înregistrarea șomajului sunt complet gratuite.',
          en: 'Public employment services and registrations are legally free of charge.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-adeverinta-vechime-ajofm',
        name: {
          ro: 'Adeverință de vechime și venit eliberată de ultimul angajator (Anexa 26)',
          en: 'Employer termination certificate and contribution history (Annex 26)'
        },
        description: {
          ro: 'Menționează data și temeiul legal al încetării contractului conform Codului Muncii, baza de calcul a contribuțiilor și zilele lucrate.',
          en: 'Specifies precise legal ground of termination under Labor Code and social contribution records.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-decizie-incetare-cim',
        name: {
          ro: 'Decizia de încetare a contractului individual de muncă',
          en: 'Formal employer contract termination decision'
        },
        description: {
          ro: 'Copie conformă cu originalul a deciziei semnate de conducerea unității.',
          en: 'Certified copy of the termination decision signed by employer.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      },
      {
        id: 'doc-diploma-studii-ajofm',
        name: {
          ro: 'Ultimul act de studii / calificare absolvit',
          en: 'Highest educational diploma or qualification certificate'
        },
        description: {
          ro: 'Original și copie simplă (diplomă de bacalaureat, facultate sau calificare profesională).',
          en: 'Original and copy of high school, university or vocational certificate.'
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
          ro: 'Obține adeverința tipizată și decizia de încetare de la fostul angajator',
          en: 'Obtain statutory termination certificate from former employer'
        },
        description: {
          ro: 'Angajatorul este obligat prin lege să elibereze Anexa 26 și extrasul din Revisal în termen de maximum 15 zile de la data încetării contractului.',
          en: 'Employer is statutorily bound to provide Annex 26 and Revisal extract upon dismissal.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Înregistrează-te la agenția locală de ocupare arondată domiciliului',
          en: 'Register with your local municipal / county employment branch'
        },
        description: {
          ro: 'Prezintă-te la agenția de șomaj de sector/oraș cu actele de identitate, actele de studii și adeverințele de la angajator.',
          en: 'Visit the territorial AJOFM bureau with identity card, diplomas, and employer certificates.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Stabilirea cuantumului și viza lunară',
          en: 'Benefit determination and mandatory monthly check-in'
        },
        description: {
          ro: 'Cuantumul depinde de Indicatorul Social de Referință (ISR) și de vechimea în muncă. Șomerul are obligația de a se prezenta lunar la viza obligatorie sau la cursurile de calificare.',
          en: 'Payment depends on the statutory Reference Social Indicator (ISR) and tenure. Monthly verification check-ins are compulsory.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Dacă depui cererea după 10 zile, dar în termen de 30 de zile calendaristice, indemnizația se acordă doar de la data efectivă a înregistrării cererii, nu de la concediere!',
        en: 'If filed after 10 days but within 30 days, benefits start strictly from the filing date, losing back-pay to dismissal date!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-somaj-anofm',
    officialServiceUrl: 'https://www.anofm.ro/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Cererile pot fi transmise și prin emailul agenției județene AJOFM, cu confirmare ulterioară a documentelor originale.',
      en: 'Initial applications can be emailed to territorial AJOFM agency, with original validation required.'
    }
  },

  // =========================================================================
  // 4. DOMENIUL: PENSII & ASIGURĂRI SOCIALE (Pensions & Retirement)
  // =========================================================================
  {
    id: 'pensie-limita-varsta',
    slug: 'inscriere-pensie-limita-varsta-legea-360-2023',
    category: 'pensii',
    administrativeDomain: 'pensions',
    lifeEvents: ['retiring'],
    submissionChannel: 'in_person',
    audience: ['ro-citizen', 'eu-citizen', 'non-eu'],
    title: {
      ro: 'Înscrierea la pensia pentru limită de vârstă (Legea 360/2023)',
      en: 'Old-Age Retirement Pension Application (Law 360/2023)'
    },
    shortSummary: {
      ro: 'Ghid complet pentru depunerea dosarului de pensionare la Casa Județeană de Pensii conform noii Legi 360/2023 intrate în vigoare la 1 septembrie 2024.',
      en: 'Comprehensive guide for old-age retirement claims at the County Pension House under new Law 360/2023 (in force Sept 2024).'
    },
    targetWho: {
      ro: 'Persoane care au împlinit vârsta standard de pensionare (65 de ani pentru bărbați; creștere eșalonată pentru femei) și au realizat stagiul minim de cotizare de 15 ani.',
      en: 'Individuals reaching statutory retirement age (65 years for men; phased transition for women) with at least 15 years contribution.'
    },
    prerequisites: {
      ro: [
        'Împlinirea vârstei standard de pensionare la data depunerii cererii.',
        'Stagiul minim de cotizare contributiv de minimum 15 ani în sistemul public.',
        'Încetarea calității de asigurat cu contract de muncă înainte de emiterea deciziei (cu excepția situațiilor de cumul legal pensie-salariu).'
      ],
      en: [
        'Reaching statutory retirement age on the filing date.',
        'Minimum contributory insurance period of 15 years.',
        'Contract termination or formal pension application protocol.'
      ]
    },
    institution: {
      name: 'Casa Națională de Pensii Publice (CNPP) — Casa Județeană de Pensii (CJP)',
      shortName: 'Casa de Pensii (CNPP)',
      officialUrl: 'https://www.cnpp.ro/',
      bookingUrl: 'https://www.cpmb.ro/programare-online'
    },
    legalBasis: {
      law: 'Legea nr. 360/2023 privind sistemul public de pensii (în vigoare de la 1 septembrie 2024)',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/276941'
    },
    processingTime: {
      standard: '45 de zile lucrătoare de la înregistrarea dosarului complet',
      legalDeadline: 'Maximum 45 de zile pentru emiterea deciziei de pensionare conform legii'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Depunerea dosarului de pensie și emiterea deciziei sunt complet gratuite.',
          en: 'Pension filing and issuance of the statutory retirement decision are free of charge.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-carnet-munca-pensii',
        name: {
          ro: 'Carnetul de muncă în original și copie',
          en: 'Original labor workbook (Carnet de muncă) and copy'
        },
        description: {
          ro: 'Obligatoriu pentru vechimea realizată anterior datei de 1 aprilie 2001 (însoțit de fotocopie certificată).',
          en: 'Mandatory for all work periods performed prior to April 1, 2001.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-adeverinte-sporuri-pensii',
        name: {
          ro: 'Adeverințe cu sporurile cu caracter permanent și nepermanent',
          en: 'Certificates of permanent bonuses and wage supplements'
        },
        description: {
          ro: 'Eliberate de angajatori sau deținătorii legali de arhivă conform noii Legi 360/2023 (pentru valorificarea acordului global, orelor suplimentare etc.).',
          en: 'Issued by past employers or legal archivists for bonus valorization under Law 360/2023.'
        },
        isMandatory: false,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-diploma-zi-pensii',
        name: {
          ro: 'Diploma de facultate cursuri de zi și adeverință de studii',
          en: 'University degree day courses diploma & attendance certificate'
        },
        description: {
          ro: 'Pentru recunoașterea perioadelor asimilate stagiului de cotizare.',
          en: 'For recognizing assimilated university study periods.'
        },
        isMandatory: false,
        isOriginalRequired: true,
        copyCount: 1
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Pregătirea și verificarea carnetului de muncă și a adeverințelor',
          en: 'Prepare and inspect labor workbook and employer archive slips'
        },
        description: {
          ro: 'Verifică dacă toate perioadele anterioare anului 2001 sunt ștampilate corect în carnetul de muncă și obține adeverințe de sporuri.',
          en: 'Inspect all historical entries prior to 2001 to ensure proper employer stamping and seal.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Depunerea dosarului la Casa Județeană de Pensii de domiciliu',
          en: 'File pension dossier at territorial County Pension House'
        },
        description: {
          ro: 'Dosarul se depune începând cu ziua în care se îndeplinesc condițiile de vârstă și stagiu, personal sau prin mandatar cu procură specială.',
          en: 'File on or after the exact date conditions are fulfilled, personally or via power of attorney.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Primirea deciziei și plata drepturilor restante',
          en: 'Receive pension decree and retro-active payments'
        },
        description: {
          ro: 'Casa de pensii emite decizia de admitere și efectuează plata retroactiv de la data îndeplinirii condițiilor și depunerii cererii.',
          en: 'The pension board issues approval decree and disburses back-pay to application date.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Pensia se acordă de la data depunerii cererii! Nu amâna depunerea dosarului după împlinirea vârstei, deoarece sumele pentru lunile trecute fără cerere nu se recuperează!',
        en: 'Retirement benefits commence strictly from the application filing date! Do not delay filing once conditions are met!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-pensii-cnpp',
    officialServiceUrl: 'https://www.cnpp.ro/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Depunerea se poate efectua și prin portalul oficial CNPP (cnpp.ro) de către persoanele care dețin cont online creat și certificat digital calificat.',
      en: 'Online submission is available via the CNPP portal for users with authenticated digital identity.'
    }
  },
  {
    id: 'pensie-comunitara-internationala',
    slug: 'pensie-internationala-comunitara-cnpp',
    category: 'pensii',
    administrativeDomain: 'pensions',
    lifeEvents: ['retiring', 'returning_to_romania'],
    submissionChannel: 'hybrid',
    audience: ['ro-citizen', 'eu-citizen', 'family-member'],
    title: {
      ro: 'Pensia internațională / comunitară (perioade lucrate în UE / SEE)',
      en: 'Cross-Border EU Bilateral Pension (Aggregated Work Periods)'
    },
    shortSummary: {
      ro: 'Procedura de pensionare pentru cetățenii care au lucrat legal în România și în alte state ale Uniunii Europene sau SEE, prin cumularea perioadelor de cotizare conform Regulamentului CE 883/2004.',
      en: 'Pension coordination procedure for individuals who accumulated work periods in Romania and other EU/EEA member states.'
    },
    targetWho: {
      ro: 'Cetățeni români sau europeni care au acumulat vechime în muncă în cel puțin două state membre UE, Elveția sau Regatul Unit.',
      en: 'Citizens who worked and paid social contributions in at least two EU/EEA countries, Switzerland, or the UK.'
    },
    prerequisites: {
      ro: [
        'Cel puțin 1 an de cotizare într-un stat membru pentru a se deschide dreptul de calcul pro-rata temporis.',
        'Cererea se depune la instituția de asigurări sociale din țara în care solicitantul își are reședința curentă.',
        'Deținerea numerelor de securitate socială din statele unde s-a lucrat (ex: National Insurance Number în UK, Codice Fiscale / INPS în Italia, NIF/Seguridad Social în Spania).'
      ],
      en: [
        'At least one year of social insurance in each member state for pro-rata pension aggregation.',
        'Application must be filed with the social security authority of the country of current habitual residence.',
        'Possession of foreign social insurance numbers (e.g. INPS in Italy, Seguridad Social in Spain, NI in UK).'
      ]
    },
    institution: {
      name: 'Casa Națională de Pensii Publice (CNPP) — Direcția Relații Internaționale',
      shortName: 'CNPP Relații Internaționale',
      officialUrl: 'https://www.cnpp.ro/',
      bookingUrl: 'https://www.cpmb.ro/'
    },
    legalBasis: {
      law: 'Regulamentul (CE) nr. 883/2004 și Regulamentul de aplicare (CE) nr. 987/2009',
      url: 'https://europa.eu/youreurope/citizens/work/retire-abroad/state-pensions-abroad/index_ro.htm'
    },
    processingTime: {
      standard: '6–12 luni (în funcție de timpul de răspuns al caselor de asigurări partenere din străinătate)',
      legalDeadline: 'Fiecare stat emite formularul de legătură E 205 / P1'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Procedura de cooperare europeană este gratuită.',
          en: 'Bilateral European coordination is entirely free of administrative fee.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-formulare-legatura-pensii',
        name: {
          ro: 'Cerere de pensionare pentru cetățenii cu domiciliul în România / UE (Formular P1)',
          en: 'Pension coordination application form (Form P1)'
        },
        description: {
          ro: 'Cuprinde istoricul profesional complet în toate statele membre.',
          en: 'Contains complete employment history across all participating member states.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-dovezi-munca-strainatate',
        name: {
          ro: 'Dovezi privind perioadele lucrate în străinătate',
          en: 'Foreign social security numbers and work contracts'
        },
        description: {
          ro: 'Copii după contracte, fișe de salariu, certificate de la instituțiile străine (INPS, Seguridad Social, Deutsche Rentenversicherung etc.).',
          en: 'Copies of contracts, payslips, or statements from foreign pension boards.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Depune cererea unică în țara de reședință actuală',
          en: 'Submit unified claim in current country of habitual residence'
        },
        description: {
          ro: 'Dacă locuiești în România, depune cererea la Casa Județeană de Pensii locală. Nu este nevoie să călătorești în țările unde ai lucrat anterior!',
          en: 'If residing in Romania, file at your local County Pension House. You do NOT need to travel to the countries where you worked!'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Schimbul de date securizat prin sistemul european EESSI',
          en: 'Secure electronic exchange via European EESSI network'
        },
        description: {
          ro: 'Casa de pensii din România contactează direct instituțiile omoloage din statele respective pentru confirmarea perioadelor de cotizare.',
          en: 'The Romanian authority communicates directly with partner state institutions to certify insurance records.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Plata separată a fiecărei părți de pensie direct în cont',
          en: 'Separate monthly pension payments paid directly to your bank IBAN'
        },
        description: {
          ro: 'Fiecare stat va plăti partea corespunzătoare de pensie direct în contul tău bancar IBAN (în RON sau EUR).',
          en: 'Each country pays its respective earned pro-rata portion directly to your designated bank IBAN.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Vârstele de pensionare diferă între statele membre! Poți primi partea de pensie din România la 65 de ani, iar partea dintr-un alt stat doar la împlinirea vârstei legale din acel stat (ex. 67 de ani în Germania sau Spania).',
        en: 'Retirement ages vary by country! You may receive the Romanian pension at 65, while the other portion begins only when reaching that country\'s statutory age!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-pensii-cnpp',
    officialServiceUrl: 'https://www.cnpp.ro/',
    isOnlineSubmissionPossible: false,
    onlineServiceNotes: {
      ro: 'Depunerea dosarului inițial de pensie internațională necesită verificarea fizică a actelor originale la ghișeul de relații internaționale.',
      en: 'Initial international pension submission requires physical verification of original labor records.'
    }
  },

  // =========================================================================
  // 5. DOMENIUL: EDUCAȚIE & RECUNOAȘTERE DIPLOME (Education & Qualifications)
  // =========================================================================
  {
    id: 'echivalare-diplome-cnred',
    slug: 'echivalare-recunoastere-diplome-strainatate-cnred',
    category: 'educatie',
    administrativeDomain: 'education',
    lifeEvents: ['starting_school_university', 'returning_to_romania', 'starting_a_job'],
    submissionChannel: 'online',
    audience: ['all', 'ro-citizen', 'eu-citizen', 'non-eu', 'family-member'],
    title: {
      ro: 'Recunoașterea și echivalarea diplomelor obținute în străinătate (CNRED)',
      en: 'Academic Recognition & Equivalence of Foreign Diplomas (CNRED)'
    },
    shortSummary: {
      ro: 'Procedura oficială administrată de Ministerul Educației prin CNRED pentru recunoașterea actelor de studii universitare sau preuniversitare obținute în afara României.',
      en: 'Official Ministry of Education procedure via CNRED to accredit higher education or school diplomas earned outside Romania.'
    },
    targetWho: {
      ro: 'Cetățeni români, cetățeni UE sau cetățeni din state terțe care dețin o diplomă de bacalaureat, licență, masterat sau doctorat emisă de o instituție de învățământ acreditată din străinătate.',
      en: 'Individuals holding high-school, bachelor, master, or doctoral degrees issued by accredited foreign educational institutions.'
    },
    prerequisites: {
      ro: [
        'Diploma este eliberată de o universitate sau școală acreditată în statul de origine.',
        'Diploma poartă Apostila de la Haga sau supralegalizare (cu excepția statelor scutite prin convenții internaționale).',
        'Traducere autorizată și legalizată în limba română (pentru diplomele emise în alte limbi decât engleză/franceză, după caz).'
      ],
      en: [
        'Degree is issued by a state-accredited educational institution.',
        'Document bears Hague Apostille or consular legalization unless exempt under bilateral conventions.',
        'Certified Romanian translation where required.'
      ]
    },
    institution: {
      name: 'Centrul Național de Recunoaștere și Echivalare a Diplomelor (CNRED) — Ministerul Educației',
      shortName: 'CNRED (Ministerul Educației)',
      officialUrl: 'https://cnred.edu.ro/',
      bookingUrl: 'https://cnred.edu.ro/ro/inregistrare-online'
    },
    legalBasis: {
      law: 'Legea învățământului superior nr. 199/2023 & Ordinul Ministrului Educației nr. 5663/2016',
      url: 'https://cnred.edu.ro/ro/legislatie-recunoastere-studii'
    },
    processingTime: {
      standard: '30 de zile calendaristice de la înregistrarea dosarului complet pe platformă',
      legalDeadline: 'Maximum 30 de zile lucrătoare conform metodologiei'
    },
    fees: [
      {
        amount: 50,
        currency: 'RON',
        description: {
          ro: 'Tariful de evaluare a dosarului de recunoaștere perceput de CNRED',
          en: 'CNRED administrative dossier evaluation fee'
        },
        paymentMethods: ['Ghișeul.ro', 'Card online prin Punctul de Contact Unic', 'Transfer bancar']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-diploma-straina-cnred',
        name: {
          ro: 'Diploma de studii străină scanată color',
          en: 'Color scan of the original foreign diploma'
        },
        description: {
          ro: 'Față-verso, conținând apostila sau supralegalizarea conform cerințelor de țară.',
          en: 'Front and back, showing apostille or legal stamp where mandated.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      },
      {
        id: 'doc-supliment-diploma-cnred',
        name: {
          ro: 'Suplimentul la diplomă / Foaia matricolă (Diploma Supplement / Transcript)',
          en: 'Diploma Supplement / Official Academic Transcript'
        },
        description: {
          ro: 'Cuprinzând disciplinele studiate, notele și creditele ECTS acumulate.',
          en: 'Detailing courses completed, grades, and accumulated ECTS credits.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      },
      {
        id: 'doc-dovada-plata-cnred',
        name: {
          ro: 'Dovada achitării tarifului de 50 RON',
          en: 'Proof of payment for 50 RON evaluation fee'
        },
        description: {
          ro: 'Chitanță sau confirmare electronică a plății pe platformă.',
          en: 'Electronic payment receipt generated on the portal.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Creează cont pe Punctul de Contact Unic electronic (PCUe) sau platforma CNRED',
          en: 'Create account on the Electronic Single Point of Contact (PCUe)'
        },
        description: {
          ro: 'Accesează portalul oficial cnred.edu.ro și deschide o cerere electronică de recunoaștere universitară sau preuniversitară.',
          en: 'Log in to cnred.edu.ro and initialize a degree accreditation application.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Încarcă documentele scanate și achită taxa online de 50 lei',
          en: 'Upload scanned documents and pay the 50 RON fee online'
        },
        description: {
          ro: 'Toate documentele se transmit exclusiv în format digital PDF. Plata se face direct cu cardul bancar.',
          en: 'All documents are submitted in digital PDF format. Fee is paid securely via online card.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Descărcarea Atestatului de Echivalare semnat electronic',
          en: 'Download electronically signed Equivalence Certificate'
        },
        description: {
          ro: 'CNRED emite Atestatul de Recunoaștere în format PDF cu semnătură electronică calificată, recunoscut legal la orice angajator sau universitate din România.',
          en: 'CNRED issues the official Certificate of Recognition in digital PDF format with qualified electronic signature.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Pentru profesiile reglementate (medic, asistent medical, farmacist, arhitect, avocat), recunoașterea dreptului de liberă practică se realizează separat la ordinul profesional de specialitate (Colegiul Medicilor etc.)!',
        en: 'For regulated professions (medical doctors, nurses, pharmacists, architects), professional practice authorization is granted separately by the relevant professional chamber!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-educatie-cnred',
    officialServiceUrl: 'https://cnred.edu.ro/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Procedura se desfășoară 100% online pe portalul oficial CNRED, fără a fi necesară deplasarea la București.',
      en: 'The entire procedure is conducted 100% online without visiting Bucharest.'
    }
  },

  // =========================================================================
  // 6. DOMENIUL: PROPRIETATE & CADASTRU (Property & Cadastre)
  // =========================================================================
  {
    id: 'extras-carte-funciara-online',
    slug: 'extras-carte-funciara-pentru-informare-ancpi-online',
    category: 'proprietate',
    administrativeDomain: 'cadastre_housing',
    lifeEvents: ['buying_selling_property', 'starting_a_business'],
    submissionChannel: 'online',
    audience: ['all', 'ro-citizen', 'eu-citizen', 'non-eu'],
    title: {
      ro: 'Extras de carte funciară pentru informare online (ANCPI)',
      en: 'Online Land Book Extract for Information (ANCPI Portal)'
    },
    shortSummary: {
      ro: 'Obținerea instantanee a extrasului de carte funciară oficial pentru imobile, apartamente sau terenuri direct pe portalul Agenției Naționale de Cadastru și Publicitate Imobiliară (ANCPI).',
      en: 'Instant issuance of the official land register extract for property, apartments, or plots online via ANCPI portal.'
    },
    targetWho: {
      ro: 'Oricine dorește să verifice situația juridică, proprietarul, sarcinile sau ipotecile unui imobil înscris în cartea funciară (date publice conform legii).',
      en: 'Anyone wishing to verify property ownership, legal encumbrances, or mortgages (public register under law).'
    },
    prerequisites: {
      ro: [
        'Cunoașterea numărului de carte funciară și numărului cadastral sau topografic al imobilului.',
        'Cunoașterea unității administrativ-teritoriale (UAT / Localitate / Sector).',
        'Deținerea unui card bancar pentru achitarea taxei online de 20 lei.'
      ],
      en: [
        'Knowledge of the land register number and cadastral/topographic plot number.',
        'Knowledge of the administrative municipality / county unit (UAT).',
        'Valid credit/debit card to pay the statutory 20 RON fee.'
      ]
    },
    institution: {
      name: 'Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI) — Platforma Oficială ePay',
      shortName: 'ANCPI',
      officialUrl: 'https://epay.ancpi.ro/',
      bookingUrl: 'https://epay.ancpi.ro/'
    },
    legalBasis: {
      law: 'Legea cadastrului și a publicității imobiliare nr. 7/1996 (republicată)',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/7568'
    },
    processingTime: {
      standard: 'Eliberat instantaneu online (câteva minute) pentru imobilele în format electronic',
      legalDeadline: 'Maximum 24–48 de ore pentru cărțile funciare vechi aflate în conversie'
    },
    fees: [
      {
        amount: 20,
        currency: 'RON',
        description: {
          ro: 'Tariful oficial ANCPI pentru extrasul de carte funciară pentru informare online',
          en: 'Official statutory fee for online land book extract for information'
        },
        paymentMethods: ['Card bancar online pe epay.ancpi.ro']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-fara-documente-ancpi',
        name: {
          ro: 'Nu sunt necesare documente fizice de încărcat',
          en: 'No physical documents required'
        },
        description: {
          ro: 'Se introduc doar identificatorii cadastrali (număr carte funciară și număr cadastral).',
          en: 'Only the cadastral and land book registration numbers are entered.'
        },
        isMandatory: false,
        isOriginalRequired: false,
        copyCount: 0
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Accesează portalul oficial securizat epay.ancpi.ro',
          en: 'Visit the official ANCPI portal at epay.ancpi.ro'
        },
        description: {
          ro: 'Creează un cont gratuit de utilizator sau conectează-te cu datele existente.',
          en: 'Register a free user account or log in directly.'
        },
        locationOrUrl: 'https://epay.ancpi.ro/'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Selectează „Extras de carte funciară pentru informare” și introdu UAT-ul',
          en: 'Select "Land Book Extract" and input county, locality, and plot numbers'
        },
        description: {
          ro: 'Alege județul și localitatea (UAT), apoi introdu numărul cărții funciare și numărul cadastral al imobilului/apartamentului.',
          en: 'Specify county, city/sector, and enter the unique land registry and plot identifier.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Plătește 20 RON cu cardul și descarcă extrasul în format PDF',
          en: 'Pay 20 RON fee by card and immediately download the signed PDF'
        },
        description: {
          ro: 'Documentul PDF conține semnătură electronică calificată ANCPI și cod QR de verificare a autenticității, având valoare juridică completă timp de 30 de zile.',
          en: 'The PDF document features ANCPI’s qualified electronic signature and verification QR code, valid for 30 days.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Atenție la site-urile intermediare neoficiale care percep între 80 și 150 lei pentru același document! Prețul oficial stabilit de stat pe epay.ancpi.ro este de exact 20 lei!',
        en: 'Beware of predatory third-party broker websites charging 80–150 RON! The official state fee on epay.ancpi.ro is exactly 20 RON!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-cadastru-ancpi',
    officialServiceUrl: 'https://epay.ancpi.ro/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Serviciul este 100% online și disponibil 24/7 pe portalul oficial ANCPI.',
      en: 'The service is fully automated, operating 24/7 on the official ANCPI portal.'
    }
  },

  // =========================================================================
  // 7. DOMENIUL: JUSTIȚIE & PETIȚII (Justice & Petitions)
  // =========================================================================
  {
    id: 'apostila-haga-prefectura',
    slug: 'apostilare-acte-oficiale-conventia-de-la-haga-prefectura',
    category: 'justitie',
    administrativeDomain: 'justice_petitions',
    lifeEvents: ['moving_abroad', 'starting_school_university'],
    submissionChannel: 'in_person',
    audience: ['all', 'ro-citizen', 'family-member', 'eu-citizen', 'non-eu'],
    title: {
      ro: 'Apostila Convenției de la Haga pe actele administrative (Prefectură)',
      en: 'Hague Apostille Certification for Official Documents (Prefecture)'
    },
    shortSummary: {
      ro: 'Aplicarea apostilei de la Haga pe certificatele de stare civilă, adeverințele de studii și alte acte administrative oficiale emise în România, pentru a fi recunoscute în statele semnatare ale Convenției.',
      en: 'Apostille legalization on civil status certificates, academic documents, and administrative acts for international legal validity.'
    },
    targetWho: {
      ro: 'Orice persoană fizică ce deține un document administrativ oficial românesc ce trebuie prezentat autorităților dintr-un stat semnatar al Convenției de la Haga.',
      en: 'Any holder of a Romanian official administrative document to be submitted in a Hague Convention signatory state.'
    },
    prerequisites: {
      ro: [
        'Documentul trebuie să fie în format original, emis după anul 1998 (cu timbru sec și serie recentă).',
        'Pentru actele de studii preuniversitare sau universitare este necesară vizarea prealabilă la Inspectoratul Școlar sau Ministerul Educației.',
        'Depunerea se face la Instituția Prefectului din județul în care titularul are domiciliul sau în județul unde a fost emis documentul.'
      ],
      en: [
        'Document must be in original modern format (issued after 1998 with official stamp).',
        'Academic records require prior ministerial / school inspectorate endorsement.',
        'Application submitted to the County Prefecture where document was issued or holder resides.'
      ]
    },
    institution: {
      name: 'Instituția Prefectului (Biroul Apostilă din fiecare județ și Municipiul București)',
      shortName: 'Instituția Prefectului — Biroul Apostilă',
      officialUrl: 'https://prefecturabucuresti.mai.gov.ro/apostila/',
      bookingUrl: 'https://prefecturabucuresti.mai.gov.ro/'
    },
    legalBasis: {
      law: 'Ordonanța Guvernului nr. 66/1999 pentru aderarea României la Convenția de la Haga din 1961',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/19302'
    },
    processingTime: {
      standard: 'Pe loc (1–2 ore) sau în maximum 24 de ore lucrătoare de la depunere',
      legalDeadline: 'Maximum 5 zile lucrătoare'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Apostilarea actelor administrative la Instituția Prefectului este complet gratuită conform legii.',
          en: 'Apostille certification at the Prefecture is completely free of charge under Romanian law.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-act-original-apostila',
        name: {
          ro: 'Documentul oficial în original pe care se solicită apostila',
          en: 'Original official document to be apostilled'
        },
        description: {
          ro: 'Certificat de naștere, căsătorie, cazier judiciar, adeverință etc. în stare impecabilă, fără modificări sau ștersături.',
          en: 'Original birth, marriage, criminal record, or diploma in pristine condition.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-ci-solicitant-apostila',
        name: {
          ro: 'Actul de identitate al solicitantului',
          en: 'Applicant\'s identity document'
        },
        description: {
          ro: 'Cartea de identitate sau pașaportul valabil (original și fotocopie).',
          en: 'Valid national ID card or passport (original and copy).'
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
          ro: 'Verifică dacă statul de destinație este membru al Convenției de la Haga',
          en: 'Verify destination country is a Hague Apostille party'
        },
        description: {
          ro: 'Statele din UE nu mai solicită apostilă pentru certificatele de stare civilă conform Regulamentului UE 2016/1191! Pentru state non-Haga, este necesară supralegalizarea MAE.',
          en: 'EU member states do not require apostilles for civil status certificates under EU Reg 2016/1191! Non-Haga states require consular legalization.'
        }
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Depune documentele la ghișeul Biroului Apostilă de la Prefectură',
          en: 'Submit documents at the Prefecture Apostille desk'
        },
        description: {
          ro: 'Completează cererea tipizată gratuită la ghișeu și prezintă actul în original.',
          en: 'Complete the free standard request form and present original document.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Ridicarea documentului cu timbrul holografic de apostilă aplicat',
          en: 'Collect apostilled document bearing the holographic seal'
        },
        description: {
          ro: 'Prefectura aplică apostila tipizată numerotată direct pe verso-ul documentului sau pe o anexă securizată.',
          en: 'The Prefecture affixes the numbered statutory Apostille sticker on the reverse side.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Apostila Prefecturii se aplică exclusiv pe acte administrative! Actele notariale (procuri, declarații) și hotărârile judecătorești se apostilează la Camera Notarilor Publici sau la Tribunal!',
        en: 'Prefecture apostilles administrative acts only! Notary deeds and court rulings must be apostilled at the Chamber of Notaries or Tribunal!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-apostila-prefectura',
    officialServiceUrl: 'https://prefecturabucuresti.mai.gov.ro/',
    isOnlineSubmissionPossible: false,
    onlineServiceNotes: {
      ro: 'Necesită depunerea actului fizic în original pentru aplicarea ștampilei holografice de securitate.',
      en: 'Requires physical presentation of original document to attach the holographic security sticker.'
    }
  },

  // =========================================================================
  // 8. DOMENIUL: AFACERI & ÎNREGISTRARE FIRME (Business Registry - ONRC)
  // =========================================================================
  {
    id: 'infiintare-srl-onrc',
    slug: 'infiintare-inregistrare-srl-onrc-online',
    category: 'afaceri',
    administrativeDomain: 'business_registry',
    lifeEvents: ['starting_a_business'],
    submissionChannel: 'online',
    audience: ['all', 'ro-citizen', 'eu-citizen', 'non-eu'],
    title: {
      ro: 'Înființarea unei societăți cu răspundere limitată (SRL) la ONRC',
      en: 'LLC Company Formation (SRL) via the ONRC Portal'
    },
    shortSummary: {
      ro: 'Procedura completă pentru înregistrarea unei noi firme (SRL) în România, de la rezervarea de denumire până la obținerea certificatului de înregistrare și a codului fiscal (CUI) prin portalul ONRC.',
      en: 'Complete procedure to incorporate a Romanian limited liability company (SRL), from name reservation to tax certificate (CUI).'
    },
    targetWho: {
      ro: 'Antreprenori (cetățeni români sau străini) care doresc să deschidă o societate comercială cu răspundere limitată.',
      en: 'Entrepreneurs (Romanian or foreign nationals) establishing an LLC in Romania.'
    },
    prerequisites: {
      ro: [
        'Alegerea denumirii firmei și rezervarea acesteia la ONRC.',
        'Stabilirea sediului social (act de proprietate sau contract de comodat / închiriere).',
        'Redactarea actului constitutiv al societății.',
        'Deținerea unei semnături electronice calificate pentru depunerea online pe myportal.onrc.ro (sau depunere la ghișeu).'
      ],
      en: [
        'Company name reservation at the Trade Register.',
        'Registered office address (ownership deed or lease / gratuitous loan agreement).',
        'Drafting articles of association.',
        'Qualified digital electronic signature for online filing via myportal.onrc.ro.'
      ]
    },
    institution: {
      name: 'Oficiul Național al Registrului Comerțului (ONRC) — Oficiul Județean (ORC)',
      shortName: 'Registrul Comerțului (ONRC)',
      officialUrl: 'https://www.onrc.ro',
      bookingUrl: 'https://myportal.onrc.ro'
    },
    legalBasis: {
      law: 'Legea nr. 265/2022 privind registrul comerțului & Legea societăților nr. 31/1990',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/257850'
    },
    processingTime: {
      standard: '3–5 zile lucrătoare de la depunerea dosarului complet și fără obiecțiuni',
      legalDeadline: 'Termen legal standard de soluționare: 3 zile lucrătoare'
    },
    fees: [
      {
        amount: 128,
        currency: 'RON',
        description: {
          ro: 'Tariful de publicare a rezoluției în Monitorul Oficial al României (înregistrarea la ONRC este scutită de alte taxe)',
          en: 'Official Gazette publication fee (Trade Register registration fee itself is exempt under law)'
        },
        paymentMethods: ['Card online pe portalul ONRC', 'Virament bancar']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-act-constitutiv-onrc',
        name: {
          ro: 'Actul constitutiv al societății (SRL)',
          en: 'Articles of Association'
        },
        description: {
          ro: 'Conține datele asociaților, administratorilor, obiectul principal și secundar de activitate conform codurilor CAEN Rev. 2.',
          en: 'Details shareholders, directors, share capital, and main CAEN activity codes.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-dovada-sediu-onrc',
        name: {
          ro: 'Dovada sediului social',
          en: 'Proof of registered office'
        },
        description: {
          ro: 'Contract de comodat sau închiriere însoțit de actul de proprietate al spațiului.',
          en: 'Lease or free loan agreement accompanied by property title deed.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-declaratie-beneficiar-onrc',
        name: {
          ro: 'Declarația privind beneficiarii reali ai societății',
          en: 'Ultimate Beneficial Owner (UBO) declaration'
        },
        description: {
          ro: 'Completată pe formular tipizat sau inclusă direct în actul constitutiv conform Legii 129/2019.',
          en: 'Statutory declaration of real economic beneficiaries.'
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
          ro: 'Rezervă denumirea firmei online pe noul portal ONRC',
          en: 'Reserve corporate name online on ONRC portal'
        },
        description: {
          ro: 'Verifică disponibilitatea denumirii dorite pe myportal.onrc.ro. Dovada de rezervare este valabilă 1 lună.',
          en: 'Check name availability on myportal.onrc.ro. Reservation holds for 1 month.'
        },
        locationOrUrl: 'https://myportal.onrc.ro'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Redactează actul constitutiv și adună acordurile pentru sediul social',
          en: 'Draft articles of association and secure office deed'
        },
        description: {
          ro: 'Capitalul social minim legal nu mai este de 200 lei, putând fi stabilit la chiar 1 leu conform legislației actualizate.',
          en: 'Minimum legal share capital is no longer 200 RON; it can be established starting from 1 RON.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Transmite dosarul complet online pe portal și descarcă Certificatul (CUI)',
          en: 'Submit online and download Certificate of Incorporation (CUI)'
        },
        description: {
          ro: 'Registratorul ONRC analizează dosarul în 3 zile și emite Certificatul de Înregistrare semnat electronic cu CUI și număr de înregistrare J.',
          en: 'The registrar inspects file within 3 days and issues the official digital CUI certificate.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Dacă sediul social se stabilește într-un bloc de locuințe, este obligatoriu acordul asociației de proprietari și al vecinilor direct afectați doar dacă se desfășoară activitate la sediu!',
        en: 'Apartment building headquarters require neighbors\' and HOA consent only if commercial activity actually occurs on the premises!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-onrc-firme',
    officialServiceUrl: 'https://myportal.onrc.ro',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Poate fi realizată 100% online pe myportal.onrc.ro utilizând semnătură digitală calificată.',
      en: 'Can be completed 100% online on myportal.onrc.ro with a qualified digital signature.'
    }
  },

  // =========================================================================
  // 9. DOMENIUL: MEDIU & AGRICULTURĂ (Environment & Agriculture - APIA)
  // =========================================================================
  {
    id: 'subventii-apia-fermier',
    slug: 'cerere-unica-plata-subventii-agricole-apia',
    category: 'mediu-agricultura',
    administrativeDomain: 'environment_agriculture',
    lifeEvents: ['starting_a_business'],
    submissionChannel: 'online',
    audience: ['ro-citizen', 'eu-citizen'],
    title: {
      ro: 'Cererea de plată pentru subvențiile agricole pe suprafață (APIA)',
      en: 'Direct Agricultural Subsidy Application (APIA / IPA-Online)'
    },
    shortSummary: {
      ro: 'Depunerea anuală a cererii de plată pentru fermierii activi care lucrează terenuri agricole sau dețin animale, pentru obținerea fondurilor europene și naționale directe.',
      en: 'Annual application for active farmers managing agricultural land plots or livestock to claim EU and national direct subsidies.'
    },
    targetWho: {
      ro: 'Fermieri persoane fizice, PFA sau societăți comerciale care exploatează o suprafață agricolă de minimum 1 hectar (formată din parcele de cel puțin 0,3 hectare).',
      en: 'Farmers operating at least 1 hectare of utilized agricultural area (minimum parcel size 0.3 ha).'
    },
    prerequisites: {
      ro: [
        'Exploatarea terenului în baza unor documente valabile (titlu de proprietate, contract de arendă înregistrat la primărie, contract de concesiune).',
        'Înscrierea terenului în Registrul Agricol la primăria pe raza căreia se află suprafețele.',
        'Depunerea cererii în intervalul anual de campanie stabilit (de regulă martie – mai).'
      ],
      en: [
        'Legal land use proof (ownership deed, registered lease contract, concession).',
        'Land registration in the municipal Agricultural Register.',
        'Filing during the statutory annual application window (typically March to May).'
      ]
    },
    institution: {
      name: 'Agenția de Plăți și Intervenție pentru Agricultură (APIA) — Centrul Județean / Local',
      shortName: 'APIA',
      officialUrl: 'https://www.apia.org.ro/',
      bookingUrl: 'https://lpis.apia.org.ro/'
    },
    legalBasis: {
      law: 'Planul Strategic PAC 2023-2027 & OUG nr. 157/2022',
      url: 'https://www.apia.org.ro/directia-masuri-de-sprijin-direct/'
    },
    processingTime: {
      standard: 'Avansurile se plătesc începând cu 16 octombrie, iar plata regulară până la 30 iunie anul următor',
      legalDeadline: 'Conform calendarului oficial al Comisiei Europene'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Completarea și depunerea cererii unice de plată sunt complet gratuite.',
          en: 'Filing direct payment subsidy applications is strictly free of charge.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-adeverinta-registru-agricol',
        name: {
          ro: 'Adeverința de înscriere în Registrul Agricol',
          en: 'Municipal Agricultural Register certificate'
        },
        description: {
          ro: 'Eliberată de primărie cu datele actualizate din Registrul Agricol pentru anul în curs.',
          en: 'Issued by city hall certifying parcels registered for the current farming year.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-contracte-arenda-teren',
        name: {
          ro: 'Contractele de arendă sau actele de proprietate ale parcelelor',
          en: 'Lease contracts or property title deeds'
        },
        description: {
          ro: 'Valabile la data depunerii cererii și înregistrate la consiliul local.',
          en: 'Valid on filing date and registered with the local council.'
        },
        isMandatory: true,
        isOriginalRequired: false,
        copyCount: 1
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: {
          ro: 'Digitalizarea și identificarea parcelelor în aplicația IPA-Online',
          en: 'Digitize and map parcels in the IPA-Online GIS platform'
        },
        description: {
          ro: 'Accesează portalul lpis.apia.org.ro pentru a trasa pe harta satelitară conturul exact al parcelelor lucrate.',
          en: 'Log in to lpis.apia.org.ro to draw exact parcel boundaries on satellite aerial imagery.'
        },
        locationOrUrl: 'https://lpis.apia.org.ro/'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Verificarea conformității cu funcționarul APIA arondat',
          en: 'Review submission with territorial APIA case officer'
        },
        description: {
          ro: 'Cererea se transmite electronic, fiind verificată în sistemul integrat de administrare și control (IACS).',
          en: 'File is validated via the integrated administrative and control system.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Încasarea plăților directe pe hectar și a sprijinului redistributiv',
          en: 'Receive direct area payments and eco-scheme subsidies'
        },
        description: {
          ro: 'Plățile se virează direct în contul bancar comunicat la dosar conform tranșelor oficiale.',
          en: 'Funds are wired directly to the designated bank account in official autumn/spring installments.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Depășirea termenului limită de depunere atrage penalizări de 1% pe zi lucrătoare de întârziere, iar după 25 de zile cererea devine inadmisibilă!',
        en: 'Late submission incurs a statutory 1% penalty per business day delay; after 25 days the claim is legally rejected!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-agricultura-apia',
    officialServiceUrl: 'https://www.apia.org.ro/',
    isOnlineSubmissionPossible: true,
    onlineServiceNotes: {
      ro: 'Trasarea parcelelor și transmiterea cererii se realizează online prin aplicația oficială IPA-Online.',
      en: 'Parcel mapping and filing are performed digitally on the IPA-Online platform.'
    }
  },

  // =========================================================================
  // 10. DOMENIUL: CETĂȚENIE & TRANSFRONTALIER (Citizenship & Cross-Border - ANC)
  // =========================================================================
  {
    id: 'redobandire-cetatenie-romana',
    slug: 'redobandire-cetatenie-romana-articolul-11-anc',
    category: 'cetatenie',
    administrativeDomain: 'citizenship_travel',
    lifeEvents: ['acquiring_citizenship'],
    submissionChannel: 'in_person',
    audience: ['non-eu', 'all', 'family-member'],
    title: {
      ro: 'Redobândirea cetățeniei române în temeiul Articolului 11 (ANC)',
      en: 'Restoration of Romanian Citizenship under Article 11 (ANC)'
    },
    shortSummary: {
      ro: 'Ghid detaliat pentru persoanele care au fost cetățeni români sau descendenții acestora până la gradul III (copii, nepoți, strănepoți) care au pierdut cetățenia din motive neimputabile lor.',
      en: 'Detailed guide for former Romanian citizens and their descendants up to 3rd generation to restore Romanian citizenship.'
    },
    targetWho: {
      ro: 'Persoane care fac dovada că un ascendent direct (părinte, bunic sau străbunic) s-a născut pe teritoriul României istorice înainte de 1940 și a deținut cetățenia română.',
      en: 'Individuals demonstrating a direct ancestor born within Romanian territory prior to 1940 who held citizenship.'
    },
    prerequisites: {
      ro: [
        'Dovedirea filiației neîntrerupte prin certificate de stare civilă (naștere, căsătorie, deces) de la străbunic/bunic până la solicitant.',
        'Lipsa antecedentelor penale în România și în țara de domiciliu.',
        'Atestarea atașamentului față de valorile statului român și cunoașterea elementară a limbii române pentru jurământ.'
      ],
      en: [
        'Proving unbroken lineage via civil status certificates from ancestor down to applicant.',
        'Clean criminal record in Romania and state of domicile.',
        'Passing the formal oath of allegiance ceremony in Romanian.'
      ]
    },
    institution: {
      name: 'Autoritatea Națională pentru Cetățenie (ANC) — Ministerul Justiției',
      shortName: 'Autoritatea Națională pentru Cetățenie (ANC)',
      officialUrl: 'https://cetatenie.just.ro/',
      bookingUrl: 'https://cetatenie.just.ro/programare-online/'
    },
    legalBasis: {
      law: 'Legea cetățeniei române nr. 21/1991 (republicată, art. 11)',
      url: 'https://legislatie.just.ro/Public/DetaliiDocument/1879'
    },
    processingTime: {
      standard: '18–36 de luni de la depunerea dosarului până la emiterea ordinului președintelui ANC',
      legalDeadline: 'Comisia analizează dosarele în ordinea cronologică a înregistrării'
    },
    fees: [
      {
        amount: 0,
        currency: 'RON',
        description: {
          ro: 'Depunerea dosarului de redobândire a cetățeniei este scutită de taxe consulare conform Legii 1/2017.',
          en: 'Citizenship restoration filing is exempt from state consular fees under Law 1/2017.'
        },
        paymentMethods: ['Fără taxă']
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-acte-stare-civila-ascendenti',
        name: {
          ro: 'Certificatele de stare civilă ale ascendenților români',
          en: 'Ancestors’ civil status certificates (birth, marriage, death)'
        },
        description: {
          ro: 'Documente de stare civilă legalizate și traduse în limba română care atestă legătura de sânge.',
          en: 'Legalized and translated civil certificates proving generational bloodline.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 1
      },
      {
        id: 'doc-cazier-cetatenie',
        name: {
          ro: 'Cazierul judiciar din țara de domiciliu și din România',
          en: 'Clean criminal record certificates from country of residence & Romania'
        },
        description: {
          ro: 'Tradus și apostilat / supralegalizat, aflat în termen de valabilitate.',
          en: 'Apostilled / legalized, within 6 months validity.'
        },
        isMandatory: true,
        isOriginalRequired: true,
        copyCount: 0
      },
      {
        id: 'doc-declaratii-notariale-anc',
        name: {
          ro: 'Declarațiile notariale pe propria răspundere conform art. 11',
          en: 'Notarized statutory declarations under Article 11'
        },
        description: {
          ro: 'Declarație că nu întreprinde acțiuni împotriva ordinii de drept și dacă solicită menținerea domiciliului în străinătate sau stabilirea în România.',
          en: 'Affidavits of allegiance and declaring chosen domicile (abroad or in Romania).'
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
          ro: 'Programarea online prealabilă obligatorie pe portalul ANC',
          en: 'Mandatory online pre-scheduling on the ANC portal'
        },
        description: {
          ro: 'Programează data și ora depunerii dosarului la sediul central ANC din București sau la birourile teritoriale (Iași, Suceava, Galați).',
          en: 'Schedule filing slot at ANC headquarters in Bucharest or territorial offices.'
        },
        locationOrUrl: 'https://cetatenie.just.ro/programare-online/'
      },
      {
        stepNumber: 2,
        title: {
          ro: 'Depunerea fizică a dosarului și obținerea numărului de înregistrare',
          en: 'In-person dossier submission and receiving dossier docket number'
        },
        description: {
          ro: 'Funcționarul verifică documentele originale și emite numărul de dosar cu care poți urmări stadiul pe site-ul ANC.',
          en: 'The officer inspects original documents and provides tracking docket number.'
        }
      },
      {
        stepNumber: 3,
        title: {
          ro: 'Depunerea jurământului de credință față de România',
          en: 'Taking the solemn Oath of Allegiance to Romania'
        },
        description: {
          ro: 'După publicarea ordinului de aprobare, titularul depune jurământul în termen de 6 luni la sediul ANC sau la consulatul român și primește Certificatul de Cetățenie.',
          en: 'Following approval decree, applicant takes the oath within 6 months and receives the Certificate of Citizenship.'
        }
      }
    ],
    warnings: [
      {
        ro: 'Nedepunerea jurământului în termen de 6 luni de la comunicarea ordinului atrage decăderea din drepturi și anularea procedurii!',
        en: 'Failure to take the oath within 6 months of decree notification invalidates the approval!'
      }
    ],
    lastVerifiedDate: '2026-03-24',
    verificationStatus: 'verified',
    editorialStatus: 'verified',
    editorialReviewDate: '2026-03-24',
    reviewedBy: 'Comisia Editorială ActeSimple',
    officeFinderCategory: 'serv-cetatenie-anc',
    officialServiceUrl: 'https://cetatenie.just.ro/',
    isOnlineSubmissionPossible: false,
    onlineServiceNotes: {
      ro: 'Programarea se realizează online, însă depunerea dosarului și jurământul se desfășoară obligatoriu în persoană.',
      en: 'Pre-scheduling is online, but dossier filing and oath require mandatory physical presence.'
    }
  }
];
