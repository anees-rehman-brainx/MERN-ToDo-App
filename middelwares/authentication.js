require("dotenv").config();
const jwtService = require('../service/jwt-service')
const userService = require('../service/user-service')

const verifyAuth = async (request, response, next) => {
    console.log("In verify auth");
    const authHeader = request.headers.access_token;
 
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwtService.verifyToken(
            token,
            process.env.JWT_TOKEN_KEY,
            async (err, user) => {

                if (err) {
                    return response
                        .status(401)
                        .json({ error: "Token is not valid!" });
                }

                const dbUser = await userService.getUserById(user._id);
                
                if (!dbUser)
                    return response
                        .status(404)
                        .json({ error: "User not found" });

                if (dbUser.token === null) {
                    return response
                        .status(401)
                        .json({ error: "Session token not found" });
                }

                const decoded = jwtService.decodeToken(token);
                if (!decoded) {
                    return response
                        .status(401)
                        .json({ error: "Invalid token" });
                }

                request.user = dbUser;
                next();
            }
        );
    } else {
        response
            .status(403)
            .json({
                error: "'access_token' required in headers"
            });
    }
};

module.exports = {
    verifyAuth
}