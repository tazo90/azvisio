import { Migration } from '@mikro-orm/migrations';

export class Migration20241227224352 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "team" drop constraint "team_workspace_id_foreign";`);

    this.addSql(`alter table "team" add constraint "team_workspace_id_foreign" foreign key ("workspace_id") references "workspace" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "team" drop constraint "team_workspace_id_foreign";`);

    this.addSql(`alter table "team" add constraint "team_workspace_id_foreign" foreign key ("workspace_id") references "workspace" ("id") on update cascade;`);
  }

}
