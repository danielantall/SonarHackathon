import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

const BACKEND = process.env.NEXT_PUBLIC_BACKEND

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getAllJournals(userId: string) {
  try {
    const response = await axios.get(`${BACKEND}/api/journals/`, {
      params: { user_id: userId }
    })
    return response.data
  } catch (err) {
    return err
  }
}

export async function addJournal(content: string, userId: string){
  try{
    const response = await axios.post(`${BACKEND}/api/addjournal`, {user_id: userId, content: content})
    return response.data
  } catch(err){
    return err
  }
}

export async function addHabit(name: string, desc: string, targetStreak: number, userId: string){
  try{
    const response = await axios.post(`${BACKEND}/api/addHabit`, {
      user_id: userId,
      name: name,
      description: desc,
      target: targetStreak,
    })
    return response.data
  } catch(err){
    return err
  }
}