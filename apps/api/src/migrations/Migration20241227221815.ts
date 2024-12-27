import { Migration } from '@mikro-orm/migrations';

export class Migration20241227221815 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "team" add constraint "team_name_workspace_id_unique" unique ("name", "workspace_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "team" drop constraint "team_name_workspace_id_unique";`);
  }

}
