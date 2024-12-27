import { Migration } from '@mikro-orm/migrations';

export class Migration20241227232827 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "team_invitation" add column "status" text check ("status" in ('pending', 'expired', 'accepted')) not null default 'pending';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "team_invitation" drop column "status";`);
  }

}
