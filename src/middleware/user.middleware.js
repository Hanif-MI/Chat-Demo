import { findByPk } from "../services/auth.service.js";

export async function loadUser(req, res, next) {
  try {
    const user = await findByPk(req.user.user_id);
    if (!user) return res.status(404).json({ error: "User not found" });
    req.user = user; // now a full user object
    next();
  } catch (err) {
    next(err);
  }
}
