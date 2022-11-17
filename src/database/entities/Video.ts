import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomEntity } from "./Room";

@Entity('videos')
export class VideoEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
        nullable: false
    })
    title: string

    @Column({
        type: 'text',
        nullable: false
    })
    url: string

    @ManyToOne(() => RoomEntity, room => room.videos)
    @JoinColumn({ name: 'room_id'})
    room: RoomEntity
}