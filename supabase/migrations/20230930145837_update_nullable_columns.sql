alter table "public"."messages" alter column "content_html" set not null;

alter table "public"."messages" alter column "content_text" set not null;

alter table "public"."messages" alter column "from" set not null;

alter table "public"."messages" alter column "message_id" set not null;

alter table "public"."messages" alter column "ticket_id" set not null;

alter table "public"."messages" alter column "to" set not null;

alter table "public"."messages" alter column "via" set not null;

alter table "public"."tickets" alter column "is_spam" set default false;

alter table "public"."tickets" alter column "is_spam" set not null;


