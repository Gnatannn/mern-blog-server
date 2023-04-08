import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.userId = decoded.id;

      next();
    } catch (error) {
      return res.json({
        message: "Not authorized in MW 1",
      });
    }
  } else {
    return res.json({
      message: "Not authorized in MW 2",
    });
  }
};
