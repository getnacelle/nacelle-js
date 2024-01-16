import { useState } from 'react';
import successIcon from 'assets/svgs/success';

const ContactForm = ({ content }) => {
  const [success, setSuccess] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    content && (
      <section
        className="py-12 px-4 sm:py-16 lg:py-20"
        data-nacelle-entry-id={content.nacelleEntryId}
      >
        <div className="max-w-3xl mx-auto">
          {success && (
            <div
              className="
                flex
                bg-green-50
                mx-auto
                py-5
                px-5
                border border-2 border-green-300
                rounded-lg
                sm:px-6
                lg:px-7
              "
            >
              <span
                className="text-green-500 mr-4 h-6 w-6"
                dangerouslySetInnerHTML={{ __html: successIcon }}
              />
              {content.fields.successText}
            </div>
          )}
          {!success && (
            <form className="grid grid-cols-1 gap-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="full-name" className="sr-only">
                  Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  name="full-name"
                  autoComplete="name"
                  required
                  className="
                    block
                    w-full
                    shadow-sm
                    py-3
                    px-4
                    placeholder-gray-500
                    focus:ring-indigo-500 focus:border-indigo-500
                    border border-gray-300
                    rounded-md
                  "
                  placeholder={content.fields.namePlaceholder}
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="
                    block
                    w-full
                    shadow-sm
                    py-3
                    px-4
                    placeholder-gray-500
                    focus:ring-indigo-500 focus:border-indigo-500
                    border border-gray-300
                    rounded-md
                  "
                  placeholder={content.fields.emailPlaceholder}
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="tel"
                  required
                  className="
                    block
                    w-full
                    shadow-sm
                    py-3
                    px-4
                    placeholder-gray-500
                    focus:ring-indigo-500 focus:border-indigo-500
                    border border-gray-300
                    rounded-md
                  "
                  placeholder={content.fields.phonePlaceholder}
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="
                    block
                    w-full
                    shadow-sm
                    py-3
                    px-4
                    placeholder-gray-500
                    focus:ring-indigo-500 focus:border-indigo-500
                    border border-gray-300
                    rounded-md
                  "
                  placeholder={content.fields.messagePlaceholder}
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="
                    inline-flex
                    justify-center
                    py-3
                    px-6
                    border border-transparent
                    shadow-sm
                    text-base
                    font-medium
                    rounded-md
                    text-white
                    bg-indigo-600
                    hover:bg-indigo-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-indigo-500
                  "
                >
                  {content.fields.buttonText}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    )
  );
};

export default ContactForm;
