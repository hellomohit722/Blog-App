const jwt = require('jsonwebtoken');
const secret = "Mohit123@";

function generateToken(user) {
    const token = jwt.sign({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        prfileImage: user.profileImage,
        role: user.role },
        secret, 
         { expiresIn: '1h' });
    return token;
}

function verifyToken(token){
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };