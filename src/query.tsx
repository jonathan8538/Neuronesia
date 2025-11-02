import { supabase } from "./lib/supabaseClient"

export type users = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

type Result<T> = { success: boolean; data?: T; message?: string };

export const getUsers = async (): Promise<Result<users[]>> => {
  const { data, error } = await supabase.from("users").select("*")
  if (error) return { success: false, message: error.message }
  return { success: true, data: data }
}

export const getUsersById = async (id: string): Promise<Result<users>> => {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).limit(1)
  if (error) return { success: false, message: error.message }
  if (!data || data.length <= 0) return { success: false, message: "USER NOT FOUND" }
  return { success: true, data: data[0] }
}

export const insertUser = async (
  id: string,
  full_name: string,
  email: string,
  avatar_url: string,
  created_at: string
): Promise<Result<users>> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .limit(1);

  if (error) return { success: false, message: error.message };
  if (data && data.length > 0)
    return { success: false, message: "DATA ALREADY EXISTS!" };

  const { data: insertData, error: insertError } = await supabase
    .from("users")
    .insert({
      id: id,
      full_name: full_name,
      email: email,
      avatar_url: avatar_url,
      created_at: created_at,
    })
    .select()
    .limit(1);

  if (insertError) return { success: false, message: insertError.message };
  if (!insertData || insertData.length === 0)
    return { success: false, message: "Insert failed: no data returned." };

  return { success: true, data: insertData[0] };
};

export const updateUser = async (
  id: string, skip_tutor: boolean
): Promise<Result<users>> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .limit(1);

  if (error) return { success: false, message: error.message };
  if (!data || data.length <= 0)
    return { success: false, message: "DATA NOT EXISTS!" };

  const { data: updateData, error: updateError } = await supabase
    .from("users").update({ skip_tutor: skip_tutor }).eq("id", id).select()

  if (updateError) return { success: false, message: updateError.message };
  if (!updateData || updateData.length === 0)
    return { success: false, message: "update failed: no data returned." };

  return { success: true, data: updateData[0] };
};

export const deleteUser = async (
  id: string
): Promise<Result<users>> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .limit(1);

  if (error) return { success: false, message: error.message };
  if (!data || data.length <= 0)
    return { success: false, message: "DATA NOT EXISTS!" };

  const { data: deleteData, error: deleteError } = await supabase
    .from("users").delete().eq("id", id).select()

  if (deleteError) return { success: false, message: deleteError.message };
  if (!deleteData || deleteData.length === 0)
    return { success: false, message: "delete failed: no data returned." };

  return { success: true, data: deleteData[0] };
};