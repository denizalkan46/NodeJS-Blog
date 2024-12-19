import Blog from '../models/blogModel.js';

// Blog yazısı ekleme
export const addBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({
      title,
      content,
      author: req.user.id
    });

    await blog.save();
    res.status(201).json({ message: 'Blog yazısı başarıyla eklendi', blog });
  } catch (error) {
    res.status(500).json({ error: 'Blog yazısı eklenirken bir hata oluştu' });
  }
};

// Blog yazılarını listeleme
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Blog yazıları alınırken bir hata oluştu' });
  }
};

// Tek bir blog yazısını getirme
export const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate('author', 'username');
    if (!blog) {
      return res.status(404).json({ error: 'Blog yazısı bulunamadı' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Blog yazısı alınırken bir hata oluştu' });
  }
};

// Blog yazısını güncelleme
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id, author: req.user.id },
      { title, content },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog yazısı bulunamadı' });
    }

    res.json({ message: 'Blog yazısı güncellendi', blog });
  } catch (error) {
    res.status(500).json({ error: 'Blog yazısı güncellenirken bir hata oluştu' });
  }
};

// Blog yazısını silme
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOneAndDelete({ _id: id, author: req.user.id });

    if (!blog) {
      return res.status(404).json({ error: 'Blog yazısı bulunamadı' });
    }

    res.json({ message: 'Blog yazısı başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Blog yazısı silinirken bir hata oluştu' });
  }
};
