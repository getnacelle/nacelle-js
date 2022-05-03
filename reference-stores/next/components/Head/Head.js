import Head from 'next/head';
import { useRouter } from 'next/router';
import { buildMeta } from 'utils/buildMeta';

const HeadTag = ({ page, product, collection }) => {
  const router = useRouter();

  const { title, meta } = buildMeta({
    meta: page?.fields?.meta,
    product,
    collection,
    route: { path: router.asPath }
  });

  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>{title}</title>
      {meta?.map((metatag, index) => (
        <meta key={index} {...metatag} />
      ))}
    </Head>
  );
};

export default HeadTag;
