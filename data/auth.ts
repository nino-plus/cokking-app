import { createClient } from "@/lib/supabase/server";

export const currentUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
