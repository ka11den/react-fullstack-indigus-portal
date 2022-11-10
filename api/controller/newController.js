import News from '../models/News.js';

export const createNew = async (req, res, next) => {
  const newNews = News(req.body)
  try {    
    const savedNews = await newNews.save()
    res.status(200).json(savedNews);
  } catch (err) {
    next(err);
  }
};

export const updateNew = async (req, res, next) => {
  try {
    const updatedNew = await News.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedNew);
  } catch (err) {
    next(err);
  }
};

export const getNew = async (req, res, next) => {
    try {
      const getnew = await News.findById(req.params.id)
      res.status(200).json(getnew);
    } catch (err) {
      next(err);
    }
};

export const getNews = async (req, res, next) => {
    try {
      const getnews = await News.find()
      res.status(200).json(getnews);
    } catch (err) {
      next(err);
    }
};

export const deleteNew = async (req, res, next) => {
    try {
      const deletedNew = await News.findByIdAndDelete(req.params.id)
      res.status(200).json(deletedNew);
    } catch (err) {
      next(err);
    }
  };
  