import { describe, expect, it } from 'vitest';
import { defaultWorkspace, normalizeWorkspace } from './workspace.js';

describe('workspace normalization', () => {
  it('creates a complete default board for a new account', () => {
    const data = defaultWorkspace('Ada');
    expect(data.profile.name).toBe('Ada');
    expect(data.profile.languagePreference).toBe('manual');
    expect(data.subjects).toHaveLength(3);
    expect(data.timer.study).toBe(25);
  });

  it('uses the account-creation language and grade system for a new board', () => {
    const data = defaultWorkspace('Ada', { language: 'de', gradeSystem: 'letter' });
    expect(data.profile.language).toBe('de');
    expect(data.profile.gradeSystem).toBe('letter');
    expect(data.subjects.map(subject => subject.icon)).toEqual(['math', 'language', 'science']);
    expect(data.reminderGroups).toEqual([]);
  });

  it('keeps safe records and restores missing required sections', () => {
    const data = normalizeWorkspace({ profile: { name: 'Ada', language: 'de' }, homework: [{ id: 'h1', title: 'Essay' }], reminderGroups: [{ id: 'g1', name: 'School' }], timer: { study: 50 } }, 'Fallback');
    expect(data.profile.name).toBe('Ada');
    expect(data.profile.language).toBe('de');
    expect(data.profile.languagePreference).toBe('manual');
    expect(data.homework).toEqual([{ id: 'h1', title: 'Essay' }]);
    expect(data.timer.study).toBe(50);
    expect(data.reminders).toEqual([]);
    expect(data.reminderGroups).toEqual([{ id: 'g1', name: 'School' }]);
    expect(data.subjects).toHaveLength(3);
  });
});
