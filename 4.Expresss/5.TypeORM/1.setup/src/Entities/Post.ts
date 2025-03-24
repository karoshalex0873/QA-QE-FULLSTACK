import { BaseEntity,Column,Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity{
  // id serial PRIMARY KEY,
  @PrimaryGeneratedColumn()
  post_id!: number;

  // title of the  post
  @Column({type:"text"})
  title!: string;

  // content of the post
  @Column({type:"text"})
  content!: string;

  // image of the post
  @Column({type:"text"})
  image!: string;

  // timestamp of the post
  @Column({type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
  createdAt!: Date;

  // foreign key to user
  @ManyToOne(()=> User,(user)=>user.posts,{onDelete: "CASCADE"})
  user!: User;
}