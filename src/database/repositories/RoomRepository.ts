import { AppDataSource } from "../../data-source";
import { RoomEntity } from "../entities/Room";

export const RoomRepository = AppDataSource.getRepository(RoomEntity)