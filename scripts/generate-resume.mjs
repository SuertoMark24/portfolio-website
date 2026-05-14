// Generates src/assets/cv/resume.docx from the same content as resume-template.html.
// Run with: node scripts/generate-resume.mjs
// Re-run whenever you want to regenerate the Word file from this script's content.

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TabStopType,
  TabStopPosition,
} from 'docx'
import fs from 'node:fs'
import path from 'node:path'

const ACCENT = 'E07B53'
const INK = '2A1F1C'
const RULE = 'D8CFC9'

const noBorders = () => {
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
  return {
    top: none, bottom: none, left: none, right: none,
    insideHorizontal: none, insideVertical: none,
  }
}

const ruleLine = () =>
  new Paragraph({
    children: [new TextRun({ text: '' })],
    border: { bottom: { color: RULE, size: 6, style: BorderStyle.SINGLE, space: 1 } },
    spacing: { before: 80, after: 160 },
  })

const sectionHeading = (text) =>
  new Paragraph({
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, color: ACCENT, size: 26, font: 'Calibri' }),
    ],
    spacing: { before: 280, after: 60 },
    border: { bottom: { color: RULE, size: 6, style: BorderStyle.SINGLE, space: 4 } },
  })

const jobHeader = (title, date) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: title, bold: true, color: ACCENT, size: 24, font: 'Calibri' }),
      new TextRun({ text: '\t' }),
      new TextRun({ text: date, bold: true, color: INK, size: 22, font: 'Calibri' }),
    ],
    spacing: { before: 200, after: 40 },
  })

const companyLine = (company) =>
  new Paragraph({
    children: [
      new TextRun({ text: company, italics: true, bold: true, color: INK, size: 22, font: 'Calibri' }),
    ],
    spacing: { after: 60 },
  })

const bullet = (text) =>
  new Paragraph({
    bullet: { level: 0 },
    children: [new TextRun({ text, color: INK, size: 22, font: 'Calibri' })],
    spacing: { after: 40 },
  })

const labeledBullet = (label, rest) =>
  new Paragraph({
    bullet: { level: 0 },
    children: [
      new TextRun({ text: label + ' ', bold: true, color: INK, size: 22, font: 'Calibri' }),
      new TextRun({ text: rest, color: INK, size: 22, font: 'Calibri' }),
    ],
    spacing: { after: 60 },
  })

