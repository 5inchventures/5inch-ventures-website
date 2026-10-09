/**
 * All site copy in one place. The site shows what 5INCH Ventures can build and the products we have
 * shipped — never the internals of client or in-house systems. Store facts are from the public
 * Google Play / App Store listings (developer: 5INCH VENTURES PRIVATE LIMITED).
 */
import { u } from '../lib/url';

export const company = {
  name: '5INCH Ventures',
  legalName: '5INCH VENTURES PRIVATE LIMITED',
  tagline: 'We build apps people actually use.',
  description:
    'A product studio from Surat. We design and build mobile apps, web platforms and business software — from first sketch to live on Google Play and the App Store.',
  url: new URL(u('/'), import.meta.env.SITE).toString(),
  email: '5inchventures@gmail.com',
  phone: '+91 63570 17016',
  phoneRaw: '916357017016',
  city: 'Surat, Gujarat, India',
  since: 2020,
  stores: {
    play: 'https://play.google.com/store/apps/dev?id=4942833907849113515',
  },
  offices: [
    {
      label: 'Studio',
      address: '220, 3rd Floor, Highfield Ascot, VIP Rd, opp. Palm Avenue, Vesu, Surat, Gujarat 395007',
      map: 'https://www.google.com/maps/search/?api=1&query=Highfield%20Ascot%2C%20VIP%20Road%2C%20Vesu%2C%20Surat',
    },
    {
      label: 'Registered office',
      address: 'A/202, Bella Casa Apartment, Althan Canal Road, Althan, Surat, Gujarat 395017',
      map: 'https://www.google.com/maps/search/?api=1&query=Bella%20Casa%20Apartment%2C%20Althan%20Canal%20Road%2C%20Surat',
    },
  ],
};

