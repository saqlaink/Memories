import jwt from "jsonwebtoken";

// wants to like a post
//click the like button => auth middleware(NEXT) => like controller
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //if less than 500 than our own else google auth

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.indexOf;
    } else {
      //google oauth
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
