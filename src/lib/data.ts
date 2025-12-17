import { PlaceHolderImages } from './placeholder-images';

export type Category = 'News' | 'Announcements' | 'School Life' | 'Events';

export type Article = {
  id: number;
  slug: string;
  title: string;
  content: string;
  imageId: string;
  category: Category;
  author: string;
  publishedAt: string;
  prioritized: boolean;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

export const navItems = [
  { name: 'News', href: '/news' },
  { name: 'Announcements', href: '/announcements' },
  { name: 'School Life', href: '/school-life' },
  { name: 'Events', href: '/events' },
];

export const articles: Article[] = [
  {
    id: 1,
    slug: 'new-school-year-kickoff',
    title: 'New School Year Kicks Off with Annual Assembly',
    content:
      'Our school year began with an inspiring assembly, welcoming new and returning students. Principal Thompson outlined the vision for the year, emphasizing community and academic excellence. We are excited for what lies ahead!',
    imageId: 'auditorium',
    category: 'Announcements',
    author: 'Admin Office',
    publishedAt: '2023-09-01',
    prioritized: true,
  },
  {
    id: 2,
    slug: 'parent-teacher-conferences-schedule',
    title: 'Parent-Teacher Conferences Scheduled for October',
    content:
      'Mark your calendars! Parent-Teacher Conferences will be held on October 15th and 16th. This is a great opportunity to discuss your child\'s progress. Sign-up sheets will be available online next week.',
    imageId: 'classroom',
    category: 'Announcements',
    author: 'Guidance Department',
    publishedAt: '2023-09-15',
    prioritized: true,
  },
  {
    id: 3,
    slug: 'varsity-soccer-team-wins-championship',
    title: 'Varsity Soccer Team Wins District Championship',
    content:
      'A huge congratulations to our varsity soccer team for their thrilling 2-1 victory in the district finals! Their hard work and dedication have paid off. The final goal was scored by senior captain, Jane Doe, in the last minute of the game.',
    imageId: 'sports-day',
    category: 'News',
    author: 'Athletics Department',
    publishedAt: '2023-10-28',
    prioritized: false,
  },
  {
    id: 4,
    slug: 'annual-science-fair-showcases-innovation',
    title: 'Annual Science Fair Showcases Student Innovation',
    content:
      'This year\'s science fair was a massive success, with projects ranging from renewable energy solutions to robotics. The grand prize went to sophomore Michael Smith for his project on water purification.',
    imageId: 'science-fair',
    category: 'School Life',
    author: 'Science Department',
    publishedAt: '2023-11-05',
    prioritized: false,
  },
  {
    id: 5,
    slug: 'meet-the-new-art-teacher',
    title: 'A Spotlight on Our New Art Teacher, Mr. Evans',
    content:
      'We extend a warm welcome to Mr. David Evans, our new art teacher. With over 10 years of experience, he brings a passion for creativity and is excited to inspire students in our newly renovated art studio.',
    imageId: 'art-class',
    category: 'School Life',
    author: 'Student Council',
    publishedAt: '2023-09-10',
    prioritized: false,
  },
  {
    id: 6,
    slug: 'library-receives-new-book-donation',
    title: 'Library Receives a Generous Donation of New Books',
    content:
      'Thanks to a generous donation from a local community partner, our library is now filled with hundreds of new titles, from classic literature to modern bestsellers. Come check them out!',
    imageId: 'library',
    category: 'News',
    author: 'Ms. Gable, Librarian',
    publishedAt: '2023-10-02',
    prioritized: false,
  },
  {
    id: 7,
    slug: 'upcoming-winter-concert',
    title: 'Get Ready for the Annual Winter Concert!',
    content:
      'The music department is proud to announce the upcoming Winter Concert on December 12th. Our talented students from the choir, band, and orchestra will perform a selection of festive and classical pieces.',
    imageId: 'auditorium',
    category: 'Events',
    author: 'Music Department',
    publishedAt: '2023-11-20',
    prioritized: false,
  },
  {
    id: 8,
    slug: 'student-collaboration-project',
    title: 'Cross-Department Collaboration Project a Success',
    content:
      'Students from the history and computer science departments teamed up to create an interactive digital museum of local history. The project has been praised for its innovation and educational value.',
    imageId: 'students-collaborating',
    category: 'News',
    author: 'Tech Department',
    publishedAt: '2023-11-15',
    prioritized: false,
  },
];

export const events: Event[] = [
  {
    id: 1,
    title: 'School Assembly',
    description: 'All-school assembly to kick off the new semester.',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
  },
  {
    id: 2,
    title: 'Parent-Teacher Conferences',
    description: 'Meet with teachers to discuss student progress.',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
  },
  {
    id: 3,
    title: 'Parent-Teacher Conferences',
    description: 'Meet with teachers to discuss student progress.',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
  },
  {
    id: 4,
    title: 'Homecoming Football Game',
    description: 'Cheer on the home team!',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
  },
  {
    id: 5,
    title: 'Winter Band Concert',
    description: 'Enjoy a night of music from our talented students.',
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 12),
  },
];
