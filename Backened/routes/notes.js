const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../Middlewares/fetchuser");
const Notes = require("../models/Notes_Schema");

// Get all the Notes : Get all the Notes Using "/api/auth/createuser". No login required for getting the login and signup page  :

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server error ");
  }
});
// Post the Notes : Post the Notes Using "/api/auth/addnotes". login is required for getting the login and signup page  :
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors return the bad request:
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json([savedNote]);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error ");
    }
  }
);

// Router Number 3 : for Updating:

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
   
  // Create a new note object:
  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }

  // Find the note to be updated :

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );
  res.json({ note });
} catch (error) {
  console.log(error);
  res.status(500).send("Internal server error ");
}
});

// Router Number 4 : For deleting the Notes

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  
  // Find the note to be deleted :
try {
  

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
// Allow deletion if only user owns this note :

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({"Success":"The note has bee deleted" });
} catch (error) {
  console.log(error);
  res.status(500).send("Internal server error ");
}
});

module.exports = router;
