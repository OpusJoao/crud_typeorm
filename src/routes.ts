import { Request, Response, Router } from "express";
import { RoomController } from "./controllers/RoomController";
import { SubjectController } from "./controllers/SubjectController";

const routes = Router()

const subjectController = new SubjectController()
const roomController = new RoomController()

routes.post('/subject', subjectController.create);
routes.post('/room', roomController.create);
routes.get('/room', roomController.list);
routes.post('/room/:room_id/createVideo', roomController.createVideo);
routes.post('/room/:room_id/assignSubject', roomController.assignSubject);

export default routes