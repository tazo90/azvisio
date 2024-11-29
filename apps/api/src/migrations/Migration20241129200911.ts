import { Migration } from '@mikro-orm/migrations';

export class Migration20241129200911 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "name" text not null, "email" text not null, "created_at" date not null);`);
  }

}
