import { readFile, writeFile } from 'fs/promises';

async function main() {
	const changelogFilePath = 'CHANGELOG.md';
	const changelogWithFrontMatterFilePath = 'changelog-readme.md';

	const changelog = await readFile(changelogFilePath, 'utf8');

	const changelogWithFrontMatter = `---
title: Changelog
category: 6359e9ef3232d2000f56a312
slug: storefront-sdk-changelog
---
${changelog}`;

	try {
		await writeFile(changelogWithFrontMatterFilePath, changelogWithFrontMatter);
	} catch (error) {
		console.error(error);
	}
}

main().catch(console.error);
