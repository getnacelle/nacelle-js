import { contentfulUtils } from 'services'

const Newsletter = ({ content }) => {

  return (
    <div className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          {content?.fields?.heading && (
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {content.fields.heading}
            </h2>
          )}
          {content?.fields?.text && (
            <div
              className="mt-3 max-w-3xl text-lg leading-6 text-gray-300"
              dangerouslySetInnerHTML={{__html: contentfulUtils.richText(content.fields.text)}}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Newsletter