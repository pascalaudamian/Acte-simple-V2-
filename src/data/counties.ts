import { CountyOption } from '../types';

const COUNTY_NAMES: Array<[string, string, string]> = [
  ['AB', 'Alba', 'Alba'], ['AR', 'Arad', 'Arad'], ['AG', 'Argeș', 'Argeș'], ['BC', 'Bacău', 'Bacău'],
  ['BH', 'Bihor', 'Bihor'], ['BN', 'Bistrița-Năsăud', 'Bistrița-Năsăud'], ['BT', 'Botoșani', 'Botoșani'], ['BV', 'Brașov', 'Brașov'],
  ['BR', 'Brăila', 'Brăila'], ['BZ', 'Buzău', 'Buzău'], ['CS', 'Caraș-Severin', 'Caraș-Severin'], ['CL', 'Călărași', 'Călărași'],
  ['CJ', 'Cluj', 'Cluj'], ['CT', 'Constanța', 'Constanța'], ['CV', 'Covasna', 'Covasna'], ['DB', 'Dâmbovița', 'Dâmbovița'],
  ['DJ', 'Dolj', 'Dolj'], ['GL', 'Galați', 'Galați'], ['GR', 'Giurgiu', 'Giurgiu'], ['GJ', 'Gorj', 'Gorj'],
  ['HR', 'Harghita', 'Harghita'], ['HD', 'Hunedoara', 'Hunedoara'], ['IL', 'Ialomița', 'Ialomița'], ['IS', 'Iași', 'Iași'],
  ['IF', 'Ilfov', 'Ilfov'], ['MM', 'Maramureș', 'Maramureș'], ['MH', 'Mehedinți', 'Mehedinți'], ['MS', 'Mureș', 'Mureș'],
  ['NT', 'Neamț', 'Neamț'], ['OT', 'Olt', 'Olt'], ['PH', 'Prahova', 'Prahova'], ['SJ', 'Sălaj', 'Sălaj'],
  ['SM', 'Satu Mare', 'Satu Mare'], ['SB', 'Sibiu', 'Sibiu'], ['SV', 'Suceava', 'Suceava'], ['TR', 'Teleorman', 'Teleorman'],
  ['TM', 'Timiș', 'Timiș'], ['TL', 'Tulcea', 'Tulcea'], ['VS', 'Vaslui', 'Vaslui'], ['VL', 'Vâlcea', 'Vâlcea'],
  ['VN', 'Vrancea', 'Vrancea'], ['B', 'București', 'Bucharest']
];

export const COUNTIES: CountyOption[] = COUNTY_NAMES.map(([code, ro, en]) => ({ code, name: { ro, en } }));
