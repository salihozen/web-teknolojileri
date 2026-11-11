// Health Check Controller
const getHealth = (req, res) => {
  res.status(200).json({
    status: "ok",
    student: "2416501011"
  });
};

module.exports = {
  getHealth
};
