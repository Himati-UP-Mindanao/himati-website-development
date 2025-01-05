import type { Access } from 'payload';

interface ArticleReadVisibility {
  [key: string]: any;
  _status?: { equals: 'published' | 'draft' };
  author?: { equals: string | null };
  or?: ArticleReadVisibility[];
}

export const canReadArticle: Access<ArticleReadVisibility> = ({ req: { user } }) => {
  if (!user) {
    return {
      _status: { equals: 'published' },
    } as ArticleReadVisibility;
  }

  if (user.role.includes('writer')) {
    return {
      or: [
        { _status: { equals: 'published' } },
        { _status: { equals: 'draft' }, author: { equals: user.id } },
      ],
    } as ArticleReadVisibility;
  }

  return true;
};
