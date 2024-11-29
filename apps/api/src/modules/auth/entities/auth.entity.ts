import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ type: 'number' })
  id!: number;

  @Property({ type: 'text' })
  name!: string;

  @Property({ type: 'text' })
  email!: string;

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt: Date = new Date();
}
