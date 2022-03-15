import Link from 'next/link'

const FooterPrimary = ({ content }) => {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-16">
      {content?.navigation?.map((menu, index) => (
        <div key={index} className="mt-10">
          <div>
            <h3
              className="text-sm font-semibold text-gray-500 tracking-wider uppercase"
            >
              {menu.fields.text}
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {menu.fields?.links?.map((link, index1) => (
                <li key={index1}>
                  <Link
                    href={link.fields.url}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {link.fields.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FooterPrimary