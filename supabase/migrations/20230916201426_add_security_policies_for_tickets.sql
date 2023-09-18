create policy "Enable read for authenticated users"
on tickets
for select
to authenticated
using (
    exists(
        select 1
        from rbac.granular_permissions gp
        where
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'SELECT on tickets'
    )
);

create policy "Enable insert for authenticated users"
on tickets
for insert
to authenticated
with check (
    exists(
        select 1
        from rbac.granular_permissions gp
        where
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'INSERT on tickets'
    )
);

create policy "Enable update for authenticated users"
on tickets
for update
to authenticated
using (
    exists(
        select 1
        from rbac.granular_permissions gp
        where
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'UPDATE on tickets'
    )
)
with check (
    exists(
        select 1
        from rbac.granular_permissions gp
        where
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'UPDATE on tickets'
    )
);

create policy "Enable delete for authenticated users"
on tickets
for update
to authenticated
using (
    exists(
        select 1
        from rbac.granular_permissions gp
        where
          gp.user_id = auth.uid() --Supabase specific function
          and gp.permission = 'DELETE on tickets'
    )
);
