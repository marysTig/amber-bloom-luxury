import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ipdnjgwngoivcwifdmtc.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-supabase-service-role-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function createAdmin() {
  const email = "admin@amber-bloom.com";
  const password = "admin_password123";

  console.log(`Creating user ${email}...`);
  
  // 1. Create user in Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) {
    if (authError.message.includes('already exists')) {
      console.log('User already exists! Searching for user id...');
    } else {
      console.error("Error creating user:", authError.message);
      return;
    }
  }

  // Get user id (if it already existed or was just created)
  const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
  if (usersError) {
    console.error("Error fetching users:", usersError.message);
    return;
  }
  
  const user = usersData.users.find(u => u.email === email);
  if (!user) {
    console.error("Could not find the user ID.");
    return;
  }

  const userId = user.id;
  console.log("User ID:", userId);

  // 2. Assign role
  console.log("Assigning 'admin' role...");
  const { error: roleError } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role: "admin" });

  if (roleError) {
    if (roleError.code === '42P01') {
      console.error("\n❌ ERROR: The table 'user_roles' does not exist yet!");
      console.error("Please run the SQL migration script in your Supabase SQL Editor first.\n");
    } else if (roleError.code === '23505') {
       console.log("✅ Role already assigned.");
    } else {
      console.error("Error assigning role:", roleError.message);
    }
    return;
  }

  console.log(`\n✅ Admin user successfully created and role assigned!`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
}

createAdmin();
