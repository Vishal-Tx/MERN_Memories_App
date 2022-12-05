import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const secret = "test";
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      console.log("decodedData", decodedData);
      if (decodedData?.sub) {
        req.userId = decodedData?.id;
        req.sub = decodedData?.sub;
      } else {
        req.userId = decodedData?.id;
      }
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
