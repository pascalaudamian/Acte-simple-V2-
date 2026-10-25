import { AdministrativeOffice } from '../types';

export const ADMINISTRATIVE_OFFICES: AdministrativeOffice[] = [
  // ==================== BUCUREȘTI ====================
  {
    id: 'off-b-spclep-s1',
    name: {
      ro: 'SPCLEP Sector 1 — Direcția de Evidență a Persoanelor Piața Amzei',
      en: 'SPCLEP Sector 1 — Civil Registry Office Piața Amzei'
    },
    institutionType: 'SPCLEP',
    county: 'B',
    city: 'București (Sector 1)',
    address: 'Piața Amzei nr. 13, Sector 1, București',
    coordinates: { lat: 44.4447, lng: 26.0952 },
    phone: '021 311 5110',
    email: 'evidenta.persoanelor@primarias1.ro',
    websiteUrl: 'https://www.primarias1.ro',
    bookingUrl: 'https://hub.mai.gov.ro',
    providedServiceIds: ['serv-buletin'],
    relatedProcedureIds: ['buletin-14-ani', 'buletin-schimbare'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri: 08:30–16:30; Joi: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Wed: 08:30–16:30; Thu: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: {
      wheelchairAccessible: true,
      notes: { ro: 'Rampă de acces și ghișeu dedicat la parter.', en: 'Access ramp and dedicated ground floor desk.' }
    },
    appointmentRequirement: 'recommended',
    appointmentNotes: {
      ro: 'Se recomandă programare prealabilă pe platforma primăriei, însă se primesc și bonuri de ordine la fața locului în limita capacității.',
      en: 'Online appointment recommended via portal; walk-ins served via ticket queue subject to daily quota.'
    },
    sourceUrl: 'https://www.primarias1.ro/evidenta-persoanelor.html',
    lastVerifiedTimestamp: '2026-03-20T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-spclep-s2',
    name: {
      ro: 'SPCLEP Sector 2 — Serviciul Evidență Persoane',
      en: 'SPCLEP Sector 2 — Civil Registry Service'
    },
    institutionType: 'SPCLEP',
    county: 'B',
    city: 'București (Sector 2)',
    address: 'Str. Olari nr. 19, Sector 2, București',
    coordinates: { lat: 44.4411, lng: 26.1189 },
    phone: '021 252 5770',
    email: 'dlep@ps2.ro',
    websiteUrl: 'https://www.ps2.ro',
    bookingUrl: 'https://hub.mai.gov.ro',
    providedServiceIds: ['serv-buletin'],
    relatedProcedureIds: ['buletin-14-ani', 'buletin-schimbare'],
    openingHours: {
      ro: 'Luni, Miercuri: 08:30–16:30; Joi: 08:30–18:30; Marți, Vineri: 08:30–14:00',
      en: 'Mon, Wed: 08:30–16:30; Thu: 08:30–18:30; Tue, Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://www.ps2.ro/index.php/servicii/dlep',
    lastVerifiedTimestamp: '2026-03-20T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-spclep-s3',
    name: {
      ro: 'SPCLEP Sector 3 — Direcția Evidența Persoanelor Matei Basarab',
      en: 'SPCLEP Sector 3 — Civil Registry Directorate'
    },
    institutionType: 'SPCLEP',
    county: 'B',
    city: 'București (Sector 3)',
    address: 'Str. Matei Basarab nr. 32, Sector 3, București',
    coordinates: { lat: 44.4312, lng: 26.1134 },
    phone: '021 314 4318',
    email: 'evidentapersoanelor@primarie3.ro',
    websiteUrl: 'https://www.primarie3.ro',
    bookingUrl: 'https://hub.mai.gov.ro',
    providedServiceIds: ['serv-buletin'],
    relatedProcedureIds: ['buletin-14-ani', 'buletin-schimbare'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri: 08:30–16:30; Joi: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Wed: 08:30–16:30; Thu: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://www.primarie3.ro',
    lastVerifiedTimestamp: '2026-03-18T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-pasapoarte-parklake',
    name: {
      ro: 'Serviciul Public Comunitar de Pașapoarte București — Punctul ParkLake',
      en: 'Bucharest Community Passport Service — ParkLake Office'
    },
    institutionType: 'PASAPOARTE',
    county: 'B',
    city: 'București (Sector 3)',
    address: 'Str. Liviu Rebreanu nr. 4, Mall ParkLake etaj 1, Sector 3, București',
    coordinates: { lat: 44.4215, lng: 26.1517 },
    phone: '021 310 3767',
    email: 'pasapoarte.bucuresti@mai.gov.ro',
    websiteUrl: 'https://pasapoarte.mai.gov.ro',
    bookingUrl: 'https://epasapoarte.ro',
    providedServiceIds: ['serv-pasapoarte'],
    relatedProcedureIds: ['pasaport-electronic'],
    openingHours: {
      ro: 'Luni – Vineri: 08:30–16:30 (Programare exclusivă online)',
      en: 'Monday – Friday: 08:30–16:30 (Exclusively online appointments)'
    },
    accessibility: {
      wheelchairAccessible: true,
      notes: { ro: 'Acces facil prin lifturile mall-ului ParkLake.', en: 'Easy access via mall elevators.' }
    },
    appointmentRequirement: 'mandatory',
    appointmentNotes: {
      ro: 'Programarea prealabilă pe platforma epasapoarte.ro este obligatorie. Nu se primesc dosare fără confirmare email valabilă.',
      en: 'Mandatory advance booking via epasapoarte.ro. Walk-ins cannot be served.'
    },
    sourceUrl: 'https://pasapoarte.mai.gov.ro/serviciul-public-comunitar-de-pasapoarte-al-municipiului-bucuresti/',
    lastVerifiedTimestamp: '2026-03-25T11:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-pasapoarte-plaza',
    name: {
      ro: 'Serviciul Public Comunitar de Pașapoarte București — Punctul Plaza România',
      en: 'Bucharest Community Passport Service — Plaza România Office'
    },
    institutionType: 'PASAPOARTE',
    county: 'B',
    city: 'București (Sector 6)',
    address: 'B-dul Timișoara nr. 26, Mall Plaza România etaj 2, Sector 6, București',
    coordinates: { lat: 44.4297, lng: 26.0358 },
    phone: '021 310 3767',
    email: 'pasapoarte.bucuresti@mai.gov.ro',
    websiteUrl: 'https://pasapoarte.mai.gov.ro',
    bookingUrl: 'https://epasapoarte.ro',
    providedServiceIds: ['serv-pasapoarte'],
    relatedProcedureIds: ['pasaport-electronic'],
    openingHours: {
      ro: 'Luni – Vineri: 08:30–16:30',
      en: 'Monday – Friday: 08:30–16:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://pasapoarte.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-25T11:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-dgpciv-pipera',
    name: {
      ro: 'DGPCIV București — Serviciul Permise Auto & Înmatriculări Vehicule Pipera',
      en: 'DGPCIV Bucharest — Driving Licenses & Vehicle Registration Pipera'
    },
    institutionType: 'PERMISE_AUTO',
    county: 'B',
    city: 'București (Sector 2)',
    address: 'Șos. Pipera nr. 49, Sector 2, București',
    coordinates: { lat: 44.4795, lng: 26.1082 },
    phone: '021 301 9570',
    email: 'permise-bucuresti@mai.gov.ro',
    websiteUrl: 'https://dgpci.mai.gov.ro',
    bookingUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/',
    providedServiceIds: ['serv-permise-auto', 'serv-inmatriculari'],
    relatedProcedureIds: ['permis-conducere-schimbare', 'inmatriculare-auto'],
    openingHours: {
      ro: 'Luni – Joi: 08:00–16:30; Vineri: 08:00–14:00',
      en: 'Mon – Thu: 08:00–16:30; Fri: 08:00–14:00'
    },
    accessibility: {
      wheelchairAccessible: true,
      notes: { ro: 'Parcare rezervată pentru persoane cu dizabilități la intrare.', en: 'Accessible parking right at entrance.' }
    },
    appointmentRequirement: 'mandatory',
    appointmentNotes: {
      ro: 'Programarea online pe dgpci.mai.gov.ro este obligatorie atât pentru permise auto, cât și pentru înmatriculări / transcrieri.',
      en: 'Online booking via dgpci.mai.gov.ro is strictly required for driving license renewals and vehicle registrations.'
    },
    sourceUrl: 'https://dgpci.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-22T09:30:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-igi-bucuresti',
    name: {
      ro: 'Inspectoratul General pentru Imigrări — Direcția pentru Imigrări a Municipiului București',
      en: 'General Inspectorate for Immigration — Bucharest Regional Directorate (IGI)'
    },
    institutionType: 'IGI',
    county: 'B',
    city: 'București (Sector 5)',
    address: 'Str. Lt. col. Paul Ionescu nr. 6B (și Tudor Gociu nr. 24A), Sector 5, București',
    coordinates: { lat: 44.4146, lng: 26.0697 },
    phone: '021 410 7582',
    email: 'igi@mai.gov.ro',
    websiteUrl: 'https://igi.mai.gov.ro',
    bookingUrl: 'https://portaligi.mai.gov.ro',
    providedServiceIds: ['serv-imigrare-igi'],
    relatedProcedureIds: ['rezidenta-ue', 'permis-sedere-non-ue-munca'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:30; Vineri: 08:30–14:00',
      en: 'Monday – Thursday: 08:30–16:30; Friday: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    appointmentNotes: {
      ro: 'Toate dosarele se încarcă în prealabil pe portaligi.mai.gov.ro pentru programarea la ghișeu.',
      en: 'All applications must be pre-uploaded via portaligi.mai.gov.ro to schedule a desk appearance.'
    },
    sourceUrl: 'https://igi.mai.gov.ro/contact-bucuresti/',
    lastVerifiedTimestamp: '2026-03-24T12:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-politie-cazier-udriste',
    name: {
      ro: 'Direcția Generală de Poliție a Municipiului București — Ghișeul Central Cazier Judiciar',
      en: 'Bucharest Police General Directorate — Central Criminal Records Desk'
    },
    institutionType: 'POLITIE_CAZIER',
    county: 'B',
    city: 'București (Sector 3)',
    address: 'Str. Udriște nr. 9-15, Sector 3, București',
    coordinates: { lat: 44.4264, lng: 26.1128 },
    phone: '021 323 3030',
    email: 'cazier@b.politiaromana.ro',
    websiteUrl: 'https://hub.mai.gov.ro',
    bookingUrl: 'https://hub.mai.gov.ro',
    providedServiceIds: ['serv-cazier'],
    relatedProcedureIds: ['cazier-judiciar'],
    openingHours: {
      ro: 'Luni – Joi: 08:00–16:00; Vineri: 08:00–13:30 (Eliberare pe loc)',
      en: 'Mon – Thu: 08:00–16:00; Fri: 08:00–13:30 (Issued immediately on the spot)'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'walk_in',
    appointmentNotes: {
      ro: 'Nu necesită programare. Se eliberează pe loc pe baza cărții de identitate. Alternativ, se poate descărca gratuit online prin hub.mai.gov.ro.',
      en: 'No booking needed. Issued on the spot with valid ID. Alternatively, download digitally for free via hub.mai.gov.ro.'
    },
    sourceUrl: 'https://hub.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-20T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-casmb-lascar',
    name: {
      ro: 'Casa de Asigurări de Sănătate a Municipiului București (CASMB) — Sediul Vasile Lascăr',
      en: 'Bucharest Health Insurance House (CASMB) — Vasile Lascăr Headquarters'
    },
    institutionType: 'CNAS',
    county: 'B',
    city: 'București (Sector 2)',
    address: 'Str. Vasile Lascăr nr. 27-29, Sector 2, București',
    coordinates: { lat: 44.4398, lng: 26.1084 },
    phone: '021 316 9180',
    email: 'cardnational@casmb.ro',
    websiteUrl: 'https://www.casmb.ro',
    bookingUrl: 'https://www.casmb.ro',
    providedServiceIds: ['serv-sanatate-cnas'],
    relatedProcedureIds: ['card-sanatate-cnas'],
    openingHours: {
      ro: 'Luni, Marți, Joi: 08:30–14:30; Miercuri: 08:30–17:30; Vineri: 08:30–12:30',
      en: 'Mon, Tue, Thu: 08:30–14:30; Wed: 08:30–17:30; Fri: 08:30–12:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'walk_in',
    appointmentNotes: {
      ro: 'Cererile pentru adeverință de asigurat sau duplicat card se pot trimite și online prin email către cardnational@casmb.ro.',
      en: 'Requests for insurance replacement certificates can also be emailed to cardnational@casmb.ro.'
    },
    sourceUrl: 'https://www.casmb.ro',
    lastVerifiedTimestamp: '2026-03-15T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-anaf-s1',
    name: {
      ro: 'ANAF — Administrația Sector 1 a Finanțelor Publice (Înregistrare NIF)',
      en: 'ANAF — Sector 1 Public Finance Administration (NIF Registration)'
    },
    institutionType: 'ANAF',
    county: 'B',
    city: 'București (Sector 1)',
    address: 'Str. Roma nr. 7, Sector 1, București',
    coordinates: { lat: 44.4532, lng: 26.0911 },
    phone: '021 230 1445',
    email: 'asistenta.s1@anaf.ro',
    websiteUrl: 'https://www.anaf.ro',
    bookingUrl: 'https://www.anaf.ro/programari/',
    providedServiceIds: ['serv-taxe-anaf'],
    relatedProcedureIds: ['nif-nerezidenti'],
    openingHours: {
      ro: 'Luni, Marți, Joi: 08:30–16:30; Miercuri: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Thu: 08:30–16:30; Wed: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://www.anaf.ro',
    lastVerifiedTimestamp: '2026-03-10T10:00:00Z',
    verificationStatus: 'verified'
  },

  // ==================== CLUJ ====================
  {
    id: 'off-cj-spclep',
    name: {
      ro: 'SPCLEP Cluj-Napoca — Direcția de Evidență a Persoanelor Moților',
      en: 'SPCLEP Cluj-Napoca — Civil Registry Directorate'
    },
    institutionType: 'SPCLEP',
    county: 'CJ',
    city: 'Cluj-Napoca',
    address: 'Str. Moților nr. 5, Cluj-Napoca, jud. Cluj',
    coordinates: { lat: 46.7686, lng: 23.5852 },
    phone: '0264 596 030',
    email: 'evidentapersoanelor@primariaclujnapoca.ro',
    websiteUrl: 'https://primariaclujnapoca.ro',
    bookingUrl: 'https://hub.mai.gov.ro',
    providedServiceIds: ['serv-buletin'],
    relatedProcedureIds: ['buletin-14-ani', 'buletin-schimbare'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri: 08:30–16:30; Joi: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Wed: 08:30–16:30; Thu: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://primariaclujnapoca.ro/evidenta-persoanelor/',
    lastVerifiedTimestamp: '2026-03-21T09:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-cj-pasapoarte',
    name: {
      ro: 'Serviciul Public Comunitar de Pașapoarte Cluj — Sediul Someșului',
      en: 'Cluj Community Passport Service'
    },
    institutionType: 'PASAPOARTE',
    county: 'CJ',
    city: 'Cluj-Napoca',
    address: 'Str. Someșului nr. 15-17, Cluj-Napoca, jud. Cluj',
    coordinates: { lat: 46.7765, lng: 23.5938 },
    phone: '0264 432 027',
    email: 'pasapoarte-cj@prefecturacluj.ro',
    websiteUrl: 'https://cj.prefectura.mai.gov.ro/pasapoarte/',
    bookingUrl: 'https://epasapoarte.ro',
    providedServiceIds: ['serv-pasapoarte'],
    relatedProcedureIds: ['pasaport-electronic'],
    openingHours: {
      ro: 'Luni, Marți, Joi: 08:30–16:30; Miercuri: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Thu: 08:30–16:30; Wed: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://epasapoarte.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-cj-dgpciv',
    name: {
      ro: 'DGPCIV Cluj — Serviciul Permise de Conducere & Înmatriculări Albac',
      en: 'DGPCIV Cluj — Driving Licenses & Vehicle Registration'
    },
    institutionType: 'PERMISE_AUTO',
    county: 'CJ',
    city: 'Cluj-Napoca',
    address: 'Str. Albac nr. 15, Cluj-Napoca, jud. Cluj',
    coordinates: { lat: 46.7601, lng: 23.6083 },
    phone: '0264 430 431',
    email: 'permise-cluj@mai.gov.ro',
    websiteUrl: 'https://dgpci.mai.gov.ro',
    bookingUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/',
    providedServiceIds: ['serv-permise-auto', 'serv-inmatriculari'],
    relatedProcedureIds: ['permis-conducere-schimbare', 'inmatriculare-auto'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri: 08:30–16:30; Joi: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Wed: 08:30–16:30; Thu: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://dgpci.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-cj-igi',
    name: {
      ro: 'Inspectoratul General pentru Imigrări — Serviciul pentru Imigrări Cluj',
      en: 'Cluj Immigration Service (IGI)'
    },
    institutionType: 'IGI',
    county: 'CJ',
    city: 'Florești (Zona Metropolitană Cluj)',
    address: 'Str. Cetatea Fetei nr. 1, com. Florești, jud. Cluj',
    coordinates: { lat: 46.7451, lng: 23.5123 },
    phone: '0264 555 777',
    email: 'cj.igi@mai.gov.ro',
    websiteUrl: 'https://igi.mai.gov.ro',
    bookingUrl: 'https://portaligi.mai.gov.ro',
    providedServiceIds: ['serv-imigrare-igi'],
    relatedProcedureIds: ['rezidenta-ue', 'permis-sedere-non-ue-munca'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:30; Vineri: 08:30–14:00',
      en: 'Monday – Thursday: 08:30–16:30; Friday: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://portaligi.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-24T10:00:00Z',
    verificationStatus: 'verified'
  },

  // ==================== TIMIȘ ====================
  {
    id: 'off-tm-spclep',
    name: {
      ro: 'SPCLEP Timișoara — Direcția de Evidență a Persoanelor Iulius Mall',
      en: 'SPCLEP Timișoara — Civil Registry Iulius Mall'
    },
    institutionType: 'SPCLEP',
    county: 'TM',
    city: 'Timișoara',
    address: 'Piața Consiliul Europei nr. 2, Iulius Town etaj 1, Timișoara',
    coordinates: { lat: 45.7661, lng: 21.2287 },
    phone: '0256 499 013',
    email: 'evpers@primariatm.ro',
    websiteUrl: 'https://www.primariatm.ro',
    bookingUrl: 'https://hub.mai.gov.ro',
    providedServiceIds: ['serv-buletin'],
    relatedProcedureIds: ['buletin-14-ani', 'buletin-schimbare'],
    openingHours: {
      ro: 'Luni – Vineri: 08:30–16:30 (Miercuri până la 18:30)',
      en: 'Monday – Friday: 08:30–16:30 (Wednesday until 18:30)'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://www.primariatm.ro',
    lastVerifiedTimestamp: '2026-03-20T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-tm-pasapoarte',
    name: {
      ro: 'Serviciul Public Comunitar de Pașapoarte Timiș — Iulius Town',
      en: 'Timiș Community Passport Service — Iulius Town'
    },
    institutionType: 'PASAPOARTE',
    county: 'TM',
    city: 'Timișoara',
    address: 'Piața Consiliul Europei nr. 2, clădirea UBC 3, Iulius Town, Timișoara',
    coordinates: { lat: 45.7672, lng: 21.2295 },
    phone: '0256 494 379',
    email: 'pasapoarte@prefecturatimis.ro',
    websiteUrl: 'https://tm.prefectura.mai.gov.ro',
    bookingUrl: 'https://epasapoarte.ro',
    providedServiceIds: ['serv-pasapoarte'],
    relatedProcedureIds: ['pasaport-electronic'],
    openingHours: {
      ro: 'Luni, Marți, Joi: 08:30–16:30; Miercuri: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Thu: 08:30–16:30; Wed: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://epasapoarte.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-tm-dgpciv',
    name: {
      ro: 'DGPCIV Timiș — Serviciul Permise Auto & Înmatriculări Iulius Town',
      en: 'DGPCIV Timiș — Driving Licenses & Vehicle Registration'
    },
    institutionType: 'PERMISE_AUTO',
    county: 'TM',
    city: 'Timișoara',
    address: 'Piața Consiliul Europei nr. 2, Iulius Town, Timișoara',
    coordinates: { lat: 45.7668, lng: 21.2281 },
    phone: '0256 490 220',
    email: 'permise-timis@mai.gov.ro',
    websiteUrl: 'https://dgpci.mai.gov.ro',
    bookingUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/',
    providedServiceIds: ['serv-permise-auto', 'serv-inmatriculari'],
    relatedProcedureIds: ['permis-conducere-schimbare', 'inmatriculare-auto'],
    openingHours: {
      ro: 'Luni – Vineri: 08:30–16:30',
      en: 'Monday – Friday: 08:30–16:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://dgpci.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-tm-igi',
    name: {
      ro: 'Inspectoratul General pentru Imigrări — Serviciul pentru Imigrări Timiș',
      en: 'Timiș Immigration Service (IGI)'
    },
    institutionType: 'IGI',
    county: 'TM',
    city: 'Timișoara',
    address: 'Str. Andrei Mocioni nr. 8-10, Timișoara, jud. Timiș',
    coordinates: { lat: 45.7483, lng: 21.2178 },
    phone: '0256 401 835',
    email: 'tm.igi@mai.gov.ro',
    websiteUrl: 'https://igi.mai.gov.ro',
    bookingUrl: 'https://portaligi.mai.gov.ro',
    providedServiceIds: ['serv-imigrare-igi'],
    relatedProcedureIds: ['rezidenta-ue', 'permis-sedere-non-ue-munca'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:30; Vineri: 08:30–14:00',
      en: 'Monday – Thursday: 08:30–16:30; Friday: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://portaligi.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-24T10:00:00Z',
    verificationStatus: 'verified'
  },

  // ==================== IAȘI ====================
  {
    id: 'off-is-spclep',
    name: {
      ro: 'SPCLEP Iași — Direcția Locală de Evidență a Persoanelor Vasile Alecsandri',
      en: 'SPCLEP Iași — Civil Registry Directorate'
    },
    institutionType: 'SPCLEP',
    county: 'IS',
    city: 'Iași',
    address: 'Str. Vasile Alecsandri nr. 8, Iași, jud. Iași',
    coordinates: { lat: 47.1642, lng: 27.5815 },
    phone: '0232 267 360',
    email: 'dlep_iasi@primaria-iasi.ro',
    websiteUrl: 'https://www.dlep-iasi.ro',
    bookingUrl: 'https://hub.mai.gov.ro',
    providedServiceIds: ['serv-buletin'],
    relatedProcedureIds: ['buletin-14-ani', 'buletin-schimbare'],
    openingHours: {
      ro: 'Luni – Vineri: 08:30–16:30 (Joi: 08:30–18:30)',
      en: 'Monday – Friday: 08:30–16:30 (Thursday: 08:30–18:30)'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://www.dlep-iasi.ro',
    lastVerifiedTimestamp: '2026-03-20T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-is-dgpciv',
    name: {
      ro: 'DGPCIV Iași — Serviciul Permise Auto & Înmatriculări B-dul Primăverii',
      en: 'DGPCIV Iași — Driving Licenses & Vehicle Registration'
    },
    institutionType: 'PERMISE_AUTO',
    county: 'IS',
    city: 'Iași',
    address: 'B-dul Primăverii nr. 36, Iași, jud. Iași',
    coordinates: { lat: 47.1519, lng: 27.6041 },
    phone: '0232 230 400',
    email: 'permise-iasi@mai.gov.ro',
    websiteUrl: 'https://dgpci.mai.gov.ro',
    bookingUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/',
    providedServiceIds: ['serv-permise-auto', 'serv-inmatriculari'],
    relatedProcedureIds: ['permis-conducere-schimbare', 'inmatriculare-auto'],
    openingHours: {
      ro: 'Luni – Vineri: 08:30–16:30',
      en: 'Monday – Friday: 08:30–16:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://dgpci.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-is-pasapoarte',
    name: {
      ro: 'Serviciul Public Comunitar de Pașapoarte Iași',
      en: 'Iași Community Passport Service'
    },
    institutionType: 'PASAPOARTE',
    county: 'IS',
    city: 'Iași',
    address: 'B-dul Primăverii nr. 36, Iași, jud. Iași',
    coordinates: { lat: 47.1522, lng: 27.6045 },
    phone: '0232 211 800',
    email: 'pasapoarte-is@prefecturaiasi.ro',
    websiteUrl: 'https://is.prefectura.mai.gov.ro',
    bookingUrl: 'https://epasapoarte.ro',
    providedServiceIds: ['serv-pasapoarte'],
    relatedProcedureIds: ['pasaport-electronic'],
    openingHours: {
      ro: 'Luni, Marți, Joi: 08:30–16:30; Miercuri: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Thu: 08:30–16:30; Wed: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://epasapoarte.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-is-igi',
    name: {
      ro: 'Inspectoratul General pentru Imigrări — Serviciul pentru Imigrări Iași',
      en: 'Iași Immigration Service (IGI)'
    },
    institutionType: 'IGI',
    county: 'IS',
    city: 'Iași',
    address: 'Str. Mihai Costăchescu nr. 6, Iași, jud. Iași',
    coordinates: { lat: 47.1782, lng: 27.5701 },
    phone: '0232 302 166',
    email: 'is.igi@mai.gov.ro',
    websiteUrl: 'https://igi.mai.gov.ro',
    bookingUrl: 'https://portaligi.mai.gov.ro',
    providedServiceIds: ['serv-imigrare-igi'],
    relatedProcedureIds: ['rezidenta-ue', 'permis-sedere-non-ue-munca'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:30; Vineri: 08:30–14:00',
      en: 'Monday – Thursday: 08:30–16:30; Friday: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://portaligi.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-24T10:00:00Z',
    verificationStatus: 'verified'
  },

  // ==================== BRAȘOV ====================
  {
    id: 'off-bv-spclep',
    name: {
      ro: 'SPCLEP Brașov — Serviciul de Evidență a Persoanelor Titulescu',
      en: 'SPCLEP Brașov — Civil Registry Office'
    },
    institutionType: 'SPCLEP',
    county: 'BV',
    city: 'Brașov',
    address: 'B-dul Nicolae Titulescu nr. 28, Brașov, jud. Brașov',
    coordinates: { lat: 45.6514, lng: 25.6038 },
    phone: '0268 414 460',
    email: 'evidentapersoanelor@brasovcity.ro',
    websiteUrl: 'https://brasovcity.ro',
    bookingUrl: 'https://hub.mai.gov.ro',
    providedServiceIds: ['serv-buletin'],
    relatedProcedureIds: ['buletin-14-ani', 'buletin-schimbare'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri: 08:30–16:30; Joi: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Wed: 08:30–16:30; Thu: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://brasovcity.ro',
    lastVerifiedTimestamp: '2026-03-20T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-bv-dgpciv',
    name: {
      ro: 'DGPCIV Brașov — Serviciul Permise Auto & Înmatriculări Turnului (Coresi)',
      en: 'DGPCIV Brașov — Driving Licenses & Vehicle Registration (Coresi)'
    },
    institutionType: 'PERMISE_AUTO',
    county: 'BV',
    city: 'Brașov',
    address: 'Str. Turnului nr. 5, Centrul Comercial Coresi, Brașov',
    coordinates: { lat: 45.6721, lng: 25.6142 },
    phone: '0268 410 400',
    email: 'permise-brasov@mai.gov.ro',
    websiteUrl: 'https://dgpci.mai.gov.ro',
    bookingUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/',
    providedServiceIds: ['serv-permise-auto', 'serv-inmatriculari'],
    relatedProcedureIds: ['permis-conducere-schimbare', 'inmatriculare-auto'],
    openingHours: {
      ro: 'Luni – Vineri: 08:30–16:30',
      en: 'Monday – Friday: 08:30–16:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://dgpci.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-bv-pasapoarte',
    name: {
      ro: 'Serviciul Public Comunitar de Pașapoarte Brașov — Turnului',
      en: 'Brașov Community Passport Service'
    },
    institutionType: 'PASAPOARTE',
    county: 'BV',
    city: 'Brașov',
    address: 'Str. Turnului nr. 5, Centrul Comercial Coresi, Brașov',
    coordinates: { lat: 45.6725, lng: 25.6146 },
    phone: '0268 410 800',
    email: 'pasapoarte@prefecturabrasov.ro',
    websiteUrl: 'https://bv.prefectura.mai.gov.ro',
    bookingUrl: 'https://epasapoarte.ro',
    providedServiceIds: ['serv-pasapoarte'],
    relatedProcedureIds: ['pasaport-electronic'],
    openingHours: {
      ro: 'Luni, Marți, Joi: 08:30–16:30; Miercuri: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Thu: 08:30–16:30; Wed: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://epasapoarte.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },

  // ==================== CONSTANȚA ====================
  {
    id: 'off-ct-spclep',
    name: {
      ro: 'SPCLEP Constanța — Direcția Locală de Evidență a Persoanelor Tomis Mall',
      en: 'SPCLEP Constanța — Civil Registry Office Tomis Mall'
    },
    institutionType: 'SPCLEP',
    county: 'CT',
    city: 'Constanța',
    address: 'Str. Ștefan cel Mare nr. 36-40, Tomis Mall etaj 3, Constanța',
    coordinates: { lat: 44.1798, lng: 28.6514 },
    phone: '0241 488 400',
    email: 'dlep@primaria-constanta.ro',
    websiteUrl: 'https://primaria-constanta.ro',
    bookingUrl: 'https://hub.mai.gov.ro',
    providedServiceIds: ['serv-buletin'],
    relatedProcedureIds: ['buletin-14-ani', 'buletin-schimbare'],
    openingHours: {
      ro: 'Luni – Vineri: 08:30–16:30',
      en: 'Monday – Friday: 08:30–16:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://primaria-constanta.ro',
    lastVerifiedTimestamp: '2026-03-20T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-ct-pasapoarte',
    name: {
      ro: 'Serviciul Public Comunitar de Pașapoarte Constanța — Tomis Mall',
      en: 'Constanța Community Passport Service'
    },
    institutionType: 'PASAPOARTE',
    county: 'CT',
    city: 'Constanța',
    address: 'Str. Ștefan cel Mare nr. 36-40, Tomis Mall etaj 3, Constanța',
    coordinates: { lat: 44.1802, lng: 28.6518 },
    phone: '0241 617 388',
    email: 'pasapoarte@prefecturaconstanta.ro',
    websiteUrl: 'https://ct.prefectura.mai.gov.ro',
    bookingUrl: 'https://epasapoarte.ro',
    providedServiceIds: ['serv-pasapoarte'],
    relatedProcedureIds: ['pasaport-electronic'],
    openingHours: {
      ro: 'Luni, Marți, Joi: 08:30–16:30; Miercuri: 08:30–18:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Thu: 08:30–16:30; Wed: 08:30–18:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://epasapoarte.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-ct-dgpciv',
    name: {
      ro: 'DGPCIV Constanța — Permise Auto & Înmatriculări Vehicule I.C. Brătianu',
      en: 'DGPCIV Constanța — Driving Licenses & Vehicle Registration'
    },
    institutionType: 'PERMISE_AUTO',
    county: 'CT',
    city: 'Constanța',
    address: 'B-dul I.C. Brătianu nr. 246, Constanța, jud. Constanța',
    coordinates: { lat: 44.1725, lng: 28.6012 },
    phone: '0241 555 422',
    email: 'permise-constanta@mai.gov.ro',
    websiteUrl: 'https://dgpci.mai.gov.ro',
    bookingUrl: 'https://dgpci.mai.gov.ro/drpciv-booking/',
    providedServiceIds: ['serv-permise-auto', 'serv-inmatriculari'],
    relatedProcedureIds: ['permis-conducere-schimbare', 'inmatriculare-auto'],
    openingHours: {
      ro: 'Luni – Vineri: 08:30–16:30',
      en: 'Monday – Friday: 08:30–16:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    sourceUrl: 'https://dgpci.mai.gov.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  // ==================== INSTITUȚII ADMINISTRATIVE SPECIFICE DOMENIILOR NOI ====================
  {
    id: 'off-b-stare-civila-s1',
    name: {
      ro: 'Primăria Sector 1 — Serviciul Stare Civilă (Nașteri, Căsătorii)',
      en: 'Sector 1 City Hall — Civil Status Registry (Births, Marriages)'
    },
    institutionType: 'STARE_CIVILA',
    county: 'B',
    city: 'București (Sector 1)',
    address: 'B-dul Banu Manta nr. 9, Sector 1, București',
    coordinates: { lat: 44.4533, lng: 26.0759 },
    phone: '021 319 1013',
    email: 'starecivila@primarias1.ro',
    websiteUrl: 'https://www.primarias1.ro',
    bookingUrl: 'https://starecivila.primarias1.ro/programari',
    providedServiceIds: ['serv-stare-civila'],
    relatedProcedureIds: ['certificat-nastere-copil', 'casatorie-civila', 'transcriere-acte-stare-civila-diaspora'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri: 08:30–16:00; Joi: 08:30–18:00; Vineri: 08:30–13:30',
      en: 'Mon, Tue, Wed: 08:30–16:00; Thu: 08:30–18:00; Fri: 08:30–13:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    appointmentNotes: {
      ro: 'Dosarele de căsătorie se depun cu exact 11–14 zile calendaristice înainte de data oficierii conform legii.',
      en: 'Marriage declarations must be registered exactly 11 to 14 calendar days prior to ceremony.'
    },
    sourceUrl: 'https://www.primarias1.ro/stare-civila.html',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-ajpis',
    name: {
      ro: 'Agenția pentru Plăți și Inspecție Socială a Municipiului București (APISMB)',
      en: 'Bucharest Agency for Social Payments and Inspection (APISMB)'
    },
    institutionType: 'ANPIS',
    county: 'B',
    city: 'București (Sector 1)',
    address: 'Str. Ion Câmpineanu nr. 20, Sector 1, București',
    coordinates: { lat: 44.4377, lng: 26.0964 },
    phone: '021 314 3650',
    email: 'apismb@mmanpis.ro',
    websiteUrl: 'https://bucuresti.mmanpis.ro',
    bookingUrl: 'https://bucuresti.mmanpis.ro/programari-online/',
    providedServiceIds: ['serv-social-anpis'],
    relatedProcedureIds: ['alocatie-stat-copii', 'indemnizatie-crestere-copil', 'venit-minim-incluziune'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri, Joi: 08:30–16:30; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Wed, Thu: 08:30–16:30; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'walk_in',
    appointmentNotes: {
      ro: 'Cererile pentru alocație și ICC se pot transmite și online prin email sau platforma dedicată a primăriei de domiciliu.',
      en: 'Applications can also be submitted electronically via municipality online portals.'
    },
    sourceUrl: 'https://bucuresti.mmanpis.ro/',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-ajofm',
    name: {
      ro: 'Agenția Municipală pentru Ocuparea Forței de Muncă București (AMOFM)',
      en: 'Bucharest Municipal Employment Agency (AMOFM)'
    },
    institutionType: 'ANOFM',
    county: 'B',
    city: 'București (Sector 5)',
    address: 'Str. Spătaru Preda nr. 12, Sector 5, București',
    coordinates: { lat: 44.4172, lng: 26.0841 },
    phone: '021 316 5508',
    email: 'bucuresti@anofm.gov.ro',
    websiteUrl: 'https://www.anofm.ro/bucuresti/',
    providedServiceIds: ['serv-somaj-anofm'],
    relatedProcedureIds: ['indemnizatie-somaj', 'extras-revisal-vechime'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:30; Vineri: 08:30–13:30',
      en: 'Monday – Thursday: 08:30–16:30; Friday: 08:30–13:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'walk_in',
    sourceUrl: 'https://www.anofm.ro/bucuresti/',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-cnpp',
    name: {
      ro: 'Casa de Pensii a Municipiului București (CPMB) & CNPP',
      en: 'Bucharest Pension House (CPMB) & CNPP'
    },
    institutionType: 'CNPP',
    county: 'B',
    city: 'București (Sector 3)',
    address: 'Calea Vitan nr. 6, Sector 3, București',
    coordinates: { lat: 44.4239, lng: 26.1197 },
    phone: '021 326 0556',
    email: 'cpmb@cnpp.ro',
    websiteUrl: 'https://www.cpmb.ro',
    bookingUrl: 'https://www.cpmb.ro/programare-online',
    providedServiceIds: ['serv-pensii-cnpp'],
    relatedProcedureIds: ['pensie-limita-varsta', 'pensie-comunitara-internationala'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri: 08:30–16:30; Joi: 08:30–18:00; Vineri: 08:30–13:30',
      en: 'Mon, Tue, Wed: 08:30–16:30; Thu: 08:30–18:00; Fri: 08:30–13:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    appointmentNotes: {
      ro: 'Pentru pensii internaționale (perioade lucrate în străinătate), adresați-vă Compartimentului Relații Internaționale de la etajul 1.',
      en: 'For international bilateral pensions, contact International Relations Division on 1st floor.'
    },
    sourceUrl: 'https://www.cpmb.ro/',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-ancpi-ocpi',
    name: {
      ro: 'Oficiul de Cadastru și Publicitate Imobiliară București (OCPI București)',
      en: 'Bucharest Cadastre and Land Registration Office (OCPI)'
    },
    institutionType: 'ANCPI',
    county: 'B',
    city: 'București (Sector 1)',
    address: 'Splaiul Independenței nr. 202A, Sector 6, București',
    coordinates: { lat: 44.4372, lng: 26.0622 },
    phone: '021 312 9054',
    email: 'b@ancpi.ro',
    websiteUrl: 'https://b.ancpi.ro',
    providedServiceIds: ['serv-cadastru-ancpi'],
    relatedProcedureIds: ['extras-carte-funciara-online', 'certificat-urbanism'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:00; Vineri: 08:30–13:30',
      en: 'Monday – Thursday: 08:30–16:00; Friday: 08:30–13:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'walk_in',
    appointmentNotes: {
      ro: 'Extrasele de informare de carte funciară pot fi eliberate instant online 24/7 prin portalul epay.ancpi.ro, fără vizită la sediu.',
      en: 'Land book extracts for information can be issued online 24/7 on epay.ancpi.ro without office visit.'
    },
    sourceUrl: 'https://b.ancpi.ro/',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-onrc',
    name: {
      ro: 'Oficiul Registrului Comerțului de pe lângă Tribunalul București (ORCTB)',
      en: 'Trade Register Office for Bucharest Tribunal (ORCTB)'
    },
    institutionType: 'ONRC',
    county: 'B',
    city: 'București (Sector 3)',
    address: 'Intrarea Sectorului nr. 1, Sector 3, București',
    coordinates: { lat: 44.4312, lng: 26.1147 },
    phone: '021 316 0804',
    email: 'tb@onrc.ro',
    websiteUrl: 'https://www.onrc.ro',
    bookingUrl: 'https://myportal.onrc.ro',
    providedServiceIds: ['serv-onrc-firme'],
    relatedProcedureIds: ['infiintare-srl-onrc', 'infiintare-pfa-onrc'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:30; Vineri: 08:30–14:00',
      en: 'Monday – Thursday: 08:30–16:30; Friday: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    appointmentNotes: {
      ro: 'Depunerea cererilor este recomandată online prin noul portal myportal.onrc.ro utilizând semnătură electronică calificată.',
      en: 'Online submission is highly recommended via myportal.onrc.ro with qualified electronic signature.'
    },
    sourceUrl: 'https://www.onrc.ro/index.php/ro/orct/bucuresti',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-prefectura-apostila',
    name: {
      ro: 'Instituția Prefectului Municipiului București — Biroul Apostilă Haga',
      en: 'Bucharest Prefecture — Hague Apostille Desk'
    },
    institutionType: 'PREFECTURA_APOSTILA',
    county: 'B',
    city: 'București (Sector 1)',
    address: 'Piața Presei Libere nr. 1, Corp B, Et. 3, Sector 1, București',
    coordinates: { lat: 44.4801, lng: 26.0712 },
    phone: '021 311 9639',
    email: 'apostila@prefecturabucuresti.ro',
    websiteUrl: 'https://prefecturabucuresti.mai.gov.ro',
    providedServiceIds: ['serv-apostila-prefectura'],
    relatedProcedureIds: ['apostila-haga-prefectura'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri, Joi: 09:00–15:00; Vineri: 09:00–12:30',
      en: 'Mon, Tue, Wed, Thu: 09:00–15:00; Fri: 09:00–12:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'walk_in',
    appointmentNotes: {
      ro: 'Eliberarea apostilei pentru actele administrative se face gratuit, pe loc sau în termen de maximum 24 de ore lucrătoare.',
      en: 'Apostille issuance on administrative acts is free of charge and processed within 24 business hours.'
    },
    sourceUrl: 'https://prefecturabucuresti.mai.gov.ro/apostila/',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-b-anc-cetatenie',
    name: {
      ro: 'Autoritatea Națională pentru Cetățenie (ANC) — Sediul Central',
      en: 'National Citizenship Authority (ANC) — Central Headquarters'
    },
    institutionType: 'ALTELE',
    county: 'B',
    city: 'București (Sector 3)',
    address: 'Str. Smârdan nr. 3, Sector 3, București',
    coordinates: { lat: 44.4318, lng: 26.1011 },
    phone: '021 315 3575',
    email: 'cetatenie@just.ro',
    websiteUrl: 'https://cetatenie.just.ro',
    bookingUrl: 'https://cetatenie.just.ro/programare-online/',
    providedServiceIds: ['serv-cetatenie-anc'],
    relatedProcedureIds: ['redobandire-cetatenie-romana', 'viza-lunga-sedere-romania'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:00; Vineri: 08:30–13:00',
      en: 'Monday – Thursday: 08:30–16:00; Friday: 08:30–13:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'mandatory',
    appointmentNotes: {
      ro: 'Depunerea dosarelor de cetățenie (Art. 11 Legea 21/1991) se face exclusiv pe baza programării online prealabile.',
      en: 'Submitting citizenship restoration files requires mandatory pre-scheduled online appointment.'
    },
    sourceUrl: 'https://cetatenie.just.ro/',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-cj-cjp',
    name: {
      ro: 'Casa Județeană de Pensii Cluj (CJP Cluj)',
      en: 'Cluj County Pension House (CJP Cluj)'
    },
    institutionType: 'CNPP',
    county: 'CJ',
    city: 'Cluj-Napoca',
    address: 'Str. George Coșbuc nr. 2, Cluj-Napoca, jud. Cluj',
    coordinates: { lat: 46.7661, lng: 23.5794 },
    phone: '0264 431 010',
    email: 'pensii.cluj@cnpp.ro',
    websiteUrl: 'https://pensiicluj.ro',
    providedServiceIds: ['serv-pensii-cnpp', 'serv-social-anpis'],
    relatedProcedureIds: ['pensie-limita-varsta', 'pensie-comunitara-internationala', 'alocatie-stat-copii'],
    openingHours: {
      ro: 'Luni, Marți, Miercuri: 08:30–16:30; Joi: 08:30–18:00; Vineri: 08:30–14:00',
      en: 'Mon, Tue, Wed: 08:30–16:30; Thu: 08:30–18:00; Fri: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://pensiicluj.ro/',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-cj-onrc',
    name: {
      ro: 'Oficiul Registrului Comerțului de pe lângă Tribunalul Cluj (ORC Cluj)',
      en: 'Trade Register Office for Cluj Tribunal (ORC Cluj)'
    },
    institutionType: 'ONRC',
    county: 'CJ',
    city: 'Cluj-Napoca',
    address: 'Str. Nicolae Cristea nr. 28, Cluj-Napoca, jud. Cluj',
    coordinates: { lat: 46.7725, lng: 23.5962 },
    phone: '0264 432 602',
    email: 'orccj@onrc.ro',
    websiteUrl: 'https://www.onrc.ro',
    bookingUrl: 'https://myportal.onrc.ro',
    providedServiceIds: ['serv-onrc-firme'],
    relatedProcedureIds: ['infiintare-srl-onrc', 'infiintare-pfa-onrc'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:30; Vineri: 08:30–14:00',
      en: 'Monday – Thursday: 08:30–16:30; Friday: 08:30–14:00'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://www.onrc.ro',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  },
  {
    id: 'off-tm-cjp',
    name: {
      ro: 'Casa Județeană de Pensii Timiș (CJP Timiș)',
      en: 'Timiș County Pension House (CJP Timiș)'
    },
    institutionType: 'CNPP',
    county: 'TM',
    city: 'Timișoara',
    address: 'Str. Andrei Șaguna nr. 5A, Timișoara, jud. Timiș',
    coordinates: { lat: 45.7562, lng: 21.2405 },
    phone: '0256 308 050',
    email: 'pensii.timis@cnpp.ro',
    websiteUrl: 'https://pensiitimis.ro',
    providedServiceIds: ['serv-pensii-cnpp'],
    relatedProcedureIds: ['pensie-limita-varsta', 'pensie-comunitara-internationala'],
    openingHours: {
      ro: 'Luni – Joi: 08:30–16:30; Vineri: 08:30–13:30',
      en: 'Monday – Thursday: 08:30–16:30; Friday: 08:30–13:30'
    },
    accessibility: { wheelchairAccessible: true },
    appointmentRequirement: 'recommended',
    sourceUrl: 'https://pensiitimis.ro/',
    lastVerifiedTimestamp: '2026-03-22T10:00:00Z',
    verificationStatus: 'verified'
  }
];

export const VERIFIED_OFFICES = ADMINISTRATIVE_OFFICES;
