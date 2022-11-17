import { Request, Response } from "express";
import { RoomRepository } from "../database/repositories/RoomRepository";
import { subjectRepository } from "../database/repositories/SubjectRepository";
import { VideoRepository } from "../database/repositories/VideoRepository";

export class RoomController{
    async create(req: Request, res: Response){
        const { name, description } = req?.body

        if(!name){
            return res.status(400).json({message: 'Field name is mandatory.'});
        }

        try{
            const newRoom = RoomRepository.create({ name, description });

            await RoomRepository.save(newRoom);

            return res.status(201).json(newRoom);
            
        }catch(e){
            console.error('[RoomController.create] Error while trying to perform action', e)
            return res.status(500).json({message: 'Internal server error.'});
        }
    }

    async createVideo(req: Request, res: Response){
        const { title, url } = req?.body
        const { room_id } = req?.params

        if(!title || !url || !room_id){
            return res.status(400).json({message: 'The fields title, url and room_id is mandatory.'});
        }

        try{

            const room = await RoomRepository.findOneBy({id: Number(room_id)});

            if(!room){
                return res.status(404).json({message: 'Room not found'});
            }

            const newVideo = VideoRepository.create({ room, title, url });

            await VideoRepository.save(newVideo);

            return res.status(201).json(newVideo);
            
        }catch(e){
            console.error('[RoomController.createVideo] Error while trying to perform action', e);
            return res.status(500).json({message: 'Internal server error.'});
        }
    }

    async assignSubject(req: Request, res: Response){
        const { subject_id } = req?.body
        const { room_id } = req?.params

        if(!subject_id || !room_id){
            return res.status(400).json({message: 'The fields subject_id, room_id is mandatory.'});
        }

        try{

            const room = await RoomRepository.findOneBy({id: Number(room_id)});

            if(!room){
                return res.status(404).json({message: 'Room not found'});
            }

            const subject = await subjectRepository.findOneBy({id: Number(subject_id)});

            if(!subject){
                return res.status(404).json({message: 'Subject not found'});
            }

            await RoomRepository.save({ ...room, subjects: [subject]});


            return res.status(200).json({ ...room, subjects: [subject]});
            
        }catch(e){
            console.error('[RoomController.createVideo] Error while trying to perform action', e);
            return res.status(500).json({message: 'Internal server error.'});
        }
    }

    async list(req: Request, res: Response){
        try{
            const rooms = await RoomRepository.find({ relations: { subjects: true } });

            return res.json(rooms)
        }catch(e){
            console.error('[RoomController.createVideo] Error while trying to perform action', e);
            return res.status(500).json({message: 'Internal server error.'});
        }
    }
}