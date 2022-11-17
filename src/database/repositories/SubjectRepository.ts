import { AppDataSource } from "../../data-source";
import { SubjectEntity } from "../entities/Subject";

export const subjectRepository = AppDataSource.getRepository(SubjectEntity)