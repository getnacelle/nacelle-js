export default function handler(req, res) {
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
