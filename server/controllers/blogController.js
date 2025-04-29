const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({
      title,
      content,
      author: req.userId
    });
    
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog' });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Add filter for author if userId is provided
    const filter = {};
    if (req.query.userId) {
      filter.author = req.query.userId;
    }

    const blogs = await Blog.find(filter)
      .populate('author', 'email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(filter);

    res.json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlogs: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
};

// Add authorization middleware to update and delete operations
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.userId }, // Only update if author matches
      { title, content, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or unauthorized' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.userId // Only delete if author matches
    });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or unauthorized' });
    }
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog' });
  }
};
