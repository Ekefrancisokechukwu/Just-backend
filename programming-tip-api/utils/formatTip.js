const formatTip = (tips) => {
  return tips.map((tip) => ({
    title: tip.title,
    description: tip.description,
    language: tip.language,
    id: tip._id,
    tags: tip.tags,
  }));
};

module.exports = formatTip;
