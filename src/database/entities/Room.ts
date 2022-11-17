import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubjectEntity } from "./Subject";
import { VideoEntity } from "./Video";

@Entity('rooms')
export class RoomEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
        nullable: false
    })
    name: string

    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @OneToMany(() => VideoEntity, videos => videos.room)
    videos: VideoEntity[]

    @ManyToMany(() => SubjectEntity, subject => subject.rooms)
    subjects: SubjectEntity[]
}