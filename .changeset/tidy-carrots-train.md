---
'@nacelle/gatsby-source-nacelle': minor
---

This fixes content linking bugs that result from the API changes:

1. Excludes assets from content node linking logic since they are not queryable at the top level and thus not referenceable despite having NacelleEntryId's.
2. Removes any unresolvable NacelleReferences from the content tree. These are usually due to unpublished/deleted content.
