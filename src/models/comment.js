"use strict";
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      comment: DataTypes.TEXT,
      movieId: { type: DataTypes.INTEGER, field: "movie_id" },
    },
    {}
  );
  comment.associate = function (models) {
    // associations can be defined here
    comment.belongsTo(models.movie);
  };
  return comment;
};
