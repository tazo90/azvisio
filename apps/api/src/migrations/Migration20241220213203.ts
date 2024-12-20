import { Migration } from '@mikro-orm/migrations';

export class Migration20241220213203 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint if exists "user_status_check";`);

    this.addSql(`alter table "user" drop column "is_email_confirmed";`);

    this.addSql(`alter table "user" add constraint "user_status_check" check("status" in ('not_confirmed', 'invited', 'active', 'disabled', 'archived'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint if exists "user_status_check";`);

    this.addSql(`alter table "user" add column "is_email_confirmed" boolean not null default false;`);
    this.addSql(`alter table "user" add constraint "user_status_check" check("status" in ('draft', 'invited', 'active', 'disabled', 'archived'));`);
  }

}
