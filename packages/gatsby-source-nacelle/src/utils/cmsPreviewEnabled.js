module.exports = function (pluginOptions) {
  const {
    contentfulPreviewSpaceId,
    contentfulPreviewApiToken,
    cmsPreviewEnabled
  } = pluginOptions;

  const contentfulPreviewVariablesExist = Boolean(
    contentfulPreviewSpaceId && contentfulPreviewApiToken
  );

  const previewEnabled =
    typeof cmsPreviewEnabled !== 'undefined'
      ? cmsPreviewEnabled.toLowerCase === 'true' &&
        contentfulPreviewVariablesExist
      : contentfulPreviewVariablesExist;

  if (
    !contentfulPreviewVariablesExist &&
    (contentfulPreviewSpaceId || contentfulPreviewApiToken)
  ) {
    console.warn(
      `[NACELLE] Warning! Both 'contentfulPreviewSpaceId' and 'contentfulPreviewApiToken' ` +
        `must be provided in order to source content from Contentful's Preview API.`
    );
  }

  return previewEnabled;
};
