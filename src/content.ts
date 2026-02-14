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

const imageUrl = (relativePath: string) =>
  new URL(relativePath, import.meta.url).toString()

export const content: LoveTimelineContent = {
  title: 'Denise — My Mamacita',
  intro:
    'A little collection of moments I never want to forget — your smile, our laughs, and the way you make everything feel like home. Denise Achana Wenawome, you are my Mamacita.',
  footerNote: 'I love you, Mamacita — today, tomorrow, always.',
  entries: [
    {
      date: '2026-02-14',
      title: 'My favorite view, Mamacita',
      description:
        'Every time I look at you, I remember why I choose you, Denise. Soft love, safe love, our love.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.49 PM.jpeg',
      ),
      imageAlt: 'A favorite photo of us',
    },
    {
      date: '2026-02-14',
      title: 'That Denise smile',
      description:
        'You smile and the whole day gets lighter. Thank you for being my peace and my joy, Mamacita.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.49 PM (1).jpeg',
      ),
      imageAlt: 'A sweet smiling moment',
    },
    {
      date: '2026-02-14',
      title: 'My calm in the noise',
      description:
        'Even when life is loud, you make everything feel quiet and okay. I love the way we understand each other, Denise.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.49 PM (2).jpeg',
      ),
      imageAlt: 'A calm, cozy moment together',
    },
    {
      date: '2026-02-14',
      title: 'The “we” I prayed for',
      description:
        'You and me just makes sense. I’m grateful for the way you love me — patient, real, and true, Mamacita.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.49 PM (3).jpeg',
      ),
      imageAlt: 'A moment that feels like “us”',
    },
    {
      date: '2026-02-14',
      title: 'Candid, but unforgettable',
      description:
        'The best memories are the unplanned ones. Just us being us — and that’s my favorite thing, Denise.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.50 PM.jpeg',
      ),
      imageAlt: 'A candid memory together',
    },
    {
      date: '2026-02-14',
      title: 'You make love look easy',
      description:
        'The way you show up, the way you care, the way you try — it makes me love you more every day, Mamacita.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.56 PM.jpeg',
      ),
      imageAlt: 'A sweet photo together',
    },
    {
      date: '2026-02-14',
      title: 'Us, exactly as we are',
      description:
        'No perfect script. Just real love, real smiles, and the feeling that we\'re on the same team, Denise.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.57 PM.jpeg',
      ),
      imageAlt: 'A warm moment together',
    },
    {
      date: '2026-02-14',
      title: 'My heart feels safe here',
      description:
        'With you, love feels gentle and steady. Thank you for being my safe place, Mamacita.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.51 PM.jpeg',
      ),
      imageAlt: 'A warm memory with my love',
    },
    {
      date: '2026-02-14',
      title: 'Held close',
      description:
        'I love the way we fit — like home found home. I never want to let this kind of love go, Denise.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.51 PM (1).jpeg',
      ),
      imageAlt: 'A close, loving moment',
    },
    {
      date: '2026-02-14',
      title: 'More reasons to smile',
      description:
        'Every photo is proof that love can be simple: one look, one laugh, one moment with you, Mamacita.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.52 PM.jpeg',
      ),
      imageAlt: 'A happy memory together',
    },
    {
      date: '2026-02-14',
      title: 'My favorite kind of beautiful',
      description:
        'Not just pretty — but kind, strong, and full of light. I’m proud to love you, Denise Achana Wenawome.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.54 PM.jpeg',
      ),
      imageAlt: 'A beautiful moment with you',
    },
    {
      date: '2026-02-14',
      title: 'A little “I love you”',
      description:
        'Even in the smallest moments, my heart keeps saying the same thing: I love you, Mamacita. Always.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.56 PM (1).jpeg',
      ),
      imageAlt: 'A sweet loving moment',
    },
    {
      date: '2026-02-14',
      title: 'My favorite story',
      description:
        'If love had a picture, it would feel like this — soft, real, and full of us. I love you, Denise.',
      image: imageUrl(
        './assets/babesImages/WhatsApp Image 2026-02-14 at 3.45.57 PM (1).jpeg',
      ),
      imageAlt: 'A photo that tells our story',
    },
  ],
}
