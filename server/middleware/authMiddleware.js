const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = "f2b0156f-cf95-4e29-9f57-51296a481c6a"; // Your token here

  if (!authHeader || authHeader !== `Bearer ${token}`) {
    return res.sendStatus(401); // Unauthorized
  }

  next();
};

module.exports = authMiddleware;
