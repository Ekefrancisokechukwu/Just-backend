const { StatusCodes } = require("http-status-codes");
const Tip = require("../model/Tip");
const formatTip = require("../utils/formatTip");
const { NotFoundError } = require("../errors");

const createTip = async (req, res) => {
  const tip = await Tip.create(req.body);
  res.status(StatusCodes.CREATED).json({ tip });
};

const getAllTip = async (req, res) => {
  const { keyword, language, tags } = req.query;

  let queryObject = {};

  if (keyword) {
    queryObject.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  if (language) {
    queryObject.language = language.toLowerCase();
  }

  if (tags) {
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    queryObject.tags = { $in: tagsArray };
  }

  const formatTips = await Tip.find(queryObject);
  const tips = formatTip(formatTips);

  res.status(StatusCodes.OK).json({ tips, count: tips.length });
};

const getTipByLanguage = async (req, res) => {
  const language = req.params.language.toLowerCase();
  const formateTips = await Tip.find({ language: language });

  if (formateTips.length === 0) {
    throw new NotFoundError(`No tips found for language: ${language}`);
  }

  const tips = formatTip(formateTips);

  res.status(StatusCodes.OK).json({ tips });
};

module.exports = { createTip, getAllTip, getTipByLanguage };
