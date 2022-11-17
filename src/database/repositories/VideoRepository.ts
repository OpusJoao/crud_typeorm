import { AppDataSource } from "../../data-source";
import { VideoEntity } from "../entities/Video";

export const VideoRepository = AppDataSource.getRepository(VideoEntity)