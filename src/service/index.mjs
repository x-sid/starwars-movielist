import db from "../models/index.js";
import axios from "axios";

const fetchMovieList = async () => {
  let movieList;
  movieList = await db.movie.findAll({
    attributes: [
      "id",
      "name",
      "openingCrawl",
      "characters",
      [
        db.Sequelize.fn("COUNT", db.Sequelize.col("comments.id")),
        "commentCount",
      ],
    ],
    group: ["movie.id"],
    order: [["id", "DESC"]],
    include: [{ model: db.comment, as: "comments", attributes: [] }],
  });

  if (!movieList.length) {
    const response = await axios.get("https://swapi.dev/api/films");
    const movies = await response?.data?.results.map((movie) => ({
      name: movie.title,
      openingCrawl: movie.opening_crawl,
      characters: movie.characters,
      commentCount: 0,
    }));

    movieList = await db.movie.bulkCreate(movies);
  }

  return movieList;
};

const addCommentToMovie = async (req) => {
  const { movie_id: movieId } = req.params;
  const { comment } = req.body;
  await db.comment.create({ movieId, comment });
};

export { fetchMovieList, addCommentToMovie };

