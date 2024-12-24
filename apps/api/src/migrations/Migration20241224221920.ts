import { Migration } from '@mikro-orm/migrations';

export class Migration20241224221920 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_current_workspace_id_foreign";`);

    this.addSql(`alter table "user" rename column "current_workspace_id" to "active_workspace_id";`);
    this.addSql(`alter table "user" add constraint "user_active_workspace_id_foreign" foreign key ("active_workspace_id") references "workspace" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_active_workspace_id_foreign";`);

    this.addSql(`alter table "user" rename column "active_workspace_id" to "current_workspace_id";`);
    this.addSql(`alter table "user" add constraint "user_current_workspace_id_foreign" foreign key ("current_workspace_id") references "workspace" ("id") on update cascade on delete set null;`);
  }

}
