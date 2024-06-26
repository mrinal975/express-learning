export const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const userId = parseInt(id);
  if (isNaN(userId)) return res.status(400).send("not found");
  const findUserIndex = mockUsers.findIndex((user) => user.id == userId);
  if (findUserIndex == -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};
