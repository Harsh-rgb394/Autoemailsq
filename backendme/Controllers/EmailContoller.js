const { asyncHandler } = require("../utils/asynchandler");
const Sequence = require("../Models/EmailModel");
const { scheduleEmails } = require("../utils/seqhandler");

// Controller to handle email sequence creation and scheduling
const MailController = asyncHandler(async (req, res) => {
  const { nodes, edges } = req.body;
  console.log(nodes, edges);

  try {
    // Save the email sequence data (nodes and edges) to the database
    const newSequence = new Sequence({ nodes, edges });
    await newSequence.save();

    // Trigger the scheduling of emails based on the saved sequence
    await scheduleEmails();

    res.status(200).send("Sequence saved and emails scheduled");
  } catch (error) {
    res.status(500).send("Error saving sequence", error);
  }
});

module.exports = MailController;
