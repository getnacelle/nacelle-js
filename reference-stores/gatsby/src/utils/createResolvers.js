exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    NacelleContentRemotePartProduct: {
      remoteProduct: {
        type: `NacelleProduct`,
        resolve(source, _args, context, _info) {
          const handle = source.remoteFields?.handle?.split('::')[0]
          return context.nodeModel.findOne({
            query: {
              filter: {
                content: {
                  handle: {
                    eq: handle
                  }
                }
              }
            },
            type: 'NacelleProduct'
          })
        }
      }
    }
  })
}