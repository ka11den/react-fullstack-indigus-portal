import User from "../models/User.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const getProfile = async (req,res,next)=>{
  try {
    // console.log(req.user)
    // const candidate = await User.findById().populate('groups');
    // res.status(200).json('candidate');
    res.json('dsadaads')
  } catch (err) {
    next(err);
  }
}

export const toggleGroup = async (req,res,next)=>{
  try {
    // add and remove
    const options = {}
    const {userId, groupId} = req.body

    if (!!Number(req.query.isExist)) {
      options['$addToSet'] = {groups: groupId}
    } else {
      options['$pull'] = {groups: {$in: groupId}}
    }

    const {groups} = await User.findByIdAndUpdate(
      userId, 
      options,
      {new: true}
    )
    res.status(201).json(groups);
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

export const getUser = async (req,res,next)=>{
  try {
    const {password, isAdmin, ...publicDetails} = await User.findById(req.params.id).populate('groups');
    res.status(200).json({details: publicDetails._doc});
  } catch (err) {
    next(err);
  }
}

export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find().populate('groups');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}