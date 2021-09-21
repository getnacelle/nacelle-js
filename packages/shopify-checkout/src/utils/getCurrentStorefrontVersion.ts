export default function getCurrentStorefrontApiVersion(): string {
  const storefrontApiReleaseMonths = ['01', '04', '07', '10'];
  const monthsBetweenVersions = 3;
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const idx = Math.floor(month / monthsBetweenVersions);

  return year + '-' + storefrontApiReleaseMonths[idx];
}
