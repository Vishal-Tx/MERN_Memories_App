import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const secret = "test";
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length > 21;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
