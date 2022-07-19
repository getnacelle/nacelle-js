// import Storefront from '@nacelle/storefront-sdk';


export default function handler(req, res) {

  if (!process.env.NEXT_PUBLIC_NACELLE_STOREFRONT_PREVIEW_TOKEN) {
    return res.status(401).json({ message: 'Preview Token required' })
  }

  res.setPreviewData({})

  res.redirect(req.query.redirect)
}