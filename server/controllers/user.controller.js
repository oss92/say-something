/**
 * Get authenticated user
 * @param req
 * @param res
 * @returns void
 */
export function getAuthenticatedUser(req, res) {
  console.log(req.user)
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(403).end();
  }
}
