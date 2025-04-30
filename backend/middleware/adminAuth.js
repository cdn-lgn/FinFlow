export const adminAuth = (req, res, next) => {
  if (req.user.senderRole !== 'admin') {
    return res.status(403).json({
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};
