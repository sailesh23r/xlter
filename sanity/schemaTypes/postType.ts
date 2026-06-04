import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {name: 'seo', title: 'SEO Settings', options: {collapsible: true, collapsed: false}},
    {name: 'meta', title: 'Meta & Publishing', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    // Basic Content
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary of the post used in cards and lists.',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative text' }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Enable Table of Contents',
      type: 'boolean',
      description: 'Automatically generate a Table of Contents from headings.',
      initialValue: true,
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', type: 'string', title: 'Question'},
            {name: 'answer', type: 'text', title: 'Answer'},
          ],
        },
      ],
    }),

    // Organization
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
    }),

    // Meta & Publishing
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      fieldset: 'meta',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      fieldset: 'meta',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'DRAFT'},
          {title: 'Published', value: 'PUBLISHED'},
        ],
        layout: 'radio',
      },
      initialValue: 'DRAFT',
      fieldset: 'meta',
    }),

    // SEO Settings
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Overrides the default title for search engines.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      description: 'Used for search engine snippets. Keep under 160 characters.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      fieldset: 'seo',
      description: 'Displayed when shared on social media. (1200x630px recommended)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      status: 'status',
    },
    prepare(selection) {
      const {author, status} = selection
      return {
        ...selection, 
        subtitle: `${status === 'PUBLISHED' ? '🟢' : '🟡'} ${author ? `by ${author}` : ''}`
      }
    },
  },
})
