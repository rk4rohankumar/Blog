import { Blog } from '../models/Post.js';
import { decodeToken } from '../utils/Auth.js';

const fetchAllPosts = async (req, res) => {
    try {
        const user = await decodeToken(req);
        if (user.role === 'admin') {
            const posts = await Blog.find();
            return res.json(posts);
        }
        const posts = await Blog.find({
            $or: [
                { status: 'public' },
                {author: user.id}
            ]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error in fetchAll' });
    }
};

const fetchPost = async (req, res) => {
    try {
        const user = await decodeToken(req);
        const post = await Blog.find({
            $or: [
                { status: 'public' },
                { author: user.id }
            ]
        });
        if (!post) { return res.status(404).json({ message: 'Post not found' }); }
        res.json(post);
    }
    catch (error) { res.status(500).json({ message: 'Server Error' }); }
}

const fetchPostbyId = async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        const user = await decodeToken(req);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (user.id !== post.author.toString() && post.status === 'private') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const createPost = async (req, res) => {
    const { title, content, status } = req.body;
    try {
        const user = await decodeToken(req);
        const post = await Blog.create({
            title,
            content,
            status,
            author: user.id
        });
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const updatePost = async (req, res) => {
    const { title, content, status } = req.body;
    try {
        const user = await decodeToken(req);
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (user.id !== post.author.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        post.title = title;
        post.content = content;
        post.status = status;
        await post.save();
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const deletePost = async (req, res) => {
    try {
        const user = await decodeToken(req);
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (user.id !== post.author.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await post.remove().then(() => res.json({ message: 'Post removed' }));
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export { fetchAllPosts, fetchPost, fetchPostbyId, createPost, updatePost, deletePost };