import Joi from "joi";

import Message from "../models/messages.model.js";
import sendEmail from "../services/message.service.js";

export const createMessage = async (req, res) => {
  const data = {
    names: req.body.names,
    email: req.body.email,
    message: req.body.message,
  };

  try {
    const { error } = messageSchema.validate(data);

    if (error) {
      throw new Error(error.message);
    } else {
      const message = new Message({
        sender: data.names,
        email: data.email,
        message: data.message,
        createdAt: Date.now(),
      });

      await message.save().then(() => {
        return res.json({
          status: "success",
          message: "message sent",
        });
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Message.findByIdAndRemove(data.id).then(() => {
      return res.json({
        status: "success",
        message: "message deleted",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const message = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Message.findById(data.id).then((message) => {
      return res.json({
        status: "success",
        message: "message",
        data: message,
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const reply = async (req, res) => {
  const data = {
    reply: req.body.reply,
    messageId: req.body.messageId,
  };

  try {
    await Message.findById(data.messageId).then(async (message) => {
      await sendEmail(message.email, data.reply).then(async (response) => {
        await Message.findByIdAndUpdate(data.messageId, {
          replied: true,
        }).then(() => {
          return res.json({
            status: "success",
            message: "message replied",
          });
        });
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const messages = async (req, res) => {
  try {
    await Message.find({}).then((response) => {
      return res.json({
        status: "success",
        message: "all messages",
        data: response,
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

const messageSchema = Joi.object({
  names: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(3).max(300).required(),
});
