import React, { FC, createContext } from 'react';
// import useSdk from '../composables/useSdk';

export type Space = {
  id?: string;
};

export const SpaceContext = createContext<Space | null>(null);

export type SpaceProviderProps = {
  space?: Space;
  children: JSX.Element | JSX.Element[];
};

export const SpaceProvider: FC<SpaceProviderProps> = ({ children }) => {
  return <SpaceContext.Provider value={{}}>{children}</SpaceContext.Provider>;
};

// export default ({ children, ...props }) => {
//   const id = props.space?.id || '';
//   const name = props.space?.name || '';
//   const domain = props.space?.domain || '';
//   const metafields = props.space?.metafields || [];
//   const linklists = props.space?.linklists || [];

//   const config = props.config;
//   const nacelleSdk = props.sdk || useSdk({ config });

//   /**
//    * Finds menu by handle in linklists array
//    * @param {String} handle
//    * @returns {Object} menu
//    */
//   const getLinks = (handle) => {
//     if (!linklists) {
//       return [];
//     }
//     const linklist = linklists.find((l) => l.handle === handle);
//     return linklist ? linklist.links : [];
//   };

//   /**
//    * Get metatags from metafields
//    * @param {String} tag
//    * @returns {Object|null}
//    */
//   const getMetatag = (tag) => {
//     if (metafields) {
//       return metafields.find(
//         (field) => field.namespace === 'metatag' && field.key === tag
//       );
//     }
//     return null;
//   };

//   /**
//    * Get Metafields as Object
//    * @returns {Object|null} metafield
//    */
//   const getMetafieldsObj = () => {
//     if (metafields) {
//       return metafields.reduce((obj, metafield) => {
//         const { namespace, key, value } = metafield;
//         if (!obj[namespace]) {
//           obj[namespace] = {};
//         }
//         obj[namespace][key] = value;
//         return obj;
//       }, {});
//     }
//     return null;
//   };

//   /**
//    * Get meta namespace as Object
//    * @param {String} namespace
//    * @returns {Object|null} meta namespace
//    */
//   const getMetafieldsByNamespace = (namespace) => {
//     if (metafields) {
//       return metafields.reduce((obj, metafield) => {
//         if (metafield.namespace === namespace) {
//           obj[metafield.key] = metafield.value;
//         }

//         return obj;
//       }, {});
//     }
//     return null;
//   };

//   /**
//    * Get metafield values
//    * @param {String} namespace
//    * @param {String} key
//    * @returns {String|null} meta namespace
//    */
//   const getMetafield = ({ namespace, key }) => {
//     if (metafields) {
//       const metafield = metafields.find(
//         (field) => field.namespace === namespace && field.key === key
//       );

//       if (metafield) {
//         return metafield.value;
//       }
//     }
//     return null;
//   };

//   return (
//     <SpaceContext.Provider
//       value={{
//         id,
//         name,
//         domain,
//         metafields,
//         linklists,
//         nacelleSdk,
//         getLinks,
//         getMetatag,
//         getMetafieldsObj,
//         getMetafieldsByNamespace,
//         getMetafield
//       }}
//     >
//       {children}
//     </SpaceContext.Provider>
//   );
// };
