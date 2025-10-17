import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun, TableOfContents, PageBreak } from "docx";
import fs from "node:fs";
import path from "node:path";
import fetch from "node-fetch";

const OUT_DIR = path.resolve("docs");
const OUT_FILE = path.join(OUT_DIR, "UG_Mentorship_Hub_Project_Documentation.docx");
const LOGO_URL = "https://www.ug.edu.gh/sites/default/files/ug_standard_logo.png";

// Metadata
const TITLE = "University of Ghana Mentorship Hub – Project Documentation";
const AUTHOR = "Osborne Jahdiel Sebuabe";
const STUDENT_ID = "10956967";
const SUPERVISOR = "Dr. Matilda Acheampong";
const DATE_STR = new Date().toLocaleDateString();

// Helper to center a heading
const H = (text, level = HeadingLevel.HEADING_1) =>
  new Paragraph({ text, heading: level, alignment: AlignmentType.CENTER, spacing: { after: 200 } });

const P = (text) =>
  new Paragraph({ children: [new TextRun({ text })], alignment: AlignmentType.LEFT, spacing: { after: 200 } });

const B = (label, text) =>
  new Paragraph({
    children: [new TextRun({ text: `${label}: `, bold: true }), new TextRun({ text })],
    spacing: { after: 120 },
  });

  const LOGO_PATH = path.resolve("assets/ug_logo.jpeg");

  async function fetchLogoBuffer() {
    if (!fs.existsSync(LOGO_PATH)) {
      throw new Error(`Logo not found at ${LOGO_PATH}`);
    }
    return fs.readFileSync(LOGO_PATH);
  }
  
  async function main() {
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  
    const logo = await fetchLogoBuffer();
  
    const cover = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: logo,
            transformation: { width: 160, height: 160 },
          }),
        ],
        spacing: { after: 400 },
      }),
      H(TITLE, HeadingLevel.TITLE),
      new Paragraph({ text: "", spacing: { after: 200 } }),
      B("Author", AUTHOR),
      B("Student ID", STUDENT_ID),
      B("Supervisor", SUPERVISOR),
      B("Date", DATE_STR),
      new PageBreak(),
    ];

    const toc = [
        new Paragraph({
          text: "Table of Contents",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 },
        }),
        new TableOfContents("Contents", {
          hyperlink: true,
          headingStyleRange: "1-5",
          stylesWithLevels: [
            { styleName: "Heading 1", level: 1 },
            { styleName: "Heading 2", level: 2 },
            { styleName: "Heading 3", level: 3 },
          ],
        }),
        new PageBreak(),
      ];
    
      const body = [
        H("1. Introduction", HeadingLevel.HEADING_1),
        P("The University of Ghana Mentorship Hub is a web application designed to bridge the gap between students and lecturers through structured mentorship, combining digital and in‑person modalities."),
    
        H("2. Objectives and Scope", HeadingLevel.HEADING_1),
        P("Objectives include rule-based mentor matching with mentor approvals, session scheduling, messaging, resource libraries, alumni micro‑mentorship, analytics, and consent-aware data handling."),
        P("Scope covers the Vite + React + TypeScript frontend integrated with Supabase for auth, data, and storage; production deployment on Vercel."),
    
        H("3. Architecture", HeadingLevel.HEADING_1),
        H("3.1 High-Level", HeadingLevel.HEADING_2),
        P("Client: Vite + React + TypeScript SPA on Vercel. Backend services: Supabase (PostgreSQL, Auth, Storage). Data fetching & caching: React Query."),
        H("3.2 Stack", HeadingLevel.HEADING_2),
        P("React 18, TypeScript, Vite, React Router 6, @tanstack/react-query, Supabase JS, shadcn/ui + Radix UI, Tailwind CSS, Recharts."),
        H("4. Data and Integrations", HeadingLevel.HEADING_1),
        P("Supabase is used for authentication, Postgres database, and Storage. Environment variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY."),
    
        H("5. Features", HeadingLevel.HEADING_1),
        P("Matching (rule-based), scheduling, messaging, resources, analytics (session frequency, response times, satisfaction), consent & role-based access, alumni micro‑mentorship."),
    
        H("6. Security & Privacy", HeadingLevel.HEADING_1),
        P("Supabase Auth with JWTs, client-only anon key exposure, planned RLS policies, consent capture, anonymized analytics."),
    
        H("7. Deployment", HeadingLevel.HEADING_1),
        P("Vercel preset: Vite; Root: ug-mentorship-hub-main; Build: npm run build; Output: dist; SPA rewrites via vercel.json. Env vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY."),
    
        H("8. Roadmap", HeadingLevel.HEADING_1),
        P("Short term: matching & approvals, booking, resource uploads, basic analytics. Medium: alumni micro‑mentorship, offline bundles, admin tooling. Long: push/SMS, predictive matching, institutional reporting."),
    
        H("9. References (APA)", HeadingLevel.HEADING_1),
        P("Lidbury, T., Jotzscha, T., & Contributors. (n.d.). TanStack Query (React Query). https://tanstack.com/query/latest"),
        P("Radix UI. (n.d.). Radix Primitives. https://www.radix-ui.com/primitives"),
        P("shadcn. (n.d.). shadcn/ui. https://ui.shadcn.com"),
        P("Supabase. (n.d.). Documentation. https://supabase.com/docs"),
        P("Vite. (n.d.). Vite. https://vitejs.dev"),
        P("React Router. (n.d.). Documentation. https://reactrouter.com"),
        P("Recharts. (n.d.). Recharts. https://recharts.org"),
      ];
    
      const doc = new Document({
        creator: AUTHOR,
        title: TITLE,
        description: "Project documentation for the University of Ghana Mentorship Hub.",
        sections: [{ children: [...cover, ...toc, ...body] }],
      });

      const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT_FILE, buffer);
  console.log(`Generated: ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});