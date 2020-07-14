exports.addExpertise = async (req, res) => {
  // User_ID
  // TOPIC
  // LEVEL - 1 / 2 / 3git
  // eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlM0ckpESUpPQ2FkWGF1d3duMGdEVyJ9.eyJuaWNrbmFtZSI6ImFuc2h1bHJnb3lhbCIsIm5hbWUiOiJBbnNodWwgR295YWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9hdmF0YXJzMi5naXRodWJ1c2VyY29udGVudC5jb20vdS8zMjA2ODA3NT92PTQiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0xNFQwODoyMDoxMS41NThaIiwiaXNzIjoiaHR0cHM6Ly9jcm9zcy1wb2RzLmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJnaXRodWJ8MzIwNjgwNzUiLCJhdWQiOiJYUHMzZmpvTWp5dFBYSUJHcDRDaEdXRFV0dmRFbWZKbCIsImlhdCI6MTU5NDcxNDgxMywiZXhwIjoxNTk0NzUwODEzLCJub25jZSI6IlVGaEZkVEpaYzNOMU5

  // @TODO: Add Validation

  const { sub } = req.user;

  try {
  } catch (error) {}

  res.status(200).json({
    msg: "You Registered!",
  });
};
