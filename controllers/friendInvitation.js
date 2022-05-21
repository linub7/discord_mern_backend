exports.postInvite = async (req, res) => {
  try {
    const {
      body: { targetMailAddress },
    } = req;
    console.log(targetMailAddress);

    res.send('Controller is working');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
