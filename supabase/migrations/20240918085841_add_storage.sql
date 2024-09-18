alter table "public"."recipes" drop column "createdAt";

alter table "public"."recipes" add column "created_at" timestamp with time zone not null default now();

create policy "Enable read access for all users"
on "public"."recipes"
as permissive
for select
to public
using (true);


create policy "Users can insert their own recipes"
on "public"."recipes"
as permissive
for insert
to authenticated
with check ((auth.uid() = "userId"));


create policy "Enable insert for authenticated users only"
on "public"."users"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);




