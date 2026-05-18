import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }

};

export default protect;