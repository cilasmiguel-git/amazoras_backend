import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    // Remove o prefixo "Bearer " do token
    const authToken = token.slice(7, token.length);
    jwt.verify(authToken, config.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.user = decodedToken; // Armazena os detalhes do usuário no objeto de solicitação (req.user)
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Token is not provided" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
    console.log(" é admin")
  } else {
    res.status(403).json({ message: "Admin authorization required" });
  }
};


export { getToken, isAuth, isAdmin };
