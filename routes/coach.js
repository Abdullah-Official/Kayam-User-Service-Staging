const express = require('express')
const {createCoach, getAllCoaches, postCoachProfile,getCoachProfileByCoachId, findCoachSepcialities, findAllCoachProfiles, deleteCoachProfile, createCoachSpeciality} = require('../controllers/coach')
const routes = express.Router();
const {authMiddleware} = require('../middlewares/index')

routes.route('/create').post(authMiddleware,createCoach);
routes.route('/').get(getAllCoaches);
routes.route('/profiles').get(findAllCoachProfiles);
routes.route('/coach-profile').post(authMiddleware,getCoachProfileByCoachId);
routes.route('/create-profile').post(authMiddleware,postCoachProfile);
routes.route('/delete-profile').post(authMiddleware,deleteCoachProfile);
routes.route('/create-speciality').post(authMiddleware, createCoachSpeciality);
routes.route('/specialities').post(findCoachSepcialities);


module.exports = routes;