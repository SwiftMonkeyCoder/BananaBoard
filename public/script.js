/* BananaBoard — a framework-free study dashboard with server-synced personal data. */
(() => {
  'use strict';

  const APP_NAME = 'BananaBoard';
  const ACCENTS = ['#f4c53a', '#6c63ff', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
  const NAV = [
    ['dashboard', '⌂', 'Dashboard'], ['homework', '✓', 'Homework'], ['calendar', '□', 'Calendar'],
    ['reminders', '⊙', 'Reminders'], ['notes', '▤', 'Notes'], ['grades', 'A+', 'Grades'], ['timer', '◷', 'Study Timer'],
    ['statistics', '↗', 'Statistics'], ['goals', '◎', 'Goals'], ['subjects', '▦', 'Subjects'], ['widgets', '◫', 'Widgets']
  ];
  const SETTINGS_NAV_ICON = '<svg class="settings-nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"/><path d="M19.1 13.7c.1-.5.1-1 .1-1.7s0-1.2-.1-1.7l2-1.5-2-3.5-2.4 1a8.4 8.4 0 0 0-2.9-1.7L13.5 2h-4l-.4 2.6a8.4 8.4 0 0 0-2.9 1.7l-2.4-1-2 3.5 2 1.5c-.1.5-.1 1-.1 1.7s0 1.2.1 1.7l-2 1.5 2 3.5 2.4-1a8.4 8.4 0 0 0 2.9 1.7l.4 2.6h4l.4-2.6a8.4 8.4 0 0 0 2.9-1.7l2.4 1 2-3.5-2-1.5Z"/></svg>';
  const QUOTES = [
    ['Small steps every day become big results.', APP_NAME],
    ['The secret of getting ahead is getting started.', 'Mark Twain'],
    ['Focus on progress, not perfection.', APP_NAME],
    ['You do not have to be great to start, but you have to start to be great.', 'Zig Ziglar']
  ];
  const DISCOVERABLE_PEOPLE = [
    { id: 'ava-ramirez', name: 'Ava Ramirez', activity: 'Revising biology', color: '#ec4899' },
    { id: 'leo-martin', name: 'Leo Martin', activity: 'Working through maths', color: '#3b82f6' },
    { id: 'mira-chen', name: 'Mira Chen', activity: 'Planning a study week', color: '#10b981' },
    { id: 'noah-schmidt', name: 'Noah Schmidt', activity: 'Preparing for history', color: '#f59e0b' },
    { id: 'sophia-lee', name: 'Sophia Lee', activity: 'Taking a focus break', color: '#6c63ff' }
  ];
  const LANGUAGE_OPTIONS = [['en', 'English'], ['de', 'German'], ['tr', 'Turkish'], ['ru', 'Russian'], ['uk', 'Ukrainian'], ['es', 'Spanish']];
  const LOCALE_CODES = { en: 'en-GB', de: 'de-DE', tr: 'tr-TR', ru: 'ru-RU', uk: 'uk-UA', es: 'es-ES' };
  const TRANSLATIONS = {
    de: {
      'ONE LAST STEP': 'NOCH EIN SCHRITT', 'Make your study space yours.': 'Gestalte deinen Lernbereich.', 'Choose how StudyFlow should look and calculate grades.': 'Wähle aus, wie StudyFlow aussehen und Noten berechnen soll.', 'What should we call you?': 'Wie sollen wir dich nennen?', 'Your name': 'Dein Name', 'Theme': 'Design', 'Light': 'Hell', 'Dark': 'Dunkel', 'System': 'System', 'Accent colour': 'Akzentfarbe', 'Grade system': 'Notensystem', 'Number scale (1 is best · 6 is worst)': 'Zahlenskala (1 ist am besten · 6 am schlechtesten)', 'Percentage (0–100%)': 'Prozent (0–100 %)', 'Letter (A–F)': 'Buchstaben (A–F)', 'Language': 'Sprache', 'Personalize': 'Personalisiere', 'Setting language': 'Sprache wird eingestellt', 'Making every part of your space feel familiar…': 'Dein Bereich wird vertraut eingerichtet…', 'Personalizing your experience': 'Deine Erfahrung wird personalisiert', 'Setting up your study space…': 'Dein Lernbereich wird eingerichtet…',
      'Dashboard': 'Übersicht', 'Homework': 'Hausaufgaben', 'Calendar': 'Kalender', 'Reminders': 'Erinnerungen', 'Notes': 'Notizen', 'Grades': 'Noten', 'Study Timer': 'Lerntimer', 'Statistics': 'Statistiken', 'Goals': 'Ziele', 'Subjects': 'Fächer', 'Widgets': 'Widgets', 'Settings': 'Einstellungen', 'Personal space': 'Persönlicher Bereich', 'Version': 'Version', 'Search everything…': 'Alles durchsuchen…', 'Quick add': 'Schnell hinzufügen', 'Event or test': 'Ereignis oder Test', 'Reminder': 'Erinnerung', 'Goal': 'Ziel', 'Subject': 'Fach', 'Grade': 'Note', 'Note': 'Notiz', 'Tasks': 'Aufgaben', 'Plan': 'Plan', 'Focus': 'Fokus', 'Remind': 'Erinnern', 'Stats': 'Statistiken',
      'YOUR STUDY SPACE': 'DEIN LERNBEREICH', 'Good': 'Guten', 'morning': 'Morgen', 'afternoon': 'Tag', 'evening': 'Abend', 'Here is what needs your attention today.': 'Das braucht heute deine Aufmerksamkeit.', 'LOCAL TIME': 'ORTSZEIT', 'Open homework': 'Offene Hausaufgaben', 'Focused time': 'Fokuszeit', 'Due this week': 'Diese Woche fällig', 'Tasks completed': 'Erledigte Aufgaben', 'Upcoming homework': 'Anstehende Hausaufgaben', 'Today’s plan': 'Heutiger Plan', 'Focus timer': 'Fokus-Timer', 'Daily reminder': 'Täglicher Impuls', 'View all': 'Alle anzeigen', 'Open timer': 'Timer öffnen', 'Add homework': 'Hausaufgabe hinzufügen', 'Add event': 'Ereignis hinzufügen', 'Nothing due yet': 'Noch nichts fällig', 'A clear schedule': 'Ein freier Plan', 'No homework due right now.': 'Gerade sind keine Hausaufgaben fällig.', 'Next homework': 'Nächste Hausaufgabe', 'Next reminder': 'Nächste Erinnerung', 'Tests & events': 'Tests & Ereignisse', 'No open reminders.': 'Keine offenen Erinnerungen.', 'Nothing upcoming.': 'Nichts steht an.',
      'TASKS': 'AUFGABEN', 'Keep every assignment in one calm, organized place.': 'Behalte jede Aufgabe an einem ruhigen, übersichtlichen Ort.', '＋ Add homework': '＋ Hausaufgabe hinzufügen', 'All': 'Alle', 'To do': 'Zu erledigen', 'Completed': 'Erledigt', 'Overdue': 'Überfällig', 'Details': 'Details', 'No homework here': 'Keine Hausaufgaben hier', 'Try another filter or add a new assignment.': 'Wähle einen anderen Filter oder füge eine Aufgabe hinzu.', 'DON’T FORGET': 'NICHT VERGESSEN', 'Keep small but important things in view before they slip your mind.': 'Behalte kleine, wichtige Dinge im Blick, bevor du sie vergisst.', '＋ Add reminder': '＋ Erinnerung hinzufügen', 'OPEN REMINDERS': 'OFFENE ERINNERUNGEN', 'Still to remember': 'Noch zu erledigen', 'DUE TODAY': 'HEUTE FÄLLIG', 'Worth a quick check': 'Einen kurzen Blick wert', 'Already handled': 'Schon erledigt', 'Reminder notifications': 'Erinnerungsbenachrichtigungen', 'Enable browser notifications for reminders while StudyFlow is open in a background tab or window.': 'Aktiviere Browser-Benachrichtigungen, während StudyFlow in einem Hintergrund-Tab oder -Fenster geöffnet ist.', 'Enable notifications': 'Benachrichtigungen aktivieren', 'Notifications on': 'Benachrichtigungen an', 'Notifications unavailable': 'Benachrichtigungen nicht verfügbar', 'All reminders': 'Alle Erinnerungen', 'Nothing to remember yet': 'Noch nichts zu merken', 'Add a reminder for tasks, forms, deadlines, or anything else.': 'Füge eine Erinnerung für Aufgaben, Formulare, Termine oder alles andere hinzu.',
      'PLAN AHEAD': 'VORAUSPLANEN', 'See your events and study deadlines at a glance.': 'Sieh deine Ereignisse und Lerntermine auf einen Blick.', '＋ Add event': '＋ Ereignis hinzufügen', 'Today': 'Heute', 'SELECTED DATE': 'AUSGEWÄHLTES DATUM', 'Nothing planned': 'Nichts geplant', 'This day is free.': 'Dieser Tag ist frei.', '＋ Event on this day': '＋ Ereignis an diesem Tag', 'More…': 'Mehr…', 'All day': 'Ganztägig', 'YOUR IDEAS': 'DEINE IDEEN', 'Capture class notes, revision summaries, and reminders.': 'Halte Unterrichtsnotizen, Zusammenfassungen und Erinnerungen fest.', '＋ New note': '＋ Neue Notiz', 'No content yet.': 'Noch kein Inhalt.', 'Your notebook is clear': 'Dein Notizbuch ist leer', 'Add notes for lessons, ideas, or revision.': 'Füge Notizen für Unterricht, Ideen oder Wiederholung hinzu.', 'Create a note': 'Notiz erstellen',
      'ACADEMICS': 'SCHULE', 'Track your results and notice patterns over time.': 'Behalte deine Ergebnisse im Blick und erkenne Muster.', '＋ Add grade': '＋ Note hinzufügen', 'OVERALL AVERAGE': 'GESAMTDURCHSCHNITT', 'RECORDED GRADES': 'ERFASSTE NOTEN', 'Across all subjects': 'Über alle Fächer', 'BEST RESULT': 'BESTES ERGEBNIS', 'Your personal high point': 'Dein persönlicher Bestwert', 'Grade history': 'Notenverlauf', 'No grades recorded': 'Keine Noten erfasst', 'Add a result to start seeing your average.': 'Füge ein Ergebnis hinzu, um deinen Durchschnitt zu sehen.', 'ORGANIZE': 'ORGANISIEREN', 'Create reusable subjects for homework, notes, grades, and events.': 'Erstelle Fächer für Hausaufgaben, Notizen, Noten und Ereignisse.', '＋ Add subject': '＋ Fach hinzufügen', 'No subjects yet': 'Noch keine Fächer', 'Add a subject to organize your work.': 'Füge ein Fach hinzu, um deine Arbeit zu ordnen.',
      'MILESTONES': 'MEILENSTEINE', 'Turn the things you want to achieve into visible progress.': 'Mache deine Ziele zu sichtbaren Fortschritten.', '＋ Add goal': '＋ Ziel hinzufügen', 'In progress': 'In Arbeit', 'No target date': 'Kein Zieldatum', 'Set your first goal': 'Setze dein erstes Ziel', 'A goal can be as small as revising one chapter.': 'Ein Ziel kann so klein sein wie ein Kapitel zu wiederholen.', 'CUSTOMIZE': 'ANPASSEN', 'Create small widgets that stay visible across StudyFlow until you turn them off.': 'Erstelle kleine Widgets, die in StudyFlow sichtbar bleiben, bis du sie ausschaltest.', '＋ Create widget': '＋ Widget erstellen', 'Next task': 'Nächste Aufgabe', 'Test countdown': 'Test-Countdown', 'Upcoming plans': 'Kommende Pläne', 'Study stats': 'Lernstatistiken', 'Customize': 'Anpassen', 'Your screen widgets': 'Deine Bildschirm-Widgets', 'Enabled widgets stay visible throughout the app. Turn one off here or use its × button.': 'Aktivierte Widgets bleiben in der ganzen App sichtbar. Schalte sie hier oder mit × aus.', 'Turn on': 'Einschalten', 'Turn off': 'Ausschalten', 'No screen widgets yet': 'Noch keine Bildschirm-Widgets', 'Choose a widget above and tailor it to what you need.': 'Wähle oben ein Widget und passe es an deine Bedürfnisse an.',
      'FOCUS': 'FOKUS', 'Choose a rhythm that works for you, then give it your full attention.': 'Wähle einen Rhythmus, der zu dir passt, und konzentriere dich ganz darauf.', 'Study': 'Lernen', 'Break': 'Pause', 'Long break': 'Lange Pause', 'Custom': 'Benutzerdefiniert', 'Start': 'Start', 'Pause': 'Pause', 'Reset': 'Zurücksetzen', 'Skip': 'Überspringen', 'Timer settings': 'Timer-Einstellungen', 'Choose the length of every focus mode.': 'Wähle die Dauer für jeden Fokusmodus.', 'Study minutes': 'Lernminuten', 'Break minutes': 'Pausenminuten', 'Long break minutes': 'Minuten lange Pause', 'Custom minutes': 'Eigene Minuten', 'Save settings': 'Einstellungen speichern',
      'PREFERENCES': 'EINSTELLUNGEN', 'Every change on this page saves automatically.': 'Jede Änderung auf dieser Seite wird automatisch gespeichert.', 'Appearance': 'Darstellung', 'Changes appear immediately, so you can see what feels right.': 'Änderungen erscheinen sofort, damit du sehen kannst, was sich richtig anfühlt.', 'Accent color': 'Akzentfarbe', 'Applied across the whole app': 'In der ganzen App verwendet', 'Clock format': 'Uhrzeitformat', 'Dashboard local time': 'Ortszeit auf der Übersicht', '24-hour': '24-Stunden', '12-hour': '12-Stunden', 'Profile & grades': 'Profil & Noten', 'Personal details are saved only in this browser.': 'Persönliche Daten werden nur in diesem Browser gespeichert.', 'Display name': 'Anzeigename', 'Profile picture': 'Profilbild', 'Choose from Photos': 'Aus Fotos wählen', 'Select an image from your device': 'Wähle ein Bild von deinem Gerät', 'Changes save automatically.': 'Änderungen werden automatisch gespeichert.', 'Backup': 'Sicherung', 'Export data': 'Daten exportieren', 'Import data': 'Daten importieren', 'Export': 'Exportieren', 'Import': 'Importieren', 'Reset': 'Zurücksetzen', 'Clear all data': 'Alle Daten löschen', 'Language preference': 'Sprache', 'Choose the language used throughout StudyFlow.': 'Wähle die Sprache für ganz StudyFlow.',
      'Save': 'Speichern', 'Cancel': 'Abbrechen', 'Close': 'Schließen', 'Edit': 'Bearbeiten', 'Delete': 'Löschen', 'Title': 'Titel', 'Name': 'Name', 'Date': 'Datum', 'Due date': 'Fälligkeitsdatum', 'Add a date': 'Datum hinzufügen', 'Add a time': 'Uhrzeit hinzufügen', 'Time': 'Uhrzeit', 'Priority': 'Priorität', 'Low': 'Niedrig', 'Medium': 'Mittel', 'High': 'Hoch', 'Color': 'Farbe', 'Icon': 'Symbol', 'Choose a subject icon': 'Fachsymbol wählen', 'Use custom': 'Eigenes verwenden', 'Custom emoji, letter, or symbol': 'Eigenes Emoji, Buchstabe oder Symbol', 'Repeat': 'Wiederholen', 'Does not repeat': 'Wird nicht wiederholt', 'Every day': 'Jeden Tag', 'Every week': 'Jede Woche', 'Every month': 'Jeden Monat', 'Progress (%)': 'Fortschritt (%)', 'Target date': 'Zieldatum', 'Assessment': 'Bewertung', 'Widget type': 'Widget-Typ', 'Widget date (optional)': 'Widget-Datum (optional)', 'Countdown target': 'Countdown-Ziel', 'Next upcoming test or event': 'Nächster Test oder Ereignis', 'Choose a time': 'Uhrzeit wählen', 'Hour': 'Stunde', 'Minute': 'Minute', 'Clear': 'Leeren', 'Scroll the wheels to choose a time.': 'Scrolle durch die Räder, um eine Uhrzeit zu wählen.', 'Dates with calendar events': 'Daten mit Kalenderereignissen', 'Close picker': 'Auswahl schließen',
      'English': 'Englisch', 'German': 'Deutsch', 'Turkish': 'Türkisch', 'Russian': 'Russisch', 'Ukrainian': 'Ukrainisch'
    },
    tr: {
      'ONE LAST STEP': 'SON BİR ADIM', 'Make your study space yours.': 'Çalışma alanını kendine göre düzenle.', 'Choose how StudyFlow should look and calculate grades.': 'StudyFlow’un nasıl görüneceğini ve notları nasıl hesaplayacağını seç.', 'What should we call you?': 'Sana nasıl hitap edelim?', 'Your name': 'Adın', 'Theme': 'Tema', 'Light': 'Açık', 'Dark': 'Koyu', 'System': 'Sistem', 'Accent colour': 'Vurgu rengi', 'Grade system': 'Not sistemi', 'Number scale (1 is best · 6 is worst)': 'Sayı sistemi (1 en iyi · 6 en kötü)', 'Percentage (0–100%)': 'Yüzde (0–100%)', 'Letter (A–F)': 'Harf (A–F)', 'Language': 'Dil', 'Personalize': 'Kişiselleştir', 'Setting language': 'Dil ayarlanıyor', 'Making every part of your space feel familiar…': 'Alanının her bölümü sana uygun hâle getiriliyor…', 'Personalizing your experience': 'Deneyimin kişiselleştiriliyor', 'Setting up your study space…': 'Çalışma alanın hazırlanıyor…',
      'Dashboard': 'Panel', 'Homework': 'Ödevler', 'Calendar': 'Takvim', 'Reminders': 'Hatırlatıcılar', 'Notes': 'Notlar', 'Grades': 'Notlar', 'Study Timer': 'Çalışma Zamanlayıcısı', 'Statistics': 'İstatistikler', 'Goals': 'Hedefler', 'Subjects': 'Dersler', 'Widgets': 'Araçlar', 'Settings': 'Ayarlar', 'Personal space': 'Kişisel alan', 'Version': 'Sürüm', 'Search everything…': 'Her şeyi ara…', 'Quick add': 'Hızlı ekle', 'Event or test': 'Etkinlik veya sınav', 'Reminder': 'Hatırlatıcı', 'Goal': 'Hedef', 'Subject': 'Ders', 'Grade': 'Not', 'Note': 'Not', 'Tasks': 'Görevler', 'Plan': 'Plan', 'Focus': 'Odak', 'Remind': 'Hatırlat', 'Stats': 'İstatistikler',
      'YOUR STUDY SPACE': 'ÇALIŞMA ALANIN', 'Good': 'İyi', 'morning': 'sabahlar', 'afternoon': 'günler', 'evening': 'akşamlar', 'Here is what needs your attention today.': 'Bugün dikkatini gerektirenler burada.', 'LOCAL TIME': 'YEREL SAAT', 'Open homework': 'Açık ödevler', 'Focused time': 'Odaklanma süresi', 'Due this week': 'Bu hafta teslim', 'Tasks completed': 'Tamamlanan görevler', 'Upcoming homework': 'Yaklaşan ödevler', 'Today’s plan': 'Bugünün planı', 'Focus timer': 'Odak zamanlayıcısı', 'Daily reminder': 'Günlük hatırlatma', 'View all': 'Tümünü gör', 'Open timer': 'Zamanlayıcıyı aç', 'Add homework': 'Ödev ekle', 'Add event': 'Etkinlik ekle', 'Nothing due yet': 'Henüz teslim yok', 'A clear schedule': 'Boş bir program', 'No homework due right now.': 'Şu anda teslim edilecek ödev yok.', 'Next homework': 'Sonraki ödev', 'Next reminder': 'Sonraki hatırlatıcı', 'Tests & events': 'Sınavlar ve etkinlikler', 'No open reminders.': 'Açık hatırlatıcı yok.', 'Nothing upcoming.': 'Yaklaşan bir şey yok.',
      'TASKS': 'GÖREVLER', 'Keep every assignment in one calm, organized place.': 'Her ödevi sakin ve düzenli tek bir yerde tut.', '＋ Add homework': '＋ Ödev ekle', 'All': 'Tümü', 'To do': 'Yapılacak', 'Completed': 'Tamamlandı', 'Overdue': 'Gecikmiş', 'Details': 'Ayrıntılar', 'No homework here': 'Burada ödev yok', 'Try another filter or add a new assignment.': 'Başka bir filtre dene veya yeni bir ödev ekle.', 'DON’T FORGET': 'UNUTMA', 'Keep small but important things in view before they slip your mind.': 'Küçük ama önemli şeyleri unutmadan gözünün önünde tut.', '＋ Add reminder': '＋ Hatırlatıcı ekle', 'OPEN REMINDERS': 'AÇIK HATIRLATICILAR', 'Still to remember': 'Hâlâ hatırlanacak', 'DUE TODAY': 'BUGÜN TESLİM', 'Worth a quick check': 'Kısa bir kontrol değer', 'Already handled': 'Zaten halledildi', 'Reminder notifications': 'Hatırlatıcı bildirimleri', 'Enable browser notifications for reminders while StudyFlow is open in a background tab or window.': 'StudyFlow arka planda bir sekme veya pencerede açıkken hatırlatıcı bildirimlerini etkinleştir.', 'Enable notifications': 'Bildirimleri etkinleştir', 'Notifications on': 'Bildirimler açık', 'Notifications unavailable': 'Bildirimler kullanılamıyor', 'All reminders': 'Tüm hatırlatıcılar', 'Nothing to remember yet': 'Henüz hatırlanacak bir şey yok', 'Add a reminder for tasks, forms, deadlines, or anything else.': 'Görevler, formlar, son tarihler veya başka şeyler için hatırlatıcı ekle.',
      'PLAN AHEAD': 'ÖNCEDEN PLANLA', 'See your events and study deadlines at a glance.': 'Etkinliklerini ve çalışma son tarihlerini tek bakışta gör.', '＋ Add event': '＋ Etkinlik ekle', 'Today': 'Bugün', 'SELECTED DATE': 'SEÇİLEN TARİH', 'Nothing planned': 'Planlanmış bir şey yok', 'This day is free.': 'Bu gün boş.', '＋ Event on this day': '＋ Bu güne etkinlik ekle', 'More…': 'Daha fazla…', 'All day': 'Tüm gün', 'YOUR IDEAS': 'FİKİRLERİN', 'Capture class notes, revision summaries, and reminders.': 'Ders notlarını, tekrar özetlerini ve hatırlatıcıları kaydet.', '＋ New note': '＋ Yeni not', 'No content yet.': 'Henüz içerik yok.', 'Your notebook is clear': 'Not defterin boş', 'Add notes for lessons, ideas, or revision.': 'Dersler, fikirler veya tekrar için not ekle.', 'Create a note': 'Not oluştur',
      'ACADEMICS': 'AKADEMİK', 'Track your results and notice patterns over time.': 'Sonuçlarını takip et ve zaman içindeki örüntüleri fark et.', '＋ Add grade': '＋ Not ekle', 'OVERALL AVERAGE': 'GENEL ORTALAMA', 'RECORDED GRADES': 'KAYITLI NOTLAR', 'Across all subjects': 'Tüm derslerde', 'BEST RESULT': 'EN İYİ SONUÇ', 'Your personal high point': 'Kişisel en iyi sonucun', 'Grade history': 'Not geçmişi', 'No grades recorded': 'Kaydedilmiş not yok', 'Add a result to start seeing your average.': 'Ortalamanı görmek için bir sonuç ekle.', 'ORGANIZE': 'DÜZENLE', 'Create reusable subjects for homework, notes, grades, and events.': 'Ödevler, notlar, sınav notları ve etkinlikler için tekrar kullanılabilir dersler oluştur.', '＋ Add subject': '＋ Ders ekle', 'No subjects yet': 'Henüz ders yok', 'Add a subject to organize your work.': 'Çalışmalarını düzenlemek için bir ders ekle.',
      'MILESTONES': 'DÖNÜM NOKTALARI', 'Turn the things you want to achieve into visible progress.': 'Ulaşmak istediklerini görünür ilerlemeye dönüştür.', '＋ Add goal': '＋ Hedef ekle', 'In progress': 'Devam ediyor', 'No target date': 'Hedef tarihi yok', 'Set your first goal': 'İlk hedefini belirle', 'A goal can be as small as revising one chapter.': 'Bir hedef, bir bölümü tekrar etmek kadar küçük olabilir.', 'CUSTOMIZE': 'ÖZELLEŞTİR', 'Create small widgets that stay visible across StudyFlow until you turn them off.': 'Kapatana kadar StudyFlow’da görünür kalan küçük araçlar oluştur.', '＋ Create widget': '＋ Araç oluştur', 'Next task': 'Sonraki görev', 'Test countdown': 'Sınav geri sayımı', 'Upcoming plans': 'Yaklaşan planlar', 'Study stats': 'Çalışma istatistikleri', 'Customize': 'Özelleştir', 'Your screen widgets': 'Ekran araçların', 'Enabled widgets stay visible throughout the app. Turn one off here or use its × button.': 'Etkin araçlar uygulamada görünür kalır. Buradan veya × ile kapat.', 'Turn on': 'Aç', 'Turn off': 'Kapat', 'No screen widgets yet': 'Henüz ekran aracı yok', 'Choose a widget above and tailor it to what you need.': 'Yukarıdan bir araç seç ve ihtiyacına göre ayarla.',
      'FOCUS': 'ODAK', 'Choose a rhythm that works for you, then give it your full attention.': 'Sana uyan bir ritim seç ve tüm dikkatini ona ver.', 'Study': 'Çalışma', 'Break': 'Mola', 'Long break': 'Uzun mola', 'Custom': 'Özel', 'Start': 'Başlat', 'Pause': 'Duraklat', 'Reset': 'Sıfırla', 'Skip': 'Atla', 'Timer settings': 'Zamanlayıcı ayarları', 'Choose the length of every focus mode.': 'Her odak modunun süresini seç.', 'Study minutes': 'Çalışma dakikası', 'Break minutes': 'Mola dakikası', 'Long break minutes': 'Uzun mola dakikası', 'Custom minutes': 'Özel dakika', 'Save settings': 'Ayarları kaydet',
      'PREFERENCES': 'TERCİHLER', 'Every change on this page saves automatically.': 'Bu sayfadaki her değişiklik otomatik kaydedilir.', 'Appearance': 'Görünüm', 'Changes appear immediately, so you can see what feels right.': 'Değişiklikler hemen görünür; sana uygun olanı görebilirsin.', 'Accent color': 'Vurgu rengi', 'Applied across the whole app': 'Tüm uygulamada kullanılır', 'Clock format': 'Saat biçimi', 'Dashboard local time': 'Panel yerel saati', '24-hour': '24 saat', '12-hour': '12 saat', 'Profile & grades': 'Profil ve notlar', 'Personal details are saved only in this browser.': 'Kişisel bilgiler yalnızca bu tarayıcıda saklanır.', 'Display name': 'Görünen ad', 'Profile picture': 'Profil fotoğrafı', 'Choose from Photos': 'Fotoğraflardan seç', 'Select an image from your device': 'Cihazından bir görsel seç', 'Changes save automatically.': 'Değişiklikler otomatik kaydedilir.', 'Backup': 'Yedek', 'Export data': 'Verileri dışa aktar', 'Import data': 'Verileri içe aktar', 'Export': 'Dışa aktar', 'Import': 'İçe aktar', 'Clear all data': 'Tüm verileri sil', 'Language preference': 'Dil', 'Choose the language used throughout StudyFlow.': 'StudyFlow genelinde kullanılacak dili seç.',
      'Save': 'Kaydet', 'Cancel': 'İptal', 'Close': 'Kapat', 'Edit': 'Düzenle', 'Delete': 'Sil', 'Title': 'Başlık', 'Name': 'Ad', 'Date': 'Tarih', 'Due date': 'Teslim tarihi', 'Add a date': 'Tarih ekle', 'Add a time': 'Saat ekle', 'Time': 'Saat', 'Priority': 'Öncelik', 'Low': 'Düşük', 'Medium': 'Orta', 'High': 'Yüksek', 'Color': 'Renk', 'Icon': 'Simge', 'Choose a subject icon': 'Ders simgesi seç', 'Use custom': 'Özel kullan', 'Custom emoji, letter, or symbol': 'Özel emoji, harf veya simge', 'Repeat': 'Tekrarla', 'Does not repeat': 'Tekrarlanmaz', 'Every day': 'Her gün', 'Every week': 'Her hafta', 'Every month': 'Her ay', 'Progress (%)': 'İlerleme (%)', 'Target date': 'Hedef tarihi', 'Assessment': 'Değerlendirme', 'Widget type': 'Araç türü', 'Widget date (optional)': 'Araç tarihi (isteğe bağlı)', 'Countdown target': 'Geri sayım hedefi', 'Next upcoming test or event': 'Sonraki yaklaşan sınav veya etkinlik', 'Choose a time': 'Saat seç', 'Hour': 'Saat', 'Minute': 'Dakika', 'Clear': 'Temizle', 'Scroll the wheels to choose a time.': 'Saat seçmek için tekerlekleri kaydır.', 'Dates with calendar events': 'Takvim etkinliği olan tarihler', 'Close picker': 'Seçiciyi kapat',
      'English': 'İngilizce', 'German': 'Almanca', 'Turkish': 'Türkçe', 'Russian': 'Rusça', 'Ukrainian': 'Ukraynaca'
    },
    ru: {
      'ONE LAST STEP': 'ПОСЛЕДНИЙ ШАГ', 'Make your study space yours.': 'Сделайте своё учебное пространство своим.', 'Choose how StudyFlow should look and calculate grades.': 'Выберите вид StudyFlow и способ подсчёта оценок.', 'What should we call you?': 'Как к вам обращаться?', 'Your name': 'Ваше имя', 'Theme': 'Тема', 'Light': 'Светлая', 'Dark': 'Тёмная', 'System': 'Системная', 'Accent colour': 'Акцентный цвет', 'Grade system': 'Система оценок', 'Number scale (1 is best · 6 is worst)': 'Числовая шкала (1 — лучшая · 6 — худшая)', 'Percentage (0–100%)': 'Проценты (0–100 %)', 'Letter (A–F)': 'Буквенная (A–F)', 'Language': 'Язык', 'Personalize': 'Настроить', 'Setting language': 'Настройка языка', 'Making every part of your space feel familiar…': 'Настраиваем всё пространство для вас…', 'Personalizing your experience': 'Персонализируем ваш опыт', 'Setting up your study space…': 'Готовим ваше учебное пространство…',
      'Dashboard': 'Главная', 'Homework': 'Домашние задания', 'Calendar': 'Календарь', 'Reminders': 'Напоминания', 'Notes': 'Заметки', 'Grades': 'Оценки', 'Study Timer': 'Таймер учёбы', 'Statistics': 'Статистика', 'Goals': 'Цели', 'Subjects': 'Предметы', 'Widgets': 'Виджеты', 'Settings': 'Настройки', 'Personal space': 'Личное пространство', 'Version': 'Версия', 'Search everything…': 'Искать всё…', 'Quick add': 'Быстро добавить', 'Event or test': 'Событие или тест', 'Reminder': 'Напоминание', 'Goal': 'Цель', 'Subject': 'Предмет', 'Grade': 'Оценка', 'Note': 'Заметка', 'Tasks': 'Задачи', 'Plan': 'План', 'Focus': 'Фокус', 'Remind': 'Напомнить', 'Stats': 'Статистика',
      'YOUR STUDY SPACE': 'ВАШЕ УЧЕБНОЕ ПРОСТРАНСТВО', 'Good': 'Добрый', 'morning': 'утро', 'afternoon': 'день', 'evening': 'вечер', 'Here is what needs your attention today.': 'Вот что требует вашего внимания сегодня.', 'LOCAL TIME': 'МЕСТНОЕ ВРЕМЯ', 'Open homework': 'Открытые задания', 'Focused time': 'Время фокуса', 'Due this week': 'Срок на этой неделе', 'Tasks completed': 'Выполненные задачи', 'Upcoming homework': 'Ближайшие задания', 'Today’s plan': 'План на сегодня', 'Focus timer': 'Таймер фокуса', 'Daily reminder': 'Мысль дня', 'View all': 'Показать всё', 'Open timer': 'Открыть таймер', 'Add homework': 'Добавить задание', 'Add event': 'Добавить событие', 'Nothing due yet': 'Пока нет сроков', 'A clear schedule': 'Свободное расписание', 'No homework due right now.': 'Сейчас нет заданий со сроком.', 'Next homework': 'Следующее задание', 'Next reminder': 'Следующее напоминание', 'Tests & events': 'Тесты и события', 'No open reminders.': 'Нет открытых напоминаний.', 'Nothing upcoming.': 'Ничего не запланировано.',
      'TASKS': 'ЗАДАЧИ', 'Keep every assignment in one calm, organized place.': 'Храните все задания в одном спокойном и организованном месте.', '＋ Add homework': '＋ Добавить задание', 'All': 'Все', 'To do': 'Сделать', 'Completed': 'Выполнено', 'Overdue': 'Просрочено', 'Details': 'Подробности', 'No homework here': 'Здесь нет заданий', 'Try another filter or add a new assignment.': 'Попробуйте другой фильтр или добавьте новое задание.', 'DON’T FORGET': 'НЕ ЗАБУДЬТЕ', 'Keep small but important things in view before they slip your mind.': 'Держите важные мелочи на виду, чтобы не забыть.', '＋ Add reminder': '＋ Добавить напоминание', 'OPEN REMINDERS': 'ОТКРЫТЫЕ НАПОМИНАНИЯ', 'Still to remember': 'Ещё нужно помнить', 'DUE TODAY': 'СРОК СЕГОДНЯ', 'Worth a quick check': 'Стоит быстро проверить', 'Already handled': 'Уже сделано', 'Reminder notifications': 'Уведомления напоминаний', 'Enable browser notifications for reminders while StudyFlow is open in a background tab or window.': 'Включите уведомления браузера, пока StudyFlow открыт в фоновом окне или вкладке.', 'Enable notifications': 'Включить уведомления', 'Notifications on': 'Уведомления включены', 'Notifications unavailable': 'Уведомления недоступны', 'All reminders': 'Все напоминания', 'Nothing to remember yet': 'Пока нечего запоминать', 'Add a reminder for tasks, forms, deadlines, or anything else.': 'Добавьте напоминание о задачах, формах, сроках или чём угодно.',
      'PLAN AHEAD': 'ПЛАНИРУЙТЕ ВПЕРЁД', 'See your events and study deadlines at a glance.': 'Смотрите события и учебные сроки одним взглядом.', '＋ Add event': '＋ Добавить событие', 'Today': 'Сегодня', 'SELECTED DATE': 'ВЫБРАННАЯ ДАТА', 'Nothing planned': 'Ничего не запланировано', 'This day is free.': 'Этот день свободен.', '＋ Event on this day': '＋ Событие в этот день', 'More…': 'Ещё…', 'All day': 'Весь день', 'YOUR IDEAS': 'ВАШИ ИДЕИ', 'Capture class notes, revision summaries, and reminders.': 'Сохраняйте конспекты, итоги повторения и напоминания.', '＋ New note': '＋ Новая заметка', 'No content yet.': 'Пока нет содержимого.', 'Your notebook is clear': 'Ваш блокнот пуст', 'Add notes for lessons, ideas, or revision.': 'Добавьте заметки для уроков, идей или повторения.', 'Create a note': 'Создать заметку',
      'ACADEMICS': 'УЧЁБА', 'Track your results and notice patterns over time.': 'Отслеживайте результаты и замечайте закономерности.', '＋ Add grade': '＋ Добавить оценку', 'OVERALL AVERAGE': 'ОБЩИЙ СРЕДНИЙ БАЛЛ', 'RECORDED GRADES': 'ЗАПИСАННЫЕ ОЦЕНКИ', 'Across all subjects': 'По всем предметам', 'BEST RESULT': 'ЛУЧШИЙ РЕЗУЛЬТАТ', 'Your personal high point': 'Ваш личный рекорд', 'Grade history': 'История оценок', 'No grades recorded': 'Нет записанных оценок', 'Add a result to start seeing your average.': 'Добавьте результат, чтобы увидеть средний балл.', 'ORGANIZE': 'ОРГАНИЗАЦИЯ', 'Create reusable subjects for homework, notes, grades, and events.': 'Создавайте предметы для заданий, заметок, оценок и событий.', '＋ Add subject': '＋ Добавить предмет', 'No subjects yet': 'Пока нет предметов', 'Add a subject to organize your work.': 'Добавьте предмет, чтобы упорядочить работу.',
      'MILESTONES': 'ВЕХИ', 'Turn the things you want to achieve into visible progress.': 'Превращайте то, чего хотите достичь, в видимый прогресс.', '＋ Add goal': '＋ Добавить цель', 'In progress': 'В процессе', 'No target date': 'Нет целевой даты', 'Set your first goal': 'Поставьте первую цель', 'A goal can be as small as revising one chapter.': 'Цель может быть такой небольшой, как повторение одной главы.', 'CUSTOMIZE': 'НАСТРОЙКА', 'Create small widgets that stay visible across StudyFlow until you turn them off.': 'Создавайте маленькие виджеты, видимые в StudyFlow, пока не выключите их.', '＋ Create widget': '＋ Создать виджет', 'Next task': 'Следующая задача', 'Test countdown': 'Обратный отсчёт до теста', 'Upcoming plans': 'Ближайшие планы', 'Study stats': 'Статистика учёбы', 'Customize': 'Настроить', 'Your screen widgets': 'Ваши виджеты', 'Enabled widgets stay visible throughout the app. Turn one off here or use its × button.': 'Включённые виджеты видны во всём приложении. Выключите здесь или кнопкой ×.', 'Turn on': 'Включить', 'Turn off': 'Выключить', 'No screen widgets yet': 'Пока нет виджетов', 'Choose a widget above and tailor it to what you need.': 'Выберите виджет выше и настройте его под себя.',
      'FOCUS': 'ФОКУС', 'Choose a rhythm that works for you, then give it your full attention.': 'Выберите подходящий ритм и уделите ему всё внимание.', 'Study': 'Учёба', 'Break': 'Перерыв', 'Long break': 'Длинный перерыв', 'Custom': 'Свой', 'Start': 'Начать', 'Pause': 'Пауза', 'Reset': 'Сбросить', 'Skip': 'Пропустить', 'Timer settings': 'Настройки таймера', 'Choose the length of every focus mode.': 'Выберите длительность каждого режима фокуса.', 'Study minutes': 'Минуты учёбы', 'Break minutes': 'Минуты перерыва', 'Long break minutes': 'Минуты длинного перерыва', 'Custom minutes': 'Свои минуты', 'Save settings': 'Сохранить настройки',
      'PREFERENCES': 'ПАРАМЕТРЫ', 'Every change on this page saves automatically.': 'Каждое изменение на этой странице сохраняется автоматически.', 'Appearance': 'Внешний вид', 'Changes appear immediately, so you can see what feels right.': 'Изменения видны сразу — так вы увидите, что вам подходит.', 'Accent color': 'Акцентный цвет', 'Applied across the whole app': 'Применяется во всём приложении', 'Clock format': 'Формат времени', 'Dashboard local time': 'Местное время на главной', '24-hour': '24-часовой', '12-hour': '12-часовой', 'Profile & grades': 'Профиль и оценки', 'Personal details are saved only in this browser.': 'Личные данные сохраняются только в этом браузере.', 'Display name': 'Отображаемое имя', 'Profile picture': 'Фото профиля', 'Choose from Photos': 'Выбрать из фото', 'Select an image from your device': 'Выберите изображение с устройства', 'Changes save automatically.': 'Изменения сохраняются автоматически.', 'Backup': 'Резервная копия', 'Export data': 'Экспорт данных', 'Import data': 'Импорт данных', 'Export': 'Экспорт', 'Import': 'Импорт', 'Clear all data': 'Удалить все данные', 'Language preference': 'Язык', 'Choose the language used throughout StudyFlow.': 'Выберите язык для всего StudyFlow.',
      'Save': 'Сохранить', 'Cancel': 'Отмена', 'Close': 'Закрыть', 'Edit': 'Изменить', 'Delete': 'Удалить', 'Title': 'Название', 'Name': 'Имя', 'Date': 'Дата', 'Due date': 'Срок', 'Add a date': 'Добавить дату', 'Add a time': 'Добавить время', 'Time': 'Время', 'Priority': 'Приоритет', 'Low': 'Низкий', 'Medium': 'Средний', 'High': 'Высокий', 'Color': 'Цвет', 'Icon': 'Значок', 'Choose a subject icon': 'Выберите значок предмета', 'Use custom': 'Использовать свой', 'Custom emoji, letter, or symbol': 'Свой эмодзи, буква или символ', 'Repeat': 'Повтор', 'Does not repeat': 'Не повторяется', 'Every day': 'Каждый день', 'Every week': 'Каждую неделю', 'Every month': 'Каждый месяц', 'Progress (%)': 'Прогресс (%)', 'Target date': 'Целевая дата', 'Assessment': 'Оценивание', 'Widget type': 'Тип виджета', 'Widget date (optional)': 'Дата виджета (необязательно)', 'Countdown target': 'Цель отсчёта', 'Next upcoming test or event': 'Ближайший тест или событие', 'Choose a time': 'Выберите время', 'Hour': 'Час', 'Minute': 'Минута', 'Clear': 'Очистить', 'Scroll the wheels to choose a time.': 'Прокрутите колёса, чтобы выбрать время.', 'Dates with calendar events': 'Даты с событиями календаря', 'Close picker': 'Закрыть выбор',
      'English': 'Английский', 'German': 'Немецкий', 'Turkish': 'Турецкий', 'Russian': 'Русский', 'Ukrainian': 'Украинский'
    },
    uk: {
      'ONE LAST STEP': 'ОСТАННІЙ КРОК', 'Make your study space yours.': 'Зробіть свій навчальний простір власним.', 'Choose how StudyFlow should look and calculate grades.': 'Оберіть вигляд StudyFlow і спосіб підрахунку оцінок.', 'What should we call you?': 'Як до вас звертатися?', 'Your name': 'Ваше ім’я', 'Theme': 'Тема', 'Light': 'Світла', 'Dark': 'Темна', 'System': 'Системна', 'Accent colour': 'Акцентний колір', 'Grade system': 'Система оцінювання', 'Number scale (1 is best · 6 is worst)': 'Числова шкала (1 — найкраща · 6 — найгірша)', 'Percentage (0–100%)': 'Відсотки (0–100 %)', 'Letter (A–F)': 'Літерна (A–F)', 'Language': 'Мова', 'Personalize': 'Налаштувати', 'Setting language': 'Налаштування мови', 'Making every part of your space feel familiar…': 'Налаштовуємо весь простір для вас…', 'Personalizing your experience': 'Персоналізуємо ваш досвід', 'Setting up your study space…': 'Готуємо ваш навчальний простір…',
      'Dashboard': 'Головна', 'Homework': 'Домашні завдання', 'Calendar': 'Календар', 'Reminders': 'Нагадування', 'Notes': 'Нотатки', 'Grades': 'Оцінки', 'Study Timer': 'Таймер навчання', 'Statistics': 'Статистика', 'Goals': 'Цілі', 'Subjects': 'Предмети', 'Widgets': 'Віджети', 'Settings': 'Налаштування', 'Personal space': 'Особистий простір', 'Version': 'Версія', 'Search everything…': 'Шукати все…', 'Quick add': 'Швидко додати', 'Event or test': 'Подія або тест', 'Reminder': 'Нагадування', 'Goal': 'Ціль', 'Subject': 'Предмет', 'Grade': 'Оцінка', 'Note': 'Нотатка', 'Tasks': 'Завдання', 'Plan': 'План', 'Focus': 'Фокус', 'Remind': 'Нагадати', 'Stats': 'Статистика',
      'YOUR STUDY SPACE': 'ВАШ НАВЧАЛЬНИЙ ПРОСТІР', 'Good': 'Доброго', 'morning': 'ранку', 'afternoon': 'дня', 'evening': 'вечора', 'Here is what needs your attention today.': 'Ось що потребує вашої уваги сьогодні.', 'LOCAL TIME': 'МІСЦЕВИЙ ЧАС', 'Open homework': 'Відкриті завдання', 'Focused time': 'Час фокусу', 'Due this week': 'Термін цього тижня', 'Tasks completed': 'Виконані завдання', 'Upcoming homework': 'Найближчі завдання', 'Today’s plan': 'План на сьогодні', 'Focus timer': 'Таймер фокусу', 'Daily reminder': 'Нагадування дня', 'View all': 'Показати все', 'Open timer': 'Відкрити таймер', 'Add homework': 'Додати завдання', 'Add event': 'Додати подію', 'Nothing due yet': 'Поки немає термінів', 'A clear schedule': 'Вільний розклад', 'No homework due right now.': 'Наразі немає завдань із терміном.', 'Next homework': 'Наступне завдання', 'Next reminder': 'Наступне нагадування', 'Tests & events': 'Тести й події', 'No open reminders.': 'Немає відкритих нагадувань.', 'Nothing upcoming.': 'Нічого не заплановано.',
      'TASKS': 'ЗАВДАННЯ', 'Keep every assignment in one calm, organized place.': 'Зберігайте всі завдання в одному спокійному й упорядкованому місці.', '＋ Add homework': '＋ Додати завдання', 'All': 'Усі', 'To do': 'Зробити', 'Completed': 'Виконано', 'Overdue': 'Прострочено', 'Details': 'Деталі', 'No homework here': 'Тут немає завдань', 'Try another filter or add a new assignment.': 'Спробуйте інший фільтр або додайте нове завдання.', 'DON’T FORGET': 'НЕ ЗАБУДЬТЕ', 'Keep small but important things in view before they slip your mind.': 'Тримайте важливі дрібниці на виду, щоб не забути.', '＋ Add reminder': '＋ Додати нагадування', 'OPEN REMINDERS': 'ВІДКРИТІ НАГАДУВАННЯ', 'Still to remember': 'Ще потрібно пам’ятати', 'DUE TODAY': 'ТЕРМІН СЬОГОДНІ', 'Worth a quick check': 'Варто швидко перевірити', 'Already handled': 'Вже зроблено', 'Reminder notifications': 'Сповіщення нагадувань', 'Enable browser notifications for reminders while StudyFlow is open in a background tab or window.': 'Увімкніть сповіщення браузера, коли StudyFlow відкритий у фоновій вкладці чи вікні.', 'Enable notifications': 'Увімкнути сповіщення', 'Notifications on': 'Сповіщення ввімкнено', 'Notifications unavailable': 'Сповіщення недоступні', 'All reminders': 'Усі нагадування', 'Nothing to remember yet': 'Поки нічого не треба пам’ятати', 'Add a reminder for tasks, forms, deadlines, or anything else.': 'Додайте нагадування про завдання, форми, терміни чи будь-що інше.',
      'PLAN AHEAD': 'ПЛАНУЙТЕ НАПЕРЕД', 'See your events and study deadlines at a glance.': 'Переглядайте події й навчальні терміни одним поглядом.', '＋ Add event': '＋ Додати подію', 'Today': 'Сьогодні', 'SELECTED DATE': 'ОБРАНА ДАТА', 'Nothing planned': 'Нічого не заплановано', 'This day is free.': 'Цей день вільний.', '＋ Event on this day': '＋ Подія в цей день', 'More…': 'Ще…', 'All day': 'Увесь день', 'YOUR IDEAS': 'ВАШІ ІДЕЇ', 'Capture class notes, revision summaries, and reminders.': 'Зберігайте конспекти, підсумки повторення та нагадування.', '＋ New note': '＋ Нова нотатка', 'No content yet.': 'Поки немає вмісту.', 'Your notebook is clear': 'Ваш блокнот порожній', 'Add notes for lessons, ideas, or revision.': 'Додайте нотатки для уроків, ідей чи повторення.', 'Create a note': 'Створити нотатку',
      'ACADEMICS': 'НАВЧАННЯ', 'Track your results and notice patterns over time.': 'Відстежуйте результати та помічайте закономірності.', '＋ Add grade': '＋ Додати оцінку', 'OVERALL AVERAGE': 'ЗАГАЛЬНИЙ СЕРЕДНІЙ БАЛ', 'RECORDED GRADES': 'ЗАПИСАНІ ОЦІНКИ', 'Across all subjects': 'З усіх предметів', 'BEST RESULT': 'НАЙКРАЩИЙ РЕЗУЛЬТАТ', 'Your personal high point': 'Ваш особистий рекорд', 'Grade history': 'Історія оцінок', 'No grades recorded': 'Немає записаних оцінок', 'Add a result to start seeing your average.': 'Додайте результат, щоб побачити середній бал.', 'ORGANIZE': 'ОРГАНІЗАЦІЯ', 'Create reusable subjects for homework, notes, grades, and events.': 'Створюйте предмети для завдань, нотаток, оцінок і подій.', '＋ Add subject': '＋ Додати предмет', 'No subjects yet': 'Поки немає предметів', 'Add a subject to organize your work.': 'Додайте предмет, щоб упорядкувати роботу.',
      'MILESTONES': 'ВІХИ', 'Turn the things you want to achieve into visible progress.': 'Перетворюйте те, чого хочете досягти, на видимий прогрес.', '＋ Add goal': '＋ Додати ціль', 'In progress': 'У процесі', 'No target date': 'Немає цільової дати', 'Set your first goal': 'Поставте першу ціль', 'A goal can be as small as revising one chapter.': 'Ціль може бути такою малою, як повторити один розділ.', 'CUSTOMIZE': 'НАЛАШТУВАННЯ', 'Create small widgets that stay visible across StudyFlow until you turn them off.': 'Створюйте маленькі віджети, видимі у StudyFlow, доки не вимкнете їх.', '＋ Create widget': '＋ Створити віджет', 'Next task': 'Наступне завдання', 'Test countdown': 'Відлік до тесту', 'Upcoming plans': 'Найближчі плани', 'Study stats': 'Статистика навчання', 'Customize': 'Налаштувати', 'Your screen widgets': 'Ваші віджети', 'Enabled widgets stay visible throughout the app. Turn one off here or use its × button.': 'Увімкнені віджети видно у всьому застосунку. Вимкніть тут або кнопкою ×.', 'Turn on': 'Увімкнути', 'Turn off': 'Вимкнути', 'No screen widgets yet': 'Поки немає віджетів', 'Choose a widget above and tailor it to what you need.': 'Оберіть віджет вище та налаштуйте його під себе.',
      'FOCUS': 'ФОКУС', 'Choose a rhythm that works for you, then give it your full attention.': 'Оберіть ритм, який вам підходить, і приділіть йому всю увагу.', 'Study': 'Навчання', 'Break': 'Перерва', 'Long break': 'Довга перерва', 'Custom': 'Власний', 'Start': 'Почати', 'Pause': 'Пауза', 'Reset': 'Скинути', 'Skip': 'Пропустити', 'Timer settings': 'Налаштування таймера', 'Choose the length of every focus mode.': 'Оберіть тривалість кожного режиму фокусу.', 'Study minutes': 'Хвилини навчання', 'Break minutes': 'Хвилини перерви', 'Long break minutes': 'Хвилини довгої перерви', 'Custom minutes': 'Власні хвилини', 'Save settings': 'Зберегти налаштування',
      'PREFERENCES': 'ПАРАМЕТРИ', 'Every change on this page saves automatically.': 'Кожна зміна на цій сторінці зберігається автоматично.', 'Appearance': 'Вигляд', 'Changes appear immediately, so you can see what feels right.': 'Зміни з’являються одразу, щоб ви бачили, що вам підходить.', 'Accent color': 'Акцентний колір', 'Applied across the whole app': 'Застосовується в усьому застосунку', 'Clock format': 'Формат часу', 'Dashboard local time': 'Місцевий час на головній', '24-hour': '24-годинний', '12-hour': '12-годинний', 'Profile & grades': 'Профіль і оцінки', 'Personal details are saved only in this browser.': 'Особисті дані зберігаються лише у цьому браузері.', 'Display name': 'Ім’я для відображення', 'Profile picture': 'Фото профілю', 'Choose from Photos': 'Вибрати з фото', 'Select an image from your device': 'Виберіть зображення з пристрою', 'Changes save automatically.': 'Зміни зберігаються автоматично.', 'Backup': 'Резервна копія', 'Export data': 'Експорт даних', 'Import data': 'Імпорт даних', 'Export': 'Експорт', 'Import': 'Імпорт', 'Clear all data': 'Очистити всі дані', 'Language preference': 'Мова', 'Choose the language used throughout StudyFlow.': 'Оберіть мову для всього StudyFlow.',
      'Save': 'Зберегти', 'Cancel': 'Скасувати', 'Close': 'Закрити', 'Edit': 'Редагувати', 'Delete': 'Видалити', 'Title': 'Назва', 'Name': 'Ім’я', 'Date': 'Дата', 'Due date': 'Термін', 'Add a date': 'Додати дату', 'Add a time': 'Додати час', 'Time': 'Час', 'Priority': 'Пріоритет', 'Low': 'Низький', 'Medium': 'Середній', 'High': 'Високий', 'Color': 'Колір', 'Icon': 'Значок', 'Choose a subject icon': 'Оберіть значок предмета', 'Use custom': 'Використати свій', 'Custom emoji, letter, or symbol': 'Власний емодзі, літера або символ', 'Repeat': 'Повтор', 'Does not repeat': 'Не повторюється', 'Every day': 'Щодня', 'Every week': 'Щотижня', 'Every month': 'Щомісяця', 'Progress (%)': 'Прогрес (%)', 'Target date': 'Цільова дата', 'Assessment': 'Оцінювання', 'Widget type': 'Тип віджета', 'Widget date (optional)': 'Дата віджета (необов’язково)', 'Countdown target': 'Ціль відліку', 'Next upcoming test or event': 'Найближчий тест або подія', 'Choose a time': 'Оберіть час', 'Hour': 'Година', 'Minute': 'Хвилина', 'Clear': 'Очистити', 'Scroll the wheels to choose a time.': 'Прокрутіть коліщатка, щоб обрати час.', 'Dates with calendar events': 'Дати з подіями календаря', 'Close picker': 'Закрити вибір',
      'English': 'Англійська', 'German': 'Німецька', 'Turkish': 'Турецька', 'Russian': 'Російська', 'Ukrainian': 'Українська'
    }
  };
  TRANSLATIONS.es = {
    'ONE LAST STEP': 'UN ÚLTIMO PASO', 'Make your study space yours.': 'Haz que tu espacio de estudio sea tuyo.', 'Choose how StudyFlow should look and calculate grades.': 'Elige cómo se verá StudyFlow y cómo calculará las notas.', 'What should we call you?': '¿Cómo debemos llamarte?', 'Your name': 'Tu nombre', 'Theme': 'Tema', 'Light': 'Claro', 'Dark': 'Oscuro', 'System': 'Sistema', 'Accent colour': 'Color de acento', 'Grade system': 'Sistema de notas', 'Number scale (1 is best · 6 is worst)': 'Escala numérica (1 es mejor · 6 es peor)', 'Percentage (0–100%)': 'Porcentaje (0–100 %)', 'Letter (A–F)': 'Letras (A–F)', 'Language': 'Idioma', 'Personalize': 'Personalizar', 'Setting language': 'Configurando idioma', 'Making every part of your space feel familiar…': 'Haciendo que cada parte de tu espacio te resulte familiar…', 'Personalizing your experience': 'Personalizando tu experiencia', 'Setting up your study space…': 'Preparando tu espacio de estudio…',
    'Dashboard': 'Panel', 'Homework': 'Deberes', 'Calendar': 'Calendario', 'Reminders': 'Recordatorios', 'Notes': 'Notas', 'Grades': 'Calificaciones', 'Study Timer': 'Temporizador de estudio', 'Statistics': 'Estadísticas', 'Goals': 'Metas', 'Subjects': 'Asignaturas', 'Widgets': 'Widgets', 'Settings': 'Ajustes', 'Personal space': 'Espacio personal', 'Version': 'Versión', 'Search everything…': 'Buscar en todo…', 'Quick add': 'Añadir rápido', 'Event or test': 'Evento o examen', 'Reminder': 'Recordatorio', 'Goal': 'Meta', 'Subject': 'Asignatura', 'Grade': 'Calificación', 'Note': 'Nota', 'Tasks': 'Tareas', 'Plan': 'Plan', 'Focus': 'Enfoque', 'Remind': 'Recordar', 'Stats': 'Estadísticas',
    'YOUR STUDY SPACE': 'TU ESPACIO DE ESTUDIO', 'Here is what needs your attention today.': 'Esto es lo que necesita tu atención hoy.', 'LOCAL TIME': 'HORA LOCAL', 'Open homework': 'Deberes pendientes', 'Focused time': 'Tiempo de enfoque', 'Due this week': 'Para esta semana', 'Tasks completed': 'Tareas completadas', 'Upcoming homework': 'Próximos deberes', 'Today’s plan': 'Plan de hoy', 'Focus timer': 'Temporizador de enfoque', 'Daily reminder': 'Recordatorio diario', 'View all': 'Ver todo', 'Open timer': 'Abrir temporizador', 'Add homework': 'Añadir deber', 'Add event': 'Añadir evento', 'Nothing due yet': 'Nada pendiente aún', 'A clear schedule': 'Una agenda despejada', 'No homework due right now.': 'No hay deberes pendientes ahora mismo.', 'Next homework': 'Siguiente deber', 'Next reminder': 'Siguiente recordatorio', 'Tests & events': 'Exámenes y eventos', 'No open reminders.': 'No hay recordatorios pendientes.', 'Nothing upcoming.': 'No hay nada próximo.',
    'TASKS': 'TAREAS', 'Keep every assignment in one calm, organized place.': 'Mantén cada tarea en un lugar tranquilo y organizado.', '＋ Add homework': '＋ Añadir deber', 'All': 'Todo', 'To do': 'Por hacer', 'Completed': 'Completado', 'Overdue': 'Atrasado', 'Details': 'Detalles', 'No homework here': 'No hay deberes aquí', 'Try another filter or add a new assignment.': 'Prueba otro filtro o añade una tarea nueva.', 'DON’T FORGET': 'NO OLVIDES', 'Keep small but important things in view before they slip your mind.': 'Mantén a la vista las cosas pequeñas pero importantes antes de olvidarlas.', '＋ Add reminder': '＋ Añadir recordatorio', 'OPEN REMINDERS': 'RECORDATORIOS ABIERTOS', 'Still to remember': 'Aún por recordar', 'DUE TODAY': 'PARA HOY', 'Worth a quick check': 'Vale la pena revisar', 'Already handled': 'Ya resuelto', 'Reminder notifications': 'Notificaciones de recordatorios', 'Enable browser notifications for reminders while StudyFlow is open in a background tab or window.': 'Activa las notificaciones del navegador mientras StudyFlow está abierto en una pestaña o ventana en segundo plano.', 'Enable notifications': 'Activar notificaciones', 'Notifications on': 'Notificaciones activadas', 'Notifications unavailable': 'Notificaciones no disponibles', 'All reminders': 'Todos los recordatorios', 'Nothing to remember yet': 'Aún no hay nada que recordar', 'Add a reminder for tasks, forms, deadlines, or anything else.': 'Añade un recordatorio para tareas, formularios, fechas límite o cualquier otra cosa.',
    'PLAN AHEAD': 'PLANEA CON ANTELACIÓN', 'See your events and study deadlines at a glance.': 'Consulta tus eventos y plazos de estudio de un vistazo.', '＋ Add event': '＋ Añadir evento', 'Today': 'Hoy', 'SELECTED DATE': 'FECHA SELECCIONADA', 'Nothing planned': 'No hay nada planeado', 'This day is free.': 'Este día está libre.', '＋ Event on this day': '＋ Evento este día', 'More…': 'Más…', 'All day': 'Todo el día', 'YOUR IDEAS': 'TUS IDEAS', 'Capture class notes, revision summaries, and reminders.': 'Guarda apuntes de clase, resúmenes de repaso y recordatorios.', '＋ New note': '＋ Nueva nota', 'No content yet.': 'Aún no hay contenido.', 'Your notebook is clear': 'Tu cuaderno está vacío', 'Add notes for lessons, ideas, or revision.': 'Añade notas para lecciones, ideas o repaso.', 'Create a note': 'Crear una nota',
    'ACADEMICS': 'ESTUDIOS', 'Track your results and notice patterns over time.': 'Sigue tus resultados y detecta patrones con el tiempo.', '＋ Add grade': '＋ Añadir calificación', 'OVERALL AVERAGE': 'PROMEDIO GENERAL', 'RECORDED GRADES': 'CALIFICACIONES REGISTRADAS', 'Across all subjects': 'En todas las asignaturas', 'BEST RESULT': 'MEJOR RESULTADO', 'Your personal high point': 'Tu mejor resultado', 'Grade history': 'Historial de calificaciones', 'No grades recorded': 'No hay calificaciones registradas', 'Add a result to start seeing your average.': 'Añade un resultado para empezar a ver tu promedio.', 'ORGANIZE': 'ORGANIZAR', 'Create reusable subjects for homework, notes, grades, and events.': 'Crea asignaturas reutilizables para deberes, notas, calificaciones y eventos.', '＋ Add subject': '＋ Añadir asignatura', 'No subjects yet': 'Aún no hay asignaturas', 'Add a subject to organize your work.': 'Añade una asignatura para organizar tu trabajo.',
    'MILESTONES': 'HITOS', 'Turn the things you want to achieve into visible progress.': 'Convierte lo que quieres lograr en progreso visible.', '＋ Add goal': '＋ Añadir meta', 'In progress': 'En curso', 'No target date': 'Sin fecha objetivo', 'Set your first goal': 'Establece tu primera meta', 'A goal can be as small as revising one chapter.': 'Una meta puede ser tan pequeña como repasar un capítulo.', 'CUSTOMIZE': 'PERSONALIZAR', 'Create small widgets that stay visible across StudyFlow until you turn them off.': 'Crea widgets pequeños que permanezcan visibles en StudyFlow hasta que los desactives.', '＋ Create widget': '＋ Crear widget', 'Next task': 'Siguiente tarea', 'Test countdown': 'Cuenta atrás del examen', 'Upcoming plans': 'Próximos planes', 'Study stats': 'Estadísticas de estudio', 'Customize': 'Personalizar', 'Your screen widgets': 'Tus widgets de pantalla', 'Enabled widgets stay visible throughout the app. Turn one off here or use its × button.': 'Los widgets activos permanecen visibles en toda la aplicación. Desactívalos aquí o con su botón ×.', 'Turn on': 'Activar', 'Turn off': 'Desactivar', 'No screen widgets yet': 'Aún no hay widgets de pantalla', 'Choose a widget above and tailor it to what you need.': 'Elige un widget de arriba y ajústalo a lo que necesitas.',
    'FOCUS': 'ENFOQUE', 'Choose a rhythm that works for you, then give it your full attention.': 'Elige un ritmo que te funcione y dedícale toda tu atención.', 'Study': 'Estudiar', 'Break': 'Descanso', 'Long break': 'Descanso largo', 'Custom': 'Personalizado', 'Start': 'Iniciar', 'Pause': 'Pausar', 'Reset': 'Restablecer', 'Skip': 'Saltar', 'Timer settings': 'Ajustes del temporizador', 'Choose the length of every focus mode.': 'Elige la duración de cada modo de enfoque.', 'Study minutes': 'Minutos de estudio', 'Break minutes': 'Minutos de descanso', 'Long break minutes': 'Minutos de descanso largo', 'Custom minutes': 'Minutos personalizados', 'Save settings': 'Guardar ajustes',
    'PREFERENCES': 'PREFERENCIAS', 'Every change on this page saves automatically.': 'Cada cambio de esta página se guarda automáticamente.', 'Appearance': 'Apariencia', 'Changes appear immediately, so you can see what feels right.': 'Los cambios aparecen al instante para que veas qué te gusta.', 'Accent color': 'Color de acento', 'Applied across the whole app': 'Aplicado en toda la aplicación', 'Clock format': 'Formato de hora', 'Dashboard local time': 'Hora local del panel', '24-hour': '24 horas', '12-hour': '12 horas', 'Profile & grades': 'Perfil y calificaciones', 'Personal details are saved only in this browser.': 'Los datos personales solo se guardan en este navegador.', 'Display name': 'Nombre mostrado', 'Profile picture': 'Foto de perfil', 'Choose from Photos': 'Elegir de Fotos', 'Select an image from your device': 'Selecciona una imagen de tu dispositivo', 'Changes save automatically.': 'Los cambios se guardan automáticamente.', 'Backup': 'Copia de seguridad', 'Export data': 'Exportar datos', 'Import data': 'Importar datos', 'Export': 'Exportar', 'Import': 'Importar', 'Clear all data': 'Borrar todos los datos', 'Language preference': 'Idioma', 'Choose the language used throughout StudyFlow.': 'Elige el idioma que se usará en todo StudyFlow.', 'Changes are applied after a short setup moment.': 'Los cambios se aplican después de un breve momento de configuración.', 'Light, dark, or match your device': 'Claro, oscuro o igual que tu dispositivo', 'Export your dashboard to a private JSON file, or import it later in the same browser.': 'Exporta tu panel a un archivo JSON privado o impórtalo más tarde en este navegador.', 'Download all local StudyFlow data': 'Descargar todos los datos locales de StudyFlow', 'Replace data from a previous export': 'Reemplazar datos de una exportación anterior', 'Clear this dashboard and return to the welcome screen. This cannot be undone.': 'Borra este panel y vuelve a la pantalla de bienvenida. No se puede deshacer.',
    'Save': 'Guardar', 'Cancel': 'Cancelar', 'Close': 'Cerrar', 'Edit': 'Editar', 'Delete': 'Eliminar', 'Title': 'Título', 'Name': 'Nombre', 'Date': 'Fecha', 'Due date': 'Fecha de entrega', 'Add a date': 'Añadir una fecha', 'Add a time': 'Añadir una hora', 'Time': 'Hora', 'Priority': 'Prioridad', 'Low': 'Baja', 'Medium': 'Media', 'High': 'Alta', 'Color': 'Color', 'Icon': 'Icono', 'Choose a subject icon': 'Elige un icono para la asignatura', 'Use custom': 'Usar personalizado', 'Custom emoji, letter, or symbol': 'Emoji, letra o símbolo personalizado', 'Repeat': 'Repetir', 'Does not repeat': 'No se repite', 'Every day': 'Cada día', 'Every week': 'Cada semana', 'Every month': 'Cada mes', 'Progress (%)': 'Progreso (%)', 'Target date': 'Fecha objetivo', 'Assessment': 'Evaluación', 'Widget type': 'Tipo de widget', 'Widget date (optional)': 'Fecha del widget (opcional)', 'Countdown target': 'Objetivo de cuenta atrás', 'Next upcoming test or event': 'Próximo examen o evento', 'Choose a time': 'Elige una hora', 'Hour': 'Hora', 'Minute': 'Minuto', 'Clear': 'Limpiar', 'Scroll the wheels to choose a time.': 'Desliza las ruedas para elegir una hora.', 'Dates with calendar events': 'Fechas con eventos del calendario', 'Close picker': 'Cerrar selector',
    'No date': 'Sin fecha', 'No due date': 'Sin fecha de entrega', 'Due today': 'Para hoy', 'Due tomorrow': 'Para mañana', 'Due yesterday': 'Vencía ayer', '{days} days overdue': '{days} días de retraso', 'Due {date}': 'Para {date}', 'Good morning': 'Buenos días', 'Good afternoon': 'Buenas tardes', 'Good evening': 'Buenas noches', 'No reminder date': 'Sin fecha de recordatorio', 'No date set': 'No se ha establecido fecha', 'day': 'día', 'days': 'días', 'Repeats daily': 'Se repite a diario', 'Repeats weekly': 'Se repite semanalmente', 'Repeats monthly': 'Se repite mensualmente', 'No subject': 'Sin asignatura', 'Details (optional)': 'Detalles (opcional)', '(optional)': '(opcional)', 'New homework': 'Nuevo deber', 'Edit homework': 'Editar deber', 'New event': 'Nuevo evento', 'Edit event': 'Editar evento', 'New reminder': 'Nuevo recordatorio', 'Edit reminder': 'Editar recordatorio', 'New note': 'Nueva nota', 'Edit note': 'Editar nota', 'Add grade': 'Añadir calificación', 'Edit grade': 'Editar calificación', 'New subject': 'Nueva asignatura', 'Edit subject': 'Editar asignatura', 'New goal': 'Nueva meta', 'Edit goal': 'Editar meta', 'Create widget': 'Crear widget', 'Edit widget': 'Editar widget', 'Save widget': 'Guardar widget', 'Profile': 'Perfil', 'Please enter the name you would like to use.': 'Escribe el nombre que quieres usar.', 'Organizing your subjects…': 'Organizando tus asignaturas…', 'Preparing your focus tools…': 'Preparando tus herramientas de enfoque…', 'Making this space feel like yours…': 'Haciendo que este espacio sea tuyo…', 'Theme updated.': 'Tema actualizado.', 'Clock format updated.': 'Formato de hora actualizado.',
    'English': 'Inglés', 'German': 'Alemán', 'Turkish': 'Turco', 'Russian': 'Ruso', 'Ukrainian': 'Ucraniano', 'Spanish': 'Español'
  };
  Object.assign(TRANSLATIONS.de, {
    'No date': 'Kein Datum', 'No due date': 'Kein Fälligkeitsdatum', 'Due today': 'Heute fällig', 'Due tomorrow': 'Morgen fällig', 'Due yesterday': 'Gestern fällig', '{days} days overdue': '{days} Tage überfällig', 'Due {date}': 'Fällig {date}', 'Good morning': 'Guten Morgen', 'Good afternoon': 'Guten Tag', 'Good evening': 'Guten Abend', 'No reminder date': 'Kein Erinnerungsdatum', 'No date set': 'Kein Datum gesetzt', 'day': 'Tag', 'days': 'Tage', 'Repeats daily': 'Täglich', 'Repeats weekly': 'Wöchentlich', 'Repeats monthly': 'Monatlich', 'No subject': 'Kein Fach', 'Details (optional)': 'Details (optional)', '(optional)': '(optional)', 'New homework': 'Neue Hausaufgabe', 'Edit homework': 'Hausaufgabe bearbeiten', 'New event': 'Neues Ereignis', 'Edit event': 'Ereignis bearbeiten', 'New reminder': 'Neue Erinnerung', 'Edit reminder': 'Erinnerung bearbeiten', 'New note': 'Neue Notiz', 'Edit note': 'Notiz bearbeiten', 'Add grade': 'Note hinzufügen', 'Edit grade': 'Note bearbeiten', 'New subject': 'Neues Fach', 'Edit subject': 'Fach bearbeiten', 'New goal': 'Neues Ziel', 'Edit goal': 'Ziel bearbeiten', 'Create widget': 'Widget erstellen', 'Edit widget': 'Widget bearbeiten', 'Save widget': 'Widget speichern', 'Profile': 'Profil', 'Please enter the name you would like to use.': 'Bitte gib den Namen ein, den du verwenden möchtest.', 'Organizing your subjects…': 'Deine Fächer werden organisiert…', 'Preparing your focus tools…': 'Deine Fokus-Tools werden vorbereitet…', 'Making this space feel like yours…': 'Dieser Bereich wird zu deinem gemacht…', 'Theme updated.': 'Design aktualisiert.', 'Clock format updated.': 'Uhrzeitformat aktualisiert.', 'All day': 'Ganztägig', 'No content yet.': 'Noch kein Inhalt.', 'Changes are applied after a short setup moment.': 'Änderungen werden nach einem kurzen Einrichtungsmoment übernommen.', 'Light, dark, or match your device': 'Hell, dunkel oder passend zu deinem Gerät', 'Export your dashboard to a private JSON file, or import it later in the same browser.': 'Exportiere deine Übersicht in eine private JSON-Datei oder importiere sie später in diesem Browser.', 'Download all local StudyFlow data': 'Alle lokalen StudyFlow-Daten herunterladen', 'Replace data from a previous export': 'Daten aus einem früheren Export ersetzen', 'Clear this dashboard and return to the welcome screen. This cannot be undone.': 'Lösche diese Übersicht und kehre zum Willkommensbildschirm zurück. Das kann nicht rückgängig gemacht werden.'
  });
  Object.assign(TRANSLATIONS.tr, {
    'No date': 'Tarih yok', 'No due date': 'Teslim tarihi yok', 'Due today': 'Bugün teslim', 'Due tomorrow': 'Yarın teslim', 'Due yesterday': 'Dün teslimdi', '{days} days overdue': '{days} gün gecikmiş', 'Due {date}': 'Teslim: {date}', 'Good morning': 'Günaydın', 'Good afternoon': 'İyi günler', 'Good evening': 'İyi akşamlar', 'No reminder date': 'Hatırlatıcı tarihi yok', 'No date set': 'Tarih ayarlanmadı', 'day': 'gün', 'days': 'gün', 'Repeats daily': 'Her gün tekrarlanır', 'Repeats weekly': 'Her hafta tekrarlanır', 'Repeats monthly': 'Her ay tekrarlanır', 'No subject': 'Ders yok', 'Details (optional)': 'Ayrıntılar (isteğe bağlı)', '(optional)': '(isteğe bağlı)', 'New homework': 'Yeni ödev', 'Edit homework': 'Ödevi düzenle', 'New event': 'Yeni etkinlik', 'Edit event': 'Etkinliği düzenle', 'New reminder': 'Yeni hatırlatıcı', 'Edit reminder': 'Hatırlatıcıyı düzenle', 'New note': 'Yeni not', 'Edit note': 'Notu düzenle', 'Add grade': 'Not ekle', 'Edit grade': 'Notu düzenle', 'New subject': 'Yeni ders', 'Edit subject': 'Dersi düzenle', 'New goal': 'Yeni hedef', 'Edit goal': 'Hedefi düzenle', 'Create widget': 'Araç oluştur', 'Edit widget': 'Aracı düzenle', 'Save widget': 'Aracı kaydet', 'Profile': 'Profil', 'Please enter the name you would like to use.': 'Lütfen kullanmak istediğin adı yaz.', 'Organizing your subjects…': 'Derslerin düzenleniyor…', 'Preparing your focus tools…': 'Odak araçların hazırlanıyor…', 'Making this space feel like yours…': 'Bu alan sana göre hazırlanıyor…', 'Theme updated.': 'Tema güncellendi.', 'Clock format updated.': 'Saat biçimi güncellendi.', 'All day': 'Tüm gün', 'No content yet.': 'Henüz içerik yok.', 'Changes are applied after a short setup moment.': 'Değişiklikler kısa bir ayarlama anından sonra uygulanır.', 'Light, dark, or match your device': 'Açık, koyu veya cihazınla eşleştir', 'Export your dashboard to a private JSON file, or import it later in the same browser.': 'Panelini özel bir JSON dosyasına aktar veya daha sonra aynı tarayıcıda içe aktar.', 'Download all local StudyFlow data': 'Tüm yerel StudyFlow verilerini indir', 'Replace data from a previous export': 'Önceki dışa aktarmadaki verileri değiştir', 'Clear this dashboard and return to the welcome screen. This cannot be undone.': 'Bu paneli temizle ve karşılama ekranına dön. Bu işlem geri alınamaz.'
  });
  Object.assign(TRANSLATIONS.ru, {
    'No date': 'Нет даты', 'No due date': 'Нет срока', 'Due today': 'Срок сегодня', 'Due tomorrow': 'Срок завтра', 'Due yesterday': 'Срок был вчера', '{days} days overdue': 'Просрочено на {days} дн.', 'Due {date}': 'Срок: {date}', 'Good morning': 'Доброе утро', 'Good afternoon': 'Добрый день', 'Good evening': 'Добрый вечер', 'No reminder date': 'Нет даты напоминания', 'No date set': 'Дата не задана', 'day': 'день', 'days': 'дней', 'Repeats daily': 'Повторяется ежедневно', 'Repeats weekly': 'Повторяется еженедельно', 'Repeats monthly': 'Повторяется ежемесячно', 'No subject': 'Нет предмета', 'Details (optional)': 'Подробности (необязательно)', '(optional)': '(необязательно)', 'New homework': 'Новое задание', 'Edit homework': 'Изменить задание', 'New event': 'Новое событие', 'Edit event': 'Изменить событие', 'New reminder': 'Новое напоминание', 'Edit reminder': 'Изменить напоминание', 'New note': 'Новая заметка', 'Edit note': 'Изменить заметку', 'Add grade': 'Добавить оценку', 'Edit grade': 'Изменить оценку', 'New subject': 'Новый предмет', 'Edit subject': 'Изменить предмет', 'New goal': 'Новая цель', 'Edit goal': 'Изменить цель', 'Create widget': 'Создать виджет', 'Edit widget': 'Изменить виджет', 'Save widget': 'Сохранить виджет', 'Profile': 'Профиль', 'Please enter the name you would like to use.': 'Введите имя, которое хотите использовать.', 'Organizing your subjects…': 'Упорядочиваем предметы…', 'Preparing your focus tools…': 'Готовим инструменты фокуса…', 'Making this space feel like yours…': 'Делаем это пространство вашим…', 'Theme updated.': 'Тема обновлена.', 'Clock format updated.': 'Формат времени обновлён.', 'All day': 'Весь день', 'No content yet.': 'Пока нет содержимого.', 'Changes are applied after a short setup moment.': 'Изменения будут применены после короткой настройки.', 'Light, dark, or match your device': 'Светлая, тёмная или как на устройстве', 'Export your dashboard to a private JSON file, or import it later in the same browser.': 'Экспортируйте главную в личный JSON-файл или импортируйте позже в этом же браузере.', 'Download all local StudyFlow data': 'Скачать все локальные данные StudyFlow', 'Replace data from a previous export': 'Заменить данные из прошлого экспорта', 'Clear this dashboard and return to the welcome screen. This cannot be undone.': 'Очистить главную и вернуться на экран приветствия. Это действие нельзя отменить.'
  });
  Object.assign(TRANSLATIONS.uk, {
    'No date': 'Немає дати', 'No due date': 'Немає терміну', 'Due today': 'Термін сьогодні', 'Due tomorrow': 'Термін завтра', 'Due yesterday': 'Термін був учора', '{days} days overdue': 'Прострочено на {days} дн.', 'Due {date}': 'Термін: {date}', 'Good morning': 'Доброго ранку', 'Good afternoon': 'Доброго дня', 'Good evening': 'Доброго вечора', 'No reminder date': 'Немає дати нагадування', 'No date set': 'Дату не задано', 'day': 'день', 'days': 'днів', 'Repeats daily': 'Повторюється щодня', 'Repeats weekly': 'Повторюється щотижня', 'Repeats monthly': 'Повторюється щомісяця', 'No subject': 'Немає предмета', 'Details (optional)': 'Деталі (необов’язково)', '(optional)': '(необов’язково)', 'New homework': 'Нове завдання', 'Edit homework': 'Редагувати завдання', 'New event': 'Нова подія', 'Edit event': 'Редагувати подію', 'New reminder': 'Нове нагадування', 'Edit reminder': 'Редагувати нагадування', 'New note': 'Нова нотатка', 'Edit note': 'Редагувати нотатку', 'Add grade': 'Додати оцінку', 'Edit grade': 'Редагувати оцінку', 'New subject': 'Новий предмет', 'Edit subject': 'Редагувати предмет', 'New goal': 'Нова ціль', 'Edit goal': 'Редагувати ціль', 'Create widget': 'Створити віджет', 'Edit widget': 'Редагувати віджет', 'Save widget': 'Зберегти віджет', 'Profile': 'Профіль', 'Please enter the name you would like to use.': 'Введіть ім’я, яке хочете використовувати.', 'Organizing your subjects…': 'Упорядковуємо предмети…', 'Preparing your focus tools…': 'Готуємо інструменти фокусу…', 'Making this space feel like yours…': 'Робимо цей простір вашим…', 'Theme updated.': 'Тему оновлено.', 'Clock format updated.': 'Формат часу оновлено.', 'All day': 'Увесь день', 'No content yet.': 'Поки немає вмісту.', 'Changes are applied after a short setup moment.': 'Зміни буде застосовано після короткого налаштування.', 'Light, dark, or match your device': 'Світла, темна або як на пристрої', 'Export your dashboard to a private JSON file, or import it later in the same browser.': 'Експортуйте головну до приватного JSON-файлу або імпортуйте пізніше у цьому ж браузері.', 'Download all local StudyFlow data': 'Завантажити всі локальні дані StudyFlow', 'Replace data from a previous export': 'Замінити дані з попереднього експорту', 'Clear this dashboard and return to the welcome screen. This cannot be undone.': 'Очистити головну та повернутися до екрана привітання. Цю дію неможливо скасувати.'
  });
  Object.assign(TRANSLATIONS.de, { Spanish: 'Spanisch' });
  Object.assign(TRANSLATIONS.tr, { Spanish: 'İspanyolca' });
  Object.assign(TRANSLATIONS.ru, { Spanish: 'Испанский' });
  Object.assign(TRANSLATIONS.uk, { Spanish: 'Іспанська' });
  Object.assign(TRANSLATIONS.de, {
    'Mathematics': 'Mathematik', 'Science': 'Naturwissenschaften', 'Number scale': 'Zahlenskala', 'Percentage': 'Prozent', 'Letter grades': 'Buchstabennoten',
    'focused so far.': 'bisher fokussiert.', 'One small session is a win.': 'Eine kurze Einheit ist ein Erfolg.', '{count} completed sessions': '{count} abgeschlossene Einheiten',
    'Small steps every day become big results.': 'Kleine Schritte jeden Tag führen zu großen Ergebnissen.', 'The secret of getting ahead is getting started.': 'Das Geheimnis des Vorankommens ist, anzufangen.', 'Focus on progress, not perfection.': 'Konzentriere dich auf Fortschritt, nicht auf Perfektion.', 'You do not have to be great to start, but you have to start to be great.': 'Du musst nicht großartig sein, um anzufangen, aber du musst anfangen, um großartig zu werden.',
    'Add reminder': 'Erinnerung hinzufügen', 'Add goal': 'Ziel hinzufügen', 'YOUR PROGRESS': 'DEIN FORTSCHRITT', 'Small habits leave a useful trail.': 'Kleine Gewohnheiten hinterlassen eine wertvolle Spur.', 'TOTAL FOCUS': 'GESAMTFOKUS', 'All recorded sessions': 'Alle aufgezeichneten Einheiten', 'TASK COMPLETION': 'AUFGABENERLEDIGUNG', '{count} tasks complete': '{count} Aufgaben erledigt', 'FOCUS SESSIONS': 'FOKUSEINHEITEN', 'Keep the streak alive': 'Halte die Serie am Leben', 'Focus time this week': 'Fokuszeit diese Woche', 'Minutes': 'Minuten', '{count} open': '{count} offen', '{count} open tasks': '{count} offene Aufgaben', 'Target {date}': 'Ziel {date}', '{count} on': '{count} an', 'off': 'aus', 'on screen': 'auf dem Bildschirm',
    'Keep your closest homework task in sight': 'Behalte deine nächste Hausaufgabe im Blick', 'See the next thing you need to remember': 'Sieh das Nächste, woran du dich erinnern musst', 'Count the days to any test or event': 'Zähle die Tage bis zu einem Test oder Ereignis', 'Show your next events and tests': 'Zeige deine nächsten Ereignisse und Tests', 'Display focused time and completed work': 'Zeige Fokuszeit und erledigte Arbeit', 'Focus session complete. Take a well-earned break!': 'Fokuseinheit abgeschlossen. Mach eine wohlverdiente Pause!'
  });
  Object.assign(TRANSLATIONS.tr, {
    'Mathematics': 'Matematik', 'Science': 'Fen', 'Number scale': 'Sayı sistemi', 'Percentage': 'Yüzde', 'Letter grades': 'Harf notları',
    'focused so far.': 'şu ana kadar odaklanıldı.', 'One small session is a win.': 'Küçük bir oturum bile kazançtır.', '{count} completed sessions': '{count} tamamlanan oturum',
    'Small steps every day become big results.': 'Her günkü küçük adımlar büyük sonuçlara dönüşür.', 'The secret of getting ahead is getting started.': 'İlerlemek için başlamanın sırrı başlamaktır.', 'Focus on progress, not perfection.': 'Mükemmelliğe değil, ilerlemeye odaklan.', 'You do not have to be great to start, but you have to start to be great.': 'Başlamak için harika olmak zorunda değilsin; harika olmak için başlamalısın.',
    'Add reminder': 'Hatırlatıcı ekle', 'Add goal': 'Hedef ekle', 'YOUR PROGRESS': 'İLERLEMEN', 'Small habits leave a useful trail.': 'Küçük alışkanlıklar faydalı bir iz bırakır.', 'TOTAL FOCUS': 'TOPLAM ODAK', 'All recorded sessions': 'Tüm kaydedilen oturumlar', 'TASK COMPLETION': 'GÖREV TAMAMLAMA', '{count} tasks complete': '{count} görev tamamlandı', 'FOCUS SESSIONS': 'ODAK OTURUMLARI', 'Keep the streak alive': 'Seriyi sürdür', 'Focus time this week': 'Bu haftaki odaklanma süresi', 'Minutes': 'Dakikalar', '{count} open': '{count} açık', '{count} open tasks': '{count} açık görev', 'Target {date}': 'Hedef {date}', '{count} on': '{count} açık', 'off': 'kapalı', 'on screen': 'ekranda',
    'Keep your closest homework task in sight': 'En yakın ödevini göz önünde tut', 'See the next thing you need to remember': 'Hatırlaman gereken sıradaki şeyi gör', 'Count the days to any test or event': 'Herhangi bir test veya etkinliğe kalan günleri say', 'Show your next events and tests': 'Yaklaşan etkinliklerini ve testlerini göster', 'Display focused time and completed work': 'Odaklanma süresini ve tamamlanan işleri göster', 'Focus session complete. Take a well-earned break!': 'Odak oturumu tamamlandı. Hak ettiğin molayı ver!'
  });
  Object.assign(TRANSLATIONS.ru, {
    'Mathematics': 'Математика', 'Science': 'Естественные науки', 'Number scale': 'Числовая шкала', 'Percentage': 'Проценты', 'Letter grades': 'Буквенные оценки',
    'focused so far.': 'сосредоточенно за это время.', 'One small session is a win.': 'Даже одна небольшая сессия — победа.', '{count} completed sessions': '{count} завершённых сессий',
    'Small steps every day become big results.': 'Маленькие шаги каждый день дают большие результаты.', 'The secret of getting ahead is getting started.': 'Секрет движения вперёд — начать.', 'Focus on progress, not perfection.': 'Сосредоточься на прогрессе, а не на совершенстве.', 'You do not have to be great to start, but you have to start to be great.': 'Не нужно быть великим, чтобы начать, но нужно начать, чтобы стать великим.',
    'Add reminder': 'Добавить напоминание', 'Add goal': 'Добавить цель', 'YOUR PROGRESS': 'ВАШ ПРОГРЕСС', 'Small habits leave a useful trail.': 'Маленькие привычки оставляют полезный след.', 'TOTAL FOCUS': 'ОБЩЕЕ ВРЕМЯ ФОКУСА', 'All recorded sessions': 'Все записанные сессии', 'TASK COMPLETION': 'ВЫПОЛНЕНИЕ ЗАДАЧ', '{count} tasks complete': 'Выполнено задач: {count}', 'FOCUS SESSIONS': 'СЕССИИ ФОКУСА', 'Keep the streak alive': 'Не прерывайте серию', 'Focus time this week': 'Время фокуса на этой неделе', 'Minutes': 'Минуты', '{count} open': 'Открыто: {count}', '{count} open tasks': 'Открытых задач: {count}', 'Target {date}': 'Цель: {date}', '{count} on': 'Включено: {count}', 'off': 'выкл.', 'on screen': 'на экране',
    'Keep your closest homework task in sight': 'Держите ближайшее задание на виду', 'See the next thing you need to remember': 'Посмотрите, о чём нужно помнить дальше', 'Count the days to any test or event': 'Считайте дни до любого теста или события', 'Show your next events and tests': 'Покажите ближайшие события и тесты', 'Display focused time and completed work': 'Покажите время фокуса и выполненную работу', 'Focus session complete. Take a well-earned break!': 'Сессия фокуса завершена. Сделайте заслуженный перерыв!'
  });
  Object.assign(TRANSLATIONS.uk, {
    'Mathematics': 'Математика', 'Science': 'Природничі науки', 'Number scale': 'Числова шкала', 'Percentage': 'Відсотки', 'Letter grades': 'Літерні оцінки',
    'focused so far.': 'зосереджено за цей час.', 'One small session is a win.': 'Навіть коротка сесія — це перемога.', '{count} completed sessions': '{count} завершених сесій',
    'Small steps every day become big results.': 'Маленькі кроки щодня дають великі результати.', 'The secret of getting ahead is getting started.': 'Секрет руху вперед — почати.', 'Focus on progress, not perfection.': 'Зосередься на прогресі, а не на досконалості.', 'You do not have to be great to start, but you have to start to be great.': 'Не потрібно бути великим, щоб почати, але потрібно почати, щоб стати великим.',
    'Add reminder': 'Додати нагадування', 'Add goal': 'Додати ціль', 'YOUR PROGRESS': 'ВАШ ПРОГРЕС', 'Small habits leave a useful trail.': 'Маленькі звички залишають корисний слід.', 'TOTAL FOCUS': 'ЗАГАЛЬНИЙ ФОКУС', 'All recorded sessions': 'Усі записані сесії', 'TASK COMPLETION': 'ВИКОНАННЯ ЗАВДАНЬ', '{count} tasks complete': '{count} завдань виконано', 'FOCUS SESSIONS': 'СЕСІЇ ФОКУСУ', 'Keep the streak alive': 'Підтримуй серію', 'Focus time this week': 'Час фокусу цього тижня', 'Minutes': 'Хвилини', '{count} open': 'Відкрито: {count}', '{count} open tasks': '{count} відкритих завдань', 'Target {date}': 'Ціль: {date}', '{count} on': 'Увімкнено: {count}', 'off': 'вимк.', 'on screen': 'на екрані',
    'Keep your closest homework task in sight': 'Тримай найближче завдання на виду', 'See the next thing you need to remember': 'Подивись, про що потрібно пам’ятати далі', 'Count the days to any test or event': 'Відлічуй дні до будь-якого тесту чи події', 'Show your next events and tests': 'Показуй найближчі події та тести', 'Display focused time and completed work': 'Показуй час фокусу й виконану роботу', 'Focus session complete. Take a well-earned break!': 'Сесію фокусу завершено. Зроби заслужену перерву!'
  });
  Object.assign(TRANSLATIONS.es, {
    'Mathematics': 'Matemáticas', 'Science': 'Ciencias', 'Number scale': 'Escala numérica', 'Percentage': 'Porcentaje', 'Letter grades': 'Calificaciones por letras',
    'focused so far.': 'con concentración hasta ahora.', 'One small session is a win.': 'Una sesión corta ya es una victoria.', '{count} completed sessions': '{count} sesiones completadas',
    'Small steps every day become big results.': 'Los pequeños pasos diarios dan grandes resultados.', 'The secret of getting ahead is getting started.': 'El secreto para avanzar es empezar.', 'Focus on progress, not perfection.': 'Céntrate en el progreso, no en la perfección.', 'You do not have to be great to start, but you have to start to be great.': 'No tienes que ser genial para empezar, pero tienes que empezar para llegar a serlo.',
    'Add reminder': 'Añadir recordatorio', 'Add goal': 'Añadir meta', 'YOUR PROGRESS': 'TU PROGRESO', 'Small habits leave a useful trail.': 'Los pequeños hábitos dejan un rastro útil.', 'TOTAL FOCUS': 'ENFOQUE TOTAL', 'All recorded sessions': 'Todas las sesiones registradas', 'TASK COMPLETION': 'COMPLETADO DE TAREAS', '{count} tasks complete': '{count} tareas completadas', 'FOCUS SESSIONS': 'SESIONES DE ENFOQUE', 'Keep the streak alive': 'Mantén la racha', 'Focus time this week': 'Tiempo de enfoque esta semana', 'Minutes': 'Minutos', '{count} open': '{count} pendientes', '{count} open tasks': '{count} tareas pendientes', 'Target {date}': 'Meta: {date}', '{count} on': '{count} activados', 'off': 'desactivado', 'on screen': 'en pantalla',
    'Keep your closest homework task in sight': 'Mantén a la vista tu deber más próximo', 'See the next thing you need to remember': 'Mira lo siguiente que debes recordar', 'Count the days to any test or event': 'Cuenta los días hasta cualquier examen o evento', 'Show your next events and tests': 'Muestra tus próximos eventos y exámenes', 'Display focused time and completed work': 'Muestra el tiempo de enfoque y el trabajo completado', 'Focus session complete. Take a well-earned break!': 'La sesión de enfoque ha terminado. ¡Tómate un descanso merecido!'
  });
  Object.assign(TRANSLATIONS.de, {
    'Notifications': 'Benachrichtigungen', 'Get alerts for reminders, due homework, events, and completed focus sessions.': 'Erhalte Hinweise zu Erinnerungen, fälligen Hausaufgaben, Ereignissen und beendeten Fokuseinheiten.', 'Notification preferences': 'Benachrichtigungseinstellungen', 'Receive alerts for reminders, due homework, events, and finished focus sessions.': 'Erhalte Hinweise zu Erinnerungen, fälligen Hausaufgaben, Ereignissen und beendeten Fokuseinheiten.', 'Turn StudyFlow alerts on or off in this browser.': 'Schalte StudyFlow-Hinweise in diesem Browser ein oder aus.', 'Notifications are off': 'Benachrichtigungen sind aus', 'Notifications are enabled for StudyFlow.': 'Benachrichtigungen für StudyFlow sind aktiviert.', 'Notifications are turned off.': 'Benachrichtigungen sind ausgeschaltet.', 'Notifications were not enabled.': 'Benachrichtigungen wurden nicht aktiviert.', 'Notifications could not be enabled here.': 'Benachrichtigungen konnten hier nicht aktiviert werden.', 'Browser notifications are not available here.': 'Browser-Benachrichtigungen sind hier nicht verfügbar.', 'Homework due': 'Hausaufgabe fällig', 'Event starting': 'Ereignis beginnt', '{title} is due today.': '„{title}“ ist heute fällig.', '{title} is starting now.': '„{title}“ beginnt jetzt.'
  });
  Object.assign(TRANSLATIONS.tr, {
    'Notifications': 'Bildirimler', 'Get alerts for reminders, due homework, events, and completed focus sessions.': 'Hatırlatıcılar, teslimi gelen ödevler, etkinlikler ve tamamlanan odak oturumları için uyarılar al.', 'Notification preferences': 'Bildirim tercihleri', 'Receive alerts for reminders, due homework, events, and finished focus sessions.': 'Hatırlatıcılar, teslimi gelen ödevler, etkinlikler ve tamamlanan odak oturumları için uyarılar al.', 'Turn StudyFlow alerts on or off in this browser.': 'Bu tarayıcıda StudyFlow uyarılarını aç veya kapat.', 'Notifications are off': 'Bildirimler kapalı', 'Notifications are enabled for StudyFlow.': 'StudyFlow bildirimleri etkinleştirildi.', 'Notifications are turned off.': 'Bildirimler kapatıldı.', 'Notifications were not enabled.': 'Bildirimler etkinleştirilmedi.', 'Notifications could not be enabled here.': 'Bildirimler burada etkinleştirilemedi.', 'Browser notifications are not available here.': 'Tarayıcı bildirimleri burada kullanılamıyor.', 'Homework due': 'Ödev teslimi', 'Event starting': 'Etkinlik başlıyor', '{title} is due today.': '“{title}” bugün teslim edilmelidir.', '{title} is starting now.': '“{title}” şimdi başlıyor.'
  });
  Object.assign(TRANSLATIONS.ru, {
    'Notifications': 'Уведомления', 'Get alerts for reminders, due homework, events, and completed focus sessions.': 'Получайте уведомления о напоминаниях, сроках заданий, событиях и завершённых сессиях фокуса.', 'Notification preferences': 'Настройки уведомлений', 'Receive alerts for reminders, due homework, events, and finished focus sessions.': 'Получайте уведомления о напоминаниях, сроках заданий, событиях и завершённых сессиях фокуса.', 'Turn StudyFlow alerts on or off in this browser.': 'Включайте или выключайте уведомления StudyFlow в этом браузере.', 'Notifications are off': 'Уведомления выключены', 'Notifications are enabled for StudyFlow.': 'Уведомления StudyFlow включены.', 'Notifications are turned off.': 'Уведомления выключены.', 'Notifications were not enabled.': 'Уведомления не были включены.', 'Notifications could not be enabled here.': 'Не удалось включить уведомления здесь.', 'Browser notifications are not available here.': 'Уведомления браузера здесь недоступны.', 'Homework due': 'Срок задания', 'Event starting': 'Событие начинается', '{title} is due today.': 'Срок задания «{title}» — сегодня.', '{title} is starting now.': '«{title}» начинается сейчас.'
  });
  Object.assign(TRANSLATIONS.uk, {
    'Notifications': 'Сповіщення', 'Get alerts for reminders, due homework, events, and completed focus sessions.': 'Отримуйте сповіщення про нагадування, терміни завдань, події та завершені сесії фокусу.', 'Notification preferences': 'Налаштування сповіщень', 'Receive alerts for reminders, due homework, events, and finished focus sessions.': 'Отримуйте сповіщення про нагадування, терміни завдань, події та завершені сесії фокусу.', 'Turn StudyFlow alerts on or off in this browser.': 'Вмикайте або вимикайте сповіщення StudyFlow у цьому браузері.', 'Notifications are off': 'Сповіщення вимкнено', 'Notifications are enabled for StudyFlow.': 'Сповіщення StudyFlow увімкнено.', 'Notifications are turned off.': 'Сповіщення вимкнено.', 'Notifications were not enabled.': 'Сповіщення не було ввімкнено.', 'Notifications could not be enabled here.': 'Тут не вдалося ввімкнути сповіщення.', 'Browser notifications are not available here.': 'Сповіщення браузера тут недоступні.', 'Homework due': 'Термін завдання', 'Event starting': 'Подія починається', '{title} is due today.': 'Термін завдання «{title}» — сьогодні.', '{title} is starting now.': '«{title}» починається зараз.'
  });
  Object.assign(TRANSLATIONS.es, {
    'Notifications': 'Notificaciones', 'Get alerts for reminders, due homework, events, and completed focus sessions.': 'Recibe avisos de recordatorios, deberes pendientes, eventos y sesiones de enfoque completadas.', 'Notification preferences': 'Preferencias de notificaciones', 'Receive alerts for reminders, due homework, events, and finished focus sessions.': 'Recibe avisos de recordatorios, deberes pendientes, eventos y sesiones de enfoque terminadas.', 'Turn StudyFlow alerts on or off in this browser.': 'Activa o desactiva los avisos de StudyFlow en este navegador.', 'Notifications are off': 'Las notificaciones están desactivadas', 'Notifications are enabled for StudyFlow.': 'Las notificaciones de StudyFlow están activadas.', 'Notifications are turned off.': 'Las notificaciones están desactivadas.', 'Notifications were not enabled.': 'No se activaron las notificaciones.', 'Notifications could not be enabled here.': 'No se pudieron activar las notificaciones aquí.', 'Browser notifications are not available here.': 'Las notificaciones del navegador no están disponibles aquí.', 'Homework due': 'Deber pendiente', 'Event starting': 'El evento comienza', '{title} is due today.': '«{title}» vence hoy.', '{title} is starting now.': '«{title}» comienza ahora.'
  });
  const DASHBOARD_EMPTY_STATE_TRANSLATIONS = {
    de: { 'Add your first task and it will appear here.': 'Füge deine erste Aufgabe hinzu, dann erscheint sie hier.', 'Add an event to start planning your week.': 'Füge ein Ereignis hinzu, um deine Woche zu planen.' },
    tr: { 'Add your first task and it will appear here.': 'İlk görevini ekle; burada görünecek.', 'Add an event to start planning your week.': 'Haftanı planlamak için bir etkinlik ekle.' },
    ru: { 'Add your first task and it will appear here.': 'Добавьте первое задание, и оно появится здесь.', 'Add an event to start planning your week.': 'Добавьте событие, чтобы начать планировать неделю.' },
    uk: { 'Add your first task and it will appear here.': 'Додайте перше завдання, і воно з’явиться тут.', 'Add an event to start planning your week.': 'Додайте подію, щоб почати планувати тиждень.' },
    es: { 'Add your first task and it will appear here.': 'Añade tu primera tarea y aparecerá aquí.', 'Add an event to start planning your week.': 'Añade un evento para empezar a planificar tu semana.' }
  };
  Object.entries(DASHBOARD_EMPTY_STATE_TRANSLATIONS).forEach(([code, messages]) => Object.assign(TRANSLATIONS[code], messages));

  const NOTE_TRANSLATIONS = {
    de: {
      'Choose how BananaBoard should look and calculate grades.': 'Wähle aus, wie BananaBoard aussehen und Noten berechnen soll.',
      'Notebooks': 'Notizbücher', 'Keep themed notes together in colorful notebooks.': 'Halte thematische Notizen in farbigen Notizbüchern zusammen.', '＋ New notebook': '＋ Neues Notizbuch', 'Marked text': 'Markierter Text', 'Your notebook shelf is empty': 'Dein Notizbuchregal ist leer', 'Create a notebook, give it a color, then start writing your first page.': 'Erstelle ein Notizbuch, gib ihm eine Farbe und schreibe dann deine erste Seite.', 'Create a notebook': 'Notizbuch erstellen',
      '{count} page': '{count} Seite', '{count} pages': '{count} Seiten', 'Open {name}': '{name} öffnen', 'Edit notebook': 'Notizbuch bearbeiten', 'Delete notebook': 'Notizbuch löschen', 'Loose notes': 'Lose Notizen', 'Open loose notes': 'Lose Notizen öffnen', 'Move them into a notebook anytime': 'Verschiebe sie jederzeit in ein Notizbuch.', '← All notebooks': '← Alle Notizbücher', '＋ New page': '＋ Neue Seite', 'NOTEBOOK': 'NOTIZBUCH', 'UNFILED': 'OHNE ZUORDNUNG', 'Color-coded for your theme': 'Passend zu deinem Thema farbcodiert', 'Choose a notebook when you edit a page': 'Wähle beim Bearbeiten einer Seite ein Notizbuch', 'No pages yet': 'Noch keine Seiten', 'Create your first A4-style page for this notebook.': 'Erstelle deine erste Seite im A4-Stil für dieses Notizbuch.', 'New page': 'Neue Seite', 'Blank page': 'Leere Seite', 'Untitled note': 'Unbenannte Notiz', 'Edit note': 'Notiz bearbeiten', 'Delete note': 'Notiz löschen',
      '← Back to notes': '← Zurück zu Notizen', 'Your markings': 'Deine Markierungen', 'Every passage you highlight is saved here for quick revision.': 'Jeder markierte Abschnitt wird hier zur schnellen Wiederholung gespeichert.', 'Open note': 'Notiz öffnen', 'Delete marking': 'Markierung löschen', 'No marked text yet': 'Noch kein markierter Text', 'Select text in a note and use the Mark tool to save it here.': 'Wähle Text in einer Notiz aus und nutze Markieren, um ihn hier zu speichern.', 'Note editing tools': 'Werkzeuge zum Bearbeiten von Notizen', 'Bold': 'Fett', 'Italic': 'Kursiv', 'Underline': 'Unterstreichen', 'Heading': 'Überschrift', 'Bullet list': 'Aufzählung', 'Numbered list': 'Nummerierte Liste', 'Mark selected text': 'Ausgewählten Text markieren', 'Add a photo': 'Foto hinzufügen', 'Undo': 'Rückgängig', 'Start writing your note…': 'Beginne mit deiner Notiz…', 'Photos can be pasted or added from your device. Use Mark to save selected text in the Marked text tab.': 'Fotos können eingefügt oder von deinem Gerät hinzugefügt werden. Nutze Markieren, um ausgewählten Text im Tab „Markierter Text“ zu speichern.',
      'Notebook name': 'Name des Notizbuchs', 'e.g. Biology revision': 'z. B. Biologie-Wiederholung', 'Notebook color': 'Notizbuchfarbe', 'The cover color and subject can be changed later.': 'Deckfarbe und Fach können später geändert werden.', '(optional)': '(optional)', 'No subject': 'Kein Fach', 'Note saved.': 'Notiz gespeichert.', 'Select some text on the page first.': 'Wähle zuerst Text auf der Seite aus.', 'That marking is already saved.': 'Diese Markierung ist bereits gespeichert.', 'Marked text saved.': 'Markierter Text gespeichert.', 'Choose an image to add to the note.': 'Wähle ein Bild für die Notiz aus.', 'Choose an image smaller than 8 MB.': 'Wähle ein Bild, das kleiner als 8 MB ist.', 'That image could not be added.': 'Dieses Bild konnte nicht hinzugefügt werden.', 'Photo added to the page.': 'Foto zur Seite hinzugefügt.', 'Could not add that photo.': 'Dieses Foto konnte nicht hinzugefügt werden.', 'Delete “{name}”? Its pages will be kept as loose notes.': '„{name}“ löschen? Die Seiten bleiben als lose Notizen erhalten.', 'Notebook deleted. Its pages are still in Loose notes.': 'Notizbuch gelöscht. Seine Seiten befinden sich weiterhin in Lose Notizen.', 'Delete “{name}”?': '„{name}“ löschen?', 'Note deleted.': 'Notiz gelöscht.'
    },
    tr: {
      'Choose how BananaBoard should look and calculate grades.': 'BananaBoard’un nasıl görüneceğini ve notları nasıl hesaplayacağını seç.',
      'Notebooks': 'Defterler', 'Keep themed notes together in colorful notebooks.': 'Temalı notlarını renkli defterlerde bir arada tut.', '＋ New notebook': '＋ Yeni defter', 'Marked text': 'İşaretli metin', 'Your notebook shelf is empty': 'Defter rafın boş', 'Create a notebook, give it a color, then start writing your first page.': 'Bir defter oluştur, rengini seç ve ilk sayfanı yazmaya başla.', 'Create a notebook': 'Defter oluştur',
      '{count} page': '{count} sayfa', '{count} pages': '{count} sayfa', 'Open {name}': '{name} defterini aç', 'Edit notebook': 'Defteri düzenle', 'Delete notebook': 'Defteri sil', 'Loose notes': 'Serbest notlar', 'Open loose notes': 'Serbest notları aç', 'Move them into a notebook anytime': 'İstediğin zaman onları bir deftere taşı.', '← All notebooks': '← Tüm defterler', '＋ New page': '＋ Yeni sayfa', 'NOTEBOOK': 'DEFTER', 'UNFILED': 'SINIFLANDIRILMAMIŞ', 'Color-coded for your theme': 'Temana göre renklendirildi', 'Choose a notebook when you edit a page': 'Bir sayfayı düzenlerken bir defter seç', 'No pages yet': 'Henüz sayfa yok', 'Create your first A4-style page for this notebook.': 'Bu defter için A4 tarzı ilk sayfanı oluştur.', 'New page': 'Yeni sayfa', 'Blank page': 'Boş sayfa', 'Untitled note': 'Adsız not', 'Edit note': 'Notu düzenle', 'Delete note': 'Notu sil',
      '← Back to notes': '← Notlara dön', 'Your markings': 'İşaretlediklerin', 'Every passage you highlight is saved here for quick revision.': 'İşaretlediğin her bölüm hızlı tekrar için burada saklanır.', 'Open note': 'Notu aç', 'Delete marking': 'İşaretlemeyi sil', 'No marked text yet': 'Henüz işaretli metin yok', 'Select text in a note and use the Mark tool to save it here.': 'Bir notta metin seç ve buraya kaydetmek için İşaretle aracını kullan.', 'Note editing tools': 'Not düzenleme araçları', 'Bold': 'Kalın', 'Italic': 'İtalik', 'Underline': 'Altı çizili', 'Heading': 'Başlık', 'Bullet list': 'Madde işaretli liste', 'Numbered list': 'Numaralı liste', 'Mark selected text': 'Seçili metni işaretle', 'Add a photo': 'Fotoğraf ekle', 'Undo': 'Geri al', 'Start writing your note…': 'Notunu yazmaya başla…', 'Photos can be pasted or added from your device. Use Mark to save selected text in the Marked text tab.': 'Fotoğrafları yapıştırabilir veya cihazından ekleyebilirsin. Seçilen metni İşaretli metin sekmesine kaydetmek için İşaretle’yi kullan.',
      'Notebook name': 'Defter adı', 'e.g. Biology revision': 'ör. Biyoloji tekrarı', 'Notebook color': 'Defter rengi', 'The cover color and subject can be changed later.': 'Kapak rengi ve ders daha sonra değiştirilebilir.', '(optional)': '(isteğe bağlı)', 'No subject': 'Ders yok', 'Note saved.': 'Not kaydedildi.', 'Select some text on the page first.': 'Önce sayfada bir metin seç.', 'That marking is already saved.': 'Bu işaretleme zaten kaydedildi.', 'Marked text saved.': 'İşaretli metin kaydedildi.', 'Choose an image to add to the note.': 'Nota eklenecek bir görsel seç.', 'Choose an image smaller than 8 MB.': '8 MB’den küçük bir görsel seç.', 'That image could not be added.': 'Bu görsel eklenemedi.', 'Photo added to the page.': 'Fotoğraf sayfaya eklendi.', 'Could not add that photo.': 'Bu fotoğraf eklenemedi.', 'Delete “{name}”? Its pages will be kept as loose notes.': '“{name}” silinsin mi? Sayfaları serbest not olarak kalacak.', 'Notebook deleted. Its pages are still in Loose notes.': 'Defter silindi. Sayfaları hâlâ Serbest notlar bölümünde.', 'Delete “{name}”?': '“{name}” silinsin mi?', 'Note deleted.': 'Not silindi.'
    },
    ru: {
      'Choose how BananaBoard should look and calculate grades.': 'Выберите вид BananaBoard и способ подсчёта оценок.',
      'Notebooks': 'Тетради', 'Keep themed notes together in colorful notebooks.': 'Храните тематические заметки вместе в цветных тетрадях.', '＋ New notebook': '＋ Новая тетрадь', 'Marked text': 'Выделенный текст', 'Your notebook shelf is empty': 'Ваша полка с тетрадями пуста', 'Create a notebook, give it a color, then start writing your first page.': 'Создайте тетрадь, выберите цвет и начните писать первую страницу.', 'Create a notebook': 'Создать тетрадь',
      '{count} page': '{count} страница', '{count} pages': '{count} страниц', 'Open {name}': 'Открыть {name}', 'Edit notebook': 'Изменить тетрадь', 'Delete notebook': 'Удалить тетрадь', 'Loose notes': 'Несортированные заметки', 'Open loose notes': 'Открыть несортированные заметки', 'Move them into a notebook anytime': 'Их можно перенести в тетрадь в любое время.', '← All notebooks': '← Все тетради', '＋ New page': '＋ Новая страница', 'NOTEBOOK': 'ТЕТРАДЬ', 'UNFILED': 'БЕЗ ПАПКИ', 'Color-coded for your theme': 'Цвет подобран под вашу тему', 'Choose a notebook when you edit a page': 'Выберите тетрадь при редактировании страницы', 'No pages yet': 'Пока нет страниц', 'Create your first A4-style page for this notebook.': 'Создайте первую страницу в стиле A4 для этой тетради.', 'New page': 'Новая страница', 'Blank page': 'Пустая страница', 'Untitled note': 'Заметка без названия', 'Edit note': 'Изменить заметку', 'Delete note': 'Удалить заметку',
      '← Back to notes': '← К заметкам', 'Your markings': 'Ваши выделения', 'Every passage you highlight is saved here for quick revision.': 'Каждый выделенный фрагмент сохраняется здесь для быстрого повторения.', 'Open note': 'Открыть заметку', 'Delete marking': 'Удалить выделение', 'No marked text yet': 'Пока нет выделенного текста', 'Select text in a note and use the Mark tool to save it here.': 'Выделите текст в заметке и используйте инструмент «Выделить», чтобы сохранить его здесь.', 'Note editing tools': 'Инструменты редактирования заметки', 'Bold': 'Жирный', 'Italic': 'Курсив', 'Underline': 'Подчёркнутый', 'Heading': 'Заголовок', 'Bullet list': 'Маркированный список', 'Numbered list': 'Нумерованный список', 'Mark selected text': 'Выделить выбранный текст', 'Add a photo': 'Добавить фото', 'Undo': 'Отменить', 'Start writing your note…': 'Начните писать заметку…', 'Photos can be pasted or added from your device. Use Mark to save selected text in the Marked text tab.': 'Фото можно вставить или добавить с устройства. Используйте «Выделить», чтобы сохранить выбранный текст на вкладке «Выделенный текст».',
      'Notebook name': 'Название тетради', 'e.g. Biology revision': 'например, повторение биологии', 'Notebook color': 'Цвет тетради', 'The cover color and subject can be changed later.': 'Цвет обложки и предмет можно изменить позже.', '(optional)': '(необязательно)', 'No subject': 'Без предмета', 'Note saved.': 'Заметка сохранена.', 'Select some text on the page first.': 'Сначала выделите текст на странице.', 'That marking is already saved.': 'Это выделение уже сохранено.', 'Marked text saved.': 'Выделенный текст сохранён.', 'Choose an image to add to the note.': 'Выберите изображение для добавления в заметку.', 'Choose an image smaller than 8 MB.': 'Выберите изображение меньше 8 МБ.', 'That image could not be added.': 'Не удалось добавить это изображение.', 'Photo added to the page.': 'Фото добавлено на страницу.', 'Could not add that photo.': 'Не удалось добавить это фото.', 'Delete “{name}”? Its pages will be kept as loose notes.': 'Удалить «{name}»? Его страницы останутся несортированными заметками.', 'Notebook deleted. Its pages are still in Loose notes.': 'Тетрадь удалена. Её страницы остались в несортированных заметках.', 'Delete “{name}”?': 'Удалить «{name}»?', 'Note deleted.': 'Заметка удалена.'
    },
    uk: {
      'Choose how BananaBoard should look and calculate grades.': 'Оберіть вигляд BananaBoard і спосіб підрахунку оцінок.',
      'Notebooks': 'Зошити', 'Keep themed notes together in colorful notebooks.': 'Зберігайте тематичні нотатки разом у кольорових зошитах.', '＋ New notebook': '＋ Новий зошит', 'Marked text': 'Виділений текст', 'Your notebook shelf is empty': 'Ваша полиця із зошитами порожня', 'Create a notebook, give it a color, then start writing your first page.': 'Створіть зошит, виберіть колір і почніть писати першу сторінку.', 'Create a notebook': 'Створити зошит',
      '{count} page': '{count} сторінка', '{count} pages': '{count} сторінок', 'Open {name}': 'Відкрити {name}', 'Edit notebook': 'Редагувати зошит', 'Delete notebook': 'Видалити зошит', 'Loose notes': 'Несортовані нотатки', 'Open loose notes': 'Відкрити несортовані нотатки', 'Move them into a notebook anytime': 'Їх можна будь-коли перенести до зошита.', '← All notebooks': '← Усі зошити', '＋ New page': '＋ Нова сторінка', 'NOTEBOOK': 'ЗОШИТ', 'UNFILED': 'БЕЗ РОЗДІЛУ', 'Color-coded for your theme': 'Колір підібрано до вашої теми', 'Choose a notebook when you edit a page': 'Виберіть зошит під час редагування сторінки', 'No pages yet': 'Ще немає сторінок', 'Create your first A4-style page for this notebook.': 'Створіть першу сторінку у стилі A4 для цього зошита.', 'New page': 'Нова сторінка', 'Blank page': 'Порожня сторінка', 'Untitled note': 'Нотатка без назви', 'Edit note': 'Редагувати нотатку', 'Delete note': 'Видалити нотатку',
      '← Back to notes': '← До нотаток', 'Your markings': 'Ваші виділення', 'Every passage you highlight is saved here for quick revision.': 'Кожен виділений уривок зберігається тут для швидкого повторення.', 'Open note': 'Відкрити нотатку', 'Delete marking': 'Видалити виділення', 'No marked text yet': 'Ще немає виділеного тексту', 'Select text in a note and use the Mark tool to save it here.': 'Виділіть текст у нотатці та скористайтеся інструментом «Виділити», щоб зберегти його тут.', 'Note editing tools': 'Інструменти редагування нотатки', 'Bold': 'Жирний', 'Italic': 'Курсив', 'Underline': 'Підкреслений', 'Heading': 'Заголовок', 'Bullet list': 'Маркований список', 'Numbered list': 'Нумерований список', 'Mark selected text': 'Виділити вибраний текст', 'Add a photo': 'Додати фото', 'Undo': 'Скасувати', 'Start writing your note…': 'Почніть писати нотатку…', 'Photos can be pasted or added from your device. Use Mark to save selected text in the Marked text tab.': 'Фото можна вставити або додати з пристрою. Скористайтеся «Виділити», щоб зберегти вибраний текст на вкладці «Виділений текст».',
      'Notebook name': 'Назва зошита', 'e.g. Biology revision': 'наприклад, повторення біології', 'Notebook color': 'Колір зошита', 'The cover color and subject can be changed later.': 'Колір обкладинки й предмет можна змінити пізніше.', '(optional)': '(необов’язково)', 'No subject': 'Без предмета', 'Note saved.': 'Нотатку збережено.', 'Select some text on the page first.': 'Спочатку виділіть текст на сторінці.', 'That marking is already saved.': 'Це виділення вже збережено.', 'Marked text saved.': 'Виділений текст збережено.', 'Choose an image to add to the note.': 'Виберіть зображення для додавання до нотатки.', 'Choose an image smaller than 8 MB.': 'Виберіть зображення менше 8 МБ.', 'That image could not be added.': 'Не вдалося додати це зображення.', 'Photo added to the page.': 'Фото додано на сторінку.', 'Could not add that photo.': 'Не вдалося додати це фото.', 'Delete “{name}”? Its pages will be kept as loose notes.': 'Видалити «{name}»? Його сторінки залишаться несортованими нотатками.', 'Notebook deleted. Its pages are still in Loose notes.': 'Зошит видалено. Його сторінки залишилися в несортованих нотатках.', 'Delete “{name}”?': 'Видалити «{name}»?', 'Note deleted.': 'Нотатку видалено.'
    },
    es: {
      'Choose how BananaBoard should look and calculate grades.': 'Elige cómo debe verse BananaBoard y calcular las calificaciones.',
      'Notebooks': 'Cuadernos', 'Keep themed notes together in colorful notebooks.': 'Guarda notas temáticas juntas en cuadernos de colores.', '＋ New notebook': '＋ Nuevo cuaderno', 'Marked text': 'Texto marcado', 'Your notebook shelf is empty': 'Tu estantería de cuadernos está vacía', 'Create a notebook, give it a color, then start writing your first page.': 'Crea un cuaderno, elige un color y empieza a escribir tu primera página.', 'Create a notebook': 'Crear un cuaderno',
      '{count} page': '{count} página', '{count} pages': '{count} páginas', 'Open {name}': 'Abrir {name}', 'Edit notebook': 'Editar cuaderno', 'Delete notebook': 'Eliminar cuaderno', 'Loose notes': 'Notas sueltas', 'Open loose notes': 'Abrir notas sueltas', 'Move them into a notebook anytime': 'Muévelas a un cuaderno cuando quieras.', '← All notebooks': '← Todos los cuadernos', '＋ New page': '＋ Nueva página', 'NOTEBOOK': 'CUADERNO', 'UNFILED': 'SIN CLASIFICAR', 'Color-coded for your theme': 'Con color según tu tema', 'Choose a notebook when you edit a page': 'Elige un cuaderno al editar una página', 'No pages yet': 'Aún no hay páginas', 'Create your first A4-style page for this notebook.': 'Crea la primera página estilo A4 para este cuaderno.', 'New page': 'Nueva página', 'Blank page': 'Página en blanco', 'Untitled note': 'Nota sin título', 'Edit note': 'Editar nota', 'Delete note': 'Eliminar nota',
      '← Back to notes': '← Volver a notas', 'Your markings': 'Tus marcas', 'Every passage you highlight is saved here for quick revision.': 'Cada fragmento que marcas se guarda aquí para repasarlo rápidamente.', 'Open note': 'Abrir nota', 'Delete marking': 'Eliminar marca', 'No marked text yet': 'Aún no hay texto marcado', 'Select text in a note and use the Mark tool to save it here.': 'Selecciona texto en una nota y usa la herramienta Marcar para guardarlo aquí.', 'Note editing tools': 'Herramientas de edición de notas', 'Bold': 'Negrita', 'Italic': 'Cursiva', 'Underline': 'Subrayado', 'Heading': 'Encabezado', 'Bullet list': 'Lista con viñetas', 'Numbered list': 'Lista numerada', 'Mark selected text': 'Marcar texto seleccionado', 'Add a photo': 'Añadir foto', 'Undo': 'Deshacer', 'Start writing your note…': 'Empieza a escribir tu nota…', 'Photos can be pasted or added from your device. Use Mark to save selected text in the Marked text tab.': 'Puedes pegar fotos o añadirlas desde tu dispositivo. Usa Marcar para guardar el texto seleccionado en la pestaña Texto marcado.',
      'Notebook name': 'Nombre del cuaderno', 'e.g. Biology revision': 'p. ej., repaso de biología', 'Notebook color': 'Color del cuaderno', 'The cover color and subject can be changed later.': 'El color de la portada y la asignatura se pueden cambiar después.', '(optional)': '(opcional)', 'No subject': 'Sin asignatura', 'Note saved.': 'Nota guardada.', 'Select some text on the page first.': 'Primero selecciona texto en la página.', 'That marking is already saved.': 'Esa marca ya está guardada.', 'Marked text saved.': 'Texto marcado guardado.', 'Choose an image to add to the note.': 'Elige una imagen para añadir a la nota.', 'Choose an image smaller than 8 MB.': 'Elige una imagen de menos de 8 MB.', 'That image could not be added.': 'No se pudo añadir esa imagen.', 'Photo added to the page.': 'Foto añadida a la página.', 'Could not add that photo.': 'No se pudo añadir esa foto.', 'Delete “{name}”? Its pages will be kept as loose notes.': '¿Eliminar «{name}»? Sus páginas se conservarán como notas sueltas.', 'Notebook deleted. Its pages are still in Loose notes.': 'Cuaderno eliminado. Sus páginas siguen en Notas sueltas.', 'Delete “{name}”?': '¿Eliminar «{name}»?', 'Note deleted.': 'Nota eliminada.'
    }
  };
  Object.entries(NOTE_TRANSLATIONS).forEach(([code, messages]) => Object.assign(TRANSLATIONS[code], messages));
  const DRAWING_TRANSLATIONS = {
    de: { 'Untitled Notebook': 'Unbenanntes Notizbuch', 'Leave the name blank to use Untitled Notebook. The cover color and subject can be changed later.': 'Lass den Namen leer, um „Unbenanntes Notizbuch“ zu verwenden. Farbe und Fach können später geändert werden.', 'Type': 'Text', 'Add image': 'Bild hinzufügen', 'Draw': 'Zeichnen', 'Lasso': 'Lasso', 'Lasso select and move': 'Mit Lasso auswählen und verschieben', 'Brush': 'Pinsel', 'Pen': 'Stift', 'Pencil': 'Bleistift', 'Highlighter': 'Textmarker', 'Marker': 'Filzstift', 'Watercolor': 'Aquarell', 'Drawing color': 'Zeichenfarbe', 'Thickness': 'Stärke', 'Clear drawing': 'Zeichnung löschen', 'Drawing canvas': 'Zeichenfläche', 'Use Draw with your finger, stylus, or Apple Pencil. Choose Lasso to select drawings, then drag them, change their color, thickness, or brush.': 'Nutze Zeichnen mit Finger, Stift oder Apple Pencil. Wähle Lasso, um Zeichnungen auszuwählen, zu verschieben oder Farbe, Stärke und Pinsel zu ändern.', 'Selected drawing removed.': 'Ausgewählte Zeichnung entfernt.', 'Drawing cleared.': 'Zeichnung gelöscht.', 'Image type': 'Bildtyp', 'Choose image': 'Bild auswählen', 'Photo or diagram': 'Foto oder Diagramm', 'Landscape handwritten page': 'Handgeschriebene Querformatseite', 'Worksheet (one page)': 'Arbeitsblatt (eine Seite)', 'Workbook / multiple worksheet pages': 'Arbeitsbuch / mehrere Arbeitsblattseiten', 'Textbook pages read': 'Gelesene Lehrbuchseiten', 'Auto-crop the page': 'Seite automatisch zuschneiden', 'For paper pages, auto-crop finds the page edges on your device. A clear, high-contrast photo gives the best result.': 'Bei Papierseiten findet der automatische Zuschnitt die Seitenränder auf deinem Gerät. Ein klares Foto mit hohem Kontrast liefert das beste Ergebnis.', 'Add to note': 'Zur Notiz hinzufügen', 'Homework completed!': 'Hausaufgabe erledigt!', 'Pin a picture of your finished homework?': 'Ein Bild deiner erledigten Hausaufgabe anheften?', 'We will crop the picture to the paper so your work is easy to look back at.': 'Wir schneiden das Bild auf das Papier zu, damit du deine Arbeit später leicht ansehen kannst.', 'Paper type': 'Papiertyp', 'Homework photo': 'Hausaufgabenfoto', 'Automatic page crop works best when the whole paper is visible and clearly different from its background.': 'Der automatische Seitenzuschnitt funktioniert am besten, wenn das ganze Papier sichtbar ist und sich klar vom Hintergrund abhebt.', 'Crop & pin photo': 'Foto zuschneiden und anheften', 'Not now': 'Jetzt nicht', 'Pinned homework photo': 'Angeheftetes Hausaufgabenfoto', 'View pinned homework photo': 'Angeheftetes Hausaufgabenfoto ansehen', 'Automatically cropped from your completed homework.': 'Automatisch aus deiner erledigten Hausaufgabe zugeschnitten.', 'Homework photo pinned.': 'Hausaufgabenfoto angeheftet.' },
    tr: { 'Untitled Notebook': 'Adsız defter', 'Leave the name blank to use Untitled Notebook. The cover color and subject can be changed later.': 'Adsız defter kullanmak için adı boş bırak. Kapak rengi ve ders daha sonra değiştirilebilir.', 'Type': 'Yazı', 'Add image': 'Görsel ekle', 'Draw': 'Çiz', 'Lasso': 'Kement', 'Lasso select and move': 'Kementle seç ve taşı', 'Brush': 'Fırça', 'Pen': 'Kalem', 'Pencil': 'Kurşun kalem', 'Highlighter': 'Vurgulayıcı', 'Marker': 'Keçeli kalem', 'Watercolor': 'Sulu boya', 'Drawing color': 'Çizim rengi', 'Thickness': 'Kalınlık', 'Clear drawing': 'Çizimi temizle', 'Drawing canvas': 'Çizim alanı', 'Use Draw with your finger, stylus, or Apple Pencil. Choose Lasso to select drawings, then drag them, change their color, thickness, or brush.': 'Parmağınla, kalemle veya Apple Pencil ile çiz. Çizimleri seçmek için Kementi seç; sonra taşı, rengini, kalınlığını veya fırçasını değiştir.', 'Selected drawing removed.': 'Seçili çizim kaldırıldı.', 'Drawing cleared.': 'Çizim temizlendi.', 'Image type': 'Görsel türü', 'Choose image': 'Görsel seç', 'Photo or diagram': 'Fotoğraf veya diyagram', 'Landscape handwritten page': 'Yatay el yazısı sayfası', 'Worksheet (one page)': 'Çalışma sayfası (tek sayfa)', 'Workbook / multiple worksheet pages': 'Çalışma kitabı / çoklu sayfa', 'Textbook pages read': 'Okunan ders kitabı sayfaları', 'Auto-crop the page': 'Sayfayı otomatik kırp', 'For paper pages, auto-crop finds the page edges on your device. A clear, high-contrast photo gives the best result.': 'Kâğıt sayfalarda otomatik kırpma cihazında sayfa kenarlarını bulur. Net ve kontrastlı bir fotoğraf en iyi sonucu verir.', 'Add to note': 'Nota ekle', 'Homework completed!': 'Ödev tamamlandı!', 'Pin a picture of your finished homework?': 'Bitirdiğin ödevin fotoğrafını sabitlemek ister misin?', 'We will crop the picture to the paper so your work is easy to look back at.': 'Çalışmana kolayca tekrar bakabilmen için fotoğrafı kâğıda göre kırpacağız.', 'Paper type': 'Kâğıt türü', 'Homework photo': 'Ödev fotoğrafı', 'Automatic page crop works best when the whole paper is visible and clearly different from its background.': 'Otomatik sayfa kırpma, kâğıdın tamamı görünür ve arka plandan belirgin biçimde farklı olduğunda en iyi çalışır.', 'Crop & pin photo': 'Fotoğrafı kırp ve sabitle', 'Not now': 'Şimdi değil', 'Pinned homework photo': 'Sabitlenmiş ödev fotoğrafı', 'View pinned homework photo': 'Sabitlenmiş ödev fotoğrafını görüntüle', 'Automatically cropped from your completed homework.': 'Tamamlanan ödevinden otomatik olarak kırpıldı.', 'Homework photo pinned.': 'Ödev fotoğrafı sabitlendi.' },
    ru: { 'Untitled Notebook': 'Тетрадь без названия', 'Leave the name blank to use Untitled Notebook. The cover color and subject can be changed later.': 'Оставьте название пустым, чтобы использовать «Тетрадь без названия». Цвет обложки и предмет можно изменить позже.', 'Type': 'Текст', 'Add image': 'Добавить изображение', 'Draw': 'Рисовать', 'Lasso': 'Лассо', 'Lasso select and move': 'Выбрать и переместить лассо', 'Brush': 'Кисть', 'Pen': 'Ручка', 'Pencil': 'Карандаш', 'Highlighter': 'Маркер-выделитель', 'Marker': 'Фломастер', 'Watercolor': 'Акварель', 'Drawing color': 'Цвет рисунка', 'Thickness': 'Толщина', 'Clear drawing': 'Очистить рисунок', 'Drawing canvas': 'Холст для рисования', 'Use Draw with your finger, stylus, or Apple Pencil. Choose Lasso to select drawings, then drag them, change their color, thickness, or brush.': 'Рисуйте пальцем, стилусом или Apple Pencil. Выберите лассо, чтобы выделять рисунки, затем перетаскивайте их или меняйте цвет, толщину и кисть.', 'Selected drawing removed.': 'Выбранный рисунок удалён.', 'Drawing cleared.': 'Рисунок очищен.', 'Image type': 'Тип изображения', 'Choose image': 'Выберите изображение', 'Photo or diagram': 'Фото или схема', 'Landscape handwritten page': 'Рукописная страница в альбомной ориентации', 'Worksheet (one page)': 'Рабочий лист (одна страница)', 'Workbook / multiple worksheet pages': 'Рабочая тетрадь / несколько страниц', 'Textbook pages read': 'Прочитанные страницы учебника', 'Auto-crop the page': 'Автоматически обрезать страницу', 'For paper pages, auto-crop finds the page edges on your device. A clear, high-contrast photo gives the best result.': 'Для бумажных страниц автоматическая обрезка находит края на вашем устройстве. Чёткое контрастное фото даст лучший результат.', 'Add to note': 'Добавить в заметку', 'Homework completed!': 'Домашнее задание выполнено!', 'Pin a picture of your finished homework?': 'Закрепить фотографию выполненного домашнего задания?', 'We will crop the picture to the paper so your work is easy to look back at.': 'Мы обрежем фото до листа, чтобы к работе было легко вернуться.', 'Paper type': 'Тип бумаги', 'Homework photo': 'Фото домашнего задания', 'Automatic page crop works best when the whole paper is visible and clearly different from its background.': 'Автоматическая обрезка работает лучше всего, когда весь лист виден и явно отличается от фона.', 'Crop & pin photo': 'Обрезать и закрепить фото', 'Not now': 'Не сейчас', 'Pinned homework photo': 'Закреплённое фото задания', 'View pinned homework photo': 'Посмотреть закреплённое фото задания', 'Automatically cropped from your completed homework.': 'Автоматически обрезано из выполненного задания.', 'Homework photo pinned.': 'Фото задания закреплено.' },
    uk: { 'Untitled Notebook': 'Зошит без назви', 'Leave the name blank to use Untitled Notebook. The cover color and subject can be changed later.': 'Залиште назву порожньою, щоб використати «Зошит без назви». Колір обкладинки й предмет можна змінити пізніше.', 'Type': 'Текст', 'Add image': 'Додати зображення', 'Draw': 'Малювати', 'Lasso': 'Ласо', 'Lasso select and move': 'Вибрати й перемістити ласо', 'Brush': 'Пензель', 'Pen': 'Ручка', 'Pencil': 'Олівець', 'Highlighter': 'Виділювач', 'Marker': 'Фломастер', 'Watercolor': 'Акварель', 'Drawing color': 'Колір малюнка', 'Thickness': 'Товщина', 'Clear drawing': 'Очистити малюнок', 'Drawing canvas': 'Полотно для малювання', 'Use Draw with your finger, stylus, or Apple Pencil. Choose Lasso to select drawings, then drag them, change their color, thickness, or brush.': 'Малюйте пальцем, стилусом або Apple Pencil. Оберіть ласо, щоб вибирати малюнки, а потім перетягувати їх чи змінювати колір, товщину або пензель.', 'Selected drawing removed.': 'Вибраний малюнок видалено.', 'Drawing cleared.': 'Малюнок очищено.', 'Image type': 'Тип зображення', 'Choose image': 'Виберіть зображення', 'Photo or diagram': 'Фото або схема', 'Landscape handwritten page': 'Рукописна сторінка в альбомній орієнтації', 'Worksheet (one page)': 'Робочий аркуш (одна сторінка)', 'Workbook / multiple worksheet pages': 'Робочий зошит / кілька сторінок', 'Textbook pages read': 'Прочитані сторінки підручника', 'Auto-crop the page': 'Автоматично обрізати сторінку', 'For paper pages, auto-crop finds the page edges on your device. A clear, high-contrast photo gives the best result.': 'Для паперових сторінок автоматичне обрізання знаходить краї на вашому пристрої. Чітке контрастне фото дає найкращий результат.', 'Add to note': 'Додати до нотатки', 'Homework completed!': 'Домашнє завдання виконано!', 'Pin a picture of your finished homework?': 'Закріпити фото виконаного домашнього завдання?', 'We will crop the picture to the paper so your work is easy to look back at.': 'Ми обріжемо фото до аркуша, щоб до роботи було легко повернутися.', 'Paper type': 'Тип паперу', 'Homework photo': 'Фото домашнього завдання', 'Automatic page crop works best when the whole paper is visible and clearly different from its background.': 'Автоматичне обрізання працює найкраще, коли весь аркуш видно й він чітко відрізняється від фону.', 'Crop & pin photo': 'Обрізати й закріпити фото', 'Not now': 'Не зараз', 'Pinned homework photo': 'Закріплене фото завдання', 'View pinned homework photo': 'Переглянути закріплене фото завдання', 'Automatically cropped from your completed homework.': 'Автоматично обрізано з виконаного завдання.', 'Homework photo pinned.': 'Фото завдання закріплено.' },
    es: { 'Untitled Notebook': 'Cuaderno sin título', 'Leave the name blank to use Untitled Notebook. The cover color and subject can be changed later.': 'Deja el nombre en blanco para usar «Cuaderno sin título». El color de la portada y la asignatura se pueden cambiar después.', 'Type': 'Texto', 'Add image': 'Añadir imagen', 'Draw': 'Dibujar', 'Lasso': 'Lazo', 'Lasso select and move': 'Seleccionar y mover con lazo', 'Brush': 'Pincel', 'Pen': 'Bolígrafo', 'Pencil': 'Lápiz', 'Highlighter': 'Resaltador', 'Marker': 'Rotulador', 'Watercolor': 'Acuarela', 'Drawing color': 'Color de dibujo', 'Thickness': 'Grosor', 'Clear drawing': 'Borrar dibujo', 'Drawing canvas': 'Lienzo de dibujo', 'Use Draw with your finger, stylus, or Apple Pencil. Choose Lasso to select drawings, then drag them, change their color, thickness, or brush.': 'Usa Dibujar con el dedo, un lápiz táctil o Apple Pencil. Elige Lazo para seleccionar dibujos; después puedes arrastrarlos o cambiar su color, grosor o pincel.', 'Selected drawing removed.': 'Dibujo seleccionado eliminado.', 'Drawing cleared.': 'Dibujo borrado.', 'Image type': 'Tipo de imagen', 'Choose image': 'Elegir imagen', 'Photo or diagram': 'Foto o diagrama', 'Landscape handwritten page': 'Página manuscrita horizontal', 'Worksheet (one page)': 'Hoja de trabajo (una página)', 'Workbook / multiple worksheet pages': 'Cuaderno de ejercicios / varias páginas', 'Textbook pages read': 'Páginas de libro leídas', 'Auto-crop the page': 'Recortar automáticamente la página', 'For paper pages, auto-crop finds the page edges on your device. A clear, high-contrast photo gives the best result.': 'Para páginas de papel, el recorte automático detecta los bordes en tu dispositivo. Una foto clara y con contraste da el mejor resultado.', 'Add to note': 'Añadir a la nota', 'Homework completed!': '¡Deberes completados!', 'Pin a picture of your finished homework?': '¿Quieres fijar una foto de los deberes terminados?', 'We will crop the picture to the paper so your work is easy to look back at.': 'Recortaremos la imagen al papel para que sea fácil revisar tu trabajo.', 'Paper type': 'Tipo de papel', 'Homework photo': 'Foto de los deberes', 'Automatic page crop works best when the whole paper is visible and clearly different from its background.': 'El recorte automático funciona mejor cuando se ve todo el papel y se diferencia claramente del fondo.', 'Crop & pin photo': 'Recortar y fijar foto', 'Not now': 'Ahora no', 'Pinned homework photo': 'Foto de deberes fijada', 'View pinned homework photo': 'Ver foto de deberes fijada', 'Automatically cropped from your completed homework.': 'Recortada automáticamente de tus deberes completados.', 'Homework photo pinned.': 'Foto de deberes fijada.' }
  };
  Object.entries(DRAWING_TRANSLATIONS).forEach(([code, messages]) => Object.assign(TRANSLATIONS[code], messages));
  const ERASER_TRANSLATIONS = { de: { Eraser: 'Radierer' }, tr: { Eraser: 'Silgi' }, ru: { Eraser: 'Ластик' }, uk: { Eraser: 'Гумка' }, es: { Eraser: 'Borrador' } };
  Object.entries(ERASER_TRANSLATIONS).forEach(([code, messages]) => Object.assign(TRANSLATIONS[code], messages));
  const HOMEWORK_CAMERA_TRANSLATIONS = {
    de: { 'Take photo': 'Foto aufnehmen', 'Choose from photos': 'Aus Fotos auswählen', 'Choose or take a homework photo before continuing.': 'Wähle oder fotografiere ein Hausaufgabenfoto, bevor du fortfährst.' },
    tr: { 'Take photo': 'Fotoğraf çek', 'Choose from photos': 'Fotoğraflardan seç', 'Choose or take a homework photo before continuing.': 'Devam etmeden önce bir ödev fotoğrafı çekin veya seçin.' },
    ru: { 'Take photo': 'Сделать фото', 'Choose from photos': 'Выбрать из фото', 'Choose or take a homework photo before continuing.': 'Сделайте или выберите фото домашней работы, прежде чем продолжить.' },
    uk: { 'Take photo': 'Зробити фото', 'Choose from photos': 'Вибрати з фото', 'Choose or take a homework photo before continuing.': 'Зробіть або виберіть фото домашньої роботи, перш ніж продовжити.' },
    es: { 'Take photo': 'Tomar foto', 'Choose from photos': 'Elegir de fotos', 'Choose or take a homework photo before continuing.': 'Haz o elige una foto de los deberes antes de continuar.' }
  };
  Object.entries(HOMEWORK_CAMERA_TRANSLATIONS).forEach(([code, messages]) => Object.assign(TRANSLATIONS[code], messages));
  const NOTES_HOMEWORK_TRANSLATIONS = {
    de: { 'Homework (optional)': 'Hausaufgabe (optional)', 'No linked homework': 'Keine verknüpfte Hausaufgabe', 'Pin to homework (optional)': 'An Hausaufgabe anheften (optional)', 'Copy': 'Kopieren', 'Paste': 'Einfügen', 'Copy selection': 'Auswahl kopieren', 'Paste drawing': 'Zeichnung einfügen', 'Select a drawing with Lasso first.': 'Wähle zuerst mit dem Lasso eine Zeichnung aus.', 'Drawing copied. Select Paste, then tap anywhere on the page.': 'Zeichnung kopiert. Wähle Einfügen und tippe dann auf eine Stelle auf der Seite.', 'Nothing copied yet.': 'Noch nichts kopiert.', 'Tap anywhere on the page to paste the drawing.': 'Tippe auf eine Stelle auf der Seite, um die Zeichnung einzufügen.', 'Drawing pasted.': 'Zeichnung eingefügt.', 'Pinned to {name}': 'An {name} angeheftet' },
    tr: { 'Homework (optional)': 'Ödev (isteğe bağlı)', 'No linked homework': 'Bağlı ödev yok', 'Pin to homework (optional)': 'Ödeve sabitle (isteğe bağlı)', 'Copy': 'Kopyala', 'Paste': 'Yapıştır', 'Copy selection': 'Seçimi kopyala', 'Paste drawing': 'Çizimi yapıştır', 'Select a drawing with Lasso first.': 'Önce Kement ile bir çizim seçin.', 'Drawing copied. Select Paste, then tap anywhere on the page.': 'Çizim kopyalandı. Yapıştır’ı seçin, sonra sayfada istediğiniz yere dokunun.', 'Nothing copied yet.': 'Henüz hiçbir şey kopyalanmadı.', 'Tap anywhere on the page to paste the drawing.': 'Çizimi yapıştırmak için sayfada istediğiniz yere dokunun.', 'Drawing pasted.': 'Çizim yapıştırıldı.', 'Pinned to {name}': '{name} ödevine sabitlendi' },
    ru: { 'Homework (optional)': 'Домашнее задание (необязательно)', 'No linked homework': 'Нет связанного задания', 'Pin to homework (optional)': 'Прикрепить к заданию (необязательно)', 'Copy': 'Копировать', 'Paste': 'Вставить', 'Copy selection': 'Копировать выделение', 'Paste drawing': 'Вставить рисунок', 'Select a drawing with Lasso first.': 'Сначала выделите рисунок лассо.', 'Drawing copied. Select Paste, then tap anywhere on the page.': 'Рисунок скопирован. Выберите «Вставить», затем коснитесь нужного места на странице.', 'Nothing copied yet.': 'Пока ничего не скопировано.', 'Tap anywhere on the page to paste the drawing.': 'Коснитесь любого места на странице, чтобы вставить рисунок.', 'Drawing pasted.': 'Рисунок вставлен.', 'Pinned to {name}': 'Прикреплено к заданию «{name}»' },
    uk: { 'Homework (optional)': 'Домашнє завдання (необов’язково)', 'No linked homework': 'Немає пов’язаного завдання', 'Pin to homework (optional)': 'Прикріпити до завдання (необов’язково)', 'Copy': 'Копіювати', 'Paste': 'Вставити', 'Copy selection': 'Копіювати виділене', 'Paste drawing': 'Вставити малюнок', 'Select a drawing with Lasso first.': 'Спочатку виберіть малюнок ласо.', 'Drawing copied. Select Paste, then tap anywhere on the page.': 'Малюнок скопійовано. Виберіть «Вставити», а потім торкніться будь-якого місця на сторінці.', 'Nothing copied yet.': 'Ще нічого не скопійовано.', 'Tap anywhere on the page to paste the drawing.': 'Торкніться будь-якого місця на сторінці, щоб вставити малюнок.', 'Drawing pasted.': 'Малюнок вставлено.', 'Pinned to {name}': 'Прикріплено до завдання «{name}»' },
    es: { 'Homework (optional)': 'Deberes (opcional)', 'No linked homework': 'Sin deberes vinculados', 'Pin to homework (optional)': 'Fijar a deberes (opcional)', 'Copy': 'Copiar', 'Paste': 'Pegar', 'Copy selection': 'Copiar selección', 'Paste drawing': 'Pegar dibujo', 'Select a drawing with Lasso first.': 'Primero selecciona un dibujo con el lazo.', 'Drawing copied. Select Paste, then tap anywhere on the page.': 'Dibujo copiado. Selecciona Pegar y toca cualquier lugar de la página.', 'Nothing copied yet.': 'Aún no se ha copiado nada.', 'Tap anywhere on the page to paste the drawing.': 'Toca cualquier lugar de la página para pegar el dibujo.', 'Drawing pasted.': 'Dibujo pegado.', 'Pinned to {name}': 'Fijado a {name}' }
  };
  Object.entries(NOTES_HOMEWORK_TRANSLATIONS).forEach(([code, messages]) => Object.assign(TRANSLATIONS[code], messages));
  const ONBOARDING_TRANSLATIONS = {
    de: { 'Welcome to BananaBoard!': 'Willkommen bei BananaBoard!', 'Your calm space for homework, notes, plans, and focus.': 'Dein ruhiger Bereich für Hausaufgaben, Notizen, Pläne und Fokus.', 'Get started': 'Loslegen', 'A QUICK QUESTION': 'EINE KURZE FRAGE', 'Where did you hear about BananaBoard?': 'Wo hast du von BananaBoard gehört?', 'Help us understand how people find BananaBoard.': 'Hilf uns zu verstehen, wie Menschen BananaBoard finden.', 'Social media': 'Soziale Medien', 'A friend': 'Ein Freund oder eine Freundin', 'Advertisement': 'Werbung', 'Google': 'Google', 'School': 'Schule', 'Other': 'Andere Quelle', 'Continue': 'Weiter', 'Back': 'Zurück', 'Choose where you heard about BananaBoard to continue.': 'Wähle aus, wo du von BananaBoard gehört hast, um fortzufahren.' },
    tr: { 'Welcome to BananaBoard!': 'BananaBoard’a hoş geldin!', 'Your calm space for homework, notes, plans, and focus.': 'Ödevlerin, notların, planların ve odağın için sakin alanın.', 'Get started': 'Başla', 'A QUICK QUESTION': 'KISA BİR SORU', 'Where did you hear about BananaBoard?': 'BananaBoard’u nereden duydun?', 'Help us understand how people find BananaBoard.': 'İnsanların BananaBoard’u nasıl bulduğunu anlamamıza yardım et.', 'Social media': 'Sosyal medya', 'A friend': 'Bir arkadaş', 'Advertisement': 'Reklam', 'Google': 'Google', 'School': 'Okul', 'Other': 'Diğer', 'Continue': 'Devam et', 'Back': 'Geri', 'Choose where you heard about BananaBoard to continue.': 'Devam etmek için BananaBoard’u nereden duyduğunu seç.' },
    ru: { 'Welcome to BananaBoard!': 'Добро пожаловать в BananaBoard!', 'Your calm space for homework, notes, plans, and focus.': 'Ваше спокойное пространство для заданий, заметок, планов и концентрации.', 'Get started': 'Начать', 'A QUICK QUESTION': 'НЕБОЛЬШОЙ ВОПРОС', 'Where did you hear about BananaBoard?': 'Откуда вы узнали о BananaBoard?', 'Help us understand how people find BananaBoard.': 'Помогите нам понять, как люди находят BananaBoard.', 'Social media': 'Социальные сети', 'A friend': 'Друг', 'Advertisement': 'Реклама', 'Google': 'Google', 'School': 'Школа', 'Other': 'Другое', 'Continue': 'Продолжить', 'Back': 'Назад', 'Choose where you heard about BananaBoard to continue.': 'Выберите, откуда вы узнали о BananaBoard, чтобы продолжить.' },
    uk: { 'Welcome to BananaBoard!': 'Ласкаво просимо до BananaBoard!', 'Your calm space for homework, notes, plans, and focus.': 'Ваш спокійний простір для завдань, нотаток, планів і зосередження.', 'Get started': 'Почати', 'A QUICK QUESTION': 'КІЛЬКА СЛІВ', 'Where did you hear about BananaBoard?': 'Звідки ви дізналися про BananaBoard?', 'Help us understand how people find BananaBoard.': 'Допоможіть нам зрозуміти, як люди знаходять BananaBoard.', 'Social media': 'Соціальні мережі', 'A friend': 'Друг', 'Advertisement': 'Реклама', 'Google': 'Google', 'School': 'Школа', 'Other': 'Інше', 'Continue': 'Продовжити', 'Back': 'Назад', 'Choose where you heard about BananaBoard to continue.': 'Виберіть, звідки ви дізналися про BananaBoard, щоб продовжити.' },
    es: { 'Welcome to BananaBoard!': '¡Bienvenido a BananaBoard!', 'Your calm space for homework, notes, plans, and focus.': 'Tu espacio tranquilo para deberes, notas, planes y concentración.', 'Get started': 'Empezar', 'A QUICK QUESTION': 'UNA PREGUNTA RÁPIDA', 'Where did you hear about BananaBoard?': '¿Dónde conociste BananaBoard?', 'Help us understand how people find BananaBoard.': 'Ayúdanos a entender cómo encuentra la gente BananaBoard.', 'Social media': 'Redes sociales', 'A friend': 'Un amigo', 'Advertisement': 'Anuncio', 'Google': 'Google', 'School': 'Escuela', 'Other': 'Otro', 'Continue': 'Continuar', 'Back': 'Atrás', 'Choose where you heard about BananaBoard to continue.': 'Elige dónde conociste BananaBoard para continuar.' }
  };
  Object.entries(ONBOARDING_TRANSLATIONS).forEach(([code, messages]) => Object.assign(TRANSLATIONS[code], messages));

  const el = (selector, parent = document) => parent.querySelector(selector);
  const els = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const pageRoot = el('#pageRoot');
  const modalRoot = el('#modalRoot');
  const toastRoot = el('#toastRoot');
  const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  const todayISO = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const localDate = (value) => value ? new Date(`${value}T12:00:00`) : null;
  const escape = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const clamp = (number, min, max) => Math.max(min, Math.min(max, number));
  const initials = (name = '') => name.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase() || 'O';
  const formatDate = (value, options = { month: 'short', day: 'numeric' }) => {
    const date = localDate(value);
    return date && !Number.isNaN(date) ? date.toLocaleDateString(locale(), options) : t('No date');
  };
  const relativeDate = value => {
    if (!value) return t('No due date');
    const difference = Math.round((localDate(value) - localDate(todayISO())) / 86400000);
    if (difference === 0) return t('Due today');
    if (difference === 1) return t('Due tomorrow');
    if (difference === -1) return t('Due yesterday');
    return difference < 0 ? t('{days} days overdue', { days: Math.abs(difference) }) : t('Due {date}', { date: formatDate(value) });
  };
  const hexToRgb = hex => {
    const number = parseInt(hex.replace('#', ''), 16);
    return `${number >> 16},${(number >> 8) & 255},${number & 255}`;
  };

  const defaultData = () => ({
    profile: { name: '', photo: '', theme: 'light', accent: '#f4c53a', gradeSystem: 'numeric', clockFormat: '24', language: 'en', discoverySource: '' },
    subjects: [
      { id: 'math', name: 'Mathematics', color: '#6c63ff', icon: '∑' },
      { id: 'english', name: 'English', color: '#ec4899', icon: 'A' },
      { id: 'science', name: 'Science', color: '#10b981', icon: '⚗' }
    ],
    homework: [], reminders: [], notes: [], notebooks: [], noteHighlights: [], grades: [], events: [], goals: [], friends: [], widgets: [],
    timer: { study: 25, break: 5, longBreak: 15, custom: 30, completedSessions: 0 },
    stats: { studyMinutes: 0, completedHomework: 0, lastStudyDate: '', dailyStudy: {} }
  });
  const load = (source) => {
    try {
      const parsed = source;
      if (!parsed || !parsed.profile) return defaultData();
      const fresh = defaultData();
      const { layout: _legacyLayout, notificationsEnabled: _legacyNotifications, ...savedProfile } = parsed.profile;
      const merged = {
        ...fresh, ...Object.fromEntries(Object.entries(parsed).filter(([key]) => key !== 'account')),
        profile: { ...fresh.profile, ...savedProfile },
        timer: { ...fresh.timer, ...(parsed.timer || {}) },
        stats: { ...fresh.stats, ...(parsed.stats || {}) },
        subjects: Array.isArray(parsed.subjects) ? parsed.subjects : fresh.subjects,
        reminders: Array.isArray(parsed.reminders) ? parsed.reminders : [],
        widgets: Array.isArray(parsed.widgets) ? parsed.widgets : [],
        notebooks: Array.isArray(parsed.notebooks) ? parsed.notebooks : [],
        noteHighlights: Array.isArray(parsed.noteHighlights) ? parsed.noteHighlights : []
      };
      if (merged.profile.gradeSystem === 'german') merged.profile.gradeSystem = 'numeric';
      if (!LANGUAGE_OPTIONS.some(([code]) => code === merged.profile.language)) merged.profile.language = 'en';
      return merged;
    } catch { return defaultData(); }
  };
  let data = defaultData();
  const ui = { page: 'dashboard', homeworkFilter: 'all', month: new Date(new Date().getFullYear(), new Date().getMonth(), 1), selectedDate: todayISO(), timerMode: 'study', timerRemaining: 0, timerRunning: false, timerActive: false, timerInterval: null, widgetsExpanded: false, datePickerMonth: new Date(), datePickerTarget: '', timePickerTarget: '', timePickerMeridiem: 'am', languageTransitioning: false, setupLanguage: data.profile.language || 'en', setupStep: 'welcome', setupDiscovery: data.profile.discoverySource || '', notesView: 'library', activeNotebookId: '', activeNoteId: '', noteTool: 'text', noteBrush: 'pen', noteDrawColor: '#25223a', noteDrawWidth: 4, noteDrawingData: [], noteDrawingSelectionIds: [], noteDrawingInteraction: null, noteDrawingClipboard: [], noteDrawingPastePending: false, noteCanvasObserver: null, noteEditorRange: null };

  let workspaceSaveTimer = null;
  let workspaceSaveRequest = Promise.resolve();
  const csrfToken = () => document.cookie.split('; ').find(item => item.startsWith('bananaboard_csrf='))?.split('=').slice(1).join('') || '';
  async function persistWorkspace(snapshot) {
    const response = await fetch('/api/workspace', { method: 'PUT', credentials: 'same-origin', headers: { 'content-type': 'application/json', 'x-csrf-token': csrfToken() }, body: JSON.stringify({ data: snapshot }) });
    if (response.status === 401) { window.location.assign('/auth'); return; }
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || 'Your changes could not be saved.');
    }
  }
  function save() {
    const snapshot = structuredClone(data);
    window.clearTimeout(workspaceSaveTimer);
    workspaceSaveTimer = window.setTimeout(() => {
      workspaceSaveRequest = workspaceSaveRequest
        .catch(() => undefined)
        .then(() => persistWorkspace(snapshot))
        .catch(error => toast(error.message || 'Your changes could not be saved.', 'error'));
    }, 260);
  }
  async function hydrateWorkspace() {
    const response = await fetch('/api/workspace', { credentials: 'same-origin', cache: 'no-store' });
    if (response.status === 401) { window.location.assign('/auth'); throw new Error('Authentication required.'); }
    if (!response.ok) throw new Error('Could not load your BananaBoard data.');
    const payload = await response.json();
    data = load(payload.data);
  }
  const language = () => data.profile.language || 'en';
  const locale = () => LOCALE_CODES[language()] || LOCALE_CODES.en;
  const t = (key, variables = {}) => String((TRANSLATIONS[language()] || {})[key] || key).replace(/\{(\w+)\}/g, (_, name) => variables[name] ?? `{${name}}`);
  const brandText = value => String(value || '').replace(/StudyFlow/g, APP_NAME);
  const languageOptions = (selected = language()) => LANGUAGE_OPTIONS.map(([code, label]) => `<option value="${code}" ${code === selected ? 'selected' : ''}>${t(label)}</option>`).join('');
  function localizeText(value) {
    const source = String(value || ''); const match = source.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const translated = t(match[2]);
    return brandText(translated === match[2] ? source : `${match[1]}${translated}${match[3]}`);
  }
  function localizeTree(root = document.body) {
    if (!root) return;
    els('[data-i18n]', root).forEach(node => { node.textContent = brandText(t(node.dataset.i18n)); });
    els('[data-i18n-placeholder]', root).forEach(node => { node.placeholder = brandText(t(node.dataset.i18nPlaceholder)); });
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode(node) {
      const parent = node.parentElement;
      return parent && !parent.closest('script,style,[data-no-translate]') && node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    } });
    const nodes = []; let node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(textNode => { textNode.nodeValue = localizeText(textNode.nodeValue); });
    els('[placeholder],[aria-label],[title]', root).forEach(node => {
      ['placeholder', 'aria-label', 'title'].forEach(attribute => {
        if (node.hasAttribute(attribute)) node.setAttribute(attribute, localizeText(node.getAttribute(attribute)));
      });
    });
  }
  function applyLanguageContent() {
    document.documentElement.lang = language();
    els('#setupLanguage, #languageSelect').forEach(select => {
      const selected = select.id === 'setupLanguage' ? (ui.setupLanguage || language()) : language();
      select.innerHTML = languageOptions(selected); select.value = selected;
    });
    localizeTree(document.body);
  }
  const isNewUser = () => !data.profile.name;
  const subjectById = id => data.subjects.find(subject => subject.id === id);
  const DEFAULT_SUBJECT_NAMES = { math: 'Mathematics', english: 'English', science: 'Science' };
  const subjectName = subject => {
    if (!subject) return '';
    return DEFAULT_SUBJECT_NAMES[subject.id] === subject.name ? t(subject.name) : subject.name;
  };
  const avatarMarkup = (className = '') => data.profile.photo
    ? `<img class="${className}" src="${escape(data.profile.photo)}" alt="${escape(data.profile.name || 'Profile')} profile picture">`
    : escape(initials(data.profile.name));
  const subjectChip = id => {
    const subject = subjectById(id);
    return subject ? `<span class="chip" style="--chip:${subject.color}"><i></i>${escape(subjectName(subject))}</span>` : '';
  };
  const homeworkById = id => data.homework.find(homework => homework.id === id);
  const homeworkChip = id => {
    const homework = homeworkById(id);
    return homework ? `<span class="chip homework-note-chip" title="${escape(t('Pinned to {name}', { name: homework.title }))}">▧ ${escape(homework.title)}</span>` : '';
  };
  const linkedNotesForHomework = id => data.notes.filter(note => note.homeworkId === id).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  const homeworkNoteButton = homework => {
    const note = linkedNotesForHomework(homework.id)[0];
    return note ? `<button class="homework-note-pin" data-action="open-homework-note" data-id="${note.id}" title="${t('Open note')}" aria-label="${t('Open note')}">▤</button>` : '';
  };
  const homeworkOptions = (selected = '') => `<option value="">${t('No linked homework')}</option>${[...data.homework].sort(sortHomework).map(homework => `<option value="${homework.id}" ${homework.id === selected ? 'selected' : ''}>${escape(homework.title)}${homework.done ? ' ✓' : ''}</option>`).join('')}`;
  const empty = (title, detail, action, actionText) => `<div class="empty"><div><strong>${escape(title)}</strong><span>${escape(detail)}</span>${action ? `<br><button class="text-button" data-action="${action}">${escape(actionText)}</button>` : ''}</div></div>`;
  const button = (text, action, classes = 'primary', extra = '') => `<button class="button ${classes}" data-action="${action}" ${extra}>${text}</button>`;

  function applyAppearance() {
    const { theme, accent } = data.profile;
    const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('dark', dark);
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-rgb', hexToRgb(accent));
    el('meta[name="theme-color"]').content = accent;
    applyLayout();
  }
  function responsiveLayout() {
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    if (viewportWidth <= 760) return 'phone';
    if (viewportWidth <= 1120) return 'tablet';
    return 'pc';
  }
  function applyLayout() {
    const layout = responsiveLayout();
    document.body.classList.remove('layout-pc', 'layout-tablet', 'layout-phone');
    document.body.classList.add(`layout-${layout}`);
    if (layout === 'phone') closeSidebar();
  }
  function toast(message, type = '') {
    const node = document.createElement('div');
    node.className = `toast ${type}`;
    node.textContent = brandText(t(message));
    toastRoot.append(node);
    window.setTimeout(() => node.remove(), 3200);
  }
  function currentTimerDuration(mode = ui.timerMode) { return Number(data.timer[mode] || 0) * 60; }
  function resetTimer(shouldRender = true) {
    window.clearInterval(ui.timerInterval);
    ui.timerRunning = false;
    ui.timerActive = false;
    ui.timerRemaining = currentTimerDuration();
    if (shouldRender && ui.page === 'timer') renderPage();
    syncFloatingTimer();
  }
  function initTimer() { ui.timerRemaining = currentTimerDuration(); }

  /* app shell */
  function renderNav() {
    const incomplete = data.homework.filter(item => !item.done).length;
    el('#mainNav').innerHTML = NAV.map(([id, icon, label]) => `
      <button class="nav-link ${ui.page === id ? 'active' : ''}" data-page="${id}"><span>${icon}</span>${label}${id === 'homework' && incomplete ? `<b class="nav-badge">${incomplete}</b>` : ''}</button>
    `).join('');
    const primaryPhoneTabs = [['dashboard', '⌂', 'Dashboard'], ['homework', '✓', 'Homework'], ['calendar', '□', 'Calendar'], ['notes', '▤', 'Notes'], ['grades', 'A+', 'Grades']];
    const morePhoneTabs = [['timer', '◷', 'Focus'], ['reminders', '⊙', 'Reminders'], ['statistics', '↗', 'Stats'], ['goals', '◎', 'Goals'], ['subjects', '▦', 'Subjects'], ['widgets', '◫', 'Widgets'], ['settings', SETTINGS_NAV_ICON, 'Settings']];
    const phoneNav = el('#mobileBottomNav');
    phoneNav.innerHTML = [...primaryPhoneTabs, ...morePhoneTabs].map(([id, icon, label], index) => `<button class="phone-tab ${index < primaryPhoneTabs.length ? 'primary-phone-tab' : ''} ${ui.page === id ? 'active' : ''}" data-page="${id}"><span>${id === 'settings' ? icon : escape(icon)}</span><small>${label}</small></button>`).join('');
    window.requestAnimationFrame(() => phoneNav.querySelector('.phone-tab.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' }));
    els('[data-page="settings"]').forEach(item => item.classList.toggle('active', ui.page === 'settings'));
    el('#profileName').textContent = data.profile.name || 'Student';
    el('#profileInitial').innerHTML = avatarMarkup('profile-photo');
    el('#todayLabel').textContent = new Date().toLocaleDateString(locale(), { weekday: 'long', month: 'short', day: 'numeric' });
  }
  function pageHeader(eyebrow, title, description, actions = '') {
    return `<section class="page-header"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="muted">${description}</p></div>${actions ? `<div class="header-actions">${actions}</div>` : ''}</section>`;
  }
  function renderPage() {
    ui.noteCanvasObserver?.disconnect();
    ui.noteCanvasObserver = null;
    if (ui.page !== 'timer' && ui.timerRunning) { /* Timer intentionally keeps running in the background. */ }
    const pages = {
      dashboard: renderDashboard, homework: renderHomework, calendar: renderCalendar, reminders: renderReminders, notes: renderNotes,
      grades: renderGrades, timer: renderTimer, statistics: renderStatistics, goals: renderGoals,
      subjects: renderSubjects, friends: renderFriends, widgets: renderWidgets, settings: renderSettings, search: renderSearch
    };
    pageRoot.innerHTML = `<div class="page">${(pages[ui.page] || renderDashboard)()}</div>`;
    renderNav();
    syncFloatingTimer();
    syncFloatingWidgets();
    if (ui.page === 'settings') { const versionLabel = el('.eyebrow', pageRoot); if (versionLabel) versionLabel.textContent = `${t('Version').toLocaleUpperCase(locale())} 1.0`; renderAccentChoices(el('#settingsAccents')); renderSettingsPhotoPicker(); }
    if (ui.page === 'timer') updateTimerView();
    applyLanguageContent();
    if (ui.page === 'notes' && ui.notesView === 'editor') setupNoteDrawingCanvas();
  }
  function goTo(page) {
    ui.page = page;
    closeSidebar();
    renderPage();
  }
  function renderSettingsPhotoPicker() {
    const input = el('#settingsPhoto'); if (!input) return;
    input.hidden = true;
    input.insertAdjacentHTML('afterend', '<div class="photo-picker-row"><button class="button secondary" type="button" data-action="choose-settings-photo">Choose from Photos</button><span class="help">Select an image from your device</span></div>');
  }
  /* dashboard */
  function renderDashboard() {
    const open = data.homework.filter(item => !item.done);
    const completed = data.homework.filter(item => item.done).length;
    const dueWeek = open.filter(item => item.due && localDate(item.due) <= localDate(todayISO()).getTime() + 7 * 86400000).length;
    const nextEvents = [...data.events].filter(event => event.date >= todayISO()).sort((a, b) => `${a.date}${a.time || ''}`.localeCompare(`${b.date}${b.time || ''}`)).slice(0, 4);
    const nextReminders = data.reminders.filter(item => !item.done).sort(sortReminders);
    const quote = QUOTES[new Date().getDate() % QUOTES.length];
    return `
      <section class="page-header dashboard-welcome"><div><p class="eyebrow">${t('YOUR STUDY SPACE')}</p><h1>${greeting()}, <span>${escape(data.profile.name || 'Student')}</span> <span aria-hidden="true">✦</span></h1><p class="muted">${t('Here is what needs your attention today.')}</p></div><div class="card clock-card"><span>${t('LOCAL TIME')}</span><strong id="dashboardClock">--:--</strong></div></section>
      ${renderPhoneAgenda(open, nextReminders, nextEvents)}
      <section class="stat-grid">
        ${statCard('✓', open.length, 'Open homework')}${statCard('◷', formatMinutes(data.stats.studyMinutes), 'Focused time')}${statCard('▣', dueWeek, 'Due this week')}${statCard('★', completed, 'Tasks completed')}
      </section>
      <section class="dashboard-layout">
        <div class="dashboard-center dashboard-grid">
        <div class="dashboard-stack">
          <article class="card"><div class="card-head"><h2>${t('Upcoming homework')}</h2><button class="text-button" data-page="homework">${t('View all')}</button></div>${open.length ? `<div class="task-list">${open.sort(sortHomework).slice(0, 5).map(homeworkRow).join('')}</div>` : empty(t('Nothing due yet'), t('Add your first task and it will appear here.'), 'add-homework', t('Add homework'))}</article>
          <article class="card"><div class="card-head"><h2>${t('Today’s plan')}</h2><button class="text-button" data-action="add-event">${t('Add event')}</button></div>${nextEvents.length ? `<div class="event-list">${nextEvents.map(eventRow).join('')}</div>` : empty(t('A clear schedule'), t('Add an event to start planning your week.'), 'add-event', t('Add event'))}</article>
        </div>
        <div class="dashboard-stack">
          <article class="card"><div class="card-head"><h2>${t('Focus timer')}</h2><button class="text-button" data-page="timer">${t('Open timer')}</button></div><div class="quote"><b>${formatMinutes(data.stats.studyMinutes)}</b> ${t('focused so far.')}<br><span class="muted">${t('One small session is a win.')}</span><small>${t('{count} completed sessions', { count: data.timer.completedSessions || 0 })}</small></div></article>
          <article class="card"><div class="card-head"><h2>${t('Daily reminder')}</h2></div><div class="quote">“${t(quote[0])}”<small>— ${quote[1]}</small></div></article>
        </div>
        </div>
      </section>`;
  }
  function renderPhoneAgenda(open, reminders, events) {
    return `<section class="phone-dashboard-agenda" aria-label="${t('What is coming up')}"><article class="card"><div class="card-head"><h2>${t('Next homework')}</h2><button class="text-button" data-page="homework">${t('View all')}</button></div>${open.length ? `<div class="task-list compact-list">${open.sort(sortHomework).slice(0, 2).map(homeworkRow).join('')}</div>` : `<p class="muted">${t('No homework due right now.')}</p>`}</article><article class="card"><div class="card-head"><h2>${t('Next reminder')}</h2><button class="text-button" data-page="reminders">${t('View all')}</button></div>${reminders.length ? `<div class="reminder-list">${reminders.slice(0, 2).map(item => reminderRow(item, true)).join('')}</div>` : `<p class="muted">${t('No open reminders.')}</p>`}</article><article class="card"><div class="card-head"><h2>${t('Tests & events')}</h2><button class="text-button" data-page="calendar">${t('View all')}</button></div>${events.length ? `<div class="event-list compact-list">${events.slice(0, 2).map(eventRow).join('')}</div>` : `<p class="muted">${t('Nothing upcoming.')}</p>`}</article></section>`;
  }
  function statCard(icon, value, label) { return `<article class="card stat-card"><span class="stat-icon">${icon}</span><strong>${value}</strong><small data-i18n="${escape(label)}">${escape(t(label))}</small></article>`; }
  function greeting() { const hour = new Date().getHours(); return t(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'); }
  function formatMinutes(minutes) { const total = Math.max(0, Number(minutes) || 0); return total >= 60 ? `${Math.floor(total / 60)}h ${total % 60}m` : `${total}m`; }
  function homeworkPhotoPin(item) { return item.completionPhoto?.source ? `<button class="homework-photo-pin" data-action="view-homework-photo" data-id="${item.id}" title="${t('View pinned homework photo')}" aria-label="${t('View pinned homework photo')}"><img src="${escape(item.completionPhoto.source)}" alt="${t('Pinned homework photo')}"></button>` : ''; }
  function homeworkRow(item) { return `<div class="task-row"><button class="check ${item.done ? 'done' : ''}" data-action="toggle-homework" data-id="${item.id}" aria-label="Mark ${escape(item.title)} ${item.done ? 'incomplete' : 'complete'}">✓</button><div class="task-row-main"><b class="${item.done ? 'done' : ''}">${escape(item.title)}</b><small>${subjectChip(item.subjectId)} ${item.due ? ` · ${relativeDate(item.due)}` : ''}</small></div>${homeworkNoteButton(item)}${homeworkPhotoPin(item)}</div>`; }
  function eventRow(event) { const date = localDate(event.date); return `<div class="event-row"><span class="agenda-date"><strong>${date.getDate()}</strong>${date.toLocaleDateString(locale(), { month: 'short' })}</span><span class="event-color" style="--event-color:${escape(event.color || data.profile.accent)}"></span><div><b>${escape(event.title)}</b><small>${event.time || t('All day')}${event.subjectId ? ` · ${escape(subjectName(subjectById(event.subjectId)))}` : ''}</small></div></div>`; }
  function renderDashboardWidgets(position) {
    const widgets = data.widgets.filter(widget => widget.position === position);
    if (!widgets.length) return '';
    return `<aside class="dashboard-widget-column widget-position-${position}">${widgets.map(renderDashboardWidget).join('')}</aside>`;
  }
  function normalizedWidgetType(type) { return ({ reminders: 'next-task', calendar: 'upcoming-event' }[type] || type); }
  function widgetTitle(type) {
    return ({ 'next-task': 'Next task', 'next-reminder': 'Next reminder', countdown: 'Test countdown', 'upcoming-event': 'Upcoming plans', stats: 'Study stats' })[normalizedWidgetType(type)] || 'Study widget';
  }
  function renderDashboardWidget(widget) {
    const open = data.homework.filter(item => !item.done).sort(sortHomework);
    const upcoming = data.events.filter(event => event.date >= todayISO()).sort((a,b) => `${a.date}${a.time || ''}`.localeCompare(`${b.date}${b.time || ''}`));
    const reminders = data.reminders.filter(item => !item.done).sort(sortReminders);
    const type = normalizedWidgetType(widget.type);
    let content = '';
    if (type === 'next-task') content = open.length ? homeworkRow(open[0]) : '<p class="muted">You are all caught up.</p>';
    if (type === 'next-reminder') content = reminders.length ? reminderRow(reminders[0], true) : '<p class="muted">No open reminders.</p>';
    if (type === 'upcoming-event') content = upcoming.length ? `<div class="event-list compact-list">${upcoming.slice(0,3).map(eventRow).join('')}</div>` : '<p class="muted">No upcoming events or tests.</p>';
    if (type === 'countdown') { const target = data.events.find(event => event.id === widget.targetId) || upcoming[0]; const days = target ? Math.max(0, Math.round((localDate(target.date) - localDate(todayISO())) / 86400000)) : null; content = target ? `<div class="widget-countdown"><strong>${days}</strong><span>${days === 1 ? 'day' : 'days'} to ${escape(target.title)}</span><small>${formatDate(target.date)}${target.time ? ` · ${target.time}` : ''}</small></div>` : '<p class="muted">Add a test or event to start a countdown.</p>'; }
    if (type === 'stats') content = `<div class="widget-stats"><span><b>${formatMinutes(data.stats.studyMinutes)}</b> focus time</span><span><b>${data.homework.filter(item => item.done).length}</b> tasks done</span><span><b>${data.timer.completedSessions || 0}</b> sessions</span></div>`;
    return `<article class="card dashboard-widget"><div class="card-head"><h2>${escape(widget.title || widgetTitle(type))}</h2><button class="mini-button" data-page="widgets" aria-label="Manage widgets">⚙</button></div>${content}</article>`;
  }
  function widgetItems(widget) {
    const subjectId = widget.subjectId || '';
    const matchesSubject = item => !subjectId || item.subjectId === subjectId;
    const homework = data.homework.filter(item => !item.done && matchesSubject(item)).sort(sortHomework);
    const events = data.events.filter(item => item.date >= todayISO() && matchesSubject(item)).sort((a, b) => `${a.date}${a.time || ''}`.localeCompare(`${b.date}${b.time || ''}`));
    const reminders = data.reminders.filter(item => !item.done).sort(sortReminders);
    return { homework, events, reminders, target: data.events.find(item => item.id === widget.targetId) || events[0] };
  }
  function widgetIcon(type) { return ({ 'next-task': '✓', 'next-reminder': '⊙', countdown: '◷', 'upcoming-event': '□', stats: '↗' })[normalizedWidgetType(type)] || '◫'; }
  function widgetPage(type) { return ({ 'next-task': 'homework', 'next-reminder': 'reminders', countdown: 'calendar', 'upcoming-event': 'calendar', stats: 'statistics' })[normalizedWidgetType(type)] || 'widgets'; }
  function renderFloatingWidget(widget) {
    const type = normalizedWidgetType(widget.type); const { homework, events, reminders, target } = widgetItems(widget);
    const subject = subjectById(widget.subjectId); const subjectLabel = subject ? ` · ${subjectName(subject)}` : '';
    const widgetDate = widget.date || '';
    let title = widget.title || widgetTitle(type); let primary = ''; let detail = '';
    if (type === 'next-task') { const item = homework[0]; primary = item ? countdownLabel(item.due) : 'No homework due'; detail = item ? item.title : 'You are all caught up'; }
    if (type === 'next-reminder') { const item = reminders[0]; primary = item ? countdownLabel(item.date) : 'No open reminders'; detail = item ? `${item.title}${item.time ? ` · ${item.time}` : ''}` : 'Nothing to remember'; }
    if (type === 'countdown') { const targetDate = widgetDate || target?.date; const days = targetDate ? Math.max(0, Math.round((localDate(targetDate) - localDate(todayISO())) / 86400000)) : null; primary = targetDate ? `${days} ${days === 1 ? 'day' : 'days'}` : 'No date set'; detail = target ? target.title : widgetDate ? formatDate(widgetDate) : 'Set a date or choose an event'; }
    if (type === 'upcoming-event') { const item = events[0]; primary = item ? item.title : 'Nothing upcoming'; detail = item?.date ? `${formatDate(item.date)}${item.time ? ` · ${item.time}` : ''}` : 'Your calendar is clear'; }
    if (type === 'stats') { primary = formatMinutes(data.stats.studyMinutes); detail = `${data.homework.filter(item => item.done).length} tasks completed`; }
    if (widgetDate && type !== 'countdown') detail = `${detail} · ${formatDate(widgetDate)}`;
    return `<article class="floating-widget"><button class="floating-widget-main" data-page="${widgetPage(type)}" aria-label="Open ${escape(title)}"><span class="floating-widget-icon">${widgetIcon(type)}</span><span class="floating-widget-copy"><small>${escape(title)}${escape(subjectLabel)}</small><b>${escape(primary)}</b><em>${escape(detail)}</em></span></button><button class="floating-widget-close" data-action="toggle-widget" data-id="${widget.id}" aria-label="Turn off ${escape(title)}">×</button></article>`;
  }
  function syncFloatingWidgets() {
    const root = el('#floatingWidgets'); if (!root) return;
    const widgets = data.widgets.filter(widget => widget.enabled !== false);
    const collapsed = widgets.length >= 3 && !ui.widgetsExpanded;
    root.classList.toggle('collapsed', collapsed);
    root.classList.toggle('expanded', widgets.length >= 3 && ui.widgetsExpanded);
    root.classList.toggle('timer-active', ui.timerActive && ui.page !== 'timer');
    if (collapsed) root.innerHTML = `<button class="floating-widget-summary" data-action="toggle-widget-stack" aria-label="View ${widgets.length} widgets"><span>◫</span><span><b>${widgets.length} Widgets</b><em>Press to view</em></span></button>`;
    else root.innerHTML = `${widgets.length >= 3 ? `<button class="floating-widget-stack-toggle" data-action="toggle-widget-stack">${widgets.length} Widgets · Hide</button>` : ''}${widgets.map(renderFloatingWidget).join('')}`;
    root.classList.toggle('hidden', !widgets.length);
  }

  /* homework */
  function sortHomework(a, b) {
    if (a.done !== b.done) return Number(a.done) - Number(b.done);
    return (a.due || '9999').localeCompare(b.due || '9999');
  }
  function renderHomework() {
    const filters = [['all', 'All'], ['active', 'To do'], ['done', 'Completed'], ['overdue', 'Overdue']];
    let items = [...data.homework];
    if (ui.homeworkFilter === 'active') items = items.filter(item => !item.done);
    if (ui.homeworkFilter === 'done') items = items.filter(item => item.done);
    if (ui.homeworkFilter === 'overdue') items = items.filter(item => !item.done && item.due && item.due < todayISO());
    return `${pageHeader('TASKS', 'Homework', 'Keep every assignment in one calm, organized place.', button('＋ Add homework', 'add-homework'))}
      <div class="filter-bar">${filters.map(([key, label]) => `<button class="filter-button ${ui.homeworkFilter === key ? 'active' : ''}" data-action="homework-filter" data-filter="${key}">${label}</button>`)}</div>
      <article class="card list-card">${items.length ? items.sort(sortHomework).map(item => `<div class="homework-row"><button class="check ${item.done ? 'done' : ''}" data-action="toggle-homework" data-id="${item.id}">✓</button><div class="homework-info"><b class="${item.done ? 'done' : ''}">${escape(item.title)}</b><div class="chips">${subjectChip(item.subjectId)}${item.description ? '<span class="chip">Details</span>' : ''}${homeworkNoteButton(item)}</div></div><div class="due ${!item.done && item.due && item.due < todayISO() ? 'overdue' : ''}">${relativeDate(item.due)}</div><span class="priority ${item.priority || 'medium'}">${escape(item.priority || 'medium')}</span>${homeworkPhotoPin(item)}<div class="row-menu"><button class="mini-button" data-action="edit-homework" data-id="${item.id}" aria-label="Edit">✎</button><button class="mini-button delete" data-action="delete-homework" data-id="${item.id}" aria-label="Delete">×</button></div></div>`).join('') : empty('No homework here', 'Try another filter or add a new assignment.', 'add-homework', 'Add homework')}</article>`;
  }

  /* reminders */
  function sortReminders(a, b) {
    if (a.done !== b.done) return Number(a.done) - Number(b.done);
    return `${a.date || '9999'}${a.time || ''}`.localeCompare(`${b.date || '9999'}${b.time || ''}`);
  }
  function reminderRepeatLabel(repeat) { return t(({ daily: 'Repeats daily', weekly: 'Repeats weekly', monthly: 'Repeats monthly' })[repeat] || ''); }
  function reminderScheduleLabel(item) { return `${item.date ? relativeDate(item.date) : t('No reminder date')}${item.time ? ` · ${timeLabel(item.time)}` : ''}${reminderRepeatLabel(item.repeat) ? ` · ${reminderRepeatLabel(item.repeat)}` : ''}`; }
  function daysTo(value) { return value ? Math.max(0, Math.round((localDate(value) - localDate(todayISO())) / 86400000)) : null; }
  function countdownLabel(value) { const days = daysTo(value); return days === null ? t('No date set') : `${days} ${t(days === 1 ? 'day' : 'days')}`; }
  function reminderRow(item, compact = false) {
    return `<div class="reminder-row ${compact ? 'compact-reminder' : ''}"><button class="check ${item.done ? 'done' : ''}" data-action="toggle-reminder" data-id="${item.id}" aria-label="Mark ${escape(item.title)} ${item.done ? 'incomplete' : 'complete'}">✓</button><div class="reminder-info"><b class="${item.done ? 'done' : ''}">${escape(item.title)}</b><small>${reminderScheduleLabel(item)}${item.note ? ` · ${escape(item.note)}` : ''}</small></div>${compact ? '' : `<div class="row-menu"><button class="mini-button" data-action="edit-reminder" data-id="${item.id}" aria-label="Edit reminder">✎</button><button class="mini-button delete" data-action="delete-reminder" data-id="${item.id}" aria-label="Delete reminder">×</button></div>`}</div>`;
  }
  function renderReminders() {
    const reminders = [...data.reminders].sort(sortReminders);
    const openCount = reminders.filter(item => !item.done).length;
    return `${pageHeader('DON’T FORGET', 'Reminders', 'Keep small but important things in view before they slip your mind.', button('＋ Add reminder', 'add-reminder'))}<section class="overview-grid"><article class="card"><span class="overview-label">OPEN REMINDERS</span><strong class="overview-number">${openCount}</strong><span class="overview-label">Still to remember</span></article><article class="card"><span class="overview-label">DUE TODAY</span><strong class="overview-number">${reminders.filter(item => !item.done && item.date === todayISO()).length}</strong><span class="overview-label">Worth a quick check</span></article><article class="card"><span class="overview-label">COMPLETED</span><strong class="overview-number">${reminders.filter(item => item.done).length}</strong><span class="overview-label">Already handled</span></article></section><article class="card reminder-list-card" style="margin-top:14px"><div class="card-head"><h2>All reminders</h2><span class="chip">${t('{count} open', { count: openCount })}</span></div>${reminders.length ? `<div class="reminder-list">${reminders.map(item => reminderRow(item)).join('')}</div>` : empty('Nothing to remember yet', 'Add a reminder for tasks, forms, deadlines, or anything else.', 'add-reminder', 'Add reminder')}</article>`;
  }

  /* calendar */
  function renderCalendar() {
    const month = ui.month;
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7));
    const dates = Array.from({ length: 42 }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); return date; });
    const selected = data.events.filter(event => event.date === ui.selectedDate).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    return `${pageHeader('PLAN AHEAD', 'Calendar', 'See your events and study deadlines at a glance.', button('＋ Add event', 'add-event'))}
      <section class="calendar-layout"><article class="card"><div class="card-head"><div class="calendar-controls"><button class="icon-button" data-action="calendar-previous" aria-label="Previous month">‹</button><button class="icon-button" data-action="calendar-next" aria-label="Next month">›</button></div><h2 class="calendar-title">${month.toLocaleDateString(locale(), { month: 'long', year: 'numeric' })}</h2><button class="text-button" data-action="calendar-today">Today</button></div><div class="weekdays"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div class="calendar-days">${dates.map(date => calendarDay(date, month)).join('')}</div></article>
      <aside class="card selected-date-card"><p class="eyebrow">SELECTED DATE</p><h3>${formatDate(ui.selectedDate, { weekday: 'long', month: 'long', day: 'numeric' })}</h3><div class="selected-events">${selected.length ? selected.map(event => `<div class="selected-event"><div class="row-menu" style="float:right"><button class="mini-button" data-action="edit-event" data-id="${event.id}">✎</button><button class="mini-button delete" data-action="delete-event" data-id="${event.id}">×</button></div><b>${escape(event.title)}</b><small>${event.time || 'All day'}${event.description ? ` · ${escape(event.description)}` : ''}</small></div>`).join('') : empty('Nothing planned', 'This day is free.', '', '')}</div>${button('＋ Event on this day', 'add-event', 'secondary full')}</aside></section>`;
  }
  function calendarDay(date, month) {
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const events = data.events.filter(event => event.date === iso).slice(0, 2);
    return `<button class="calendar-day ${date.getMonth() !== month.getMonth() ? 'outside' : ''} ${iso === todayISO() ? 'today' : ''} ${iso === ui.selectedDate ? 'selected' : ''}" data-action="select-date" data-date="${iso}"><span class="day-number">${date.getDate()}</span>${events.map(event => `<span class="day-event" style="--event-color:${escape(event.color || data.profile.accent)}">${escape(event.title)}</span>`).join('')}${data.events.filter(event => event.date === iso).length > 2 ? '<span class="day-event">More…</span>' : ''}</button>`;
  }

  /* notes, grades, subjects */
  function renderNotes() {
    if (ui.notesView === 'notebook') return renderNotebookDetail();
    if (ui.notesView === 'editor') return renderNoteEditor();
    if (ui.notesView === 'highlights') return renderNoteHighlights();
    const highlights = data.noteHighlights.length;
    const notebooks = [...data.notebooks].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    const looseNotes = data.notes.filter(note => !note.notebookId);
    return `${pageHeader(t('YOUR IDEAS'), t('Notebooks'), t('Keep themed notes together in colorful notebooks.'), `${button(t('＋ New notebook'), 'new-notebook')}${button(`${t('Marked text')} (${highlights})`, 'show-note-highlights', 'secondary')}`)}<section class="notebook-grid">${notebooks.map(renderNotebookCard).join('')}${looseNotes.length ? renderLooseNotesCard(looseNotes) : ''}${!notebooks.length && !looseNotes.length ? empty(t('Your notebook shelf is empty'), t('Create a notebook, give it a color, then start writing your first page.'), 'new-notebook', t('Create a notebook')) : ''}</section>`;
  }
  const notebookById = id => data.notebooks.find(notebook => notebook.id === id);
  const noteMarkup = content => /<\/?[a-z][\s\S]*>/i.test(String(content || '')) ? String(content || '') : escape(String(content || '')).replace(/\n/g, '<br>');
  function notePlainText(note) { const temporary = document.createElement('div'); temporary.innerHTML = noteMarkup(note.content); return temporary.textContent.replace(/\s+/g, ' ').trim(); }
  function notebookNoteCount(id) { return data.notes.filter(note => note.notebookId === id).length; }
  function notePageCount(count) { return t(count === 1 ? '{count} page' : '{count} pages', { count }); }
  function renderNotebookCard(notebook) {
    const count = notebookNoteCount(notebook.id);
    const subject = subjectById(notebook.subjectId);
    const homework = homeworkById(notebook.homeworkId);
    const detail = `${subject ? `${escape(subjectName(subject))} · ` : ''}${notePageCount(count)}${homework ? ` · ${escape(homework.title)}` : ''}`;
    const name = notebook.name || t('Untitled Notebook');
    return `<article class="notebook-card" style="--notebook-color:${escape(notebook.color || data.profile.accent)}"><button class="notebook-cover" data-action="open-notebook" data-id="${notebook.id}" aria-label="${escape(t('Open {name}', { name }))}"><span class="notebook-ring"></span><span class="notebook-cover-title">${escape(name)}</span><small>${detail}</small></button><div class="notebook-card-footer"><div><b>${escape(name)}</b><small>${detail}</small></div><div class="row-menu"><button class="mini-button" data-action="edit-notebook" data-id="${notebook.id}" aria-label="${t('Edit notebook')}">✎</button><button class="mini-button delete" data-action="delete-notebook" data-id="${notebook.id}" aria-label="${t('Delete notebook')}">×</button></div></div></article>`;
  }
  function renderLooseNotesCard(notes) {
    return `<article class="notebook-card loose-notebook-card"><button class="notebook-cover" data-action="open-loose-notes" aria-label="${t('Open loose notes')}"><span class="notebook-ring"></span><span class="notebook-cover-title">${t('Loose notes')}</span><small>${notePageCount(notes.length)}</small></button><div class="notebook-card-footer"><div><b>${t('Loose notes')}</b><small>${t('Move them into a notebook anytime')}</small></div></div></article>`;
  }
  function renderNotebookDetail() {
    const notebook = notebookById(ui.activeNotebookId);
    if (!notebook && ui.activeNotebookId) { ui.notesView = 'library'; return renderNotes(); }
    const notes = data.notes.filter(note => (notebook ? note.notebookId === notebook.id : !note.notebookId)).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    const name = notebook ? (notebook.name || t('Untitled Notebook')) : t('Loose notes');
    const color = notebook?.color || '#64748b';
    const subject = subjectById(notebook?.subjectId);
    const homework = homeworkById(notebook?.homeworkId);
    return `<section class="notebook-detail" style="--notebook-color:${escape(color)}"><div class="notebook-detail-head"><button class="text-button" data-action="back-notes-library">${t('← All notebooks')}</button><div class="notebook-detail-actions">${button(t('Marked text'), 'show-note-highlights', 'secondary')}${button(t('＋ New page'), 'new-notebook-note')}</div></div><div class="notebook-banner"><span class="notebook-ring"></span><div><p class="eyebrow">${t(notebook ? 'NOTEBOOK' : 'UNFILED')}</p><h1>${escape(name)}</h1><p>${subject ? `${escape(subjectName(subject))} · ` : ''}${notePageCount(notes.length)}${homework ? ` · ${escape(t('Pinned to {name}', { name: homework.title }))}` : ''} · ${t(notebook ? 'Color-coded for your theme' : 'Choose a notebook when you edit a page')}</p></div>${notebook ? `<button class="mini-button" data-action="edit-notebook" data-id="${notebook.id}" aria-label="${t('Edit notebook')}">✎</button>` : ''}</div><section class="note-page-grid">${notes.length ? notes.map(renderNotePageCard).join('') : empty(t('No pages yet'), t('Create your first A4-style page for this notebook.'), 'new-notebook-note', t('New page'))}</section></section>`;
  }
  function renderNotePageCard(note) {
    const notebook = notebookById(note.notebookId);
    const preview = notePlainText(note) || t('Blank page');
    return `<article class="note-page-card"><button class="note-page-open" data-action="open-note-editor" data-id="${note.id}"><span class="note-page-lines"></span><b>${escape(note.title || t('Untitled note'))}</b><p>${escape(preview)}</p></button><footer>${subjectChip(note.subjectId)}${homeworkChip(note.homeworkId)}<span>${new Date(note.updatedAt || Date.now()).toLocaleDateString(locale())}</span><div class="row-menu"><button class="mini-button" data-action="open-note-editor" data-id="${note.id}" aria-label="${t('Edit note')}">✎</button><button class="mini-button delete" data-action="delete-rich-note" data-id="${note.id}" aria-label="${t('Delete note')}">×</button></div></footer>${notebook ? `<i style="--note-color:${escape(notebook.color)}"></i>` : ''}</article>`;
  }
  function notebookSelectOptions(selected = '') { return `<option value="">${t('Loose notes')}</option>${data.notebooks.map(notebook => `<option value="${notebook.id}" ${notebook.id === selected ? 'selected' : ''}>${escape(notebook.name)}</option>`).join('')}`; }
  function renderNoteEditor() {
    const note = data.notes.find(entry => entry.id === ui.activeNoteId) || ui.noteDraft;
    if (!note) { ui.notesView = 'library'; return renderNotes(); }
    const notebook = notebookById(note.notebookId);
    const highlightCount = data.noteHighlights.filter(highlight => highlight.noteId === note.id).length;
    const activeTool = ui.noteTool || 'text';
    return `<section class="rich-note-editor"><div class="rich-note-editor-head"><button class="text-button" data-action="exit-note-editor">← ${notebook ? escape(notebook.name || t('Untitled Notebook')) : t('Notes')}</button><div class="rich-note-editor-actions"><button class="marked-text-tab" data-action="show-note-highlights">▰ ${t('Marked text')} <b id="editorHighlightCount">${highlightCount}</b></button><button class="button secondary" data-action="save-rich-note">${t('Save')}</button></div></div><div class="note-meta-controls"><input id="noteEditorTitle" class="note-title-input" value="${escape(note.title || '')}" maxlength="100" placeholder="${t('Untitled note')}"><select id="noteEditorNotebook" class="input">${notebookSelectOptions(note.notebookId)}</select><select id="noteEditorSubject" class="input">${subjectOptions(note.subjectId)}</select><select id="noteEditorHomework" class="input" aria-label="${t('Homework (optional)')}">${homeworkOptions(note.homeworkId)}</select></div><div class="word-toolbar" role="toolbar" aria-label="${t('Note editing tools')}"><button type="button" class="${activeTool === 'text' ? 'active' : ''}" data-action="note-draw-tool" data-tool="text" title="${t('Type')}">T</button><button type="button" data-action="editor-command" data-command="bold" title="${t('Bold')}"><b>B</b></button><button type="button" data-action="editor-command" data-command="italic" title="${t('Italic')}"><i>I</i></button><button type="button" data-action="editor-command" data-command="underline" title="${t('Underline')}"><u>U</u></button><button type="button" data-action="editor-command" data-command="formatBlock" data-value="h2" title="${t('Heading')}">H</button><button type="button" data-action="editor-command" data-command="insertUnorderedList" title="${t('Bullet list')}">•≡</button><button type="button" data-action="editor-command" data-command="insertOrderedList" title="${t('Numbered list')}">1≡</button><span></span><button type="button" class="marker-tool" data-action="editor-marker" title="${t('Mark selected text')}">▰ ${t('Marked text')}</button><button type="button" data-action="editor-photo" title="${t('Add image')}">▧ ${t('Add image')}</button><button type="button" data-action="editor-command" data-command="undo" title="${t('Undo')}">↶</button><span></span><button type="button" class="${activeTool === 'draw' ? 'active' : ''}" data-action="note-draw-tool" data-tool="draw" title="${t('Draw')}">✎ ${t('Draw')}</button><button type="button" class="${activeTool === 'lasso' ? 'active' : ''}" data-action="note-draw-tool" data-tool="lasso" title="${t('Lasso select and move')}">⌁ ${t('Lasso')}</button><button id="copyDrawingButton" type="button" data-action="copy-lasso-drawing" title="${t('Copy selection')}" disabled>⧉ ${t('Copy')}</button><button id="pasteDrawingButton" type="button" data-action="paste-lasso-drawing" title="${t('Paste drawing')}" ${ui.noteDrawingClipboard?.length ? '' : 'disabled'}>↳ ${t('Paste')}</button><select id="noteBrushSelect" class="drawing-control" aria-label="${t('Brush')}"><option value="pen" ${ui.noteBrush === 'pen' ? 'selected' : ''}>${t('Pen')}</option><option value="pencil" ${ui.noteBrush === 'pencil' ? 'selected' : ''}>${t('Pencil')}</option><option value="highlighter" ${ui.noteBrush === 'highlighter' ? 'selected' : ''}>${t('Highlighter')}</option><option value="marker" ${ui.noteBrush === 'marker' ? 'selected' : ''}>${t('Marker')}</option><option value="watercolor" ${ui.noteBrush === 'watercolor' ? 'selected' : ''}>${t('Watercolor')}</option><option value="eraser" ${ui.noteBrush === 'eraser' ? 'selected' : ''}>${t('Eraser')}</option></select><input id="noteDrawColor" class="drawing-color" type="color" value="${escape(ui.noteDrawColor || '#25223a')}" aria-label="${t('Drawing color')}"><label class="drawing-width" title="${t('Thickness')}"><span>◒</span><input id="noteDrawWidth" type="range" min="1" max="18" value="${clamp(Number(ui.noteDrawWidth) || 4, 1, 18)}" aria-label="${t('Thickness')}"></label><button type="button" data-action="clear-note-drawing" title="${t('Clear drawing')}">⌫</button></div><article id="notePaper" class="a4-paper note-paper-shell"><div id="noteEditor" class="note-editor-surface" contenteditable="true" spellcheck="true" data-placeholder="${t('Start writing your note…')}">${noteMarkup(note.content)}</div><canvas id="noteDrawingCanvas" class="note-drawing-canvas" aria-label="${t('Drawing canvas')}"></canvas></article><p id="noteEditorHint" class="note-editor-hint">${t('Use Draw with your finger, stylus, or Apple Pencil. Choose Lasso to select drawings, then drag them, change their color, thickness, or brush.')}</p></section>`;
  }
  function renderNoteHighlights() {
    const highlights = [...data.noteHighlights].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return `<section class="note-highlights-page"><div class="notebook-detail-head"><button class="text-button" data-action="back-to-notes">${t('← Back to notes')}</button>${button(t('＋ New notebook'), 'new-notebook', 'secondary')}</div>${pageHeader(t('MARKED TEXT'), t('Your markings'), t('Every passage you highlight is saved here for quick revision.'))}<section class="highlight-list">${highlights.length ? highlights.map(highlight => `<article class="highlight-card"><span class="highlight-swatch"></span><div><b>${escape(highlight.noteTitle || t('Untitled note'))}</b><p>“${escape(highlight.text)}”</p><small>${new Date(highlight.createdAt || Date.now()).toLocaleDateString(locale())}</small></div><div class="row-menu"><button class="mini-button" data-action="open-note-editor" data-id="${highlight.noteId}" aria-label="${t('Open note')}">↗</button><button class="mini-button delete" data-action="delete-note-highlight" data-id="${highlight.id}" aria-label="${t('Delete marking')}">×</button></div></article>`).join('') : empty(t('No marked text yet'), t('Select text in a note and use the Mark tool to save it here.'), '', '')}</section></section>`;
  }
  function renderGrades() {
    const values = data.grades.map(gradeNumeric).filter(value => Number.isFinite(value));
    const average = values.length ? values.reduce((total, value) => total + value, 0) / values.length : null;
    const best = values.length ? (data.profile.gradeSystem === 'numeric' ? Math.min(...values) : Math.max(...values)) : null;
    return `${pageHeader('ACADEMICS', 'Grades', 'Track your results and notice patterns over time.', button('＋ Add grade', 'add-grade'))}<section class="overview-grid"><article class="card"><span class="overview-label">OVERALL AVERAGE</span><strong class="overview-number">${average === null ? '—' : displayGrade(average)}</strong><span class="overview-label">${gradeSystemLabel()}</span></article><article class="card"><span class="overview-label">RECORDED GRADES</span><strong class="overview-number">${data.grades.length}</strong><span class="overview-label">Across all subjects</span></article><article class="card"><span class="overview-label">BEST RESULT</span><strong class="overview-number">${best === null ? '—' : displayGrade(best)}</strong><span class="overview-label">Your personal high point</span></article></section><article class="card" style="margin-top:14px"><div class="card-head"><h2>Grade history</h2></div>${data.grades.length ? `<div class="grade-list">${[...data.grades].sort((a,b) => (b.date || '').localeCompare(a.date || '')).map(grade => `<div class="grade-row"><span class="subject-icon" style="--subject-color:${subjectById(grade.subjectId)?.color || data.profile.accent}">${escape(subjectById(grade.subjectId)?.icon || '•')}</span><div class="grade-info"><b>${escape(grade.title)}</b><small>${escape(subjectName(subjectById(grade.subjectId)) || t('No subject'))} · ${grade.date ? formatDate(grade.date) : t('No date')}</small></div><strong class="grade-value">${escape(grade.value)}</strong><div class="row-menu"><button class="mini-button" data-action="edit-grade" data-id="${grade.id}">✎</button><button class="mini-button delete" data-action="delete-grade" data-id="${grade.id}">×</button></div></div>`).join('')}</div>` : empty('No grades recorded', 'Add a result to start seeing your average.', 'add-grade', 'Add grade')}</article>`;
  }
  function gradeNumeric(grade) {
    const value = String(grade.value).trim().toUpperCase();
    if (data.profile.gradeSystem === 'letter') return ({ A: 100, B: 85, C: 70, D: 55, E: 40, F: 20 }[value] ?? NaN);
    return Number(value);
  }
  function displayGrade(value) {
    if (data.profile.gradeSystem === 'letter') return value >= 92 ? 'A' : value >= 78 ? 'B' : value >= 63 ? 'C' : value >= 48 ? 'D' : value >= 32 ? 'E' : 'F';
    return data.profile.gradeSystem === 'percentage' ? `${Math.round(value)}%` : value.toFixed(1).replace('.0', '');
  }
  function gradeSystemLabel() { return t({ numeric: 'Number scale', percentage: 'Percentage', letter: 'Letter grades' }[data.profile.gradeSystem] || 'Number scale'); }
  function renderSubjects() {
    return `${pageHeader('ORGANIZE', 'Subjects', 'Create reusable subjects for homework, notes, grades, and events.', button('＋ Add subject', 'add-subject'))}<section class="subject-grid">${data.subjects.length ? data.subjects.map(subject => { const count = data.homework.filter(item => item.subjectId === subject.id && !item.done).length; return `<article class="card subject-card"><span class="subject-icon" style="--subject-color:${subject.color}">${escape(subject.icon || '•')}</span><div><h3>${escape(subjectName(subject))}</h3><small>${t('{count} open tasks', { count })}</small></div><div class="row-menu"><button class="mini-button" data-action="edit-subject" data-id="${subject.id}">✎</button><button class="mini-button delete" data-action="delete-subject" data-id="${subject.id}">×</button></div></article>`; }).join('') : empty('No subjects yet', 'Add a subject to organize your work.', 'add-subject', 'Add subject')}</section>`;
  }

  /* goals, friends, timer, statistics */
  function isBadGrade(grade) {
    const value = gradeNumeric(grade);
    if (!Number.isFinite(value)) return false;
    if (data.profile.gradeSystem === 'numeric') return value >= 4;
    if (data.profile.gradeSystem === 'percentage') return value < 60;
    return value <= 55;
  }
  function bananaHealth() {
    const overdueHomework = data.homework.filter(item => !item.done && item.due && item.due < todayISO());
    const overdueGoals = data.goals.filter(goal => Number(goal.progress) < 100 && goal.targetDate && goal.targetDate < todayISO());
    const badGrades = data.grades.filter(isBadGrade);
    const issues = [
      ...overdueHomework.map(item => ({ kind: 'homework', id: item.id, title: item.title, action: 'toggle-homework', label: 'Finish homework' })),
      ...overdueGoals.map(goal => ({ kind: 'goal', id: goal.id, title: goal.title, action: 'goal-complete', label: 'Complete goal' })),
      ...badGrades.map(grade => ({ kind: 'grade', id: grade.id, title: grade.title, action: 'edit-grade', label: 'Review grade' }))
    ];
    const rot = clamp(overdueHomework.length * 22 + overdueGoals.length * 20 + badGrades.length * 12, 0, 100);
    const stage = rot === 0 ? 'fresh' : rot < 35 ? 'speckled' : rot < 70 ? 'bruised' : 'rotten';
    return { issues, rot, stage };
  }
  function renderGoalHealth() {
    const health = bananaHealth();
    const freshness = 100 - health.rot;
    const status = health.stage === 'fresh' ? 'Fresh and ready' : health.stage === 'speckled' ? 'A few spots need attention' : health.stage === 'bruised' ? 'Time for a reset' : 'Needs attention now';
    const summary = health.issues.length
      ? 'Finish overdue homework and goals to freshen your banana. Review any weak grades to keep it healthy.'
      : 'Everything is up to date. Keep this rhythm going and your banana will stay fresh.';
    const actionButtons = health.issues.slice(0, 4).map(issue => `<button class="banana-health-action ${issue.kind}" data-action="${issue.action}" data-id="${escape(issue.id)}" title="${escape(issue.title)}"><span>${issue.kind === 'grade' ? '↗' : '✓'}</span><b>${issue.label}</b><small>${escape(issue.title)}</small></button>`).join('');
    const remaining = health.issues.length - 4;
    return `<article class="card goal-health goal-health-${health.stage}" style="--banana-rot:${(health.rot / 100).toFixed(2)}"><div class="goal-health-copy"><p class="eyebrow">GOAL HEALTH</p><h2>${status}</h2><p>${summary}</p><div class="banana-health-meter"><div><span>Freshness</span><b>${freshness}%</b></div><div class="progress" style="--progress:${freshness}%"><span></span></div></div>${health.issues.length ? `<div class="banana-health-actions" aria-label="Items that affect banana health">${actionButtons}${remaining > 0 ? `<span class="banana-health-more">+${remaining} more to review</span>` : ''}</div>` : '<span class="banana-health-clear">✓ No overdue work or weak grades</span>'}</div><div class="goal-banana-stage" role="img" aria-label="${escape(`Banana freshness is ${freshness} percent: ${status}`)}"><svg class="goal-banana-art" viewBox="0 0 560 280" focusable="false" aria-hidden="true"><defs><linearGradient id="goalBananaFresh" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fff59a"/><stop offset=".32" stop-color="#ffd847"/><stop offset="1" stop-color="#f0aa12"/></linearGradient><linearGradient id="goalBananaBruised" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#e6cb63"/><stop offset=".42" stop-color="#a77924"/><stop offset="1" stop-color="#6d451d"/></linearGradient><linearGradient id="goalBananaRotten" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#997936"/><stop offset=".48" stop-color="#5f4023"/><stop offset="1" stop-color="#38271d"/></linearGradient></defs><path class="goal-banana-shadow" d="M58 95C119 178 227 208 335 180c73-19 126-62 158-124l19 11c-27 78-92 137-174 160-114 33-235-6-294-96Z"/><path class="goal-banana-stem" d="m471 56 20-35 24 10-18 37"/><path class="goal-banana-skin" d="M55 81c46 69 137 113 231 105 86-7 159-56 192-129l29 13c-24 84-93 153-182 180-109 33-227-2-286-91-15-23-24-50-27-79Z"/><path class="goal-banana-highlight" d="M85 94c43 61 126 93 204 87 56-4 109-28 145-68-42 53-105 83-177 86-70 2-134-27-172-79Z"/><g class="goal-banana-spots"><circle cx="188" cy="164" r="13"/><circle cx="263" cy="184" r="10"/><circle cx="342" cy="159" r="16"/><circle cx="406" cy="124" r="9"/><circle cx="123" cy="131" r="7"/></g></svg></div></article>`;
  }
  function renderGoals() {
    return `${pageHeader('MILESTONES', 'Goals', 'Turn the things you want to achieve into visible progress.', button('＋ Add goal', 'add-goal'))}${renderGoalHealth()}<article class="card goal-list-card"><div class="card-head"><h2>In progress</h2></div>${data.goals.length ? `<div class="goal-list">${data.goals.map(goal => `<div class="goal-row"><button class="check ${Number(goal.progress) >= 100 ? 'done' : ''}" data-action="goal-complete" data-id="${goal.id}">✓</button><div><b>${escape(goal.title)}</b><small>${goal.targetDate ? t('Target {date}', { date: formatDate(goal.targetDate) }) : t('No target date')}</small><div class="progress" style="--progress:${clamp(goal.progress,0,100)}%"><span></span></div></div><span class="goal-percent">${clamp(goal.progress,0,100)}%</span><div class="row-menu"><button class="mini-button" data-action="edit-goal" data-id="${goal.id}">✎</button><button class="mini-button delete" data-action="delete-goal" data-id="${goal.id}">×</button></div></div>`).join('')}</div>` : empty('Set your first goal', 'A goal can be as small as revising one chapter.', 'add-goal', 'Add goal')}</article>`;
  }
  function renderFriends() {
    const friendsById = new Map(data.friends.map(friend => [friend.id, friend]));
    return `${pageHeader('COMMUNITY', 'Find study partners', 'Discover people using StudyFlow and send a friend request to study together.')}<section class="friend-discovery"><article class="card"><div class="card-head"><div><h2>People to connect with</h2><p class="muted">This local demo directory shows how discovery and requests work.</p></div><span class="chip">${DISCOVERABLE_PEOPLE.length} students</span></div><div class="friend-list">${DISCOVERABLE_PEOPLE.map(person => { const request = friendsById.get(person.id); const status = request?.status || ''; return `<div class="friend-row"><span class="friend-avatar" style="--friend-color:${person.color}">${escape(initials(person.name))}</span><div><b>${escape(person.name)}</b><small>${escape(person.activity)}</small></div>${status === 'requested' ? `<button class="button secondary" data-action="cancel-request" data-id="${person.id}">Request sent</button>` : status === 'accepted' ? `<span class="chip">Friends</span>` : `<button class="button primary" data-action="send-request" data-id="${person.id}">Add friend</button>`}</div>`; }).join('')}</div></article><article class="card"><div class="card-head"><h2>Your connections</h2><span class="chip">${data.friends.filter(friend => friend.status === 'accepted').length} friends</span></div>${data.friends.length ? `<div class="friend-list">${data.friends.map(friend => `<div class="friend-row"><span class="friend-avatar" style="--friend-color:${friend.color || data.profile.accent}">${escape(initials(friend.name))}</span><div><b>${escape(friend.name)}</b><small>${friend.status === 'requested' ? 'Friend request pending' : 'Connected on StudyFlow'}</small></div><button class="mini-button delete" data-action="cancel-request" data-id="${friend.id}" aria-label="Remove request">×</button></div>`).join('')}</div>` : empty('No requests yet', 'Send a request to someone in the directory.', '', '')}</article></section>`;
  }
  function renderWidgets() {
    const options = [
      ['next-task', '✓', 'Next task', 'Keep your closest homework task in sight'], ['next-reminder', '⊙', 'Next reminder', 'See the next thing you need to remember'],
      ['countdown', '◷', 'Test countdown', 'Count the days to any test or event'], ['upcoming-event', '□', 'Upcoming plans', 'Show your next events and tests'], ['stats', '↗', 'Study stats', 'Display focused time and completed work']
    ];
    const activeCount = data.widgets.filter(widget => widget.enabled !== false).length;
    return `${pageHeader('CUSTOMIZE', 'Widgets', 'Create small widgets that stay visible across StudyFlow until you turn them off.', button('＋ Create widget', 'create-widget'))}<section class="widget-option-grid">${options.map(([type, icon, title, description]) => `<article class="card widget-option"><span class="stat-icon">${icon}</span><h2>${title}</h2><p class="muted">${description}</p><button class="button secondary full" data-action="add-widget" data-widget="${type}">Customize</button></article>`).join('')}</section><article class="card" style="margin-top:14px"><div class="card-head"><div><h2>Your screen widgets</h2><p class="muted">Enabled widgets stay visible throughout the app. Turn one off here or use its × button.</p></div><span class="chip">${t('{count} on', { count: activeCount })}</span></div>${data.widgets.length ? `<div class="widget-manager-list">${data.widgets.map(widget => `<div class="widget-manager-row"><div><b>${escape(widget.title || widgetTitle(widget.type))}</b><small>${escape(widgetTitle(widget.type))}${widget.subjectId ? ` · ${escape(subjectName(subjectById(widget.subjectId)) || t('Subject'))}` : ''} · ${widget.enabled === false ? t('off') : t('on screen')}</small></div><div class="widget-position-buttons"><button class="mini-button" data-action="edit-widget" data-id="${widget.id}" aria-label="Edit widget">✎</button><button class="filter-button ${widget.enabled === false ? '' : 'active'}" data-action="toggle-widget" data-id="${widget.id}">${widget.enabled === false ? 'Turn on' : 'Turn off'}</button><button class="mini-button delete" data-action="delete-widget" data-id="${widget.id}" aria-label="Remove widget">×</button></div></div>`).join('')}</div>` : empty('No screen widgets yet', 'Choose a widget above and tailor it to what you need.', 'create-widget', 'Create widget')}</article>`;
  }
  function renderTimer() {
    const modes = [['study','Study'], ['break','Break'], ['longBreak','Long break'], ['custom','Custom']];
    return `${pageHeader('FOCUS', 'Study Timer', 'Choose a rhythm that works for you, then give it your full attention.')}<section class="timer-layout"><article class="card timer-card"><div><div class="timer-mode-row">${modes.map(([id,label]) => `<button class="timer-mode ${ui.timerMode === id ? 'active' : ''}" data-action="timer-mode" data-mode="${id}">${label}</button>`).join('')}</div><div class="timer-ring"><span id="timerDisplay" class="timer-time">25:00</span></div><div class="timer-controls"><button id="timerStart" class="button primary" data-action="timer-start">Start</button><button class="button secondary" data-action="timer-reset">Reset</button><button class="button secondary" data-action="timer-skip">Skip</button></div></div></article><aside class="card timer-settings"><h2>Timer settings</h2><p class="muted">Choose the length of every focus mode.</p>${timerSetting('study','Study minutes')}${timerSetting('break','Break minutes')}${timerSetting('longBreak','Long break minutes')}${timerSetting('custom','Custom minutes')}<button class="button secondary full" data-action="save-timer-settings">Save settings</button></aside></section>`;
  }
  function timerSetting(key, label) { return `<label class="field-label" for="timer-${key}">${label}</label><input id="timer-${key}" class="input" type="number" min="1" max="240" value="${Number(data.timer[key]) || 1}">`; }
  function renderStatistics() {
    const days = Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - (6 - index)); const iso = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; return { label: date.toLocaleDateString(locale(), { weekday: 'short' }), minutes: Number(data.stats.dailyStudy[iso] || 0) }; });
    const max = Math.max(30, ...days.map(day => day.minutes));
    const rate = data.homework.length ? Math.round(data.homework.filter(item => item.done).length / data.homework.length * 100) : 0;
    return `${pageHeader('YOUR PROGRESS', 'Statistics', 'Small habits leave a useful trail.')}<section class="overview-grid"><article class="card"><span class="overview-label">TOTAL FOCUS</span><strong class="overview-number">${formatMinutes(data.stats.studyMinutes)}</strong><span class="overview-label">All recorded sessions</span></article><article class="card"><span class="overview-label">TASK COMPLETION</span><strong class="overview-number">${rate}%</strong><span class="overview-label">${t('{count} tasks complete', { count: data.homework.filter(item => item.done).length })}</span></article><article class="card"><span class="overview-label">FOCUS SESSIONS</span><strong class="overview-number">${data.timer.completedSessions || 0}</strong><span class="overview-label">Keep the streak alive</span></article></section><article class="card" style="margin-top:14px"><div class="card-head"><h2>Focus time this week</h2><span class="chip">Minutes</span></div><div class="stat-bars">${days.map(day => `<div class="bar-row"><span>${day.label}</span><div class="progress" style="--progress:${Math.round(day.minutes / max * 100)}%"><span></span></div><b>${day.minutes}m</b></div>`).join('')}</div></article>`;
  }
  function renderSettings() {
    return `${pageHeader('PREFERENCES', 'Settings', 'Every change on this page saves automatically.')}<section class="settings-layout"><article class="card settings-card"><h2>Appearance</h2><p>Changes appear immediately, so you can see what feels right.</p><div class="setting-row"><div><b>Theme</b><small>Light, dark, or match your device</small></div><select id="themeSelect" class="input" style="max-width:120px"><option value="light" ${data.profile.theme === 'light' ? 'selected' : ''}>Light</option><option value="dark" ${data.profile.theme === 'dark' ? 'selected' : ''}>Dark</option><option value="system" ${data.profile.theme === 'system' ? 'selected' : ''}>System</option></select></div><div class="setting-row"><div><b>Accent color</b><small>Applied across the whole app</small></div></div><div id="settingsAccents" class="accent-row"></div><div class="setting-row"><div><b>Clock format</b><small>Dashboard local time</small></div><select id="clockFormatSelect" class="input" style="max-width:120px"><option value="24" ${data.profile.clockFormat === '24' ? 'selected' : ''}>24-hour</option><option value="12" ${data.profile.clockFormat === '12' ? 'selected' : ''}>12-hour</option></select></div></article><article class="card settings-card language-settings-card"><h2>Language preference</h2><p>Choose the language used throughout BananaBoard.</p><label class="field-label" for="languageSelect">Language</label><select id="languageSelect" class="input">${languageOptions()}</select><p class="help">Changes are applied after a short setup moment.</p></article><article class="card settings-card"><h2>Profile & grades</h2><p>Your profile and grade preferences are saved securely to your account.</p><label class="field-label" for="profileNameInput">Display name</label><input id="profileNameInput" class="input" maxlength="40" value="${escape(data.profile.name)}"><label class="field-label" for="settingsPhoto">Profile picture</label><input id="settingsPhoto" class="input photo-input" type="file" accept="image/*"><label class="field-label" for="gradeSystemSelect">Grade system</label><select id="gradeSystemSelect" class="input"><option value="numeric" ${data.profile.gradeSystem === 'numeric' ? 'selected' : ''}>Number scale (1 is best · 6 is worst)</option><option value="percentage" ${data.profile.gradeSystem === 'percentage' ? 'selected' : ''}>Percentage (0–100%)</option><option value="letter" ${data.profile.gradeSystem === 'letter' ? 'selected' : ''}>Letter (A–F)</option></select><p class="help">Changes save automatically.</p></article><article class="card settings-card"><h2>Account</h2><p>Change your email address, display name, or password.</p>${button('Manage account', 'manage-account', 'secondary full')}<button class="button danger full account-logout" data-action="log-out">Log out</button></article><article class="card settings-card"><h2>Backup</h2><p>Export your dashboard to a private JSON file, or import it later in the same account.</p><div class="setting-row"><div><b>Export data</b><small>Download all BananaBoard data</small></div>${button('Export','export-data','secondary')}</div><div class="setting-row"><div><b>Import data</b><small>Replace data from a previous export</small></div>${button('Import','import-data','secondary')}</div></article><article class="card settings-card"><h2>Reset</h2><p>Clear this account’s board. This cannot be undone.</p>${button('Clear all data','reset-data','danger full')}</article></section>`;
  }
  function renderSearch() {
    const query = ui.searchQuery?.trim().toLowerCase() || '';
    const haystack = [
      ...data.homework.map(item => ({ type: 'Homework', title: item.title, id: item.id, page: 'homework' })),
      ...data.reminders.map(item => ({ type: 'Reminder', title: item.title, id: item.id, page: 'reminders' })),
      ...data.notes.map(item => ({ type: 'Note', title: item.title, id: item.id, page: 'notes' })),
      ...data.events.map(item => ({ type: 'Event', title: item.title, id: item.id, page: 'calendar' })),
      ...data.subjects.map(item => ({ type: 'Subject', title: item.name, id: item.id, page: 'subjects' }))
    ].filter(item => item.title.toLowerCase().includes(query));
    return `${pageHeader('SEARCH', `Results for “${escape(ui.searchQuery || '')}”`, 'Choose an item to go to its section.')}<article class="card list-card">${haystack.length ? haystack.map(item => `<button class="nav-link" data-page="${item.page}"><span>${item.type === 'Homework' ? '✓' : item.type === 'Reminder' ? '⊙' : item.type === 'Note' ? '▤' : item.type === 'Event' ? '□' : '▦'}</span><span><b>${escape(item.title)}</b><small>${item.type}</small></span></button>`).join('') : empty('No matches', 'Try another word or phrase.', '', '')}</article>`;
  }

  /* modal forms */
  function subjectOptions(selected = '') { return `<option value="">${t('No subject')}</option>${data.subjects.map(subject => `<option value="${subject.id}" ${subject.id === selected ? 'selected' : ''}>${escape(subjectName(subject))}</option>`).join('')}`; }
  function dateLabel(value) { return value ? formatDate(value, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : t('Add a date'); }
  function dateField(name, label, value = '', wide = false, required = false) { return `<div class="field-label ${wide ? 'wide' : ''}"><span class="field-control-title">${label}</span><input type="hidden" name="${name}" value="${escape(value)}"><button class="value-picker ${value ? 'selected' : ''}" type="button" data-action="date-picker" data-target="${name}" data-date-target="${name}" ${required ? 'data-required-date="true"' : ''}><span>${dateLabel(value)}</span><b>⌄</b></button></div>`; }
  function parseTime(value) { const [hours = '0', minutes = '0'] = String(value || '00:00').split(':'); return { hours: clamp(Number(hours) || 0, 0, 23), minutes: clamp(Number(minutes) || 0, 0, 59) }; }
  function timeLabel(value) { if (!value) return t('Add a time'); const { hours, minutes } = parseTime(value); if (data.profile.clockFormat === '12') { const hour = hours % 12 || 12; return `${hour}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`; } return `${String(hours || 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; }
  function timeField(name, label, value = '') { return `<div class="field-label"><span class="field-control-title">${label} <span class="help">(optional)</span></span><input type="hidden" name="${name}" value="${escape(value)}"><button class="value-picker ${value ? 'selected' : ''}" type="button" data-action="time-picker" data-target="${name}" data-time-target="${name}"><span>${timeLabel(value)}</span><b>⌄</b></button></div>`; }
  function iconField(value = '•') { return `<div class="field-label"><span class="field-control-title">Icon</span><input type="hidden" name="icon" value="${escape(value)}"><button class="value-picker icon-value-picker selected" type="button" data-action="icon-picker" data-icon-target="icon"><span class="icon-value">${escape(value)}</span><span>${escape(value)}</span><b>⌄</b></button></div>`; }
  function openModal(title, body, formName, submitText = 'Save') {
    modalRoot.innerHTML = `<div class="modal-backdrop"><form class="modal" data-form="${formName}"><div class="modal-head"><h2>${title}</h2><button class="icon-button" type="button" data-action="close-modal" aria-label="Close">×</button></div>${body}<div id="datePickerHolder"></div><div id="timePickerHolder"></div><div id="iconPickerHolder"></div><div class="modal-actions"><button class="button secondary" type="button" data-action="close-modal">Cancel</button><button class="button primary" type="submit">${submitText}</button></div></form></div>`;
    localizeTree(modalRoot);
    const firstInput = el('input:not([type="hidden"]), textarea, select', modalRoot); if (firstInput) window.setTimeout(() => firstInput.focus(), 40);
  }
  async function openAccountModal() {
    try {
      const response = await fetch('/api/me', { credentials: 'same-origin', cache: 'no-store' });
      if (response.status === 401) return window.location.assign('/auth');
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not load your account.');
      openModal('Account', `<p class="help">Enter your current password only when changing your email address or password.</p><div class="form-grid"><label class="field-label wide">Display name<input class="input" name="displayName" required maxlength="40" value="${escape(payload.user.displayName)}"></label><label class="field-label wide">Email address<input class="input" name="email" type="email" required maxlength="320" value="${escape(payload.user.email)}"></label><label class="field-label wide">Current password<input class="input" name="currentPassword" type="password" autocomplete="current-password"></label><label class="field-label wide">New password <span class="help">(optional)</span><input class="input" name="newPassword" type="password" autocomplete="new-password" minlength="12"><small class="help">Use at least 12 characters for a new password.</small></label></div>`, 'account', 'Save account');
    } catch (error) { toast(error.message || 'Could not load your account.', 'error'); }
  }
  async function saveAccount(payload) {
    const response = await fetch('/api/account', { method: 'PUT', credentials: 'same-origin', headers: { 'content-type': 'application/json', 'x-csrf-token': csrfToken() }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));
    if (response.status === 401) return window.location.assign('/auth');
    if (!response.ok) throw new Error(result.error || 'Could not update your account.');
    data.profile.name = result.user.displayName;
    save(); closeModal(); renderNav(); renderPage(); toast('Account updated.', 'success');
  }
  async function logOut() {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin', headers: { 'x-csrf-token': csrfToken() } });
      if (!response.ok && response.status !== 401) throw new Error('Could not log out.');
      window.location.assign('/auth');
    } catch (error) { toast(error.message || 'Could not log out.', 'error'); }
  }
  function closeModal() { modalRoot.innerHTML = ''; }
  function openDatePicker(target) {
    const input = el(`[name="${target}"]`, modalRoot);
    ui.datePickerTarget = target;
    ui.datePickerMonth = localDate(input?.value) || localDate(todayISO());
    ui.datePickerMonth = new Date(ui.datePickerMonth.getFullYear(), ui.datePickerMonth.getMonth(), 1);
    renderDatePicker();
  }
  function renderDatePicker() {
    const holder = el('#datePickerHolder'); if (!holder) return;
    const month = ui.datePickerMonth; const first = new Date(month.getFullYear(), month.getMonth(), 1); const start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7));
    const days = Array.from({ length: 42 }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; const events = data.events.filter(event => event.date === iso); const eventNames = events.map(event => event.title).join(', '); return `<button type="button" class="picker-day ${date.getMonth() !== month.getMonth() ? 'outside' : ''} ${iso === todayISO() ? 'today' : ''} ${events.length ? 'has-event' : ''}" data-action="date-select" data-date="${iso}" title="${escape(eventNames)}" aria-label="${date.toLocaleDateString(locale(), { month: 'long', day: 'numeric' })}${eventNames ? `, ${escape(eventNames)}` : ''}">${date.getDate()}</button>`; });
    holder.innerHTML = `<div class="date-picker-panel"><div class="date-picker-head"><button type="button" class="mini-button" data-action="date-picker-previous">‹</button><b>${month.toLocaleDateString(locale(), { month: 'long', year: 'numeric' })}</b><button type="button" class="mini-button" data-action="date-picker-next">›</button></div><div class="date-picker-weekdays"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div><div class="date-picker-days">${days.join('')}</div><p class="picker-event-legend"><i></i> Dates with calendar events</p><button type="button" class="text-button" data-action="date-picker-close">Close picker</button></div>`;
    localizeTree(holder);
  }
  function selectPickerDate(value) {
    const input = el(`[name="${ui.datePickerTarget}"]`, modalRoot); if (input) input.value = value;
    const button = el(`[data-date-target="${ui.datePickerTarget}"]`, modalRoot); if (button) { button.classList.add('selected'); button.querySelector('span').textContent = dateLabel(value); }
    const holder = el('#datePickerHolder'); if (holder) holder.innerHTML = '';
  }
  function openTimePicker(target) {
    const input = el(`[name="${target}"]`, modalRoot); const { hours, minutes } = parseTime(input?.value);
    ui.timePickerTarget = target; ui.timePickerMeridiem = hours >= 12 ? 'pm' : 'am';
    renderTimePicker(hours, minutes);
  }
  function renderTimePicker(hours, minutes) {
    const holder = el('#timePickerHolder'); if (!holder) return;
    const twelveHour = data.profile.clockFormat === '12';
    const displayedHour = twelveHour ? (hours % 12 || 12) : (hours || 24);
    const hourOptions = Array.from({ length: twelveHour ? 12 : 24 }, (_, index) => index + 1).map(hour => `<option value="${hour}" ${hour === displayedHour ? 'selected' : ''}>${String(hour).padStart(2, '0')}</option>`).join('');
    const minuteOptions = Array.from({ length: 60 }, (_, minute) => `<option value="${minute}" ${minute === minutes ? 'selected' : ''}>${String(minute).padStart(2, '0')}</option>`).join('');
    holder.innerHTML = `<div class="time-picker-panel"><div class="time-picker-head"><b>Choose a time</b><button type="button" class="mini-button" data-action="time-picker-clear">Clear</button></div><div class="time-picker-wheels"><label><span>Hour</span><select class="time-wheel" size="5" data-time-picker="hour">${hourOptions}</select></label><label><span>Minute</span><select class="time-wheel" size="5" data-time-picker="minute">${minuteOptions}</select></label>${twelveHour ? `<div class="time-meridiem" role="group" aria-label="AM or PM"><button type="button" class="${ui.timePickerMeridiem === 'am' ? 'active' : ''}" data-action="time-meridiem" data-meridiem="am">AM</button><button type="button" class="${ui.timePickerMeridiem === 'pm' ? 'active' : ''}" data-action="time-meridiem" data-meridiem="pm">PM</button></div>` : ''}</div><p class="help">Scroll the wheels to choose a time.</p></div>`;
    localizeTree(holder);
  }
  function selectPickerTime() {
    const hour = Number(el('[data-time-picker="hour"]', modalRoot)?.value); const minute = Number(el('[data-time-picker="minute"]', modalRoot)?.value);
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return;
    const twelveHour = data.profile.clockFormat === '12';
    let hours = twelveHour ? hour % 12 + (ui.timePickerMeridiem === 'pm' ? 12 : 0) : hour % 24;
    const value = `${String(hours).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    const input = el(`[name="${ui.timePickerTarget}"]`, modalRoot); if (input) input.value = value;
    const button = el(`[data-time-target="${ui.timePickerTarget}"]`, modalRoot); if (button) { button.classList.add('selected'); button.querySelector('span').textContent = timeLabel(value); }
  }
  function clearPickerTime() {
    const input = el(`[name="${ui.timePickerTarget}"]`, modalRoot); if (input) input.value = '';
    const button = el(`[data-time-target="${ui.timePickerTarget}"]`, modalRoot); if (button) { button.classList.remove('selected'); button.querySelector('span').textContent = t('Add a time'); }
    const holder = el('#timePickerHolder'); if (holder) holder.innerHTML = '';
  }
  function renderIconPicker() {
    const holder = el('#iconPickerHolder'); if (!holder) return;
    const icons = ['•','∑','π','√','∞','A','あ','⚗','⚛','⌘','⌁','♜','♟','✦','★','◈','◇','♫','♪','⚽','⌂','✎','✐','⚙','☼','☾','☁','☂','☘','✿','☕','✈','⚑','⌛','◷','☑','⚡','♥','☮','☯','✉','☏','☠','♞','♛','⚓','♬'];
    holder.innerHTML = `<div class="icon-picker-panel"><b>Choose a subject icon</b><div class="icon-choice-grid">${icons.map(icon => `<button type="button" class="icon-choice" data-action="icon-select" data-icon="${icon}">${icon}</button>`).join('')}</div><div class="custom-icon-row"><input id="customIconInput" class="input" maxlength="8" placeholder="Custom emoji, letter, or symbol"><button type="button" class="button secondary" data-action="icon-custom">Use custom</button></div></div>`;
    localizeTree(holder);
  }
  function selectIcon(icon) { const chosen = String(icon || '•').trim() || '•'; const input = el('[name="icon"]', modalRoot); if (input) input.value = chosen; const button = el('[data-icon-target="icon"]', modalRoot); if (button) { const preview = el('.icon-value', button); const label = preview?.nextElementSibling; if (preview) preview.textContent = chosen; if (label) label.textContent = chosen; } const holder = el('#iconPickerHolder'); if (holder) holder.innerHTML = ''; }
  function openHomeworkModal(item) {
    item = item || { title: '', subjectId: '', due: '', priority: 'medium', description: '' };
    openModal(item.id ? 'Edit homework' : 'New homework', `<input type="hidden" name="id" value="${item.id || ''}"><div class="form-grid"><label class="field-label wide">Title<input class="input" name="title" required maxlength="100" value="${escape(item.title)}" placeholder="e.g. Finish algebra worksheet"></label><label class="field-label">Subject<select class="input" name="subjectId">${subjectOptions(item.subjectId)}</select></label>${dateField('due', 'Due date', item.due || '', false, true)}<label class="field-label">Priority<select class="input" name="priority"><option value="low" ${item.priority === 'low' ? 'selected' : ''}>Low</option><option value="medium" ${item.priority === 'medium' ? 'selected' : ''}>Medium</option><option value="high" ${item.priority === 'high' ? 'selected' : ''}>High</option></select></label><label class="field-label wide">Details <span class="help">(optional)</span><textarea class="textarea" name="description" placeholder="What do you need to do?">${escape(item.description || '')}</textarea></label></div>`, 'homework');
  }
  function openEventModal(item) {
    item = item || { title: '', date: '', time: '', subjectId: '', color: data.profile.accent, description: '' };
    openModal(item.id ? 'Edit event' : 'New event', `<input type="hidden" name="id" value="${item.id || ''}"><div class="form-grid"><label class="field-label wide">Title<input class="input" name="title" required maxlength="100" value="${escape(item.title)}" placeholder="e.g. Biology test"></label>${dateField('date', 'Date', item.date || '', false, true)}<label class="field-label">Time <span class="help">(optional)</span><input class="input" name="time" type="time" value="${item.time || ''}"></label><label class="field-label">Subject<select class="input" name="subjectId">${subjectOptions(item.subjectId)}</select></label><label class="field-label">Color<input class="input" name="color" type="color" value="${item.color || data.profile.accent}"></label><label class="field-label wide">Details <span class="help">(optional)</span><textarea class="textarea" name="description">${escape(item.description || '')}</textarea></label></div>`, 'event');
  }
  function openReminderModal(item) {
    item = item || { title: '', date: '', time: '', repeat: 'never', note: '' };
    openModal(item.id ? 'Edit reminder' : 'New reminder', `<input type="hidden" name="id" value="${item.id || ''}"><div class="form-grid"><label class="field-label wide">Reminder<input class="input" name="title" required maxlength="100" value="${escape(item.title)}" placeholder="e.g. Bring calculator to class"></label>${dateField('date', 'Reminder date', item.date || '', false, true)}${timeField('time', 'Time', item.time || '')}<label class="field-label">Repeat<select class="input" name="repeat"><option value="never" ${(item.repeat || 'never') === 'never' ? 'selected' : ''}>Does not repeat</option><option value="daily" ${item.repeat === 'daily' ? 'selected' : ''}>Every day</option><option value="weekly" ${item.repeat === 'weekly' ? 'selected' : ''}>Every week</option><option value="monthly" ${item.repeat === 'monthly' ? 'selected' : ''}>Every month</option></select></label><label class="field-label wide">Note <span class="help">(optional)</span><textarea class="textarea" name="note" placeholder="Add anything useful to remember…">${escape(item.note || '')}</textarea></label></div>`, 'reminder');
  }
  function openNoteModal(item) {
    const note = item ? { ...item } : { id: uid(), title: '', subjectId: '', homeworkId: '', notebookId: ui.activeNotebookId || '', content: '', updatedAt: Date.now() };
    ui.noteDraft = note; ui.activeNoteId = note.id; ui.notesView = 'editor'; renderPage();
  }
  function openHomeworkNote(id) {
    const note = data.notes.find(entry => entry.id === id); if (!note) return;
    ui.page = 'notes'; openNoteModal(note);
  }
  function openNotebookModal(item) {
    item = item || { name: '', subjectId: '', homeworkId: '', color: data.profile.accent };
    openModal(item.id ? t('Edit notebook') : t('＋ New notebook'), `<input type="hidden" name="id" value="${item.id || ''}"><div class="form-grid"><label class="field-label wide">${t('Notebook name')}<input class="input" name="name" maxlength="40" value="${escape(item.name)}" placeholder="${t('Untitled Notebook')}"></label><label class="field-label">${t('Subject')} <span class="help">${t('(optional)')}</span><select class="input" name="subjectId">${subjectOptions(item.subjectId || '')}</select></label><label class="field-label">${t('Notebook color')}<input class="input" name="color" type="color" value="${escape(item.color || data.profile.accent)}"></label><label class="field-label wide">${t('Pin to homework (optional)')}<select class="input" name="homeworkId">${homeworkOptions(item.homeworkId || '')}</select></label></div><p class="help">${t('Leave the name blank to use Untitled Notebook. The cover color and subject can be changed later.')}</p>`, 'notebook', item.id ? t('Save') : t('Create a notebook'));
  }
  function openNotebook(id) { ui.activeNotebookId = id || ''; ui.notesView = 'notebook'; renderPage(); }
  function newNotebookNote() { const notebook = notebookById(ui.activeNotebookId); openNoteModal({ id: uid(), title: '', subjectId: notebook?.subjectId || '', homeworkId: notebook?.homeworkId || '', notebookId: ui.activeNotebookId || '', content: '', updatedAt: Date.now() }); }
  function exitNoteEditor() { const draft = ui.noteDraft || data.notes.find(note => note.id === ui.activeNoteId); ui.notesView = draft?.notebookId ? 'notebook' : 'library'; ui.activeNotebookId = draft?.notebookId || ''; ui.activeNoteId = ''; ui.noteDraft = null; renderPage(); }
  function collectEditorNote() {
    const existing = data.notes.find(note => note.id === ui.activeNoteId) || ui.noteDraft || {};
    const drawing = Array.isArray(ui.noteDrawingData) ? ui.noteDrawingData : (Array.isArray(existing.drawing) ? existing.drawing : []);
    return { ...existing, id: ui.activeNoteId || existing.id || uid(), title: el('#noteEditorTitle')?.value.trim() || t('Untitled note'), subjectId: el('#noteEditorSubject')?.value || '', homeworkId: el('#noteEditorHomework')?.value || '', notebookId: el('#noteEditorNotebook')?.value || '', content: el('#noteEditor')?.innerHTML || '', drawing, updatedAt: Date.now() };
  }
  function syncHomeworkSubjectFromNote(previous, note) {
    const previousHomework = homeworkById(previous?.homeworkId);
    if (previousHomework && previous?.homeworkId !== note.homeworkId && previousHomework.subjectSyncNoteId === note.id) previousHomework.subjectSyncNoteId = '';
    const homework = homeworkById(note.homeworkId);
    if (!homework) return;
    const isNewLink = previous?.homeworkId !== note.homeworkId;
    const staysInSync = homework.subjectSyncNoteId === note.id && !homework.subjectSyncLocked;
    if (isNewLink || staysInSync) {
      homework.subjectId = note.subjectId || '';
      homework.subjectSyncNoteId = note.id;
      homework.subjectSyncLocked = false;
    }
  }
  function persistEditorNote({ renderAfter = false, quiet = false } = {}) {
    const previous = data.notes.find(note => note.id === ui.activeNoteId);
    const note = collectEditorNote();
    const index = data.notes.findIndex(entry => entry.id === note.id);
    if (index > -1) data.notes[index] = note; else data.notes.push(note);
    syncHomeworkSubjectFromNote(previous, note);
    ui.noteDraft = note; ui.activeNoteId = note.id; save();
    if (!quiet) toast('Note saved.', 'success');
    if (renderAfter) { ui.activeNotebookId = note.notebookId; ui.notesView = note.notebookId ? 'notebook' : 'library'; ui.activeNoteId = ''; ui.noteDraft = null; renderPage(); }
    return note;
  }
  function saveRichNote() { persistEditorNote({ renderAfter: true }); }
  function runEditorCommand(command, value = '') {
    const editor = el('#noteEditor'); if (!editor) return;
    editor.focus(); document.execCommand(command, false, command === 'formatBlock' ? `<${value || 'p'}>` : value || null);
  }
  function saveEditorHighlight() {
    const editor = el('#noteEditor'); const selection = window.getSelection();
    if (!editor || !selection || !selection.rangeCount || !editor.contains(selection.anchorNode)) return toast('Select some text on the page first.', 'error');
    const text = selection.toString().replace(/\s+/g, ' ').trim();
    if (!text) return toast('Select some text on the page first.', 'error');
    document.execCommand('hiliteColor', false, '#ffe36f');
    const note = persistEditorNote({ quiet: true });
    const duplicate = data.noteHighlights.some(highlight => highlight.noteId === note.id && highlight.text === text);
    if (!duplicate) data.noteHighlights.unshift({ id: uid(), noteId: note.id, noteTitle: note.title, text: text.slice(0, 600), createdAt: Date.now() });
    save(); const badge = el('#editorHighlightCount'); if (badge) badge.textContent = String(data.noteHighlights.filter(highlight => highlight.noteId === note.id).length);
    toast(duplicate ? 'That marking is already saved.' : 'Marked text saved.', 'success');
  }
  function copyDrawing(strokes) { return (Array.isArray(strokes) ? strokes : []).map(stroke => ({ ...stroke, points: (stroke.points || []).map(point => ({ x: clamp(Number(point.x) || 0, 0, 1), y: clamp(Number(point.y) || 0, 0, 1), pressure: clamp(Number(point.pressure) || .5, .05, 1) })) })).filter(stroke => stroke.points.length); }
  function drawingBounds(strokes) {
    const bounds = (Array.isArray(strokes) ? strokes : []).map(strokeBounds).filter(Boolean);
    if (!bounds.length) return null;
    return { left: Math.min(...bounds.map(box => box.left)), right: Math.max(...bounds.map(box => box.right)), top: Math.min(...bounds.map(box => box.top)), bottom: Math.max(...bounds.map(box => box.bottom)) };
  }
  function updateDrawingClipboardControls() {
    const copyButton = el('#copyDrawingButton'); const pasteButton = el('#pasteDrawingButton'); const hasSelection = Boolean((ui.noteDrawingSelectionIds || []).length); const hasClipboard = Boolean((ui.noteDrawingClipboard || []).length);
    if (copyButton) copyButton.disabled = !hasSelection;
    if (pasteButton) pasteButton.disabled = !hasClipboard;
  }
  function copySelectedDrawing() {
    const selected = new Set(ui.noteDrawingSelectionIds || []); const strokes = copyDrawing(ui.noteDrawingData.filter(stroke => selected.has(stroke.id)));
    if (!strokes.length) return toast('Select a drawing with Lasso first.', 'error');
    ui.noteDrawingClipboard = strokes; ui.noteDrawingPastePending = false; updateDrawingClipboardControls(); toast('Drawing copied. Select Paste, then tap anywhere on the page.', 'success');
  }
  function pasteDrawingAt(point) {
    const strokes = copyDrawing(ui.noteDrawingClipboard); const bounds = drawingBounds(strokes);
    if (!bounds) return false;
    const centerX = (bounds.left + bounds.right) / 2; const centerY = (bounds.top + bounds.bottom) / 2;
    const dx = clamp(point.x - centerX, -bounds.left, 1 - bounds.right); const dy = clamp(point.y - centerY, -bounds.top, 1 - bounds.bottom);
    const pasted = strokes.map(stroke => ({ ...stroke, id: uid(), points: stroke.points.map(item => ({ ...item, x: clamp(item.x + dx, 0, 1), y: clamp(item.y + dy, 0, 1) })) }));
    ui.noteDrawingData.push(...pasted); ui.noteDrawingSelectionIds = pasted.map(stroke => stroke.id); ui.noteDrawingPastePending = false;
    persistDrawing(); updateDrawingClipboardControls(); renderNoteDrawing(); const hint = el('#noteEditorHint'); if (hint) hint.textContent = t('Use Draw with your finger, stylus, or Apple Pencil. Choose Lasso to select drawings, then drag them, change their color, thickness, or brush.'); toast('Drawing pasted.', 'success');
    return true;
  }
  function requestDrawingPaste() {
    if (!(ui.noteDrawingClipboard || []).length) return toast('Nothing copied yet.', 'error');
    ui.noteDrawingPastePending = true; setNoteDrawingTool('lasso');
    const hint = el('#noteEditorHint'); if (hint) hint.textContent = t('Tap anywhere on the page to paste the drawing.');
    toast('Tap anywhere on the page to paste the drawing.');
  }
  function drawingCanvas() { return el('#noteDrawingCanvas'); }
  function drawingPoint(event, canvas = drawingCanvas()) { const box = canvas.getBoundingClientRect(); return { x: clamp((event.clientX - box.left) / Math.max(1, box.width), 0, 1), y: clamp((event.clientY - box.top) / Math.max(1, box.height), 0, 1), pressure: clamp(Number(event.pressure) || (event.pointerType === 'pen' ? .5 : .72), .05, 1) }; }
  function strokeBounds(stroke) {
    const points = stroke?.points || []; if (!points.length) return null;
    const xs = points.map(point => point.x); const ys = points.map(point => point.y);
    return { left: Math.min(...xs), right: Math.max(...xs), top: Math.min(...ys), bottom: Math.max(...ys) };
  }
  function selectedDrawingBounds() {
    const selected = new Set(ui.noteDrawingSelectionIds || []); const bounds = ui.noteDrawingData.filter(stroke => selected.has(stroke.id)).map(strokeBounds).filter(Boolean);
    if (!bounds.length) return null;
    return { left: Math.min(...bounds.map(box => box.left)), right: Math.max(...bounds.map(box => box.right)), top: Math.min(...bounds.map(box => box.top)), bottom: Math.max(...bounds.map(box => box.bottom)) };
  }
  function pointInPolygon(point, polygon) {
    let inside = false;
    for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
      const a = polygon[index]; const b = polygon[previous];
      if ((a.y > point.y) !== (b.y > point.y) && point.x < (b.x - a.x) * (point.y - a.y) / ((b.y - a.y) || .00001) + a.x) inside = !inside;
    }
    return inside;
  }
  function pointInsideBounds(point, bounds, padding = .015) { return bounds && point.x >= bounds.left - padding && point.x <= bounds.right + padding && point.y >= bounds.top - padding && point.y <= bounds.bottom + padding; }
  function visibleBrushWidth(stroke) { const base = clamp(Number(stroke.width) || 4, 1, 40); return ({ highlighter: base * 2.8, watercolor: base * 3.4, pencil: base * .72, marker: base * 1.35 }[stroke.brush] || base); }
  function distanceToLineSegment(point, start, end) { const dx = end.x - start.x; const dy = end.y - start.y; const length = dx * dx + dy * dy; const ratio = length ? clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / length, 0, 1) : 0; return Math.hypot(point.x - (start.x + dx * ratio), point.y - (start.y + dy * ratio)); }
  function eraseDrawingAlong(start, end, canvas) {
    const box = canvas.getBoundingClientRect(); const eraseStart = { x: start.x * box.width, y: start.y * box.height }; const eraseEnd = { x: end.x * box.width, y: end.y * box.height }; const eraserRadius = Math.max(5, (Number(ui.noteDrawWidth) || 4) * 1.45); let changed = false;
    const remaining = [];
    ui.noteDrawingData.forEach(stroke => {
      const removed = point => distanceToLineSegment({ x: point.x * box.width, y: point.y * box.height }, eraseStart, eraseEnd) <= eraserRadius + visibleBrushWidth(stroke) / 2;
      const sampled = stroke.points.reduce((points, point, index) => {
        if (!index) return [point];
        const previous = stroke.points[index - 1]; const distance = Math.hypot((point.x - previous.x) * box.width, (point.y - previous.y) * box.height); const steps = Math.max(1, Math.ceil(distance / Math.max(2, eraserRadius * .45)));
        for (let step = 1; step <= steps; step++) { const amount = step / steps; points.push({ x: previous.x + (point.x - previous.x) * amount, y: previous.y + (point.y - previous.y) * amount, pressure: previous.pressure + ((point.pressure ?? previous.pressure) - previous.pressure) * amount }); }
        return points;
      }, []);
      const hit = sampled.some(removed); if (!hit) { remaining.push(stroke); return; }
      changed = true; let piece = []; let pieceNumber = 0;
      const storePiece = () => { if (piece.length) remaining.push({ ...stroke, id: pieceNumber++ ? uid() : stroke.id, points: piece }); piece = []; };
      sampled.forEach(point => { if (removed(point)) storePiece(); else piece.push(point); }); storePiece();
    });
    if (changed) { ui.noteDrawingData = remaining; const ids = new Set(remaining.map(stroke => stroke.id)); ui.noteDrawingSelectionIds = (ui.noteDrawingSelectionIds || []).filter(id => ids.has(id)); }
    return changed;
  }
  function drawStroke(context, stroke, width, height) {
    const points = stroke.points || []; if (!points.length) return;
    const brush = stroke.brush || 'pen'; const baseWidth = clamp(Number(stroke.width) || 4, 1, 40); const pointAt = point => ({ x: point.x * width, y: point.y * height });
    if (brush === 'eraser') return;
    const strokePath = (lineWidth, alpha = 1, offset = 0) => {
      context.save(); context.globalAlpha = alpha; context.strokeStyle = stroke.color || '#25223a'; context.lineCap = 'round'; context.lineJoin = 'round'; context.lineWidth = lineWidth;
      const first = pointAt(points[0]);
      if ((brush === 'pen' || brush === 'pencil') && points.length > 1) {
        for (let index = 1; index < points.length; index++) { const previous = pointAt(points[index - 1]); const point = pointAt(points[index]); context.beginPath(); context.lineWidth = lineWidth * (.55 + points[index].pressure * .65); context.moveTo(previous.x + offset, previous.y + offset); context.lineTo(point.x + offset, point.y + offset); context.stroke(); }
      } else { context.beginPath(); context.moveTo(first.x + offset, first.y + offset); for (let index = 1; index < points.length; index++) { const point = pointAt(points[index]); context.lineTo(point.x + offset, point.y + offset); } context.stroke(); }
      if (points.length === 1) { context.beginPath(); context.arc(first.x + offset, first.y + offset, Math.max(1, lineWidth / 2), 0, Math.PI * 2); context.fillStyle = stroke.color || '#25223a'; context.fill(); }
      context.restore();
    };
    if (brush === 'highlighter') return strokePath(baseWidth * 2.8, .28);
    if (brush === 'watercolor') { strokePath(baseWidth * 3.4, .09); return strokePath(baseWidth * 1.8, .13, .7); }
    if (brush === 'pencil') { strokePath(Math.max(1, baseWidth * .72), .54); return strokePath(Math.max(1, baseWidth * .34), .28, .45); }
    if (brush === 'marker') return strokePath(baseWidth * 1.35, .93);
    return strokePath(baseWidth, 1);
  }
  function renderNoteDrawing() {
    const canvas = drawingCanvas(); if (!canvas) return;
    const box = canvas.getBoundingClientRect(); const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.max(1, Math.round(box.width * ratio)); const pixelHeight = Math.max(1, Math.round(box.height * ratio));
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) { canvas.width = pixelWidth; canvas.height = pixelHeight; }
    const context = canvas.getContext('2d'); context.setTransform(ratio, 0, 0, ratio, 0, 0); context.clearRect(0, 0, box.width, box.height);
    ui.noteDrawingData.forEach(stroke => drawStroke(context, stroke, box.width, box.height));
    const interaction = ui.noteDrawingInteraction;
    if (interaction?.mode === 'lasso' && interaction.points?.length) {
      context.save(); context.strokeStyle = '#6c63ff'; context.lineWidth = 1.5; context.setLineDash([5, 5]); context.beginPath(); const first = interaction.points[0]; context.moveTo(first.x * box.width, first.y * box.height); interaction.points.slice(1).forEach(point => context.lineTo(point.x * box.width, point.y * box.height)); context.stroke(); context.restore();
    }
    const bounds = selectedDrawingBounds();
    if (bounds) { const pad = 9; context.save(); context.strokeStyle = '#6c63ff'; context.lineWidth = 1.5; context.setLineDash([5, 4]); context.strokeRect(bounds.left * box.width - pad, bounds.top * box.height - pad, (bounds.right - bounds.left) * box.width + pad * 2, (bounds.bottom - bounds.top) * box.height + pad * 2); context.restore(); }
  }
  function setNoteDrawingTool(tool) {
    ui.noteTool = ['text', 'draw', 'lasso'].includes(tool) ? tool : 'text';
    if (ui.noteTool !== 'lasso') ui.noteDrawingPastePending = false;
    const paper = el('#notePaper'); paper?.classList.toggle('drawing-active', ui.noteTool !== 'text'); paper?.classList.toggle('lasso-active', ui.noteTool === 'lasso'); paper?.classList.toggle('eraser-active', ui.noteTool === 'draw' && ui.noteBrush === 'eraser'); paper?.classList.toggle('paste-active', Boolean(ui.noteDrawingPastePending));
    els('[data-action="note-draw-tool"]').forEach(button => button.classList.toggle('active', button.dataset.tool === ui.noteTool));
    renderNoteDrawing();
  }
  function persistDrawing({ quiet = true } = {}) { if (!el('#noteEditor')) return; persistEditorNote({ quiet }); }
  function updateSelectedDrawingStyle(property, value) {
    const selected = new Set(ui.noteDrawingSelectionIds || []);
    if (!selected.size) return;
    ui.noteDrawingData.forEach(stroke => { if (selected.has(stroke.id)) stroke[property] = value; });
    persistDrawing(); renderNoteDrawing();
  }
  function clearNoteDrawing() {
    const selected = new Set(ui.noteDrawingSelectionIds || []);
    if (selected.size) { ui.noteDrawingData = ui.noteDrawingData.filter(stroke => !selected.has(stroke.id)); ui.noteDrawingSelectionIds = []; toast('Selected drawing removed.'); }
    else { if (!ui.noteDrawingData.length) return; ui.noteDrawingData = []; toast('Drawing cleared.'); }
    persistDrawing(); updateDrawingClipboardControls(); renderNoteDrawing();
  }
  function noteDrawingPointerDown(event) {
    const canvas = drawingCanvas(); if (!canvas || ui.noteTool === 'text' || event.button > 0) return;
    event.preventDefault(); const point = drawingPoint(event, canvas);
    if (ui.noteDrawingPastePending) { pasteDrawingAt(point); setNoteDrawingTool('lasso'); return; }
    canvas.setPointerCapture?.(event.pointerId);
    if (ui.noteTool === 'lasso') {
      const bounds = selectedDrawingBounds();
      if (pointInsideBounds(point, bounds)) ui.noteDrawingInteraction = { mode: 'move', pointerId: event.pointerId, lastPoint: point };
      else { ui.noteDrawingSelectionIds = []; ui.noteDrawingInteraction = { mode: 'lasso', pointerId: event.pointerId, points: [point] }; }
      updateDrawingClipboardControls(); renderNoteDrawing(); return;
    }
    if (ui.noteBrush === 'eraser') {
      const changed = eraseDrawingAlong(point, point, canvas);
      ui.noteDrawingSelectionIds = []; ui.noteDrawingInteraction = { mode: 'erase', pointerId: event.pointerId, lastPoint: point, changed }; renderNoteDrawing(); return;
    }
    const stroke = { id: uid(), brush: ui.noteBrush || 'pen', color: ui.noteDrawColor || '#25223a', width: clamp(Number(ui.noteDrawWidth) || 4, 1, 18), points: [point] };
    ui.noteDrawingData.push(stroke); ui.noteDrawingSelectionIds = []; ui.noteDrawingInteraction = { mode: 'draw', pointerId: event.pointerId, strokeId: stroke.id }; updateDrawingClipboardControls(); renderNoteDrawing();
  }
  function noteDrawingPointerMove(event) {
    const interaction = ui.noteDrawingInteraction; const canvas = drawingCanvas(); if (!interaction || !canvas || interaction.pointerId !== event.pointerId) return;
    event.preventDefault(); const events = event.getCoalescedEvents?.() || [event];
    if (interaction.mode === 'draw') { const stroke = ui.noteDrawingData.find(item => item.id === interaction.strokeId); if (stroke) events.forEach(sample => stroke.points.push(drawingPoint(sample, canvas))); }
    if (interaction.mode === 'erase') events.forEach(sample => { const point = drawingPoint(sample, canvas); interaction.changed = eraseDrawingAlong(interaction.lastPoint, point, canvas) || interaction.changed; interaction.lastPoint = point; });
    if (interaction.mode === 'lasso') events.forEach(sample => interaction.points.push(drawingPoint(sample, canvas)));
    if (interaction.mode === 'move') {
      const point = drawingPoint(event, canvas); const dx = point.x - interaction.lastPoint.x; const dy = point.y - interaction.lastPoint.y; const selected = new Set(ui.noteDrawingSelectionIds || []);
      ui.noteDrawingData.forEach(stroke => { if (selected.has(stroke.id)) stroke.points.forEach(item => { item.x = clamp(item.x + dx, 0, 1); item.y = clamp(item.y + dy, 0, 1); }); }); interaction.lastPoint = point;
    }
    renderNoteDrawing();
  }
  function noteDrawingPointerUp(event) {
    const interaction = ui.noteDrawingInteraction; if (!interaction || interaction.pointerId !== event.pointerId) return;
    if (interaction.mode === 'lasso' && interaction.points.length > 2) ui.noteDrawingSelectionIds = ui.noteDrawingData.filter(stroke => stroke.points.some(point => pointInPolygon(point, interaction.points))).map(stroke => stroke.id);
    ui.noteDrawingInteraction = null; drawingCanvas()?.releasePointerCapture?.(event.pointerId); persistDrawing(); renderNoteDrawing();
    updateDrawingClipboardControls();
  }
  function setupNoteDrawingCanvas() {
    const canvas = drawingCanvas(); const paper = el('#notePaper'); const note = data.notes.find(entry => entry.id === ui.activeNoteId) || ui.noteDraft;
    if (!canvas || !paper || !note) return;
    ui.noteDrawingData = copyDrawing(note.drawing); ui.noteDrawingSelectionIds = []; ui.noteDrawingInteraction = null; ui.noteDrawingPastePending = false;
    canvas.addEventListener('pointerdown', noteDrawingPointerDown); canvas.addEventListener('pointermove', noteDrawingPointerMove); canvas.addEventListener('pointerup', noteDrawingPointerUp); canvas.addEventListener('pointercancel', noteDrawingPointerUp);
    ui.noteCanvasObserver = new ResizeObserver(() => renderNoteDrawing()); ui.noteCanvasObserver.observe(paper); setNoteDrawingTool(ui.noteTool); updateDrawingClipboardControls(); renderNoteDrawing();
  }
  function imageCanvasFromFile(file, maxDimension = 1600) {
    return new Promise((resolve, reject) => {
      if (!file?.type?.startsWith('image/')) return reject(new Error(t('Choose an image to add to the note.')));
      if (file.size > 8 * 1024 * 1024) return reject(new Error(t('Choose an image smaller than 8 MB.')));
      const url = URL.createObjectURL(file); const image = new Image();
      image.onload = () => { const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight)); const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(image.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(image.naturalHeight * scale)); canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height); URL.revokeObjectURL(url); resolve(canvas); };
      image.onerror = () => { URL.revokeObjectURL(url); reject(new Error(t('That image could not be added.'))); }; image.src = url;
    });
  }
  function pageAspect(type) { return ({ 'handwritten-landscape': 1.414, worksheet: .707, workbook: .707, textbook: 1.414 })[type] || 0; }
  function centeredAspectRect(width, height, aspect, source = { left: 0, top: 0, right: width, bottom: height }) {
    if (!aspect) return { left: source.left, top: source.top, width: source.right - source.left, height: source.bottom - source.top };
    let cropWidth = Math.max(source.right - source.left, (source.bottom - source.top) * aspect); let cropHeight = cropWidth / aspect;
    if (cropWidth > width || cropHeight > height) { cropHeight = Math.min(height, cropWidth / aspect); cropWidth = cropHeight * aspect; if (cropWidth > width) { cropWidth = width; cropHeight = cropWidth / aspect; } }
    const centerX = clamp((source.left + source.right) / 2, cropWidth / 2, width - cropWidth / 2); const centerY = clamp((source.top + source.bottom) / 2, cropHeight / 2, height - cropHeight / 2);
    return { left: centerX - cropWidth / 2, top: centerY - cropHeight / 2, width: cropWidth, height: cropHeight };
  }
  function findPageCrop(canvas, type) {
    const sampleSize = Math.min(260, Math.max(canvas.width, canvas.height)); const scale = sampleSize / Math.max(canvas.width, canvas.height); const width = Math.max(1, Math.round(canvas.width * scale)); const height = Math.max(1, Math.round(canvas.height * scale));
    const sample = document.createElement('canvas'); sample.width = width; sample.height = height; const context = sample.getContext('2d'); context.drawImage(canvas, 0, 0, width, height); const pixels = context.getImageData(0, 0, width, height).data;
    const brightness = index => .2126 * pixels[index] + .7152 * pixels[index + 1] + .0722 * pixels[index + 2]; const edges = [];
    for (let x = 0; x < width; x += 4) { edges.push(brightness(x * 4), brightness(((height - 1) * width + x) * 4)); }
    for (let y = 0; y < height; y += 4) { edges.push(brightness((y * width) * 4), brightness((y * width + width - 1) * 4)); }
    edges.sort((a, b) => a - b); const border = edges[Math.floor(edges.length / 2)] || 128; const threshold = Math.max(158, border + 18); const marked = new Uint8Array(width * height);
    for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) { const index = y * width + x; if (brightness(index * 4) >= threshold) marked[index] = 1; }
    let best = null; const seen = new Uint8Array(width * height);
    for (let start = 0; start < marked.length; start++) {
      if (!marked[start] || seen[start]) continue;
      const queue = [start]; seen[start] = 1; let count = 0; let left = width; let right = 0; let top = height; let bottom = 0;
      for (let cursor = 0; cursor < queue.length; cursor++) { const cell = queue[cursor]; const x = cell % width; const y = Math.floor(cell / width); count++; left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y); [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].forEach(([nextX, nextY]) => { const next = nextY * width + nextX; if (nextX >= 0 && nextX < width && nextY >= 0 && nextY < height && marked[next] && !seen[next]) { seen[next] = 1; queue.push(next); } }); }
      if (!best || count > best.count) best = { count, left, right, top, bottom };
    }
    const enoughPage = best && best.count > width * height * .06 && (best.right - best.left) * (best.bottom - best.top) > width * height * .12;
    const detected = enoughPage ? { left: Math.max(0, (best.left - width * .03) / scale), right: Math.min(canvas.width, (best.right + width * .03) / scale), top: Math.max(0, (best.top - height * .03) / scale), bottom: Math.min(canvas.height, (best.bottom + height * .03) / scale) } : { left: canvas.width * .04, right: canvas.width * .96, top: canvas.height * .04, bottom: canvas.height * .96 };
    return centeredAspectRect(canvas.width, canvas.height, pageAspect(type), detected);
  }
  async function uploadImage(file) {
    if (!file?.type?.startsWith('image/')) throw new Error(t('Choose an image to add to the note.'));
    const form = new FormData(); form.append('file', file, file.name || 'image');
    const response = await fetch('/api/uploads', { method: 'POST', credentials: 'same-origin', headers: { 'x-csrf-token': csrfToken() }, body: form });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'Could not upload that image.');
    return payload.url;
  }
  async function uploadDataUrl(dataUrl, fileName = 'note-image.jpg') {
    const blob = await (await fetch(dataUrl)).blob();
    return uploadImage(new File([blob], fileName.replace(/\.[^/.]+$/, '') + '.jpg', { type: 'image/jpeg' }));
  }
  async function compressNoteImage(file, paperType = 'photo', autoCrop = false) {
    const canvas = await imageCanvasFromFile(file); const crop = autoCrop ? findPageCrop(canvas, paperType) : { left: 0, top: 0, width: canvas.width, height: canvas.height }; const output = document.createElement('canvas'); const scale = Math.min(1, 1200 / Math.max(crop.width, crop.height)); output.width = Math.max(1, Math.round(crop.width * scale)); output.height = Math.max(1, Math.round(crop.height * scale)); output.getContext('2d').drawImage(canvas, crop.left, crop.top, crop.width, crop.height, 0, 0, output.width, output.height); return uploadDataUrl(output.toDataURL('image/jpeg', .78), file.name || 'note-image.jpg');
  }
  async function addPhotoToNote(file, { source = '', paperType = 'photo', autoCrop = false } = {}) {
    try {
      const imageSource = source || await compressNoteImage(file, paperType, autoCrop); const editor = el('#noteEditor'); if (!editor) return;
      const image = document.createElement('img'); image.src = imageSource; image.alt = t('Add a photo'); image.className = 'note-editor-image'; const selection = window.getSelection(); const range = ui.noteEditorRange;
      if (range && editor.contains(range.commonAncestorContainer)) { range.deleteContents(); range.insertNode(image); range.setStartAfter(image); range.collapse(true); selection.removeAllRanges(); selection.addRange(range); }
      else if (selection?.rangeCount && editor.contains(selection.anchorNode)) { const current = selection.getRangeAt(0); current.deleteContents(); current.insertNode(image); current.setStartAfter(image); current.collapse(true); selection.removeAllRanges(); selection.addRange(current); }
      else editor.append(image, document.createElement('br'));
      ui.noteEditorRange = null; persistEditorNote({ quiet: true }); toast('Photo added to the page.', 'success');
    } catch (error) { toast(error.message || 'Could not add that photo.', 'error'); }
  }
  function rememberEditorRange() { const editor = el('#noteEditor'); const selection = window.getSelection(); if (editor && selection?.rangeCount && editor.contains(selection.anchorNode)) ui.noteEditorRange = selection.getRangeAt(0).cloneRange(); }
  function paperTypeOptions(selected = 'photo') { return [['photo', 'Photo or diagram'], ['handwritten-landscape', 'Landscape handwritten page'], ['worksheet', 'Worksheet (one page)'], ['workbook', 'Workbook / multiple worksheet pages'], ['textbook', 'Textbook pages read']].map(([value, label]) => `<option value="${value}" ${value === selected ? 'selected' : ''}>${t(label)}</option>`).join(''); }
  function openNoteImageModal() { rememberEditorRange(); openModal(t('Add image'), `<div class="form-grid"><label class="field-label wide">${t('Image type')}<select class="input" name="paperType">${paperTypeOptions()}</select></label><label class="field-label wide">${t('Choose image')}<input class="input" name="image" type="file" accept="image/*" required></label><label class="check-field wide"><input name="autoCrop" type="checkbox" checked> <span>${t('Auto-crop the page')}</span></label></div><p class="help">${t('For paper pages, auto-crop finds the page edges on your device. A clear, high-contrast photo gives the best result.')}</p>`, 'note-image', t('Add to note')); }
  function hasHandheldLayout() { return document.body.classList.contains('layout-phone') || document.body.classList.contains('layout-tablet'); }
  function homeworkPhotoField() {
    if (!hasHandheldLayout()) return `<label class="field-label">${t('Homework photo')}<input class="input" name="image" type="file" accept="image/*" required></label>`;
    return `<div class="field-label wide"><span class="field-control-title">${t('Homework photo')}</span><div class="homework-photo-sources"><label class="homework-photo-source"><input name="cameraImage" type="file" accept="image/*" capture="environment" data-homework-photo-source aria-label="${escape(t('Take photo'))}"><span class="homework-photo-source-icon" aria-hidden="true">◉</span><b>${t('Take photo')}</b></label><label class="homework-photo-source"><input name="libraryImage" type="file" accept="image/*" data-homework-photo-source aria-label="${escape(t('Choose from photos'))}"><span class="homework-photo-source-icon" aria-hidden="true">▧</span><b>${t('Choose from photos')}</b></label></div></div>`;
  }
  function selectedHomeworkPhoto(payload) { return [payload.cameraImage, payload.libraryImage, payload.image].find(file => file && typeof file.size === 'number' && file.size > 0); }
  function openHomeworkPhotoPrompt(item) {
    openModal(t('Homework completed!'), `<input type="hidden" name="id" value="${escape(item.id)}"><section class="completion-photo-prompt"><span class="completion-photo-icon">▧</span><div><h3>${t('Pin a picture of your finished homework?')}</h3><p>${t('We will crop the picture to the paper so your work is easy to look back at.')}</p></div></section><div class="form-grid"><label class="field-label">${t('Paper type')}<select class="input" name="paperType">${paperTypeOptions('worksheet')}</select></label>${homeworkPhotoField()}</div><p class="help">${t('Automatic page crop works best when the whole paper is visible and clearly different from its background.')}</p>`, 'homework-photo', t('Crop & pin photo'));
    const skip = el('.modal-actions .secondary', modalRoot); if (skip) skip.textContent = t('Not now');
  }
  function openHomeworkPhotoPreview(item) {
    if (!item?.completionPhoto?.source) return;
    openModal(t('Pinned homework photo'), `<section class="pinned-homework-photo"><img src="${escape(item.completionPhoto.source)}" alt="${t('Pinned homework photo')}"><p>${t('Automatically cropped from your completed homework.')}</p></section>`, 'photo-preview', t('Close'));
    const cancel = el('.modal-actions .secondary', modalRoot); if (cancel) cancel.hidden = true;
  }
  function gradePlaceholder() { return data.profile.gradeSystem === 'numeric' ? 'e.g. 1.7' : data.profile.gradeSystem === 'percentage' ? 'e.g. 87' : 'e.g. A'; }
  function openGradeModal(item) {
    item = item || { title: '', subjectId: '', value: '', date: '' };
    openModal(item.id ? 'Edit grade' : 'Add grade', `<input type="hidden" name="id" value="${item.id || ''}"><div class="form-grid"><label class="field-label wide">Assessment<input class="input" name="title" required maxlength="100" value="${escape(item.title)}" placeholder="e.g. Unit test"></label><label class="field-label">Subject<select class="input" name="subjectId">${subjectOptions(item.subjectId)}</select></label><label class="field-label">Grade<input class="input" name="value" required maxlength="10" value="${escape(item.value)}" placeholder="${gradePlaceholder()}"></label>${dateField('date', 'Date', item.date || '', true)}</div>`, 'grade');
  }
  function openSubjectModal(item) {
    item = item || { name: '', icon: '•', color: data.profile.accent };
    openModal(item.id ? 'Edit subject' : 'New subject', `<input type="hidden" name="id" value="${item.id || ''}"><div class="form-grid"><label class="field-label wide">Name<input class="input" name="name" required maxlength="40" value="${escape(item.name)}" placeholder="e.g. History"></label>${iconField(item.icon || '•')}<label class="field-label">Color<input class="input" name="color" type="color" value="${item.color || data.profile.accent}"></label></div>`, 'subject');
  }
  function openGoalModal(item) {
    item = item || { title: '', progress: 0, targetDate: '' };
    openModal(item.id ? 'Edit goal' : 'New goal', `<input type="hidden" name="id" value="${item.id || ''}"><label class="field-label">Goal<input class="input" name="title" required maxlength="100" value="${escape(item.title)}" placeholder="e.g. Finish my biology revision"></label><div class="form-grid"><label class="field-label">Progress (%)<input class="input" name="progress" type="number" min="0" max="100" value="${clamp(Number(item.progress) || 0, 0, 100)}"></label>${dateField('targetDate', 'Target date', item.targetDate || '')}</div>`, 'goal');
  }
  function openFriendModal(item) {
    item = item || { name: '', note: '', color: data.profile.accent };
    openModal(item.id ? 'Edit friend' : 'Add friend', `<input type="hidden" name="id" value="${item.id || ''}"><label class="field-label">Name<input class="input" name="name" required maxlength="50" value="${escape(item.name)}" placeholder="Friend's name"></label><div class="form-grid"><label class="field-label">Status or note<input class="input" name="note" maxlength="80" value="${escape(item.note || '')}" placeholder="e.g. Revising chemistry"></label><label class="field-label">Color<input class="input" name="color" type="color" value="${item.color || data.profile.accent}"></label></div>`, 'friend');
  }
  function widgetEventOptions(selected = '') {
    const events = [...data.events].sort((a, b) => `${a.date}${a.time || ''}`.localeCompare(`${b.date}${b.time || ''}`));
    return `<option value="">Next upcoming test or event</option>${events.map(event => `<option value="${event.id}" ${event.id === selected ? 'selected' : ''}>${escape(event.title)}${event.date ? ` · ${formatDate(event.date)}` : ''}</option>`).join('')}`;
  }
  function openWidgetModal(widget) {
    widget = widget || { type: 'next-task', title: '', subjectId: '', date: '', targetId: '', enabled: true };
    const types = [['next-task', 'Next task'], ['next-reminder', 'Next reminder'], ['countdown', 'Test countdown'], ['upcoming-event', 'Upcoming plans'], ['stats', 'Study stats']];
    openModal(widget.id ? 'Edit widget' : 'Create widget', `<input type="hidden" name="id" value="${widget.id || ''}"><div class="form-grid"><label class="field-label wide">Widget type<select class="input" name="type">${types.map(([value, label]) => `<option value="${value}" ${normalizedWidgetType(widget.type) === value ? 'selected' : ''}>${label}</option>`).join('')}</select></label><label class="field-label">Title <span class="help">(optional)</span><input class="input" name="title" maxlength="40" value="${escape(widget.title || '')}" placeholder="${escape(widgetTitle(widget.type))}"></label><label class="field-label">Subject <span class="help">(optional)</span><select class="input" name="subjectId">${subjectOptions(widget.subjectId)}</select></label><div data-widget-date-field>${dateField('date', 'Widget date (optional)', widget.date || '')}</div><label class="field-label wide" data-widget-target-field>Countdown target <span class="help">(used only by Test countdown)</span><select class="input" name="targetId">${widgetEventOptions(widget.targetId)}</select></label></div>`, 'widget', widget.id ? 'Save widget' : 'Add widget');
    syncWidgetModalFields();
  }
  function syncWidgetModalFields() {
    const type = el('[data-form="widget"] [name="type"]', modalRoot)?.value;
    if (!type) return;
    const isNextWidget = type === 'next-task' || type === 'next-reminder';
    const dateField = el('[data-widget-date-field]', modalRoot); const targetField = el('[data-widget-target-field]', modalRoot);
    if (dateField) dateField.hidden = isNextWidget;
    if (targetField) targetField.hidden = type !== 'countdown';
  }
  function formObject(form) { return Object.fromEntries(new FormData(form).entries()); }
  function upsert(collection, item) {
    const index = data[collection].findIndex(existing => existing.id === item.id);
    if (index > -1) data[collection][index] = { ...data[collection][index], ...item };
    else data[collection].push({ ...item, id: uid() });
  }
  async function submitForm(event) {
    const form = event.target.closest('form[data-form]');
    if (!form) return;
    event.preventDefault();
    const payload = formObject(form); const existingId = payload.id;
    if (form.dataset.form === 'photo-preview') { closeModal(); return; }
    if (form.dataset.form === 'account') {
      try { await saveAccount(payload); } catch (error) { toast(error.message || 'Could not update your account.', 'error'); }
      return;
    }
    if (form.dataset.form === 'note-image') {
      try {
        const source = await compressNoteImage(payload.image, payload.paperType, payload.autoCrop === 'on');
        await addPhotoToNote(payload.image, { source, paperType: payload.paperType, autoCrop: payload.autoCrop === 'on' });
        closeModal();
      } catch (error) { toast(error.message || 'Could not add that photo.', 'error'); }
      return;
    }
    if (form.dataset.form === 'homework-photo') {
      const homework = data.homework.find(item => item.id === payload.id);
      if (!homework) { closeModal(); return; }
      const image = selectedHomeworkPhoto(payload);
      if (!image) return toast('Choose or take a homework photo before continuing.', 'error');
      try {
        const source = await compressNoteImage(image, payload.paperType, true);
        homework.completionPhoto = { source, paperType: payload.paperType, createdAt: Date.now() };
        save(); closeModal(); renderPage(); toast('Homework photo pinned.', 'success');
      } catch (error) { toast(error.message || 'Could not add that photo.', 'error'); }
      return;
    }
    if (form.dataset.form === 'homework' && !payload.due) return toast('Choose a due date before saving this homework.', 'error');
    if (form.dataset.form === 'event' && !payload.date) return toast('Choose a date before saving this event.', 'error');
    if (form.dataset.form === 'reminder' && !payload.date) return toast('Choose a reminder date before saving this reminder.', 'error');
    if (form.dataset.form === 'homework') {
      const existing = existingId ? data.homework.find(item => item.id === existingId) : null;
      const subjectChanged = Boolean(existing && existing.subjectId !== payload.subjectId);
      upsert('homework', { ...payload, id: existingId, done: existing ? existing.done : false, notifiedKey: !existing || existing.due !== payload.due ? '' : (existing.notifiedKey || ''), subjectSyncNoteId: subjectChanged ? '' : (existing?.subjectSyncNoteId || ''), subjectSyncLocked: subjectChanged ? true : Boolean(existing?.subjectSyncLocked) });
    }
    if (form.dataset.form === 'event') {
      const existing = existingId ? data.events.find(item => item.id === existingId) : null;
      const scheduleChanged = !existing || existing.date !== payload.date || (existing.time || '') !== (payload.time || '');
      upsert('events', { ...payload, id: existingId, notifiedKey: scheduleChanged ? '' : (existing?.notifiedKey || '') });
    }
    if (form.dataset.form === 'reminder') {
      const existing = existingId ? data.reminders.find(item => item.id === existingId) : null;
      const scheduleChanged = !existing || existing.date !== payload.date || (existing.time || '') !== (payload.time || '');
      upsert('reminders', { ...payload, id: existingId, done: existing ? existing.done : false, notifiedKey: scheduleChanged ? '' : (existing?.notifiedKey || '') });
    }
    if (form.dataset.form === 'note') upsert('notes', { ...payload, id: existingId, updatedAt: Date.now() });
    if (form.dataset.form === 'notebook') upsert('notebooks', { ...payload, id: existingId, name: payload.name.trim() || t('Untitled Notebook'), updatedAt: Date.now() });
    if (form.dataset.form === 'grade') {
      if (!validGrade(payload.value)) return toast('Enter a valid grade for your selected grade system.', 'error');
      upsert('grades', { ...payload, id: existingId });
    }
    if (form.dataset.form === 'subject') upsert('subjects', { ...payload, id: existingId });
    if (form.dataset.form === 'goal') upsert('goals', { ...payload, id: existingId, progress: clamp(Number(payload.progress), 0, 100) });
    if (form.dataset.form === 'friend') upsert('friends', { ...payload, id: existingId });
    if (form.dataset.form === 'widget') {
      const type = ['next-task', 'next-reminder', 'countdown', 'upcoming-event', 'stats'].includes(payload.type) ? payload.type : 'next-task';
      const existing = existingId ? data.widgets.find(item => item.id === existingId) : null;
      const date = ['next-task', 'next-reminder'].includes(type) ? '' : payload.date;
      upsert('widgets', { ...payload, id: existingId, type, date, position: 'floating', enabled: existing ? existing.enabled !== false : true, title: payload.title.trim() || widgetTitle(type) });
    }
    save(); closeModal(); renderPage(); toast(existingId ? 'Changes saved.' : 'Added to your dashboard.', 'success');
  }
  function validGrade(value) {
    const clean = String(value).trim().toUpperCase();
    if (data.profile.gradeSystem === 'letter') return /^[A-F]$/.test(clean);
    const numeric = Number(clean); return Number.isFinite(numeric) && (data.profile.gradeSystem === 'numeric' ? numeric >= 1 && numeric <= 6 : numeric >= 0 && numeric <= 100);
  }

  /* events */
  function deleteItem(collection, id) {
    data[collection] = data[collection].filter(item => item.id !== id);
    if (collection === 'homework') {
      data.notes.forEach(note => { if (note.homeworkId === id) note.homeworkId = ''; });
      data.notebooks.forEach(notebook => { if (notebook.homeworkId === id) notebook.homeworkId = ''; });
    }
    save(); renderPage(); toast('Item deleted.');
  }
  function editItem(collection, id) {
    const item = data[collection].find(entry => entry.id === id); if (!item) return;
    ({ homework: openHomeworkModal, events: openEventModal, reminders: openReminderModal, notes: openNoteModal, grades: openGradeModal, subjects: openSubjectModal, goals: openGoalModal, friends: openFriendModal, widgets: openWidgetModal }[collection])(item);
  }
  function toggleHomework(id) {
    const item = data.homework.find(task => task.id === id); if (!item) return;
    item.done = !item.done;
    if (item.done) data.stats.completedHomework = Number(data.stats.completedHomework || 0) + 1;
    save(); renderPage(); toast(item.done ? 'Homework completed — nice work!' : 'Homework marked as active.');
    if (item.done && !item.completionPhoto?.source) openHomeworkPhotoPrompt(item);
  }
  function toggleReminder(id) {
    const item = data.reminders.find(reminder => reminder.id === id); if (!item) return;
    if (item.done) { item.done = false; save(); renderPage(); return toast('Reminder reopened.'); }
    if (item.repeat && item.repeat !== 'never' && item.date) {
      const date = localDate(item.date);
      if (item.repeat === 'daily') date.setDate(date.getDate() + 1);
      if (item.repeat === 'weekly') date.setDate(date.getDate() + 7);
      if (item.repeat === 'monthly') { const day = date.getDate(); date.setDate(1); date.setMonth(date.getMonth() + 1); date.setDate(Math.min(day, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())); }
      item.date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      item.notifiedKey = '';
      save(); renderPage(); return toast(`Reminder moved to ${formatDate(item.date)}.`, 'success');
    }
    item.done = true;
    save(); renderPage(); toast('Reminder marked complete.');
  }
  function scheduledForNow(date, time, now) {
    if (!date || date !== todayISO()) return false;
    const scheduled = new Date(`${date}T${time || '09:00'}`);
    return !Number.isNaN(scheduled) && now >= scheduled;
  }
  function showBananaBoardNotice(title, body, tag) {
    if (document.visibilityState !== 'visible' || el('#app')?.classList.contains('hidden')) return false;
    if (els('.banana-notice', toastRoot).some(notice => notice.dataset.noticeTag === tag)) return true;
    const notice = document.createElement('article'); notice.className = 'banana-notice'; notice.dataset.noticeTag = tag;
    notice.innerHTML = `<img src="/static/icon-192.png?v=20260822-4" alt=""><div><small>BananaBoard</small><b>${escape(brandText(t(title)))}</b><p>${escape(brandText(t(body)))}</p></div><button type="button" aria-label="${escape(t('Close'))}">×</button>`;
    notice.querySelector('button')?.addEventListener('click', () => notice.remove()); toastRoot.append(notice); window.setTimeout(() => notice.remove(), 9000);
    return true;
  }
  function checkScheduledNotifications() {
    if (document.visibilityState !== 'visible' || el('#app')?.classList.contains('hidden')) return;
    const now = new Date(); let changed = false;
    data.reminders.filter(item => !item.done && item.date).forEach(item => {
      const time = item.time || '09:00'; const key = `${item.date}|${time}`;
      if (!scheduledForNow(item.date, time, now) || item.notifiedKey === key) return;
      if (showBananaBoardNotice('Reminder', `${item.title}${item.note ? ` — ${item.note}` : ''}`, `bananaboard-reminder-${item.id}`)) { item.notifiedKey = key; changed = true; }
    });
    if (changed) save();
  }
  function sendFriendRequest(id) {
    const person = DISCOVERABLE_PEOPLE.find(entry => entry.id === id); if (!person || data.friends.some(friend => friend.id === id)) return;
    data.friends.push({ ...person, status: 'requested' }); save(); renderPage(); toast(`Friend request sent to ${person.name}.`, 'success');
  }
  function cancelFriendRequest(id) { data.friends = data.friends.filter(friend => friend.id !== id); save(); renderPage(); toast('Friend request removed.'); }
  function addWidget(type) { openWidgetModal({ type: type || 'next-task', title: '', subjectId: '', date: '', targetId: '', enabled: true }); }
  function moveWidget(id, position) { const widget = data.widgets.find(entry => entry.id === id); if (!widget) return; widget.position = position; save(); renderPage(); toast(`Widget moved to the ${position}.`, 'success'); }
  function toggleWidget(id) { const widget = data.widgets.find(entry => entry.id === id); if (!widget) return; widget.enabled = widget.enabled === false; if (data.widgets.filter(entry => entry.enabled !== false).length < 3) ui.widgetsExpanded = false; save(); renderPage(); toast(widget.enabled ? 'Widget turned on.' : 'Widget turned off.'); }
  function toggleWidgetStack() { ui.widgetsExpanded = !ui.widgetsExpanded; syncFloatingWidgets(); }
  function changeTimerMode(mode) {
    ui.timerMode = mode; resetTimer(false); renderPage();
  }
  function timerModeLabel() {
    return { study: 'Focus session', break: 'Short break', longBreak: 'Long break', custom: 'Custom focus' }[ui.timerMode] || 'Focus session';
  }
  function timerText() {
    const safe = Math.max(0, ui.timerRemaining);
    return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
  }
  function syncFloatingTimer() {
    const widget = el('#floatingTimer'); if (!widget) return;
    const shouldShow = ui.timerActive && ui.page !== 'timer';
    widget.classList.toggle('hidden', !shouldShow);
    if (!shouldShow) return;
    const display = el('#floatingTimerDisplay'); const mode = el('#floatingTimerMode'); const toggle = el('#floatingTimerToggle');
    if (display) display.textContent = timerText();
    if (mode) mode.textContent = ui.timerRunning ? timerModeLabel() : `${timerModeLabel()} · Paused`;
    if (toggle) { toggle.textContent = ui.timerRunning ? 'Ⅱ' : '▶'; toggle.setAttribute('aria-label', ui.timerRunning ? 'Pause timer' : 'Resume timer'); }
  }
  function updateTimerView() {
    const node = el('#timerDisplay'); const start = el('#timerStart');
    if (node) node.textContent = timerText();
    if (start) start.textContent = ui.timerRunning ? 'Pause' : 'Start';
    syncFloatingTimer();
  }
  function toggleTimer() {
    if (ui.timerRunning) { window.clearInterval(ui.timerInterval); ui.timerRunning = false; updateTimerView(); return; }
    if (ui.timerRemaining <= 0) ui.timerRemaining = currentTimerDuration();
    ui.timerActive = true;
    ui.timerRunning = true;
    ui.timerInterval = window.setInterval(() => {
      ui.timerRemaining -= 1;
      updateTimerView();
      if (ui.timerRemaining <= 0) completeTimer();
    }, 1000);
    updateTimerView();
  }
  function completeTimer(shouldNotify = true) {
    window.clearInterval(ui.timerInterval); ui.timerRunning = false;
    if (ui.timerMode === 'study' || ui.timerMode === 'custom') {
      const minutes = Number(data.timer[ui.timerMode]) || 0;
      data.stats.studyMinutes = Number(data.stats.studyMinutes || 0) + minutes;
      data.stats.lastStudyDate = todayISO();
      data.stats.dailyStudy[todayISO()] = Number(data.stats.dailyStudy[todayISO()] || 0) + minutes;
      data.timer.completedSessions = Number(data.timer.completedSessions || 0) + 1;
      toast('Focus session complete. Take a well-earned break!', 'success');
      ui.timerMode = data.timer.completedSessions % 4 === 0 ? 'longBreak' : 'break';
    } else { toast('Break complete. Ready when you are!', 'success'); ui.timerMode = 'study'; }
    save(); resetTimer(false); if (ui.page === 'timer') renderPage();
  }
  function saveTimerSettings() {
    ['study','break','longBreak','custom'].forEach(key => { const input = el(`#timer-${key}`); data.timer[key] = clamp(Number(input?.value) || 1, 1, 240); });
    save(); resetTimer(false); renderPage(); toast('Timer settings saved.', 'success');
  }
  function renderAccentChoices(container, setup = false) {
    if (!container) return;
    container.innerHTML = ACCENTS.map(color => `<button class="accent-dot ${data.profile.accent === color ? 'active' : ''}" type="button" data-action="${setup ? 'setup-accent' : 'accent'}" data-color="${color}" style="--dot:${color}" aria-label="Use ${color}"></button>`).join('');
  }
  function applyAccent(color, render = true) { data.profile.accent = color; applyAppearance(); save(); if (render) renderPage(); }
  function exportData() {
    const content = JSON.stringify({ app: APP_NAME, version: 1, exportedAt: new Date().toISOString(), data }, null, 2);
    const url = URL.createObjectURL(new Blob([content], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `organoodle-backup-${todayISO()}.json`; anchor.click(); URL.revokeObjectURL(url); toast('Backup downloaded.', 'success');
  }
  function importData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result); const incoming = parsed.data || parsed;
        if (!incoming || !incoming.profile || !Array.isArray(incoming.homework)) throw new Error('Invalid');
        if (!window.confirm(`Replace the current ${APP_NAME} data with this backup?`)) return;
        const defaults = defaultData();
        const { notificationsEnabled: _legacyNotifications, ...incomingProfile } = incoming.profile;
        data = { ...defaults, ...Object.fromEntries(Object.entries(incoming).filter(([key]) => key !== 'account')), profile: { ...defaults.profile, ...incomingProfile }, timer: { ...defaults.timer, ...(incoming.timer || {}) }, stats: { ...defaults.stats, ...(incoming.stats || {}) }, reminders: Array.isArray(incoming.reminders) ? incoming.reminders : [], widgets: Array.isArray(incoming.widgets) ? incoming.widgets : [], notebooks: Array.isArray(incoming.notebooks) ? incoming.notebooks : [], noteHighlights: Array.isArray(incoming.noteHighlights) ? incoming.noteHighlights : [] };
        if (data.profile.gradeSystem === 'german') data.profile.gradeSystem = 'numeric';
        save(); applyAppearance(); ui.page = 'dashboard'; resetTimer(false); renderPage(); toast('Backup imported successfully.', 'success');
      } catch { toast('That file is not a valid StudyFlow backup.', 'error'); }
    };
    reader.readAsText(file);
  }

  function deleteNotebook(id) {
    const notebook = notebookById(id); if (!notebook || !window.confirm(t('Delete “{name}”? Its pages will be kept as loose notes.', { name: notebook.name }))) return;
    data.notebooks = data.notebooks.filter(entry => entry.id !== id);
    data.notes.forEach(note => { if (note.notebookId === id) note.notebookId = ''; });
    if (ui.activeNotebookId === id) { ui.activeNotebookId = ''; ui.notesView = 'library'; }
    save(); renderPage(); toast('Notebook deleted. Its pages are still in Loose notes.');
  }
  function deleteRichNote(id) {
    const note = data.notes.find(entry => entry.id === id); if (!note || !window.confirm(t('Delete “{name}”?', { name: note.title || t('Untitled note') }))) return;
    data.notes = data.notes.filter(entry => entry.id !== id); data.noteHighlights = data.noteHighlights.filter(highlight => highlight.noteId !== id);
    save(); renderPage(); toast('Note deleted.');
  }
  function deleteNoteHighlight(id) { data.noteHighlights = data.noteHighlights.filter(highlight => highlight.id !== id); save(); renderPage(); }
  function showNoteHighlights() { if (ui.notesView === 'editor') persistEditorNote({ quiet: true }); ui.notesView = 'highlights'; renderPage(); }
  function backToNotes() { ui.notesView = 'library'; ui.activeNotebookId = ''; ui.activeNoteId = ''; ui.noteDraft = null; renderPage(); }

  function handleAction(target) {
    const action = target.dataset.action;
    const id = target.dataset.id;
    if (!action) return false;
    const maps = {
      'add-homework': () => openHomeworkModal(), 'add-event': () => openEventModal(), 'add-reminder': () => openReminderModal(), 'add-note': () => openNoteModal(), 'add-grade': () => openGradeModal(), 'add-subject': () => openSubjectModal(), 'add-goal': () => openGoalModal(), 'add-friend': () => openFriendModal(),
      'new-notebook': () => openNotebookModal(), 'edit-notebook': () => openNotebookModal(notebookById(id)), 'open-notebook': () => openNotebook(id), 'open-loose-notes': () => openNotebook(''), 'back-notes-library': backToNotes, 'new-notebook-note': newNotebookNote, 'open-note-editor': () => { const note = data.notes.find(entry => entry.id === id); if (note) openNoteModal(note); }, 'exit-note-editor': exitNoteEditor, 'save-rich-note': saveRichNote, 'show-note-highlights': showNoteHighlights, 'back-to-notes': backToNotes, 'editor-command': () => runEditorCommand(target.dataset.command, target.dataset.value), 'editor-marker': saveEditorHighlight, 'editor-photo': openNoteImageModal, 'note-draw-tool': () => setNoteDrawingTool(target.dataset.tool), 'copy-lasso-drawing': copySelectedDrawing, 'paste-lasso-drawing': requestDrawingPaste, 'clear-note-drawing': clearNoteDrawing,
      'toggle-homework': () => toggleHomework(id), 'view-homework-photo': () => openHomeworkPhotoPreview(data.homework.find(item => item.id === id)), 'open-homework-note': () => openHomeworkNote(id), 'toggle-reminder': () => toggleReminder(id), 'homework-filter': () => { ui.homeworkFilter = target.dataset.filter; renderPage(); },
      'calendar-previous': () => { ui.month = new Date(ui.month.getFullYear(), ui.month.getMonth() - 1, 1); renderPage(); }, 'calendar-next': () => { ui.month = new Date(ui.month.getFullYear(), ui.month.getMonth() + 1, 1); renderPage(); }, 'calendar-today': () => { ui.month = new Date(new Date().getFullYear(), new Date().getMonth(), 1); ui.selectedDate = todayISO(); renderPage(); }, 'select-date': () => { ui.selectedDate = target.dataset.date; ui.month = new Date(`${ui.selectedDate}T12:00:00`); ui.month.setDate(1); renderPage(); },
      'timer-mode': () => changeTimerMode(target.dataset.mode), 'timer-start': toggleTimer, 'timer-reset': resetTimer, 'timer-skip': () => completeTimer(false), 'save-timer-settings': saveTimerSettings,
      'accent': () => applyAccent(target.dataset.color), 'setup-accent': () => { data.profile.accent = target.dataset.color; applyAppearance(); renderAccentChoices(el('#setupAccents'), true); },
      'date-picker': () => openDatePicker(target.dataset.target), 'date-picker-previous': () => { ui.datePickerMonth = new Date(ui.datePickerMonth.getFullYear(), ui.datePickerMonth.getMonth() - 1, 1); renderDatePicker(); }, 'date-picker-next': () => { ui.datePickerMonth = new Date(ui.datePickerMonth.getFullYear(), ui.datePickerMonth.getMonth() + 1, 1); renderDatePicker(); }, 'date-select': () => selectPickerDate(target.dataset.date), 'date-picker-close': () => { const holder = el('#datePickerHolder'); if (holder) holder.innerHTML = ''; }, 'icon-picker': renderIconPicker, 'icon-select': () => selectIcon(target.dataset.icon), 'icon-custom': () => selectIcon(el('#customIconInput', modalRoot)?.value),
      'send-request': () => sendFriendRequest(id), 'cancel-request': () => cancelFriendRequest(id), 'create-widget': () => openWidgetModal(), 'add-widget': () => addWidget(target.dataset.widget), 'edit-widget': () => editItem('widgets', id), 'toggle-widget': () => toggleWidget(id), 'toggle-widget-stack': toggleWidgetStack, 'move-widget': () => moveWidget(id, target.dataset.position), 'choose-settings-photo': () => el('#settingsPhoto').click(),
      'manage-account': openAccountModal, 'log-out': logOut,
      'export-data': exportData, 'import-data': () => el('#importInput').click(), 'reset-data': () => { if (window.confirm(`Clear every ${APP_NAME} item and start again?`)) { const profile = { ...data.profile }; data = defaultData(); data.profile = profile; save(); resetTimer(false); applyAppearance(); renderPage(); toast(`Your ${APP_NAME} data was cleared.`); } },
      'close-modal': closeModal, 'goal-complete': () => { const goal = data.goals.find(entry => entry.id === id); if (goal) { goal.progress = Number(goal.progress) >= 100 ? 0 : 100; save(); renderPage(); toast(Number(goal.progress) ? 'Goal marked complete!' : 'Goal reopened.'); } }
    };
    if (action === 'delete-widget') { deleteItem('widgets', id); return true; }
    if (action === 'delete-notebook') { deleteNotebook(id); return true; }
    if (action === 'edit-notebook') { openNotebookModal(notebookById(id)); return true; }
    if (action === 'delete-rich-note') { deleteRichNote(id); return true; }
    if (action === 'delete-note-highlight') { deleteNoteHighlight(id); return true; }
    if (action.startsWith('delete-')) { deleteItem({ 'delete-homework': 'homework', 'delete-event': 'events', 'delete-reminder': 'reminders', 'delete-note': 'notes', 'delete-grade': 'grades', 'delete-subject': 'subjects', 'delete-goal': 'goals', 'delete-friend': 'friends' }[action], id); return true; }
    if (action.startsWith('edit-')) { editItem({ 'edit-homework': 'homework', 'edit-event': 'events', 'edit-reminder': 'reminders', 'edit-note': 'notes', 'edit-grade': 'grades', 'edit-subject': 'subjects', 'edit-goal': 'goals', 'edit-friend': 'friends', 'edit-widget': 'widgets' }[action], id); return true; }
    if (maps[action]) { maps[action](); return true; }
    return false;
  }
  function closeSidebar() { el('#sidebar').classList.remove('open'); el('#scrim').classList.remove('open'); }
  function readPhoto(file) {
    if (!file) return Promise.resolve('');
    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) return Promise.reject(new Error('Choose an image smaller than 2 MB.'));
    return uploadImage(file);
  }
  function setSetupStep(step) {
    if (!['welcome', 'discovery', 'personalize'].includes(step)) return;
    ui.setupStep = step;
    els('[data-setup-step]').forEach(section => { const active = section.dataset.setupStep === step; section.hidden = !active; section.classList.toggle('active', active); });
    const focusTarget = el(`[data-setup-step="${step}"] button, [data-setup-step="${step}"] input, [data-setup-step="${step}"] select`);
    if (focusTarget) window.setTimeout(() => focusTarget.focus(), 80);
  }
  function selectDiscoverySource(source) {
    ui.setupDiscovery = source;
    els('[data-discovery-source]').forEach(button => { const active = button.dataset.discoverySource === source; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
  }
  function advanceSetup(step) {
    if (step === 'personalize') {
      if (!ui.setupDiscovery) return toast('Choose where you heard about BananaBoard to continue.', 'error');
      data.profile.discoverySource = ui.setupDiscovery; save();
    }
    setSetupStep(step);
  }
  function setupScreen() {
    renderAccentChoices(el('#setupAccents'), true);
    els('[data-setup-theme]').forEach(button => button.classList.toggle('active', button.dataset.setupTheme === data.profile.theme));
    el('#setupName').value = data.profile.name;
    el('#setupGradeSystem').value = data.profile.gradeSystem;
    ui.setupLanguage = language();
    el('#setupLanguage').value = ui.setupLanguage;
    selectDiscoverySource(data.profile.discoverySource || '');
    setSetupStep('welcome');
    applyLanguageContent();
  }
  function setSetupLanguage(nextLanguage) {
    if (!LANGUAGE_OPTIONS.some(([code]) => code === nextLanguage)) return;
    ui.setupLanguage = nextLanguage;
    data.profile.language = nextLanguage; save();
    applyLanguageContent();
    el('#setupLanguage').value = nextLanguage;
  }
  function restartLanguageSpinner(screen) {
    const spinner = el('.language-loader', screen); if (!spinner) return;
    spinner.style.setProperty('animation', 'none', 'important');
    void spinner.offsetWidth;
    spinner.style.setProperty('animation', 'languageSpin .82s linear infinite', 'important');
  }
  function setLanguageFromSettings(nextLanguage) {
    if (!LANGUAGE_OPTIONS.some(([code]) => code === nextLanguage) || nextLanguage === language() || ui.languageTransitioning) return;
    ui.languageTransitioning = true;
    const screen = el('#languageScreen');
    el('#languageLoadingTitle').textContent = t('Setting language');
    el('#languageLoadingText').textContent = t('Making every part of your space feel familiar…');
    screen.classList.remove('hidden');
    restartLanguageSpinner(screen);
    window.setTimeout(() => {
      data.profile.language = nextLanguage; save();
      document.documentElement.lang = language();
      renderPage();
      el('#languageLoadingTitle').textContent = t('Setting language');
      el('#languageLoadingText').textContent = t('Making every part of your space feel familiar…');
      screen.classList.add('hidden');
      el('.language-loader', screen)?.style.removeProperty('animation');
      ui.languageTransitioning = false;
    }, 3000 + Math.floor(Math.random() * 2001));
  }
  async function finishSetup(event) {
    event.preventDefault();
    const name = el('#setupName').value.trim();
    if (!name) { el('#setupName').focus(); return toast('Please enter the name you would like to use.', 'error'); }
    const chosenLanguage = ui.setupLanguage || el('#setupLanguage').value || 'en';
    data.profile.name = name; data.profile.gradeSystem = el('#setupGradeSystem').value; data.profile.language = chosenLanguage; data.profile.discoverySource = ui.setupDiscovery || data.profile.discoverySource || ''; save();
    el('#setupScreen').classList.add('hidden'); el('#personalizingScreen').classList.remove('hidden');
    const lines = ['Organizing your subjects…', 'Preparing your focus tools…', 'Making this space feel like yours…'].map(t); let index = 0;
    const cycle = window.setInterval(() => { index = (index + 1) % lines.length; el('#personalizingText').textContent = lines[index]; }, 620);
    window.setTimeout(() => { window.clearInterval(cycle); el('#personalizingScreen').classList.add('hidden'); el('#app').classList.remove('hidden'); renderPage(); }, 1700);
  }
  async function updateProfilePhoto(file) {
    try { data.profile.photo = await readPhoto(file); save(); renderNav(); toast('Profile picture updated.', 'success'); } catch (error) { toast(error.message || 'Could not update the picture.', 'error'); }
  }
  function saveSettingFromControl(target) {
    if (target.id === 'themeSelect') { data.profile.theme = target.value; save(); applyAppearance(); toast('Theme updated.', 'success'); }
    if (target.id === 'clockFormatSelect') { data.profile.clockFormat = target.value; save(); tickClock(); toast('Clock format updated.', 'success'); }
    if (target.id === 'gradeSystemSelect') { data.profile.gradeSystem = target.value; save(); toast('Grade system updated.', 'success'); }
    if (target.id === 'setupLanguage') setSetupLanguage(target.value);
    if (target.id === 'languageSelect') setLanguageFromSettings(target.value);
    if (target.id === 'profileNameInput') { data.profile.name = target.value.trim() || 'Student'; save(); renderNav(); }
  }
  function bindEvents() {
    document.addEventListener('mousedown', event => { if (event.target.closest('.word-toolbar [data-action]')) event.preventDefault(); });
    document.addEventListener('click', event => {
      if (event.target.classList.contains('modal-backdrop')) { closeModal(); return; }
      const pageTarget = event.target.closest('[data-page]');
      if (pageTarget) { event.preventDefault(); goTo(pageTarget.dataset.page); return; }
      const actionTarget = event.target.closest('[data-action]');
      if (actionTarget) {
        handleAction(actionTarget);
      }
    });
    modalRoot.addEventListener('submit', submitForm);
    modalRoot.addEventListener('click', event => {
      const control = event.target.closest('[data-action]');
      const action = control?.dataset.action;
      if (!['date-picker', 'date-picker-previous', 'date-picker-next', 'date-select', 'date-picker-close', 'time-picker', 'time-meridiem', 'time-picker-clear', 'icon-picker', 'icon-select', 'icon-custom'].includes(action)) return;
      event.preventDefault(); event.stopPropagation();
      if (action === 'date-picker') openDatePicker(control.dataset.target);
      if (action === 'date-picker-previous') { ui.datePickerMonth = new Date(ui.datePickerMonth.getFullYear(), ui.datePickerMonth.getMonth() - 1, 1); renderDatePicker(); }
      if (action === 'date-picker-next') { ui.datePickerMonth = new Date(ui.datePickerMonth.getFullYear(), ui.datePickerMonth.getMonth() + 1, 1); renderDatePicker(); }
      if (action === 'date-select') selectPickerDate(control.dataset.date);
      if (action === 'date-picker-close') { const holder = el('#datePickerHolder'); if (holder) holder.innerHTML = ''; }
      if (action === 'time-picker') openTimePicker(control.dataset.target);
      if (action === 'time-meridiem') { ui.timePickerMeridiem = control.dataset.meridiem; const { hours, minutes } = parseTime(el(`[name="${ui.timePickerTarget}"]`, modalRoot)?.value); renderTimePicker(hours, minutes); selectPickerTime(); }
      if (action === 'time-picker-clear') clearPickerTime();
      if (action === 'icon-picker') renderIconPicker();
      if (action === 'icon-select') selectIcon(control.dataset.icon);
      if (action === 'icon-custom') selectIcon(el('#customIconInput', modalRoot)?.value);
    });
    modalRoot.addEventListener('change', event => {
      if (event.target.matches('[data-time-picker]')) selectPickerTime();
      if (event.target.matches('[data-homework-photo-source]') && event.target.files?.length) {
        els('[data-homework-photo-source]', modalRoot).forEach(input => {
          const selected = input === event.target;
          input.closest('.homework-photo-source')?.classList.toggle('selected', selected);
          if (!selected) input.value = '';
        });
      }
    });
    el('#setupForm').addEventListener('submit', finishSetup);
    els('[data-setup-next]').forEach(button => button.addEventListener('click', () => advanceSetup(button.dataset.setupNext)));
    els('[data-discovery-source]').forEach(button => button.addEventListener('click', () => selectDiscoverySource(button.dataset.discoverySource)));
    els('[data-setup-theme]').forEach(button => button.addEventListener('click', () => { data.profile.theme = button.dataset.setupTheme; applyAppearance(); els('[data-setup-theme]').forEach(item => item.classList.toggle('active', item === button)); }));
    el('#openSidebar')?.addEventListener('click', () => { el('#sidebar').classList.add('open'); el('#scrim').classList.add('open'); }); el('#closeSidebar')?.addEventListener('click', closeSidebar); el('#scrim')?.addEventListener('click', closeSidebar);
    el('#quickAdd').addEventListener('click', () => { const menu = el('#quickAddMenu'); const opening = menu.classList.contains('hidden'); menu.classList.toggle('hidden', !opening); el('#quickAdd').setAttribute('aria-expanded', String(opening)); });
    el('#importInput').addEventListener('change', event => { importData(event.target.files[0]); event.target.value = ''; });
    el('#globalSearch').addEventListener('input', event => { ui.searchQuery = event.target.value; });
    el('#globalSearch').addEventListener('keydown', event => { if (event.key === 'Enter' && event.currentTarget.value.trim()) { event.preventDefault(); ui.page = 'search'; renderPage(); el('#globalSearch').value = ui.searchQuery; } });
    document.addEventListener('change', event => {
      saveSettingFromControl(event.target);
      if (event.target.id === 'settingsPhoto') updateProfilePhoto(event.target.files[0]);
      if (event.target.id === 'noteBrushSelect') { ui.noteBrush = event.target.value; if (ui.noteBrush !== 'eraser') updateSelectedDrawingStyle('brush', ui.noteBrush); setNoteDrawingTool(ui.noteBrush === 'eraser' ? 'draw' : ui.noteTool); }
      if (event.target.id === 'noteDrawColor') { ui.noteDrawColor = event.target.value; updateSelectedDrawingStyle('color', ui.noteDrawColor); }
      if (event.target.id === 'noteDrawWidth') { ui.noteDrawWidth = clamp(Number(event.target.value) || 4, 1, 18); updateSelectedDrawingStyle('width', ui.noteDrawWidth); }
      if (event.target.name === 'type' && event.target.closest('[data-form="widget"]')) syncWidgetModalFields();
    });
    document.addEventListener('input', event => {
      if (event.target.id === 'profileNameInput') saveSettingFromControl(event.target);
      if (event.target.id === 'noteDrawWidth') { ui.noteDrawWidth = clamp(Number(event.target.value) || 4, 1, 18); updateSelectedDrawingStyle('width', ui.noteDrawWidth); }
    });
    document.addEventListener('paste', event => {
      const editor = event.target.closest('#noteEditor'); if (!editor) return;
      const file = [...(event.clipboardData?.items || [])].find(item => item.type.startsWith('image/'))?.getAsFile();
      if (file) { event.preventDefault(); addPhotoToNote(file); return; }
      const text = event.clipboardData?.getData('text/plain');
      if (text) { event.preventDefault(); document.execCommand('insertText', false, text); }
    });
    document.addEventListener('click', event => { if (!event.target.closest('.quick-add-wrap')) { el('#quickAddMenu').classList.add('hidden'); el('#quickAdd').setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', event => {
      const drawingShortcut = ui.page === 'notes' && ui.notesView === 'editor' && ui.noteTool === 'lasso' && (event.metaKey || event.ctrlKey);
      if (drawingShortcut && event.key.toLowerCase() === 'c' && (ui.noteDrawingSelectionIds || []).length) { event.preventDefault(); copySelectedDrawing(); return; }
      if (drawingShortcut && event.key.toLowerCase() === 'v' && (ui.noteDrawingClipboard || []).length) { event.preventDefault(); requestDrawingPaste(); return; }
      if (event.key === 'Escape') { closeModal(); closeSidebar(); return; }
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => { if (data.profile.theme === 'system') applyAppearance(); });
    let resizeFrame;
    window.addEventListener('resize', () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(applyLayout);
    }, { passive: true });
  }
  function tickClock() { const clock = el('#dashboardClock'); if (clock) clock.textContent = new Date().toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit', hour12: data.profile.clockFormat === '12' }); }
  async function start() {
    try { await hydrateWorkspace(); }
    catch (error) {
      const root = el('#app') || document.body;
      root.classList.remove('hidden');
      root.innerHTML = `<main class="load-error"><h1>BananaBoard could not load</h1><p>${escape(error.message || 'Please refresh and try again.')}</p><a class="button primary" href="/auth">Sign in again</a></main>`;
      return;
    }
    applyAppearance(); applyLanguageContent(); initTimer(); bindEvents();
    if (isNewUser()) { el('#setupScreen').classList.remove('hidden'); setupScreen(); } else { el('#setupScreen').classList.add('hidden'); el('#app').classList.remove('hidden'); renderPage(); }
    tickClock(); window.setInterval(tickClock, 1000);
    checkScheduledNotifications(); window.setInterval(checkScheduledNotifications, 60000);
  }
  void start();
})();
