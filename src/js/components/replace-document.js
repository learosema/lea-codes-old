import { $, $$ } from './query';

/**
 * Add additional script tags on demand
 */
function loadAdditionalScripts(newDocument) {
  const scripts = $$('script[src]', newDocument);
  scripts.forEach((scriptTag) => {
    // load further script tags on-demand.
    const src = scriptTag.getAttribute('src');
    if (!$(`script[src="${src}"]`)) {
      const newScript = document.adoptNode(scriptTag);
      document.body.appendChild(newScript);
    }
  });
}

/**
 * Search all relevant metas and links and apply them to the current DOM
 * @param {Document|XMLDocument} newDocument
 */
function applyTitleAndMetaData(newDocument) {
  const metas = $$(
    'meta[property^="og:"], meta[name^="twitter:"], meta[name="description"]',
    newDocument
  );
  const canonicalLink = $('link[rel="canonical"]', newDocument);
  for (const meta of metas) {
    // delete old metas:
    for (const attrib of ['property', 'name']) {
      if (meta.hasAttribute(attrib)) {
        const attribValue = meta.getAttribute(attrib);
        const oldNode = document.querySelector(
          `meta[${attrib}="${attribValue}"]`
        );
        oldNode?.remove();
      }
    }
    // adopt the meta tag and insert it in the current document
    document.head.appendChild(document.adoptNode(meta));
  }
  if (canonicalLink) {
    $('link[rel="canonical"]')?.remove();
    document.head.appendChild(document.adoptNode(canonicalLink));
  }
  document.title = newDocument.title || '';
}

/**
 * Put the contents of newDocument.main into the DOM, apply title and meta data, load additional scripts on demand.
 * @param {Document|XMLDocument} newDocument
 */
export function replaceDocument(newDocument) {
  const container = $('main');
  const newContainer = $('main', newDocument);
  container.innerHTML = newContainer?.innerHTML || '';
  loadAdditionalScripts(newDocument);
  applyTitleAndMetaData(newDocument);
  window.scrollTo(0, 0);
  container.focus();
}
