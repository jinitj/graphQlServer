const BlogPost = require('../../models/blogPost');
const User = require('../../models/user');

const getUserById = async userID => {
    try {
        const userData = await User.findById(userID);
        if(!userData){
            throw new Error('User does not exist');
        }
        // return {...userData._doc, createdBlogPosts: await getSpecifiedBlogPosts(userData._doc.createdBlogPosts)};
        return {...userData._doc};
    } catch (error) {
        console.log(error);
    }
}

const getSpecifiedBlogPosts = async blogPostIds => {
    const blogPosts = await BlogPost.find({_id: {$in: blogPostIds}});
    if(blogPosts){
        return blogPosts.map(async blogPost => {
            return {...blogPost._doc, creator: await getUserById(blogPost._doc.creator)}
        });
    }
} 
 

exports.getUserById = getUserById;
exports.getSpecifiedBlogPosts = getSpecifiedBlogPosts;