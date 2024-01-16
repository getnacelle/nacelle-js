import Image from 'next/image';
import { contentfulUtils } from 'services';

const TeamBios = ({ content }) => {
  return (
    content && (
      <div
        className="bg-gray-50"
        data-nacelle-entry-id={content.nacelleEntryId}
      >
        <div className="mx-auto py-24 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-32">
          <div className="space-y-12">
            {content.fields.heading && (
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {content.fields.heading}
              </h2>
            )}
            <ul
              role="list"
              className="
                space-y-12
                lg:grid
                lg:grid-cols-2
                lg:items-start
                lg:gap-x-8
                lg:gap-y-12
                lg:space-y-0
              "
            >
              {content.fields.members.map((member, index) => (
                <li key={index}>
                  <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                    {member.fields.image && (
                      <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4 shadow-lg rounded-lg overflow-hidden">
                        <Image
                          src={contentfulUtils.imageUrl(member.fields.image)}
                          alt={member.fields.imageAlt}
                          quality={80}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <div className="space-y-4">
                        <div className="text-lg leading-6 font-medium space-y-1">
                          {member.fields.name && <h3>{member.fields.name}</h3>}
                          {member.fields.role && (
                            <p className="text-indigo-600">
                              {member.fields.role}
                            </p>
                          )}
                        </div>
                        <div className="text-lg">
                          {member.fields.text && (
                            <div
                              className="text-gray-500"
                              dangerouslySetInnerHTML={{
                                __html: contentfulUtils.richText(
                                  member.fields.text
                                )
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default TeamBios;
