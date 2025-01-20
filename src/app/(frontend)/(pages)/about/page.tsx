import React from 'react'
import Image from 'next/image'
import { Page } from '@/payload-types'
import { getPage } from '../../lib/api/fetchPayload'

const About = async () => {
  const results = await getPage('About')

  const layouts = results.docs[0].layout as unknown as NonNullable<Page['layout']>
  console.log(layouts)

  const getPosition = (position: string) => {
    if (position === 'editor-in-chief') return 'Editor-in-Chief'
    else
      return position
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
  }

  if (!layouts) {
    return <div>Something went wrong</div>
  }

  console.log(layouts)

  const editorial_board = layouts?.find(
    (block): block is Extract<typeof block, { blockType: 'editorial-board' }> =>
      block.blockType === 'editorial-board',
  )

  return (
    <main className="px-8 py-2 lg:py-5 max-w-screen-xl mx-auto font-acronym">
      <div>
        <h1 className="text-center font-bold text-3xl text-negative-800 py-3">
          {editorial_board!.title}
        </h1>
        <h3 className="text-center py-3">{editorial_board!.blurb}</h3>
        <div className="lg:py-11 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-6 lg:gap-y-14">
          {editorial_board?.members &&
            editorial_board.members.map((member, index) => (
              <div key={index}>
                <div className="aspect-square w-[250px] mb-2">
                  <Image
                    src={
                      typeof member['member-image'] != 'string'
                        ? member['member-image']?.url || ''
                        : member['member-image'] || ''
                    }
                    height={20}
                    width={20}
                    alt={member['member-info']['last-name']}
                    className="w-full"
                    priority
                  />
                </div>
                <div className="px-2">
                  <h5 className="font-bold text-xl">
                    {member['member-info']['first-name']} {member['member-info']['last-name']}
                  </h5>
                  <p className="font-guardian font-medium text-neutral-900">
                    {getPosition(member['member-info']['position'])}
                  </p>
                  <p className="font-guardian text-sm">{member['degree-program']}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}

export default About
