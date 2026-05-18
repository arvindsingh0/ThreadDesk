export const uploadDocument = async (req, res) => {
  try {

    console.log("REQ.FILE:");
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log(req.file.path);

    res.status(200).json({
      success: true,
      message: "PDF uploaded successfully",
      file: req.file,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};