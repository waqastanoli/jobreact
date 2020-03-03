import Position from "../models/positions";
import User from "../models/users";

const create = async (req, res, next) => {
  try {
    // const userId = req.body.owner;

    // const user = await User.findById(userId);
    // if(!user)
    //   return res.send({status: false, msg: 'User not found'});

    const position = await Position.create(req.body);
    console.log("REQUEST BODY ***** ", req.body);
    if (!position)
      return res.send({
        status: false,
        msg: "Position cannot be created this time"
      });

    return res.send({
      status: true,
      msg: "position endpoint working",
      data: position
    });
  } catch (err) {
    return res.send({ status: false, msg: err.message });
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const position = await Position.findById(id).populate({
      path: "owner",
      select: "first_name"
    });
    if (!position)
      return res.send({ status: false, msg: "Position not found" });

    return res.send({ status: true, msg: "position found", data: position });
  } catch (err) {
    return res.send({ status: false, msg: err.message });
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;

    const position = await Position.findByIdAndDelete(id);
    if (!position)
      return res.send({
        status: false,
        msg: "Cannot delete position, something went wrong!"
      });

    return res.send({ status: true, msg: "position deleted successfully!s" });
  } catch (err) {
    return res.send({ status: false, msg: err.message });
  }
};

const getAll = async (req, res, next) => {
  try {
    const positions = await Position.find();

    if (!positions || positions.length == 0)
      return res.send({ status: false, msg: "positions not found" });

    return res.send({
      status: false,
      msg: "Position fetched successfully",
      data: positions
    });
  } catch (err) {
    return res.send({ status: false, msg: "Internal server error" });
  }
};

export default {
  create,
  getById,
  getAll,
  remove
};
