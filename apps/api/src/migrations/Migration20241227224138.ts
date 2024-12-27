import { Migration } from '@mikro-orm/migrations';

export class Migration20241227224138 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "team_member" drop constraint "team_member_team_id_foreign";`);

    this.addSql(`alter table "team_invitation" drop constraint "team_invitation_team_id_foreign";`);

    this.addSql(`alter table "team_member" add constraint "team_member_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade on delete cascade ;`);

    this.addSql(`alter table "team_invitation" add constraint "team_invitation_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "team_member" drop constraint "team_member_team_id_foreign";`);

    this.addSql(`alter table "team_invitation" drop constraint "team_invitation_team_id_foreign";`);

    this.addSql(`alter table "team_member" add constraint "team_member_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade;`);

    this.addSql(`alter table "team_invitation" add constraint "team_invitation_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade;`);
  }

}
