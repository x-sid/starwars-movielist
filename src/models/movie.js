"use strict";
module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define(
    "movie",
    {
      name: DataTypes.STRING,
      openingCrawl: { type: DataTypes.TEXT, field: "opening_crawl" },
      characters: DataTypes.JSONB,
    },
    {}
  );
  movie.associate = function (models) {
    // associations can be defined here
    movie.hasMany(models.comment, {
      onDelete: "cascade",
      as:"comments",
      hooks: true,
    });
  };
  return movie;
};
