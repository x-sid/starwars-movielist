import { Router } from "express";
import db from "../models/index.js";
import {
  SuccessResponse,
  NotFoundResponse,
  SuccessMsgResponse,
} from "../core/api-response.mjs";
import { asyncHandler } from "../helper.mjs";
import { fetchMovieList, addCommentToMovie } from "../service/index.mjs";
import validate from "../middleware/validator.mjs"
import validationResult from "../middleware/validation-result.mjs";

const routes = Router();

routes.get(
  "/movies",
  asyncHandler(async (req, res) => {
   let movieList = await fetchMovieList();
   new SuccessResponse("Success", movieList).send(res);
  })
);

routes.get(
  "/movies/:movie_id/characters",
  asyncHandler(async (req, res) => {
    const { movie_id: movieId } = req.params;
    const movie = await db.movie.findOne({ where: { id: +movieId } });
    if (movie && movie.characters) {
      return new SuccessResponse("Success", movie.characters).send(res);
    }
    return new NotFoundResponse("Characters not found").send(res);
  })
);

routes.post(
  "/movies/:movie_id/comments",
  validate.comment,
  validationResult,
  asyncHandler(async (req, res) => {
    await addCommentToMovie(req);
    return new SuccessMsgResponse("Success").send(res);
  })
);

routes.get(
  "/movies/:movie_id/comments",
  asyncHandler(async (req, res) => {
    const { movie_id: movieId } = req.params;
    const movieComments = await db.comment.findAll({ where: { movieId }, order: [["id", "DESC"]], });
    if (movieComments.length) {
      return new SuccessResponse("Success", movieComments).send(res);
    }
    return new NotFoundResponse("Comments not found").send(res);
  })
);

export default routes;  
