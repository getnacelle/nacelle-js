export default function handler(req, res) {
  // NOTE: You should add a check here for a Preview Mode Secret.
  // For more information, please see https://nextjs.org/docs/advanced-features/preview-mode#securely-accessing-it-from-your-headless-cms.

  // Checks for preview token.
  if (!process.env.NEXT_PUBLIC_NACELLE_STOREFRONT_PREVIEW_TOKEN) {
    return res.status(401).json({ message: 'Preview Token required' });
  }

  // Sets preview token in NextJS context.previewData.
  res.setPreviewData({
    previewToken: process.env.NEXT_PUBLIC_NACELLE_STOREFRONT_PREVIEW_TOKEN
  });

  // Redirect the user back.
  if (req.query.redirect) {
    res.redirect(req.query.redirect);
  } else {
    res.writeHead(307, { Location: '/' });
    res.end();
  }
}
