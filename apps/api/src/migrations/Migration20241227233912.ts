import { Migration } from '@mikro-orm/migrations';

export class Migration20241227233912 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "team_invitation" drop constraint if exists "team_invitation_status_check";`);

    this.addSql(`alter table "team_invitation" add constraint "team_invitation_status_check" check("status" in ('pending', 'expired', 'accepted'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "team_invitation" drop constraint if exists "team_invitation_status_check";`);

    this.addSql(`alter table "team_invitation" add constraint "team_invitation_status_check" check("status" in ('PENDING', 'EXPIRED', 'ACCEPTED'));`);
  }

}
