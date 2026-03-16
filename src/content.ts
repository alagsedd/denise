export type TimelineEntry = {
  date: string
  title: string
  description: string
  image?: string
  imageAlt?: string
}

export type LoveTimelineContent = {
  title: string
  intro: string
  footerNote: string
  entries: TimelineEntry[]
}

const timelineImageModules = import.meta.glob(
  './assets/babesImages/*.{jpg,jpeg,png,webp,gif}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const imageUrl = (relativePath: string) => {
  const assetPath = relativePath.replace(/^\.\/assets\//, './assets/')
  return timelineImageModules[assetPath] ?? ''
}

export const content: LoveTimelineContent = {
  title: 'Denise — My Mamacita',
  intro:
    'This is my love letter in memories. Every photo is a heartbeat, every moment is a promise, and every smile of yours reminds me that God was kind to me. Denise Achana Wenawome, loving you is the softest, truest thing I have ever known.',
  footerNote:
    'If one day you forget how deeply you are loved, read this again and hear my heart saying your name: Denise, my Mamacita, my forever.',
  entries: [
    {
      date: '2026-02-14',
      title: 'The face my soul recognizes',
      description:
        'Every time I look at you, I feel chosen by life itself. You are not just beautiful, Denise, you are the place where my restless heart finally learned to breathe.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.49 PM.jpeg',
      ),
      imageAlt: 'A favorite photo of us',
    },
    {
      date: '2026-02-14',
      title: 'Your smile, my sunrise',
      description:
        'When you smile, the whole world feels forgiven. You turn ordinary mornings into miracles and make me believe love can really heal everything.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.49 PM (1).jpeg',
      ),
      imageAlt: 'A sweet smiling moment',
    },
    {
      date: '2026-02-14',
      title: 'The quiet after every storm',
      description:
        'Even when life is loud, your voice finds me and brings me back to peace. In your love, I have found shelter, softness, and a home that never closes its door.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.49 PM (2).jpeg',
      ),
      imageAlt: 'A calm, cozy moment together',
    },
    {
      date: '2026-02-14',
      title: 'My answered prayer',
      description:
        'I prayed for a love that was real, patient, and kind, and then you happened. You are the prayer I get to hold with both hands.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.49 PM (3).jpeg',
      ),
      imageAlt: 'A moment that feels like “us”',
    },
    {
      date: '2026-02-14',
      title: 'Unplanned, unforgettable, ours',
      description:
        'The best parts of us were never rehearsed. It is just your laugh, my hand reaching for yours, and love showing up like it always knew the way.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.50 PM.jpeg',
      ),
      imageAlt: 'A candid memory together',
    },
    {
      date: '2026-02-14',
      title: 'How you love me so gently',
      description:
        'The way you show up for me, especially in small moments, breaks me open in the best way. You make love feel sacred and safe at the same time.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.56 PM.jpeg',
      ),
      imageAlt: 'A sweet photo together',
    },
    {
      date: '2026-02-14',
      title: 'No mask, just us',
      description:
        'With you I do not have to pretend to be anything else. You love me in my truth, and that kind of love is rarer than gold.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.57 PM.jpeg',
      ),
      imageAlt: 'A warm moment together',
    },
    {
      date: '2026-02-14',
      title: 'Where my heart feels safe',
      description:
        'You are the one place my heart does not have to defend itself. In your arms, even my fears sit down and rest.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.51 PM.jpeg',
      ),
      imageAlt: 'A warm memory with my love',
    },
    {
      date: '2026-02-14',
      title: 'Hold me like forever',
      description:
        'I love the way we fit, like two prayers meeting in the middle. If forever has a feeling, it feels like this.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.51 PM (1).jpeg',
      ),
      imageAlt: 'A close, loving moment',
    },
    {
      date: '2026-02-14',
      title: 'A thousand reasons to stay',
      description:
        'Every memory with you is another reason I choose us again. One glance from you can still make my heart forget how to act normal.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.52 PM.jpeg',
      ),
      imageAlt: 'A happy memory together',
    },
    {
      date: '2026-02-14',
      title: 'Beautiful beyond the mirror',
      description:
        'Your beauty is not just in your face, it is in your kindness, your strength, your loyalty, your light. I am proud to love you out loud, every day.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.54 PM.jpeg',
      ),
      imageAlt: 'A beautiful moment with you',
    },
    {
      date: '2026-02-14',
      title: 'My heart keeps saying your name',
      description:
        'Even in silence, my heart is speaking and it keeps saying the same thing: I love you, I choose you, I thank God for you, always.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.56 PM (1).jpeg',
      ),
      imageAlt: 'A sweet loving moment',
    },
    {
      date: '2026-02-14',
      title: 'The love story I will never outgrow',
      description:
        'If anyone asks what love looks like, I will show them this and say your name softly. You are my favorite chapter, my safest place, and my forever story.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.57 PM (1).jpeg',
      ),
      imageAlt: 'A photo that tells our story',
    },
  ],
}
