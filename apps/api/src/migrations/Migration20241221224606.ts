import { Migration } from '@mikro-orm/migrations';

export class Migration20241221224606 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "email" varchar(255) not null, "password" varchar(255) not null, "password_reset_token" varchar(255) null, "password_reset_expires" timestamptz null, "email_confirmation_token" varchar(255) null, "refresh_token" varchar(255) null, "status" text check ("status" in ('not_confirmed', 'invited', 'active', 'disabled', 'archived')) not null default 'not_confirmed', "last_access" timestamptz null, "current_workspace_id" varchar(255) null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "workspace" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "description" varchar(255) null, "is_default" boolean not null default false, "owner_id" varchar(255) not null, constraint "workspace_pkey" primary key ("id"));`);

    this.addSql(`create table "session" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "user_id" varchar(255) not null, "token" varchar(255) not null, "refresh_token" varchar(255) not null, "user_agent" varchar(255) null, "ip_address" varchar(255) null, "last_activity" timestamptz not null, "expires_at" timestamptz null, "is_active" boolean not null default true, constraint "session_pkey" primary key ("id"));`);

    this.addSql(`create table "team" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "description" varchar(255) null, "workspace_id" varchar(255) not null, constraint "team_pkey" primary key ("id"));`);

    this.addSql(`create table "team_member" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "team_id" varchar(255) not null, "user_id" varchar(255) not null, "role" text check ("role" in ('member', 'owner')) not null default 'member', constraint "team_member_pkey" primary key ("id"));`);

    this.addSql(`create table "team_invitation" ("id" varchar(255) not null, "created_at" timestamptz null, "updated_at" timestamptz null, "team_id" varchar(255) not null, "email" varchar(255) not null, "role" text check ("role" in ('member', 'owner')) not null default 'member', "token" varchar(255) not null, "expires_at" timestamptz not null, constraint "team_invitation_pkey" primary key ("id"));`);

    this.addSql(`alter table "user" add constraint "user_current_workspace_id_foreign" foreign key ("current_workspace_id") references "workspace" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "workspace" add constraint "workspace_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "session" add constraint "session_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "team" add constraint "team_workspace_id_foreign" foreign key ("workspace_id") references "workspace" ("id") on update cascade;`);

    this.addSql(`alter table "team_member" add constraint "team_member_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade;`);
    this.addSql(`alter table "team_member" add constraint "team_member_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "team_invitation" add constraint "team_invitation_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade;`);
  }

}
