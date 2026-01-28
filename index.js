function formatDate(dateString) {
  if (!dateString) return '';
  return dateString.replace(/-/g, '.');
}

function formatDateRange(startDate, endDate) {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'present';
  return `(${start} - ${end})`;
}

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

function buildWorkItem(job) {
  const dateRange = formatDateRange(job.startDate, job.endDate);
  const positionTitle = toTitleCase(job.position);
  const description = job.summary ? `<div class="item-description">${job.summary}</div>` : '';
  const highlights = job.highlights && job.highlights.length > 0 
    ? `<div class="item-skills">${job.highlights.join(' • ')}</div>` 
    : '';
  return `<div class="experience-item">
    <div class="item-header"><strong>${positionTitle}</strong> <em>@ ${job.name}</em> ${dateRange}</div>
    ${description}
    ${highlights}
  </div>`;
}

exports.render = (resume) => {
  const { basics, work = [], education = [], publications = [], projects = [] } = resume;
  
  // Build contact line
  const contactParts = [];
  if (basics.email) contactParts.push(`<a href="mailto:${basics.email}">${basics.email}</a>`);
  if (basics.phone) contactParts.push(`<a href="tel:${basics.phone}">${basics.phone}</a>`);
  if (basics.url) contactParts.push(`<a href="${basics.url}">${basics.url}</a>`);
  if (basics.location) {
    const locationStr = [basics.location.city, basics.location.region, basics.location.countryCode]
      .filter(Boolean)
      .join(', ');
    if (locationStr) contactParts.push(locationStr);
  }
  const contactLine = contactParts.join(' | ');

  // Split work into top 4 and remaining
  const topWork = work.slice(0, 4);
  const otherWork = work.slice(4);
  const topWorkItems = topWork.map(buildWorkItem).join('');
  const otherWorkItems = otherWork.map(buildWorkItem).join('');

  // Build education
  const educationItems = education.map(edu => {
    const dateRange = formatDateRange(edu.startDate, edu.endDate);
    const degreeInfo = [edu.studyType, edu.area].filter(Boolean).join(' in ');
    const degreeTitle = toTitleCase(degreeInfo);
    const description = edu.summary ? `<div class="item-description">${edu.summary}</div>` : '';
    return `<div class="education-item">
      <div class="item-header"><strong>${degreeTitle}</strong>, <em>${edu.institution}</em> ${dateRange}</div>
      ${description}
    </div>`;
  }).join('');

  // Build publications
  const publicationItems = publications.map(pub => {
    const dateInfo = pub.releaseDate ? ` (${pub.releaseDate})` : '';
    const description = pub.summary ? `<div class="item-description">${pub.summary}</div>` : '';
    return `<div class="publication-item">
      <div class="item-header"><strong>${toTitleCase(pub.name)}</strong>, <em>${pub.publisher}</em>${dateInfo}</div>
      ${description}
    </div>`;
  }).join('');

  // Build projects
  const projectItems = projects.map(project => {
    const dateRange = formatDateRange(project.startDate, project.endDate);
    const projectTitle = toTitleCase(project.name);
    const description = project.description ? `<div class="item-description">${project.description}</div>` : '';
    const keywords = project.keywords && project.keywords.length > 0 
      ? `<div class="item-skills">${project.keywords.join(' • ')}</div>` 
      : '';
    return `<div class="project-item">
      <div class="item-header">${projectTitle}${dateRange ? ` ${dateRange}` : ''}</div>
      ${description}
      ${keywords}
    </div>`;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${basics.name}</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html, body {
        width: 100%;
        min-height: 100vh;
        background-color: #fff;
        color: #000;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
        position: relative;
      }
      .header-band {
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        margin-top: 0;
        background-color: #666 !important;
        color: #fff !important;
        padding: 12px 20px 8px 20px;
        margin-bottom: 15px;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      h1 {
        margin: 0 0 3px 0;
        font-size: 1.5em;
        font-weight: 700;
        color: #fff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      h2 {
        margin: 0;
        font-size: 1.1em;
        font-weight: 500;
        color: #fff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .contact {
        margin: 8px 0 0 0;
        font-size: 0.85em;
        color: #fff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .contact a {
        color: #fff;
        text-decoration: none;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .contact a:hover {
        text-decoration: underline;
      }
      .summary {
        margin: 15px 0 20px 0;
        text-align: justify;
        color: #000;
      }
      section {
        margin: 30px 0;
      }
      .section-header {
        font-size: 1.2em;
        font-weight: 600;
        margin: 0 0 15px 0;
        padding: 8px 20px;
        text-transform: uppercase;
        background-color: #666 !important;
        color: #fff !important;
        display: block;
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .experience-item, .education-item, .publication-item, .project-item {
        margin: 15px 0;
      }
      .item-header {
        font-size: 1.1em;
        margin-bottom: 8px;
        color: #000;
      }
      .item-header strong {
        font-weight: 700;
      }
      .item-header em {
        font-style: italic;
        font-weight: normal;
      }
      .item-description {
        font-size: 0.95em;
        color: #000;
        margin-top: 5px;
        line-height: 1.5;
      }
      .item-skills {
        font-size: 0.9em;
        color: #000;
        margin-top: 8px;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    </style>
  </head>
  <body>
    <div class="header-band">
      <h1>${basics.name}</h1>
      <h2>${basics.label || ''}</h2>
      <div class="contact">${contactLine}</div>
    </div>
    <div class="summary">${basics.summary || ''}</div>
    
    <section>
      <div class="section-header">Experience</div>
      ${topWorkItems}
    </section>
    
    <section>
      <div class="section-header">Education</div>
      ${educationItems}
    </section>
    
    ${otherWorkItems ? `<section>
      <div class="section-header">Other Professional Experience</div>
      ${otherWorkItems}
    </section>` : ''}
    
    ${projectItems ? `<section>
      <div class="section-header">Projects</div>
      ${projectItems}
    </section>` : ''}
    
    ${publicationItems ? `<section>
      <div class="section-header">Publications</div>
      ${publicationItems}
    </section>` : ''}
  </body>
</html>
`;
}