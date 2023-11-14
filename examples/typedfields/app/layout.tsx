import './globals.css';
import Link from 'next/link';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <section>
          <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <Link href="/">Home</Link>
            </div>
          </nav>
          {children}
        </section>
      </body>
    </html>
  );
}
