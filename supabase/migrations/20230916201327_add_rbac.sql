--create schema
create schema if not exists rbac;

--create tables
create table if not exists rbac.role(
  id UUID DEFAULT gen_random_uuid() primary key,
  name TEXT NOT NULL,
  description TEXT NULL,
  active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL
);

create table if not exists rbac.permission(
  id UUID DEFAULT gen_random_uuid() primary key,
  type TEXT NOT NULL, --select or insert or update or delete
  object TEXT NOT NULL, --table name
  action TEXT GENERATED ALWAYS AS (type || ' on ' || object) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL
);

create table if not exists rbac.role_permission(
  role_id UUID NOT NULL REFERENCES rbac.role(id),
  permission_id UUID NOT NULL REFERENCES rbac.permission(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL,

  PRIMARY KEY(role_id, permission_id)
);

create table if not exists rbac.user_role(
  user_id UUID NOT NULL REFERENCES auth.users(id), --Supabase specific field
  role_id UUID NOT NULL REFERENCES rbac.role(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NULL,
  deleted_at TIMESTAMPTZ NULL,

  PRIMARY KEY(user_id, role_id)
);


--create view to make RLS easier/readable
create or replace view rbac.granular_permissions as
select

  ur.user_id as user_id,
  r.name as role,
  p.action as permission

from rbac.permission p

left join rbac.role_permission rp on
  rp.permission_id = p.id

left join rbac.role r on
  r.id = rp.role_id

left join rbac.user_role ur on
  ur.role_id = r.id

where
  (r.active = true and r.deleted_at is null)
  and ur.deleted_at is null
  and rp.deleted_at is null
  and p.deleted_at is null;

 insert into rbac.permission(type, object)
  values ('SELECT', 'tickets');

  insert into rbac.permission(type, object)
  values ('UPDATE', 'tickets');

  insert into rbac.permission(type, object)
  values ('INSERT', 'tickets');

  insert into rbac.permission(type, object)
  values ('DELETE', 'tickets');

  insert into rbac.role(name, active, description)
  values ('admin', TRUE, 'The administrator role');


create or replace function link_role_to_permissions(role_id UUID, type varchar, object varchar)
returns void
language plpgsql
as $$

declare permissionId UUID := (
    SELECT id
    FROM rbac.permission
    WHERE permission.type = link_role_to_permissions.type
      AND permission.object = link_role_to_permissions.object
    LIMIT 1
);
begin
    insert into rbac.role_permission(permission_id, role_id)
    values (permissionId, link_role_to_permissions.role_id);
end;
$$;

SELECT link_role_to_permissions((
    select id
    from rbac.role
    where name = 'admin'
), 'SELECT', 'tickets');

SELECT link_role_to_permissions((
    select id
    from rbac.role
    where name = 'admin'
), 'INSERT', 'tickets');

SELECT link_role_to_permissions((
    select id
    from rbac.role
    where name = 'admin'
), 'DELETE', 'tickets');

SELECT link_role_to_permissions((
    select id
    from rbac.role
    where name = 'admin'
), 'UPDATE', 'tickets');


GRANT ALL ON ALL TABLES IN SCHEMA rbac to postgres, anon, authenticated, service_role;

create or replace function public.add_role(user_id UUID, role_id UUID)
    returns void
    language plpgsql
as $$
begin
    insert into rbac.user_role(user_id, role_id)
  values (add_role.user_id, add_role.role_id);
  end;
$$;
