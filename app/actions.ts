"use server";

import { prisma } from "@/lib/prisma";
import type { AppState } from "@/utils/storage";

const DEFAULT_USERNAME = "myaccount";

export async function fetchAppState(): Promise<AppState | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { username: DEFAULT_USERNAME },
    });
    
    if (user && user.appState) {
      return user.appState as unknown as AppState;
    }
    return null;
  } catch (error) {
    console.error("Error fetching AppState:", error);
    return null;
  }
}

export async function saveAppStateToDB(appState: AppState): Promise<boolean> {
  try {
    await prisma.user.upsert({
      where: { username: DEFAULT_USERNAME },
      update: {
        appState: appState as any,
      },
      create: {
        username: DEFAULT_USERNAME,
        appState: appState as any,
      },
    });
    return true;
  } catch (error) {
    console.error("Error saving AppState:", error);
    return false;
  }
}

export async function checkAdminPassword(password: string): Promise<boolean> {
  return password === process.env.ADMIN_PASSWORD;
}
