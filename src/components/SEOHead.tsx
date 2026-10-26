import React, { useEffect } from 'react';
import { Language, Procedure } from '../types';

interface SEOHeadProps {
  lang: Language;
  activeTab: string;
  procedure?: Procedure | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ lang, activeTab, procedure }) => {
  useEffect(() => {
    // 1. Compute dynamic title and description
    let pageTitle = '';
    let pageDescription = '';
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://actesimple.ro';
    let canonicalUrl = `${origin}/?lang=${lang}`;

    if (procedure) {
      pageTitle = `${procedure.title[lang]} — ActeSimple.ro`;
      pageDescription = procedure.shortSummary[lang];
      canonicalUrl = `${origin}/?tab=detail&procedure=${procedure.id}&lang=${lang}`;
    } else {
      switch (activeTab) {
        case 'wizard':
          pageTitle = lang === 'ro'
            ? 'Asistent Orientare Evenimente de Viață — ActeSimple.ro'
            : 'Life-Events Administrative Orientation Wizard — ActeSimple.ro';
          pageDescription = lang === 'ro'
            ? 'Află exact ce proceduri administrative trebuie să urmezi în funcție de cetățenie, județ și evenimentul de viață.'
            : 'Find out exactly which administrative procedures to follow based on citizenship, county, and your life event.';
          canonicalUrl = `${origin}/?tab=wizard&lang=${lang}`;
          break;
        case 'offices':
          pageTitle = lang === 'ro'
            ? 'Ghișee & Birouri Administrative Județene — ActeSimple.ro'
            : 'County Administrative Offices Finder — ActeSimple.ro';
          pageDescription = lang === 'ro'
            ? 'Găsește ghișeele oficiale SPCLEP, Pașapoarte, Permise, IGI și Cazier din județul tău, cu program și linkuri oficiale.'
            : 'Find official SPCLEP, Passport, Driving License, IGI and Police offices across Romanian counties with opening hours and links.';
          canonicalUrl = `${origin}/?tab=offices&lang=${lang}`;
          break;
        case 'forms':
          pageTitle = lang === 'ro'
            ? 'Generare Formulare & Cereri Administrative — ActeSimple.ro'
            : 'Administrative Form Preparation Templates — ActeSimple.ro';
          pageDescription = lang === 'ro'
            ? 'Pregătește cereri și declarații tipizate fără date cu caracter personal stocate pe server.'
            : 'Prepare standardized Romanian administrative application templates without personal data stored on servers.';
          canonicalUrl = `${origin}/?tab=forms&lang=${lang}`;
          break;
        case 'checklists':
          pageTitle = lang === 'ro'
            ? 'Listele Mele de Documente Salvate — ActeSimple.ro'
            : 'My Saved Document Checklists — ActeSimple.ro';
          pageDescription = lang === 'ro'
            ? 'Urmărește documentele bifate și pașii parcurși offline, cu garanție totală de confidențialitate GDPR.'
            : 'Track your checked documents and completed steps offline with full GDPR zero-data-retention privacy.';
          canonicalUrl = `${origin}/?tab=checklists&lang=${lang}`;
          break;
        case 'sources':
        case 'editorial':
          pageTitle = lang === 'ro'
            ? 'Monitorizare Surse Oficiale & Audit Redacțional — ActeSimple.ro'
            : 'Official Source Monitoring & Editorial Audit — ActeSimple.ro';
          pageDescription = lang === 'ro'
            ? 'Transparență și monitorizare proactivă a modificărilor legislative din România (ANAF, MAI, IGI, CNAS, DGEP).'
            : 'Transparency and proactive monitoring of Romanian administrative legal sources and institutional portals.';
          canonicalUrl = `${origin}/?tab=editorial&lang=${lang}`;
          break;
        case 'audit':
          pageTitle = lang === 'ro'
            ? 'Panou de Audit Civic & Conformitate Tehnică — ActeSimple.ro'
            : 'Civic QA & Technical Compliance Audit Dashboard — ActeSimple.ro';
          pageDescription = lang === 'ro'
            ? 'Verificare în timp real a celor 25 de criterii de audit civic, securitate API, bilingvism și persistență.'
            : 'Live verification of 25 civic QA criteria, API security, bilingual parity, and durable persistence.';
          canonicalUrl = `${origin}/?tab=audit&lang=${lang}`;
          break;
        case 'catalog':
          pageTitle = lang === 'ro'
            ? 'Catalog Proceduri Administrative România — ActeSimple.ro'
            : 'Romania Administrative Procedures Catalog — ActeSimple.ro';
          pageDescription = lang === 'ro'
            ? 'Ghid civic complet: pașapoarte, buletine, permise, rezidență, beneficii, pensii, diplome și companii.'
            : 'Complete civic directory: passports, ID cards, driving licenses, immigration, pensions, education and business.';
          canonicalUrl = `${origin}/?tab=catalog&lang=${lang}`;
          break;
        default:
          pageTitle = lang === 'ro'
            ? 'ActeSimple — Proceduri administrative explicate simplu'
            : 'ActeSimple — Romanian Administrative Procedures Clearly Explained';
          pageDescription = lang === 'ro'
            ? 'Ghid civic și asistent pentru proceduri administrative din România: documente necesare, taxe, programări oficiale și liste de verificare.'
            : 'Civic guide and assistant for administrative procedures in Romania: required documents, fees, official appointments and checklists.';
          canonicalUrl = `${origin}/?lang=${lang}`;
          break;
      }
    }

    // 2. Update Document Title
    document.title = pageTitle;

    // 3. Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaTag('name', 'description', pageDescription);
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', procedure ? 'article' : 'website');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', pageDescription);

    // 4. Update canonical & hreflang link tags
    const setLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let link = document.querySelector(selector) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        if (hreflang) link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    setLinkTag('canonical', canonicalUrl);

    // Generate alternate language URLs
    const urlRo = new URL(canonicalUrl);
    urlRo.searchParams.set('lang', 'ro');
    const urlEn = new URL(canonicalUrl);
    urlEn.searchParams.set('lang', 'en');

    setLinkTag('alternate', urlRo.toString(), 'ro');
    setLinkTag('alternate', urlEn.toString(), 'en');
    setLinkTag('alternate', urlRo.toString(), 'x-default');

    // 5. Schema.org JSON-LD structured data
    let schemaScript = document.getElementById('actesimple-schema-json') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'actesimple-schema-json';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    if (procedure) {
      const totalFee = procedure.fees.reduce((acc, f) => acc + f.amount, 0);
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: procedure.title[lang],
        description: procedure.shortSummary[lang],
        serviceType: procedure.category,
        provider: {
          '@type': 'GovernmentOrganization',
          name: procedure.institution.name,
          url: procedure.officialServiceUrl
        },
        audience: {
          '@type': 'Audience',
          audienceType: procedure.audience.join(', ')
        },
        offers: {
          '@type': 'Offer',
          price: totalFee.toString(),
          priceCurrency: 'RON'
        },
        url: canonicalUrl
      };
      schemaScript.textContent = JSON.stringify(schemaData, null, 2);
    } else {
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'ActeSimple',
        url: origin,
        description: pageDescription,
        applicationCategory: 'GovernmentApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'RON'
        }
      };
      schemaScript.textContent = JSON.stringify(schemaData, null, 2);
    }
  }, [lang, activeTab, procedure]);

  return null;
};
