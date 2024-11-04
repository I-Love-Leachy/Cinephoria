const request = require("supertest");
const {
  getMovies,
  getMovieById,
  postMovie,
  updateMovieById,
  deleteMovieById,
  getMoviesAverageRating,
  getLastWedMovies,
} = require("./movies.controller");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const app = require("../../app");
const DB = require("../../config/postgres.config");

// Mock DB queries
jest.mock("../../config/postgres.config");

describe("Movies Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Tests pour getMovies
  describe("getMovies Controller", () => {
    test("should return a list of movies when movies are present", async () => {
      const req = {};
      const res = { json: jest.fn() };
      const mockMovies = [
        {
          movie_id: 1,
          title: "Inception",
          duration: 148,
          genre: "Sci-Fi",
          pg: "PG-13",
          banner: "banner.jpg",
          poster: "poster.jpg",
          video: "video.mp4",
          favorite: false,
          description: "A thief who steals corporate secrets.",
          casting: "Leonardo DiCaprio, Joseph Gordon-Levitt",
          release_date: "2010-07-16",
          added_date: "2024-01-01",
        },
        {
          movie_id: 2,
          title: "The Dark Knight",
          duration: 152,
          genre: "Action",
          pg: "PG-13",
          banner: "banner2.jpg",
          poster: "poster2.jpg",
          video: "video2.mp4",
          favorite: false,
          description:
            "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          casting: "Christian Bale, Heath Ledger",
          release_date: "2008-07-18",
          added_date: "2024-01-02",
        },
      ];

      DB.query.mockResolvedValueOnce({ rows: mockMovies });

      const movies = await getMovies(req, res);

      expect(DB.query).toHaveBeenCalledWith("SELECT * FROM movies");
      expect(movies).toEqual(mockMovies);
    });

    test("should return an empty array if no movies are found", async () => {
      const req = {};
      const res = { json: jest.fn() };

      DB.query.mockResolvedValueOnce({ rows: [] });

      const movies = await getMovies(req, res);

      expect(DB.query).toHaveBeenCalledWith("SELECT * FROM movies");
      expect(movies).toEqual([]);
    });

    test("should return a 500 error if a database error occurs", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      DB.query.mockRejectedValueOnce(new Error("Database error"));

      await getMovies(req, res);

      expect(DB.query).toHaveBeenCalledWith("SELECT * FROM movies");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith("Internal server error !");
    });
  });

  // Tests pour getMovieById
  describe("getMovieById Controller", () => {
    test("should return a movie when a valid ID is provided", async () => {
      const req = { params: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const mockMovie = [
        {
          movie_id: 1,
          title: "Inception",
          duration: 148,
          genre: "Sci-Fi",
          pg: "PG-13",
          banner: "banner.jpg",
          poster: "poster.jpg",
          video: "video.mp4",
          favorite: false,
          description: "A thief who steals corporate secrets.",
          casting: "Leonardo DiCaprio, Joseph Gordon-Levitt",
          release_date: "2010-07-16",
          added_date: "2024-01-01",
        },
        {
          movie_id: 2,
          title: "The Dark Knight",
          duration: 152,
          genre: "Action",
          pg: "PG-13",
          banner: "banner2.jpg",
          poster: "poster2.jpg",
          video: "video2.mp4",
          favorite: false,
          description:
            "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          casting: "Christian Bale, Heath Ledger",
          release_date: "2008-07-18",
          added_date: "2024-01-02",
        },
      ];

      DB.query.mockResolvedValueOnce({ rows: [mockMovie] });

      const movie = await getMovieById(req, res);

      expect(DB.query).toHaveBeenCalledWith(
        "SELECT * FROM movies WHERE movie_id = $1",
        [1]
      );
      expect(movie).toEqual(mockMovie);
    });

    test("should return a 404 error if no movie is found with the given ID", async () => {
      const req = { params: { id: 999 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      DB.query.mockResolvedValueOnce({ rows: [] });

      await getMovieById(req, res);

      expect(DB.query).toHaveBeenCalledWith(
        "SELECT * FROM movies WHERE movie_id = $1",
        [999]
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No movie found with the given ID",
      });
    });

    test("should return a 500 error if a database error occurs", async () => {
      const req = { params: { id: 1 } }; // ID pour le test
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      DB.query.mockRejectedValueOnce(new Error("Database error"));

      await getMovieById(req, res);

      expect(DB.query).toHaveBeenCalledWith(
        "SELECT * FROM movies WHERE movie_id = $1",
        [1]
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  // Tests pour postMovie
  describe("postMovie Controller", () => {
    test("should create a movie and return it", async () => {
      const req = {
        body: {
          title: "Inception",
          duration: 148,
          genre: "Sci-Fi",
          pg: "PG-13",
          description: "A thief who steals corporate secrets.",
          casting: "Leonardo DiCaprio, Joseph Gordon-Levitt",
          release_date: "2010-07-16",
        },
        files: {
          banner: [{ filename: "banner.jpg" }],
          poster: [{ filename: "poster.jpg" }],
          video: [{ filename: "video.mp4" }],
        },
      };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const mockMovie = [
        {
          movie_id: 1,
          title: "Inception",
          duration: 148,
          genre: "Sci-Fi",
          pg: "PG-13",
          banner: "banner.jpg",
          poster: "poster.jpg",
          video: "video.mp4",
          favorite: false,
          description: "A thief who steals corporate secrets.",
          casting: "Leonardo DiCaprio, Joseph Gordon-Levitt",
          release_date: "2010-07-16",
          added_date: "2024-01-01",
        },
        {
          movie_id: 2,
          title: "The Dark Knight",
          duration: 152,
          genre: "Action",
          pg: "PG-13",
          banner: "banner2.jpg",
          poster: "poster2.jpg",
          video: "video2.mp4",
          favorite: false,
          description:
            "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          casting: "Christian Bale, Heath Ledger",
          release_date: "2008-07-18",
          added_date: "2024-01-02",
        },
      ];

      DB.query.mockResolvedValueOnce({ rows: [mockMovie] });

      await postMovie(req, res);

      expect(DB.query).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Array)
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockMovie);
    });

    test("should return a 400 error if validation fails", async () => {
      const req = {
        body: {}, // Corps vide pour simuler des erreurs de validation
        files: {},
      };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const errorMessage = "You must enter all required fields!";
      validationResult(() => ({
        isEmpty: jest.fn().mockReturnValue(false), // Simule que des erreurs existent
        array: jest.fn().mockReturnValue(errorMessage), // Retourne les erreurs simulées
      }));

      await postMovie(req, res);

      // Vérification des appels de status et json avec les erreurs simulées
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    test("should return a 400 error if required fields are missing", async () => {
      jest.spyOn(fs, "unlinkSync").mockImplementation(() => {});

      const req = {
        body: {
          title: "Inception",
          duration: 148,
          genre: "Sci-Fi",
          pg: "PG-13",
          description: "A thief who steals corporate secrets.",
          casting: "Leonardo DiCaprio, Joseph Gordon-Levitt",
          // vidéo, bannière et poster manquants
        },
        files: {
          banner: [{ path: "/tmp/mockBanner.jpg" }],
          poster: [{ path: "/tmp/mockPoster.jpg" }],
        },
      };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      await postMovie(req, res);

      expect(fs.unlinkSync).toHaveBeenCalled(); // Vérifier que fs.unlinkSync est appelé pour supprimer les fichiers
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "You must enter all required fields!",
      });
    });

    test("should return a 500 error if a database error occurs", async () => {
      const req = {
        body: {
          title: "Inception",
          duration: 148,
          genre: "Sci-Fi",
          pg: "PG-13",
          description: "A thief who steals corporate secrets.",
          casting: "Leonardo DiCaprio, Joseph Gordon-Levitt",
          release_date: "2010-07-16",
        },
        files: {
          banner: [{ filename: "banner.jpg" }],
          poster: [{ filename: "poster.jpg" }],
          video: [{ filename: "video.mp4" }],
        },
      };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      DB.query.mockRejectedValueOnce(new Error("Database error"));

      await postMovie(req, res);

      expect(fs.unlinkSync).toHaveBeenCalled(); // Vérifier que fs.unlinkSync est appelé pour supprimer les fichiers
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error!",
      });
    });
  });

  describe("updateMovieById", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should update a movie and return success", async () => {
      jest.spyOn(fs, "unlinkSync").mockImplementation(() => {}); // Mock pour fs.unlinkSync

      const req = {
        params: { id: "1" },
        body: {
          title: "Updated Title",
          duration: 150,
          genre: "Action",
          pg: "PG-13",
          favorite: true,
          description: "An updated description",
          casting: "Updated Casting",
          release_date: "2024-01-01",
        },
        files: {
          banner: [
            { filename: "new-banner.jpg", path: "uploads/new-banner.jpg" },
          ],
          poster: [
            { filename: "new-poster.jpg", path: "uploads/new-poster.jpg" },
          ],
          video: [{ filename: "new-video.mp4", path: "uploads/new-video.mp4" }],
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      DB.query.mockResolvedValueOnce({
        rows: [
          {
            banner: "old-banner.jpg",
            poster: "old-poster.jpg",
            video: "old-video.mp4",
          },
        ],
      }); // Simule la requête pour obtenir le film actuel
      DB.query.mockResolvedValueOnce({ rowCount: 1 }); // Simule la requête pour mettre à jour le film

      await updateMovieById(req, res);

      expect(fs.unlinkSync).toHaveBeenCalledTimes(3); // Vérifie que les anciens fichiers sont supprimés
      expect(fs.unlinkSync).toHaveBeenCalledWith(
        path.join(__dirname, "..", "..", "uploads", "old-banner.jpg")
      );
      expect(fs.unlinkSync).toHaveBeenCalledWith(
        path.join(__dirname, "..", "..", "uploads", "old-poster.jpg")
      );
      expect(fs.unlinkSync).toHaveBeenCalledWith(
        path.join(__dirname, "..", "..", "uploads", "old-video.mp4")
      );

      expect(DB.query).toHaveBeenCalledTimes(2); // Vérifie que les deux requêtes SQL ont été appelées
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Movie updated successfully.",
      });
    });

    it("should return a 404 error if movie not found", async () => {
      const req = {
        params: { id: "999" },
        body: {},
        files: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      DB.query.mockResolvedValueOnce({ rows: [] }); // Simule un film introuvable

      await updateMovieById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Movie not found!" });
    });

    it("should handle file cleanup if an error occurs", async () => {
      jest.spyOn(fs, "unlinkSync").mockImplementation(() => {}); // Mock pour fs.unlinkSync

      const req = {
        params: { id: "1" },
        body: {
          title: "Updated Title",
        },
        files: {
          banner: [
            { filename: "new-banner.jpg", path: "uploads/new-banner.jpg" },
          ],
          poster: [
            { filename: "new-poster.jpg", path: "uploads/new-poster.jpg" },
          ],
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      DB.query.mockRejectedValueOnce(new Error("Database error")); // Simule une erreur de base de données

      await updateMovieById(req, res);

      expect(fs.unlinkSync).toHaveBeenCalledTimes(2); // Vérifie que les nouveaux fichiers sont nettoyés
      expect(fs.unlinkSync).toHaveBeenCalledWith("uploads/new-banner.jpg");
      expect(fs.unlinkSync).toHaveBeenCalledWith("uploads/new-poster.jpg");

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error!",
      });
    });
  });

  describe("deleteMovieById", () => {
    let req, res;

    beforeEach(() => {
      req = { params: { id: "1" } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.clearAllMocks();
    });

    it("should delete a movie and return success when movie exists", async () => {
      // Mock du film trouvé avec les fichiers associés
      DB.query
        .mockResolvedValueOnce({
          rows: [
            { banner: "banner.jpg", poster: "poster.jpg", video: "video.mp4" },
          ],
        }) // Movie found
        .mockResolvedValueOnce({ rows: [{ showtimes_id: 1 }] }) // Showtimes associés
        .mockResolvedValueOnce({ rowCount: 1 }) // Delete showtimes
        .mockResolvedValueOnce({ rowCount: 1 }) // Delete reviews
        .mockResolvedValueOnce({ rowCount: 1 }); // Delete movie

      // Utilisez jest.spyOn pour mocker fs.existsSync
      jest.spyOn(fs, "existsSync").mockReturnValue(true); // Simule l'existence des fichiers
      fs.unlinkSync.mockImplementation(() => {}); // Simule la suppression des fichiers

      await deleteMovieById(req, res);

      // Vérification des appels à fs.unlinkSync pour supprimer les fichiers associés
      expect(fs.unlinkSync).toHaveBeenCalledTimes(3);
      expect(fs.unlinkSync).toHaveBeenCalledWith(
        path.join(__dirname, "..", "..", "uploads", "banner.jpg")
      );
      expect(fs.unlinkSync).toHaveBeenCalledWith(
        path.join(__dirname, "..", "..", "uploads", "poster.jpg")
      );
      expect(fs.unlinkSync).toHaveBeenCalledWith(
        path.join(__dirname, "..", "..", "uploads", "video.mp4")
      );

      // Vérification de la réponse
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message:
          "Movie, associated reviews, showtimes, and reservations deleted successfully",
      });
    });

    it("should return 404 error if no movie is found with the given ID", async () => {
      // Simule une réponse de base de données sans film trouvé
      DB.query.mockResolvedValueOnce({ rows: [] });

      await deleteMovieById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("No movie found !");
    });

    it("should return 500 error if a database error occurs", async () => {
      // Simule une erreur de base de données
      DB.query.mockRejectedValue(new Error("Database error"));

      await deleteMovieById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith("Internal server error !");
    });
  });

  describe("Movies Controller - getMoviesAverageRating", () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Réinitialiser les mocks avant chaque test
    });

    it("should return the average rating of a movie", async () => {
      const movieId = "1";
      const averageRating = 4.5;

      // Mock de la réponse de la base de données
      DB.query.mockResolvedValueOnce({
        rows: [{ average_rating: averageRating }],
      });

      const result = await getMoviesAverageRating(movieId);

      expect(result).toBe(averageRating);
      expect(DB.query).toHaveBeenCalledWith(
        "SELECT AVG(rating) as average_rating FROM reviews WHERE movie_id = $1",
        [movieId]
      );
    });

    it("should return 0 if no ratings are found", async () => {
      const movieId = "2";

      // Mock de la réponse de la base de données sans avis
      DB.query.mockResolvedValueOnce({ rows: [{ average_rating: null }] });

      const result = await getMoviesAverageRating(movieId);

      expect(result).toBe(0);
      expect(DB.query).toHaveBeenCalledWith(
        "SELECT AVG(rating) as average_rating FROM reviews WHERE movie_id = $1",
        [movieId]
      );
    });

    it("should throw an error if a database error occurs", async () => {
      const movieId = "3";

      // Simule une erreur de base de données
      DB.query.mockRejectedValue(new Error("Database error"));

      await expect(getMoviesAverageRating(movieId)).rejects.toThrow(
        "Internal server error!"
      );
    });
  });

  describe("Movies Controller - getLastWedMovies", () => {
    let req, res;

    beforeEach(() => {
      req = {}; // Simuler l'objet req
      res = {
        json: jest.fn(), // Simuler la méthode json de l'objet res
      };
      jest.clearAllMocks(); // Réinitialiser les mocks avant chaque test
    });

    it("should return movies added in the last week from last Wednesday", async () => {
      const mockMovies = [
        { movie_id: "1", title: "Movie 1", added_date: "2024-10-30" },
        { movie_id: "2", title: "Movie 2", added_date: "2024-10-29" },
      ];

      // Mock de la réponse de la base de données
      DB.query.mockResolvedValueOnce({ rows: mockMovies });

      const result = await getLastWedMovies(req, res);

      expect(result).toEqual(mockMovies);
      expect(DB.query).toHaveBeenCalledWith(
        expect.stringContaining("WITH last_wednesday")
      );
    });

    it("should throw an error if a database error occurs", async () => {
      // Simule une erreur de base de données
      DB.query.mockRejectedValue(new Error("Database error"));

      await expect(getLastWedMovies(req, res)).rejects.toThrow(
        "Database error"
      );
    });
  });
});
