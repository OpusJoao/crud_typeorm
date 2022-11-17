import { Request, Response } from "express";
import { subjectRepository } from "../database/repositories/SubjectRepository";

export class SubjectController{
    async create(req: Request, res: Response){
        const { name } = req?.body;

        if(!name){
            return res.status(400).json({message: 'Field name is mandatory.'});
        }

        try{
            const newSubject = subjectRepository.create({ name })

            await subjectRepository.save(newSubject)

            return res.status(201).json(newSubject)
            
        }catch(e){
            console.error('[SubjectControler.create] Error while trying to perform action', e)
            return res.status(500).json({message: 'Internal server error.'})
        }
    }
}