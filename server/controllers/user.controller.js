import logger from '../util/logger';

/**
 * Get authenticated user
 * @param req
 * @param res
 * @returns void
 */
export function getAuthenticatedUser(req, res) {
	logger.debug("requesting authenticated user profile", req.user)
  if (req.user) {
    res.send(req.user);
  } else {
    res.send({});
  }
}
