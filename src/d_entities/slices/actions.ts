'use server'

import { cookies } from "next/headers"

export async function removeHashedId() {
  cookies().delete('rso-hashed-id');
}