export const whatsapp = (text = 'Hi 5INCH Ventures, I would like to discuss a project.') =>
  `https://wa.me/${company.phoneRaw}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: 'Work', href: u('/work') },
  { label: 'Services', href: u('/services') },
  { label: 'Process', href: u('/#process') },
  { label: 'About', href: u('/about') },
  { label: 'Careers', href: u('/careers') },
];

/** Capability numbers only — all publicly verifiable. */
export const stats = [
  { value: '7', label: 'apps live on the stores', note: 'Google Play & App Store' },
  { value: '1K+', label: 'installs on a single app', note: 'Zeromeds, Google Play' },
  { value: '3', label: 'platforms we ship to', note: 'Android · iOS · Web' },
  { value: '2020', label: 'building since', note: 'Surat, India' },
];

export type App = {
  slug: string;
  name: string;
  mono: string;
  /** Real store icon (downloaded from the app's Google Play listing). */
  icon: string;
  color: string;
  kind: string;
  summary: string;
  features: string[];
  platforms: ('Android' | 'iOS')[];
  installs?: string;
  play?: string;
  appStore?: string;
};

export const apps: App[] = [
  {
    slug: 'zeromeds',
    icon: u('/apps/zeromeds.webp'),
    name: 'Zeromeds',
    mono: 'Z',
    color: '#22C55E',
    kind: 'B2B pharma ordering',
    summary: 'Links medical retailers with their distributors: order, track and settle outstandings from one app.',
    features: ['Seamless ordering', 'Real-time inventory', 'Order tracking', 'Outstanding & insights'],
    platforms: ['Android', 'iOS'],
    installs: '1K+',
    play: 'https://play.google.com/store/apps/details?id=com.zeromeds',
    appStore: 'https://apps.apple.com/in/app/zeromeds/id6503695925',
  },
  {
    slug: 'retailer',
    icon: u('/apps/retailer.webp'),
    name: 'Retailer By Fast Whistle',
    mono: 'R',
    color: '#38BDF8',
    kind: 'Retail ordering marketplace',
    summary: 'A marketplace app for chemists to order from distributors — with voice ordering and barcode scanning.',
    features: ['Voice-based quick ordering', 'Barcode scan to order', 'Order tracking', 'Margin details'],
    platforms: ['Android', 'iOS'],
    installs: '100+',
    play: 'https://play.google.com/store/apps/details?id=com.fastwhistle.retailer',
    appStore: 'https://apps.apple.com/in/app/retailer-by-fast-whistle/id6478477943',
  },
  {
    slug: 'fleet',
    icon: u('/apps/fleet.webp'),
    name: 'Fleet By Fast Whistle',
    mono: 'F',
    color: '#5B7CFF',
    kind: 'Field-force management',
    summary: 'Helps business owners run riders, salesmen and staff in the field with live monitoring and reports.',
    features: ['Tour plans & day planner', 'Tasks & approvals', 'Targets & expenses', 'Offline sync'],
    platforms: ['Android', 'iOS'],
    installs: '100+',
    play: 'https://play.google.com/store/apps/details?id=com.fastwhistle.fleet',
    appStore: 'https://apps.apple.com/in/app/fleet-by-fast-whistle/id6478852949',
  },
  {
    slug: 'distributor',
    icon: u('/apps/distributor.webp'),
    name: 'Distributor By Fast Whistle',
    mono: 'D',
    color: '#A78BFA',
    kind: 'Distributor operations',
    summary: 'Order handling, live tracking and delivery options for pharmaceutical distributors, in one app.',
    features: ['Order placement', 'Real-time tracking', 'Custom delivery options', 'Support & feedback'],
    platforms: ['Android', 'iOS'],
    play: 'https://play.google.com/store/apps/details?id=com.fastwhistle.distributor',
    appStore: 'https://apps.apple.com/in/app/distributor-by-fast-whistle/id6478273207',
  },
  {
    slug: 'rider',
    icon: u('/apps/rider.webp'),
    name: 'Fastwhistle Rider',
    mono: 'R',
    color: '#FFB547',
    kind: 'Delivery rider app',
    summary: 'Everything a delivery rider needs: orders, navigation, proof of delivery and earnings — even offline.',
    features: ['GPS navigation & routes', 'Photo & document proof', 'Offline mode with sync', 'Attendance & stats'],
    platforms: ['Android', 'iOS'],
    play: 'https://play.google.com/store/apps/details?id=com.fastwhistle.riders',
    appStore: 'https://apps.apple.com/in/app/fastwhistle-rider/id6752710409',
  },
  {
    slug: 'chakradhar',
    icon: u('/apps/chakradhar.webp'),
    name: 'Chakradhar Retailer',
    mono: 'C',
    color: '#F472B6',
    kind: 'Branded distributor app',
    summary: 'A personalised ordering app for Chakradhar’s retailers — live product updates, schemes and orders.',
    features: ['Streamlined ordering', 'Order tracking', 'Outstanding balance', 'Customer support'],
    platforms: ['Android', 'iOS'],
    installs: '50+',
    play: 'https://play.google.com/store/apps/details?id=com.chakradhar',
    appStore: 'https://apps.apple.com/in/app/chakradhar/id6502397465',
  },
  {
    slug: 'pavan',
    icon: u('/apps/pavan.webp'),
    name: 'Pavan Distributors',
    mono: 'P',
    color: '#FB7185',
    kind: 'Branded distributor app',
    summary: 'A branded Android app built for Pavan Distributors and published on Google Play under their own name.',
    features: ['Distributor-branded app', 'Own Play Store listing', '100+ installs'],
    platforms: ['Android'],
    installs: '100+',
    play: 'https://play.google.com/store/apps/details?id=com.pavan.distributor',
  },
];

export const websites = [
  {
    slug: 'fastwhistle-web',
    shot: u('/sites/fastwhistle.webp'),
    name: 'FastWhistle',
    url: 'https://fastwhistle.com',
    host: 'fastwhistle.com',
    kind: 'SaaS & logistics product website',
    summary: 'Multi-page product website with city landing pages, interactive product tours, 3D scroll storytelling and lead capture.',
    highlights: ['Product tours & 3D scroll section', 'City & feature SEO pages', 'Lead & careers forms'],
    color: '#3462F2',
  },
  {
    slug: 'kunthunath',
    shot: u('/sites/kunthunath.webp'),
    name: 'Kunthunath Medical Agency',
    url: 'https://kunthunathmedicalagency.com',
    host: 'kunthunathmedicalagency.com',
    kind: 'Corporate website · pharma distributor',
    summary: 'Corporate website for a Surat-based distributor of 5,000+ ethical medicines — services, infrastructure, leadership and pan-India reach.',
    highlights: ['Services & infrastructure pages', 'Leadership profiles', 'Pan-India customer map'],
    color: '#14B8A6',
  },
];

/** What we can build for clients (capabilities, not internals). */
export const services = [
  {
    id: 'mobile',
    title: 'Mobile apps',
    summary: 'Native-quality Android and iOS apps, published under your brand on Google Play and the App Store.',
    deliverables: ['Android & iOS apps', 'Store listing & publishing', 'Offline-first flows', 'Push notifications'],
  },
  {
    id: 'web',
    title: 'Web platforms & dashboards',
    summary: 'Admin panels, customer portals and SaaS dashboards that teams use all day without friction.',
    deliverables: ['Admin & ops dashboards', 'Customer portals', 'Roles & permissions', 'Reports & exports'],
  },
  {
    id: 'commerce',
    title: 'B2B ordering & marketplaces',
    summary: 'Ordering apps connecting retailers, distributors and brands — catalogues, schemes, orders and outstandings.',
    deliverables: ['Catalogue & ordering', 'Schemes & pricing', 'Order tracking', 'Outstanding & payments'],
  },
  {
    id: 'field',
    title: 'Delivery & field-force apps',
    summary: 'Apps for riders, salesmen and field staff: live location, routes, attendance and proof of work.',
    deliverables: ['Live GPS & routes', 'Attendance & tasks', 'Photo / signature proof', 'Manager dashboards'],
  },
  {
    id: 'websites',
    title: 'Websites that convert',
    summary: 'Fast, SEO-ready company and product websites with motion, storytelling and lead capture built in.',
    deliverables: ['Design & copy', 'SEO & performance', 'Animations & 3D', 'Lead forms & analytics'],
  },
  {
    id: 'whitelabel',
    title: 'White-label & branded apps',
    summary: 'Your brand, your customers, a proven product underneath — launched in weeks, not months.',
    deliverables: ['Your name & colours', 'Your store listings', 'Shared, maintained core', 'Fast launch'],
  },
];

/** High-level skills — no project internals. */
export const capabilities = ['Android', 'iOS', 'Web apps', 'Dashboards', 'Maps & GPS', 'Offline sync', 'Payments', 'Barcode & voice', 'Push notifications', 'SEO websites', 'UI/UX design', 'AI features'];

export const process = [
  { step: '01', title: 'Discover', text: 'We sit with the people who will use the product and map how the work really happens.', duration: '1–2 weeks' },
  { step: '02', title: 'Design', text: 'Clickable screens you can try on your phone before a single line of production code.', duration: '1–3 weeks' },
  { step: '03', title: 'Build', text: 'Short cycles with a working build every week. You see progress, not status reports.', duration: 'Weekly releases' },
  { step: '04', title: 'Launch & grow', text: 'Store publishing, go-live, then measured improvements as real users come in.', duration: 'Ongoing' },
];

export const industries = [
  { name: 'Pharma & healthcare', text: 'Ordering, distribution and delivery apps for distributors, chemists and their teams.' },
  { name: 'Logistics & last mile', text: 'Rider apps, dispatch dashboards, live tracking and proof of delivery.' },
  { name: 'Distribution & B2B trade', text: 'Branded ordering apps, schemes, catalogues and collections for distributor networks.' },
  { name: 'Field teams', text: 'Attendance, tasks, visits and expenses for any business that works on the road.' },
];

export const careers = {
  intro:
    'We are a small product team in Surat building apps that are live on the stores and used every day. You will ship to real users in your first weeks.',
  roles: ['Software Developer', 'Mobile App Developer', 'Backend Developer', 'UI/UX Designer', 'Sales / Business Development', 'Customer Support'],
  values: [
    { title: 'Ship to real users', text: 'Your work goes live on the Play Store and App Store, not into a drawer.' },
    { title: 'Own the whole thing', text: 'Design, build, launch, watch it run. No hand-offs between ten teams.' },
    { title: 'Small team, big impact', text: 'Every person here changes what the product looks like next month.' },
  ],
};
