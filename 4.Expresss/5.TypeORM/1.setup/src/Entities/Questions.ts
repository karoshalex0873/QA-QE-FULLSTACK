import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Interview extends BaseEntity {
  @PrimaryGeneratedColumn()
  interviewId!: number;

  @Column()
  role!: string;  // e.g., "Software Engineer", "Data Scientist"

  @Column()
  level!: string; // e.g., "Junior", "Mid-Level", "Senior"

  @Column()
  techStack!: string; // e.g., "JavaScript, React, Node.js"

  @Column()
  type!: string; // e.g., "Behavioral", "System Design", "Coding"

  @Column({ type: 'integer', default: 0 })
  amount!: number;  //number of questions

  @Column("simple-array", { nullable: true })
  questions!: string[];
}
