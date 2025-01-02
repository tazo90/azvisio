import { Migration } from '@mikro-orm/migrations';

export class Migration20250102220354 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "full_name" varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "full_name";`);
  }

}
