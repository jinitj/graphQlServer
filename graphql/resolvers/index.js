const authResolver = require('./auth');
const blogPostResolver = require('./blogPost');

const rootResolver = {
    ...authResolver,
    ...blogPostResolver
}


module.exports = rootResolver;