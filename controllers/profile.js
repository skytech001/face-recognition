const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id: id }) //the where command signifies what colum we want
    .then((user) => {
      if (user.length) {
        res.json(user);
      } else {
        res.status(400).json("not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
};

module.exports = {
  handleProfile: handleProfile,
};
