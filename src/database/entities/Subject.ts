import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomEntity } from "./Room";

@Entity('subjects')
export class SubjectEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
        nullable: false
    })
    name:string

    @ManyToMany(() =>  RoomEntity, room => room.subjects)
    @JoinTable({
        name: 'room_subject',
        joinColumn: {
            name: 'room_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn:{
            name: 'subject_id',
            referencedColumnName: 'id'
        }
    })
    rooms: RoomEntity[]
}