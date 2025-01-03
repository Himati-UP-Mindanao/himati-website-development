/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    'himati-users': HimatiUserAuthOperations;
  };
  collections: {
    'himati-users': HimatiUser;
    articles: Article;
    'featured-photo': FeaturedPhoto;
    'profile-photo': ProfilePhoto;
    pages: Page;
    newsletter: Newsletter;
    issues: Issue;
    'issue-cover-photo': IssueCoverPhoto;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    'himati-users': HimatiUsersSelect<false> | HimatiUsersSelect<true>;
    articles: ArticlesSelect<false> | ArticlesSelect<true>;
    'featured-photo': FeaturedPhotoSelect<false> | FeaturedPhotoSelect<true>;
    'profile-photo': ProfilePhotoSelect<false> | ProfilePhotoSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    newsletter: NewsletterSelect<false> | NewsletterSelect<true>;
    issues: IssuesSelect<false> | IssuesSelect<true>;
    'issue-cover-photo': IssueCoverPhotoSelect<false> | IssueCoverPhotoSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'quick-links': QuickLink;
  };
  globalsSelect: {
    'quick-links': QuickLinksSelect<false> | QuickLinksSelect<true>;
  };
  locale: null;
  user: HimatiUser & {
    collection: 'himati-users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface HimatiUserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "himati-users".
 */
export interface HimatiUser {
  id?: string | null;
  'first-name': string;
  'last-name': string;
  role: ('super-admin' | 'admin' | 'writer' | 'editor')[];
  position:
    | 'not-applicable'
    | 'editor-in-chief'
    | 'associate-editor'
    | 'managing-editor-internals'
    | 'managing-editor-externals'
    | 'circulations-editor'
    | 'finance-officer'
    | 'news-editor'
    | 'opinion-editor'
    | 'features-editor'
    | 'culture-editor'
    | 'multimedia-manager'
    | 'asst-multimedia-manager'
    | 'web-manager';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "articles".
 */
export interface Article {
  id?: string | null;
  title: string;
  author: string | HimatiUser;
  content: {
    [k: string]: unknown;
  }[];
  'include-featured-photo'?: boolean | null;
  photo?: (string | null) | FeaturedPhoto;
  category: 'news' | 'features' | 'kultura' | 'opinion';
  scope: 'university' | 'Local' | 'national';
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "featured-photo".
 */
export interface FeaturedPhoto {
  id?: string | null;
  author: string | HimatiUser;
  'taken-by': string | HimatiUser;
  cutline?: string | null;
  'alt-text'?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "profile-photo".
 */
export interface ProfilePhoto {
  id?: string | null;
  title?: string | null;
  author: string | HimatiUser;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  'page-name'?: string | null;
  layout?:
    | (
        | {
            title: {
              [k: string]: unknown;
            }[];
            paragraph: {
              [k: string]: unknown;
            }[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'title-paragraph-pair';
          }
        | {
            title?: string | null;
            blurb?: string | null;
            members?:
              | {
                  'member-info': string | HimatiUser;
                  'degree-program'?: string | null;
                  'member-image': string | ProfilePhoto;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'editorial-board';
          }
        | {
            slides?:
              | {
                  tag: string;
                  article: string | Article;
                  'preview-text': string;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'carousel';
          }
        | {
            highlight?:
              | {
                  display: {
                    type: 'text-on-image' | 'normal';
                    article: string | Article;
                    'preview-text'?: string | null;
                    tag?: string | null;
                  };
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'editor-choice';
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "newsletter".
 */
export interface Newsletter {
  id: number;
  email: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "issues".
 */
export interface Issue {
  id: number;
  title: string;
  link: string;
  'cover-photo': string | FeaturedPhoto;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "issue-cover-photo".
 */
export interface IssueCoverPhoto {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'himati-users';
        value: string | HimatiUser;
      } | null)
    | ({
        relationTo: 'articles';
        value: string | Article;
      } | null)
    | ({
        relationTo: 'featured-photo';
        value: string | FeaturedPhoto;
      } | null)
    | ({
        relationTo: 'profile-photo';
        value: string | ProfilePhoto;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'newsletter';
        value: number | Newsletter;
      } | null)
    | ({
        relationTo: 'issues';
        value: number | Issue;
      } | null)
    | ({
        relationTo: 'issue-cover-photo';
        value: number | IssueCoverPhoto;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'himati-users';
    value: string | HimatiUser;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'himati-users';
    value: string | HimatiUser;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "himati-users_select".
 */
export interface HimatiUsersSelect<T extends boolean = true> {
  id?: T;
  'first-name'?: T;
  'last-name'?: T;
  role?: T;
  position?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "articles_select".
 */
export interface ArticlesSelect<T extends boolean = true> {
  id?: T;
  title?: T;
  author?: T;
  content?: T;
  'include-featured-photo'?: T;
  photo?: T;
  category?: T;
  scope?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "featured-photo_select".
 */
export interface FeaturedPhotoSelect<T extends boolean = true> {
  id?: T;
  author?: T;
  'taken-by'?: T;
  cutline?: T;
  'alt-text'?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "profile-photo_select".
 */
export interface ProfilePhotoSelect<T extends boolean = true> {
  id?: T;
  title?: T;
  author?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  'page-name'?: T;
  layout?:
    | T
    | {
        'title-paragraph-pair'?:
          | T
          | {
              title?: T;
              paragraph?: T;
              id?: T;
              blockName?: T;
            };
        'editorial-board'?:
          | T
          | {
              title?: T;
              blurb?: T;
              members?:
                | T
                | {
                    'member-info'?: T;
                    'degree-program'?: T;
                    'member-image'?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        carousel?:
          | T
          | {
              slides?:
                | T
                | {
                    tag?: T;
                    article?: T;
                    'preview-text'?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        'editor-choice'?:
          | T
          | {
              highlight?:
                | T
                | {
                    display?:
                      | T
                      | {
                          type?: T;
                          article?: T;
                          'preview-text'?: T;
                          tag?: T;
                        };
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "newsletter_select".
 */
export interface NewsletterSelect<T extends boolean = true> {
  email?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "issues_select".
 */
export interface IssuesSelect<T extends boolean = true> {
  title?: T;
  link?: T;
  'cover-photo'?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "issue-cover-photo_select".
 */
export interface IssueCoverPhotoSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "quick-links".
 */
export interface QuickLink {
  id: number;
  links?:
    | {
        title: string;
        url: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "quick-links_select".
 */
export interface QuickLinksSelect<T extends boolean = true> {
  links?:
    | T
    | {
        title?: T;
        url?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}