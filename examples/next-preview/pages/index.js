import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Welcome to your Nacelle preview demo</h1>
      <h2>
        This is an example project to demonstrate how the to get Nacelle preview
        data when using NextJS
      </h2>
      <p>
        For more help on how to setup Nacelle preview,
        <a
          href="https://nacelle.com/docs/querying-data/preview-data?nacelle=v2"
          target="none"
        >
          visit the Nacelle documentation.
        </a>
      </p>
      <p>
        For more help on how preview works with NextJS,
        <a
          href="https://nextjs.org/docs/advanced-features/preview-mode"
          target="none"
        >
          visit the NextJS documentation.
        </a>
      </p>
      <p>
        <b>
          To get started with the demo, navigate to a URL following these rules:
        </b>
      </p>
      <ul>
        <li>
          For a published content navigate to:{' '}
          <code>/content/CONTENT_HANDLE</code> without activating the preview.
        </li>
        <li>
          To activate the preview navigate to: <code>/api/preview</code>
        </li>
        <li>
          To activate the preview & see preview content navigate to:{' '}
          <code>/api/preview?redirect=/content/CONTENT_HANDLE</code> or{' '}
          <code>/api/preview</code>
        </li>
        <li>
          To deactivate the preview navigate to: <code>/api/exit-preview</code>
        </li>
        <li>
          To verify is the preview is active or not you can check whether or not
          you have an active <code>preview</code> cookie
        </li>
      </ul>
    </div>
  );
}
