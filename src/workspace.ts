import { and, eq } from 'drizzle-orm';
import { db } from './db.js';
import { users, workspaceRecords, workspaceSettings, type JsonObject, type User } from './schema.js';

export type WorkspaceRecord = JsonObject & { id: string };

export interface WorkspaceData {
  profile: JsonObject;
  subjects: WorkspaceRecord[];
  homework: WorkspaceRecord[];
  reminders: WorkspaceRecord[];
  reminderGroups: WorkspaceRecord[];
  notes: WorkspaceRecord[];
  notebooks: WorkspaceRecord[];
  noteHighlights: WorkspaceRecord[];
  grades: WorkspaceRecord[];
  events: WorkspaceRecord[];
  goals: WorkspaceRecord[];
  friends: WorkspaceRecord[];
  widgets: WorkspaceRecord[];
  timer: JsonObject;
  stats: JsonObject;
}

const collections = ['subjects', 'homework', 'reminders', 'reminderGroups', 'notes', 'notebooks', 'noteHighlights', 'grades', 'events', 'goals', 'friends', 'widgets'] as const;
type Collection = typeof collections[number];

const isObject = (value: unknown): value is JsonObject => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const object = (value: unknown): JsonObject => isObject(value) ? value : {};
const recordArray = (value: unknown): WorkspaceRecord[] => Array.isArray(value)
  ? value.filter(isObject).filter(item => typeof item.id === 'string' && item.id.length > 0).map(item => ({ ...item, id: String(item.id) }))
  : [];

export type InitialWorkspacePreferences = {
  language?: string;
  languagePreference?: 'auto' | 'manual';
  gradeSystem?: string;
};

const supportedLanguages = new Set(['en', 'de', 'tr', 'ru', 'uk', 'es']);
const supportedGradeSystems = new Set(['numeric', 'percentage', 'letter']);

export function defaultWorkspace(displayName: string, preferences: InitialWorkspacePreferences = {}): WorkspaceData {
  const language = supportedLanguages.has(preferences.language || '') ? preferences.language! : 'en';
  const gradeSystem = supportedGradeSystems.has(preferences.gradeSystem || '') ? preferences.gradeSystem! : 'numeric';
  const languagePreference = preferences.languagePreference === 'manual' ? 'manual' : 'auto';
  return {
    profile: { name: displayName, photo: '', theme: 'light', accent: '#f4c53a', gradeSystem, clockFormat: '24', language, languagePreference, deviceLocaleVersion: 1, discoverySource: '' },
    subjects: [
      { id: 'math', name: 'Math', color: '#6c63ff', icon: 'math' },
      { id: 'english', name: 'English', color: '#ec4899', icon: 'language' },
      { id: 'science', name: 'Science', color: '#10b981', icon: 'science' }
    ],
    homework: [], reminders: [], reminderGroups: [], notes: [], notebooks: [], noteHighlights: [], grades: [], events: [], goals: [], friends: [], widgets: [],
    timer: { study: 25, break: 5, longBreak: 15, custom: 30, completedSessions: 0 },
    stats: { studyMinutes: 0, completedHomework: 0, lastStudyDate: '', dailyStudy: {} }
  };
}

export function normalizeWorkspace(input: unknown, displayName: string): WorkspaceData {
  const fallback = defaultWorkspace(displayName);
  const candidate = object(input);
  const requestedProfile = object(candidate.profile);
  const savedLanguagePreference = requestedProfile.languagePreference;
  const languagePreference = savedLanguagePreference === 'auto' || savedLanguagePreference === 'manual'
    ? savedLanguagePreference
    : 'auto';
  const profile = { ...fallback.profile, ...requestedProfile, languagePreference, name: String(requestedProfile.name || displayName).slice(0, 40) };
  const timer = { ...fallback.timer, ...object(candidate.timer) };
  const stats = { ...fallback.stats, ...object(candidate.stats) };
  const data = { ...fallback, profile, timer, stats } as WorkspaceData;
  for (const collection of collections) {
    const records = recordArray(candidate[collection]);
    data[collection] = collection === 'subjects' && records.length === 0 ? fallback.subjects : records;
  }
  data.subjects = data.subjects.map(subject => subject.id === 'math' && subject.name === 'Mathematics' ? { ...subject, name: 'Math' } : subject);
  return data;
}

export async function createWorkspace(user: User, preferences?: InitialWorkspacePreferences) {
  await saveWorkspace(user, defaultWorkspace(user.displayName, preferences));
}

export async function loadWorkspace(user: User): Promise<WorkspaceData> {
  const [settings] = await db.select().from(workspaceSettings).where(eq(workspaceSettings.userId, user.id)).limit(1);
  const records = await db.select().from(workspaceRecords).where(eq(workspaceRecords.userId, user.id));
  const partial: JsonObject = { ...object(settings?.data) };
  for (const collection of collections) partial[collection] = [];
  for (const record of records) {
    if (!collections.includes(record.collection as Collection)) continue;
    (partial[record.collection] as WorkspaceRecord[]).push({ ...record.data, id: record.recordId });
  }
  return normalizeWorkspace(partial, user.displayName);
}

export async function saveWorkspace(user: User, input: unknown): Promise<WorkspaceData> {
  const data = normalizeWorkspace(input, user.displayName);
  const requestedName = String(data.profile.name || user.displayName).trim().slice(0, 40) || user.displayName;
  data.profile.name = requestedName;
  const records = collections.flatMap(collection => data[collection].map(record => ({
    userId: user.id,
    collection,
    recordId: record.id,
    data: record,
    updatedAt: new Date()
  })));
  await db.transaction(async transaction => {
    await transaction.insert(workspaceSettings).values({
      userId: user.id,
      data: { profile: data.profile, timer: data.timer, stats: data.stats },
      updatedAt: new Date()
    }).onConflictDoUpdate({
      target: workspaceSettings.userId,
      set: { data: { profile: data.profile, timer: data.timer, stats: data.stats }, updatedAt: new Date() }
    });
    await transaction.delete(workspaceRecords).where(eq(workspaceRecords.userId, user.id));
    if (records.length) await transaction.insert(workspaceRecords).values(records);
    if (requestedName !== user.displayName) {
      await transaction.update(users).set({ displayName: requestedName, updatedAt: new Date() }).where(eq(users.id, user.id));
    }
  });
  return data;
}

export async function workspaceBelongsToUser(userId: string, attachmentId: string) {
  return and(eq(workspaceRecords.userId, userId), eq(workspaceRecords.recordId, attachmentId));
}
