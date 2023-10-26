alter table "public"."messages" alter column "direction" set data type text using "direction"::text;

alter table "public"."messages" alter column "firstname" set data type text using "firstname"::text;

alter table "public"."messages" alter column "from" set data type text using "from"::text;

alter table "public"."messages" alter column "lastname" set data type text using "lastname"::text;

alter table "public"."messages" alter column "message_id" set data type text using "message_id"::text;

alter table "public"."messages" alter column "to" set data type text using "to"::text;

alter table "public"."messages" alter column "via" set data type text using "via"::text;

CREATE UNIQUE INDEX messages_message_id_key ON public.messages USING btree (message_id);

alter table "public"."messages" add constraint "messages_message_id_key" UNIQUE using index "messages_message_id_key";


