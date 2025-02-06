const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
  
  module.exports = adminMiddleware;
  