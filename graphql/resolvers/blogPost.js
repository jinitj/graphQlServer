const bcrypt = require('bcryptjs');
const BlogPost = require('../../models/blogPost');
const User = require('../../models/user');
const {getUserById, getSpecifiedBlogPosts } = require('./resolverHelpers');
 
 module.exports = {
    newBlogPosts: async (args) => {
        try{
            const allData = await BlogPost.find({ creationTimeStamp: { $gt: new Date(+args.timeStamp) } })
            return allData.map(async blogPost => {
                return {
                    ...blogPost._doc, 
                    creator: await getUserById(blogPost._doc.creator)
                }
            });
        }catch(error){
            console.log(error);
        }
    },

    blogPosts: async (args) => {
        try{
            
            // const allData = await BlogPost.find().skip(args.offset).limit(args.limit);
            const allData = await BlogPost.find().sort({ creationTimeStamp: -1 }).skip(args.offset).limit(args.limit);
            return allData.map(async blogPost => {
                return {
                    ...blogPost._doc, 
                    creator: await getUserById(blogPost._doc.creator)
                }
            });
        }catch(error){
            console.log(error);
        }
    },

    createBlogPost: async (args, req) => {

        try {
            console.log(req);
            if(!req.isAuth){
                throw new Error('Permission denied');
            }
            const newBlogPost = new BlogPost({
                blogPostBody: args.blogPostInput.blogPostBody,
                creator: req.userId,
                creationTimeStamp: new Date()
            });
            const fetchBlogCreator = await User.findById(req.userId);
            if(!fetchBlogCreator){
                throw new Error('User not found');
            }
            const blogPostResult = await newBlogPost.save();
            fetchBlogCreator.createdBlogPosts.push(newBlogPost);
            await fetchBlogCreator.save();
            return {...blogPostResult._doc, creator: await getUserById(blogPostResult._doc.creator)};
        } catch (error) {  
            console.log(error);
            return error;
        }
    }
}