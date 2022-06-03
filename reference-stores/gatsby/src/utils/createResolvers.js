exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    NacelleContentRemoteSectionFeaturedProducts: {
      remoteProducts: {
        type: [`NacelleProduct`],
        resolve(source, _args, context, _info) {
          let handles = source.remoteFields?.products?.handles?.map(handle => handle)
          handles = handles ? JSON.stringify(handles) : []
          return context.nodeModel.findAll({
            query: { 
              filter: {
                content: { 
                  handle: {
                    in: handles
                  }
                }
              }
            },
            type: `NacelleProduct`,
            firstOnly: false,
          })
        }
      }
    },
    NacelleContentRemoteComponentCart: {
      remoteCrosssellItems: {
        type: [`NacelleProduct`],
        resolve(source, _args, context, _info) {
          let handles = source.remoteFields?.crossellItems?.handles?.map(handle => handle)
          handles = handles ? JSON.stringify(handles) : []
          return context.nodeModel.findAll({
            query: { 
              filter: {
                content: { 
                  handle: {
                    in: handles
                  }
                }
              }
            },
            type: `NacelleProduct`,
            firstOnly: false,
          })
        }
      }
    }
  })
}