const contactRow = (label, value) =>
  new TableRow({
    children: [
      new TableCell({
        width: { size: 18, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            children: [new TextRun({ text: label, bold: true, color: INK, size: 22, font: 'Calibri' })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 82, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({
            children: [new TextRun({ text: value, color: INK, size: 22, font: 'Calibri' })],
          }),
        ],
      }),
    ],
  })

const doc = new Document({
  creator: 'Mark Anthony Suerto',
  title: 'Mark Anthony Suerto — Resume',
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22, color: INK },
        paragraph: { spacing: { line: 300 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: { margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 } }, // ~0.7"
      },
      children: [
        // Name
        new Paragraph({
          children: [
            new TextRun({ text: 'MARK ANTHONY SUERTO', bold: true, color: ACCENT, size: 56, font: 'Calibri' }),
          ],
          spacing: { after: 160 },
        }),

        // Contact table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: noBorders(),
          rows: [
            contactRow('Address:',   'Negros Occidental, Philippines'),
            contactRow('Phone:',     '+63 938 294 7924'),
            contactRow('Email:',     'markanthonysuerto@gmail.com'),
            contactRow('Portfolio:', 'markanthonysuerto-portfolio.vercel.app'),
            contactRow('LinkedIn:',  'linkedin.com/in/mark-anthony-suerto-6a06881bb'),
          ],
        }),

        ruleLine(),

        // Profile
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({
              text:
                'Full Stack Engineer with 5+ years of experience building enterprise-grade web applications on ASP.NET Core, C#, and SQL Server. Specialized in nopCommerce e-commerce platforms, RESTful API development, and clean-architecture backends. Beyond code, I work as a video editor and build AI-driven automation pipelines that schedule and publish content to TikTok and Facebook. Comfortable owning features end-to-end — from database design and API contracts to frontend delivery and post-launch optimization.',
              color: INK,
              size: 22,
              font: 'Calibri',
            }),
          ],
          spacing: { after: 120 },
        }),

        ruleLine(),

        // Work Experience
        sectionHeading('Work Experience'),

        jobHeader('Software Engineer', '2020 – Present'),
        companyLine('2DO IT, ERP & WEB SOLUTIONS'),
        bullet('Own end-to-end feature delivery on nopCommerce e-commerce platforms — covering server-side logic in C# / ASP.NET MVC, Razor and React-based storefronts, RESTful Web APIs, and the underlying SQL Server data layer.'),
        labeledBullet('Payment gateways and checkout flows —', 'designed and integrated end-to-end, including third-party provider connections, secure token handling, webhook listeners, order-state reconciliation, and refund and dispute logic.'),
        bullet('Architect RESTful Web APIs with JWT authentication, role-based authorization, Swagger documentation, and consumer-facing SDKs for partner, mobile, and ERP integrations.'),
        bullet('Develop responsive front-end interfaces using HTML, CSS, JavaScript, and React, ensuring consistent UX across desktop and mobile storefronts and admin dashboards.'),
        bullet('Build custom nopCommerce plugins and modules for catalog, pricing, promotions, shipping, tax, and admin workflows, integrating cleanly with the platform’s extensibility model.'),
        bullet('Optimize SQL Server performance — refactoring schemas, stored procedures, indexes, and Entity Framework queries to improve response times across catalog, search, and checkout pages.'),
        bullet('Manage deployments, environment configuration, and post-release monitoring on IIS and Azure; handle production incident response, hotfix delivery, and database migration safety.'),
        bullet('Collaborate with clients and project managers in an Agile setup — scoping, estimating, and delivering features from requirements gathering through QA and release.'),

        jobHeader('Faculty Teacher (Part-time)', '2024'),
        companyLine('STI COLLEGE'),
        labeledBullet('Database course —', 'teaching SQL fundamentals, relational design and normalization, ER modeling, query writing and optimization, and hands-on lab work in SQL Server and MySQL, including the implementation of stored procedures and views.'),
        labeledBullet('Android Development module —', 'covering Android Studio setup, Java/Kotlin basics, activity and fragment lifecycle, XML layouts and UI components, intents, data persistence, and the end-to-end build and deployment of functional mobile applications.'),
        labeledBullet('Basic Programming (C#) course —', 'introducing programming fundamentals such as variables, data types, control flow, methods, and core object-oriented concepts (classes, inheritance, encapsulation), reinforced with hands-on console-application exercises in .NET.'),
        bullet('Prepare detailed lesson plans, weekly lab exercises, quizzes, and end-of-term assessments aligned with the STI curriculum; mentor students on capstone and term projects, code reviews, and debugging sessions.'),

        jobHeader('WordPress Developer', '2018 – 2019'),
        companyLine('INFINITECH SOLUTIONS'),
        bullet('Built responsive WordPress websites using PHP, HTML, CSS, and JavaScript.'),
        bullet('Delivered custom themes and plugins tailored to client requirements.'),
        bullet('Maintained existing client sites, handling content updates, performance fixes, and bug resolution.'),

        jobHeader('Graphic Designer', '2017 – 2018'),
        companyLine('ZEPH SOLUTIONS'),
        bullet('Designed layouts and production assets for advertisements, brochures, magazines, and reports.'),
        bullet('Worked directly with clients to translate briefs into print-ready deliverables.'),

        jobHeader('Junior Software Quality Assurance', 'Dec 2016 – Oct 2017'),
        companyLine('MYDRIVEHOLIDAY CAMPER TRAVEL'),
        bullet('Validated and secured campervan booking data — verifying reservation records, pricing accuracy across vehicle types and date ranges, and data integrity throughout the booking pipeline.'),
        bullet('Performed end-to-end functional testing of the booking website — covering reservation flows, search and filter logic, payment paths, and admin/operator dashboards.'),
        bullet('Validated UI/UX consistency across desktop and mobile views — flagging layout issues, responsive bugs, and usability gaps for the development team.'),
        bullet('Documented test cases, defects, and reproduction steps; collaborated with developers to verify fixes and regression-test releases before deployment.'),

        // Education
        sectionHeading('Education'),
        jobHeader('Bachelor of Science in Information Systems', '2012 – 2016'),
        companyLine('Carlos Hilado Memorial State College'),
        new Paragraph({
          children: [
            new TextRun({ text: 'Major in Web and Mobile Development', italics: true, color: INK, size: 22, font: 'Calibri' }),
          ],
          spacing: { after: 60 },
        }),

        // Certifications
        sectionHeading('Certifications'),
        jobHeader('Learn Photoshop — Essential Training Course', 'April 2021'),
        companyLine('Udemy Online Courses'),
        jobHeader('Microsoft 365 Ultimate Guide 2022', 'April 2021'),
        companyLine('Udemy Online Courses'),

        // Additional Information
        sectionHeading('Additional Information'),
        labeledBullet('Backend:', 'ASP.NET Core, ASP.NET MVC, Blazor, C#, PHP, Entity Framework Core, SQL Server, Web API, nopCommerce'),
        labeledBullet('Frontend:', 'React, Angular, Blazor, JavaScript, HTML5, CSS3, Tailwind CSS, Framer Motion'),
        labeledBullet('Cloud & DevOps:', 'Azure App Services, Azure SQL Database, CI/CD pipelines, Git'),
        labeledBullet('Video Editing:', 'CapCut, Vegas Pro, Filmora, Adobe Premiere Pro, DaVinci Resolve, FFmpeg, color grading, short-form content'),
        labeledBullet('AI Automation:', 'Node.js, Playwright, OpenAI / Claude APIs, TikTok Upload, Facebook Graph API, scheduled cross-platform publishing'),
        labeledBullet('Tools:', 'Visual Studio, VS Code, Postman, Swagger, Git, Jira'),
        labeledBullet('Strengths:', 'Clean architecture, SOLID principles, performance optimization, Agile delivery, cross-discipline collaboration'),
      ],
    },
  ],
})

const outDir = path.join('src', 'assets', 'cv')
const outPath = path.join(outDir, 'resume.docx')
fs.mkdirSync(outDir, { recursive: true })

const buffer = await Packer.toBuffer(doc)
fs.writeFileSync(outPath, buffer)
console.log('Wrote', outPath, '(' + buffer.length + ' bytes)')
