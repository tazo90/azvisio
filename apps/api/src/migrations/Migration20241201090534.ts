import { Migration } from '@mikro-orm/migrations';

export class Migration20241201090534 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) not null, "password_reset_token" varchar(255) null, "password_reset_expires" timestamptz null, "is_email_confirmed" boolean not null default false, "email_confirmation_token" varchar(255) null, "refresh_token" varchar(255) null, "status" text check ("status" in ('draft', 'invited', 'active', 'disabled', 'archived')) not null default 'draft', "last_access" timestamptz null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "session" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" varchar(255) not null, "token" varchar(255) not null, "refresh_token" varchar(255) not null, "user_agent" varchar(255) null, "ip_address" varchar(255) null, "last_activity" timestamptz not null, "expires_at" timestamptz null, "is_active" boolean not null default true, constraint "session_pkey" primary key ("id"));`);

    this.addSql(`alter table "session" add constraint "session_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

}
