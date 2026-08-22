import { describe, expect, it } from 'vitest';
import { defaultWorkspace, normalizeWorkspace } from './workspace.js';

describe('workspace normalization', () => {
  it('creates a complete default board for a new account', () => {
    const data = defaultWorkspace('Ada');
    expect(data.profile.name).toBe('Ada');
    expect(data.subjects).toHaveLength(3);
    expect(data.timer.study).toBe(25);
  });

  it('keeps safe records and restores missing required sections', () => {
    const data = normalizeWorkspace({ profile: { name: 'Ada', language: 'de' }, homework: [{ id: 'h1', title: 'Essay' }], timer: { study: 50 } }, 'Fallback');
    expect(data.profile.name).toBe('Ada');
    expect(data.profile.language).toBe('de');
    expect(data.homework).toEqual([{ id: 'h1', title: 'Essay' }]);
    expect(data.timer.study).toBe(50);
    expect(data.reminders).toEqual([]);
    expect(data.subjects).toHaveLength(3);
  });
});
