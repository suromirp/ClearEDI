export function renderPIA(segment: string, parts: string[]): string {
    const articleType = parts[0] ?? '';
    const articleCode = parts[1]?.split(':')[0] ?? '';
    const codeList = parts[1]?.split(':')[1] ?? '';
  
    return `
      <h3>PIA – Additional product ID</h3>
      <code>${segment}</code>
      <p><strong>Artikel type:</strong> ${articleType}</p>
      <p><strong>Artikelcode:</strong> ${articleCode}</p>
      <p><strong>Code lijst:</strong> ${codeList}</p>
    `;
  }
  