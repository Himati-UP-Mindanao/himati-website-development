import Image from 'next/image'
import { getPage } from './api/fetchPayload'
import { Page } from '@/payload-types'

export default async function Home() {
  const results = await getPage('Home', 2)

  const layouts = results.docs[0].layout as unknown as NonNullable<Page['layout']>

  console.log(layouts[0].slides[0].tag)
  console.log(layouts[0].slides[0].article.title)
  console.log(layouts[0].slides[0].article.author['first-name'])
  console.log(layouts[0].slides[0].article.author['last-name'])
  console.log(layouts[0].slides[0].article.createdAt)
  console.log(layouts[0].slides[0]['preview-text'])
  console.log(layouts[0].slides[0].article.photo.url)

  return (
    <>
      <Image
        src={layouts[0].slides[0].article.photo.url}
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </>
  )
}
