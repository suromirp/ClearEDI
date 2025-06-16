export function renderUNH(segment: string, parts: string[], dict: any): string {
  const [messageRef] = parts;
  const [
    messageType,
    version,
    release,
    agency,
    associationCode
  ] = parts[1]?.split(':') ?? [];

  return `
    <h3>UNH – Message Header</h3>
    <code>${segment}</code>
    <p>🛈 (0062): <strong>${messageRef}</strong> = Uniek referentienummer, toegekend door verzender</p>
    <p>🛈 (0065): <strong>${messageType}</strong> = Berichttype </p>
    <p>🛈 (0052): <strong>${version}</strong> = Versienummer berichttype</p>
    <p>🛈 (0054): <strong>${release}</strong> = Releasenummer binnen versie</p>
    <p>🛈 (0051): <strong>${agency}</strong> = Controlerende organisatie (bijv. UN)</p>
    <p>🛈 (0057): <strong>${associationCode}</strong> = Association assigned code</p>
  `;
}
