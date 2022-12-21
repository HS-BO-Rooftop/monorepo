import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "automations" })
export class AutomationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // JSON Data
  @Column({ type: 'jsonb' })
  data: string;
}