const Blog = require("../Models/blogModel");
const blogService = {
  addBlog: async (blogData, file) => {
    try {
      const { title, description } = blogData;
      if (!file || !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        throw new Error("Please upload a valid image file");
      }

      const newBlog = new Blog({
        title,
        description,
        filename: file.originalname,
        contentType: file.mimetype,
        image: file.buffer,
      });

      const createdBlog = await newBlog.save();
      return createdBlog;
    } catch (error) {
      console.error("Error adding blog:", error);
      throw error;
    }
  },
  getBlogData: async () => {
    try {
      const blogData = await Blog.find({});
      const blogsWithImageData = blogData.map((blog) => {
        return {
          ...blog.toJSON(),
          imageData: Buffer.from(blog.image.buffer).toString("base64"),
        };
      });
      return blogsWithImageData;
    } catch (error) {
      console.error("Error fetching blog data:", error);
      throw error;
    }
  },

  deleteBlogData: async (id) => {
    try {
      const deleteBlogData = await Blog.findByIdAndDelete(id);
      return deleteBlogData;
    } catch (error) {
      console.log("getting blog Data error ", error);
      throw error;
    }
  },
  updateBlogData: async (id, title, description, image) => {
    try {
      let updateFields = { title, description };
      if (image) {
        updateFields.image = image;
      }

      const updatedBlogData = await Blog.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      return updatedBlogData;
    } catch (error) {
      console.error("Error updating blog data:", error);
      throw error;
    }
  },
};
module.exports = blogService;
