export default async function exit(req, res) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();

  // Redirect the user back.
  if (req.query.redirect) {
    res.redirect(req.query.redirect);
  } else {
    res.writeHead(307, { Location: '/' });
    res.end();
  }
}
