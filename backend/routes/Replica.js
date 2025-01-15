// const express = require("express");
// const router = express.Router();
// const replicaController = require("../controllers/replicaController");
// const imageKitController = require("../controllers/imageKitController");

// router.get("/imagekit-auth", imageKitController.getAuthenticationDetails);

// // POST - Create a new replica with image upload
// router.post("/", express.json(), replicaController.createReplica);

// // GET - Retrieve all replicasnodemon
// router.get("/", replicaController.getAllReplicas);

// // GET by ID - Retrieve a specific replica
// router.get("/:id", replicaController.getReplicaById);

// // PUT - Update a replica with a new image
// //router.put("/:id", upload.single("image"), replicaController.updateReplica);

// // DELETE - Remove a specific replica
// router.delete("/:id", replicaController.deleteReplica);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const replicaController = require("../controllers/replicaController");
const imageKitController = require("../controllers/imageKitController");

// Configure multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory for direct upload to ImageKit
const upload = multer({ storage });

// Route to generate ImageKit authentication parameters
router.get("/imagekit-auth", imageKitController.getAuthenticationDetails);

// POST - Create a new replica with image upload
router.post("/", upload.single("image"), replicaController.createReplica);

// GET - Retrieve all replicas
router.get("/", replicaController.getAllReplicas);

// GET by ID - Retrieve a specific replica
router.get("/:id", replicaController.getReplicaById);

// PUT - Update a replica with a new image
router.put("/:id", replicaController.updateReplica);

router.put("/:id", upload.single("image"), replicaController.updateReplica);

// DELETE - Remove a specific replica
router.delete("/:id", replicaController.deleteReplica);

module.exports = router;
