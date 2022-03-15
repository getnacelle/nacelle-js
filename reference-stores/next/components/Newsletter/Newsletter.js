import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { contentfulUtils } from 'services'
import successIcon from 'assets/svgs/success';

const Newsletter = ({ content }) => {
  const [emailValue, setEmailValue] = useState('');
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
  }

  useEffect(() => setSuccess(false), [router.asPath])

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
        <div className="mt-8 lg:mt-0 lg:ml-8">
          {success && (
            <div
              v-if="success"
              className="flex bg-green-50 mx-auto py-4 px-4 border border-2 border-green-300 rounded-lg sm:px-5 lg:px-6"
            >
              <span className="text-green-500 mr-4 h-6 w-6" dangerouslySetInnerHTML={{__html: successIcon}} />
              {content.fields?.successText}
            </div>
          )}
          {!success && (
            <form className="sm:flex" onSubmit={handleSubmit}>
              <label for="email-address" className="sr-only">{content.input}</label>
              <input
                type="email"
                autocomplete="email"
                required
                className="
                  w-full
                  px-5
                  py-3
                  border border-transparent
                  placeholder-gray-500
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-offset-gray-800
                  focus:ring-white
                  focus:border-white
                  sm:max-w-xs
                  rounded-md
                "
                placeholder={content.fields.emailPlaceholder}
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  px-5
                  py-3
                  border border-transparent
                  text-base
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-offset-gray-800
                  focus:ring-indigo-500
                "
              >
                {content.fields.buttonText}
              </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Newsletter