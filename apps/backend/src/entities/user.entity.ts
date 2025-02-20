import { IUser } from "@common/types";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User implements IUser{
    @PrimaryGeneratedColumn()
    id: number = 0;
  
    @Column()
    name: string = '';
  
    @Column({ unique: true, nullable: false })
    email: string = '';
}
