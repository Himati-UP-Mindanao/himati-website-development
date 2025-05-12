import React from 'react'
import Image from 'next/image'
import { Page } from '@/payload-types'
import { getPage } from '../../api/fetchPayload'
import { slateToHtml, payloadSlateToDomConfig } from 'slate-serializers'
import HtmlRenderer from '../../components/HtmlRenderer'

export async function generateMetadata() {
  return {
    title: 'About',
    description: 'Official publication of UP Mindanao',
  }
}
const About = async () => {
  const results = await getPage('About')

  if (!results || results.totalDocs === 0) {
    return <div>Something went wrong</div>
  }

  const layouts = results.docs[0].layout as unknown as NonNullable<Page['layout']>

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

  const editorial_board = layouts?.find(
    (block): block is Extract<typeof block, { blockType: 'editorial-board' }> =>
      block.blockType === 'editorial-board',
  )

  const title_para_pair = layouts?.filter(
    (block): block is Extract<typeof block, { blockType: 'title-paragraph-pair' }> =>
      block.blockType === 'title-paragraph-pair',
  )

  return (
    <main className="px-8 py-2 lg:py-5 max-w-screen-xl mx-auto font-acronym animate-fade-in">
      {title_para_pair.length !== 0 && (
        <div className="mt-4 space-y-3 lg:space-y-12 lg:mt-14">
          {title_para_pair.map((block, index) => (
            <div key={index} className="space-y-2 lg:space-y-8">
              <HtmlRenderer
                className={`text-center py-[10px] text-xl ${index === 0 ? 'md:text-3xl lg:text-5xl' : 'md:text-2xl lg:text-3xl'} font-bold ${index === 0 ? 'text-negative-800' : ''}`}
                html={slateToHtml(block.title, payloadSlateToDomConfig) || ''}
              />
              <HtmlRenderer
                className="py-[10xp] space-y-2 lg:space-y-8 text-xs md:text-sm lg:text-base leading-[140%]"
                html={slateToHtml(block.paragraph, payloadSlateToDomConfig) || ''}
              />
            </div>
          ))}
        </div>
      )}

      {editorial_board && editorial_board.members && editorial_board.members.length > 0 && (
        <div className="mt-4 lg:mt-14">
          <h1 className="text-center font-bold text-xl md:text-3xl lg:text-5xl text-negative-800 lg:py-3">
            {editorial_board!.title}
          </h1>
          <h3 className="text-center py-3 text-xs md:text-base lg:text-lg">{editorial_board!.blurb}</h3>
          <div className="lg:py-11 flex flex-wrap items-center justify-center gap-5 lg:gap-x-6 lg:gap-y-14">
            {editorial_board?.members &&
              editorial_board.members.map((member, index) => (
                <div key={index}>
                  <div className="aspect-square w-[150px] md:w-[200px] lg:w-[250px] mb-2">
                    <Image
                      src={
                        typeof member['member-image'] != 'string'
                          ? member['member-image']?.url || ''
                          : member['member-image'] || ''
                      }
                      height={
                        typeof member['member-image'] != 'string'
                          ? member['member-image']?.height || 100
                          : 100
                      }
                      width={
                        typeof member['member-image'] != 'string'
                          ? member['member-image']?.width || 100
                          : 100
                      }
                      alt={member['member-info']['last-name']}
                      className="w-full"
                      priority
                    />
                  </div>
                  <div className="lg:px-2">
                    <h5 className="font-bold text-sm md:text-base lg:text-xl">
                      {member['member-info']['first-name']} {member['member-info']['last-name']}
                    </h5>
                    <p className="font-guardian font-medium text-neutral-900 text-xs md:text-sm lg:text-base">
                      {getPosition(member['member-info']['position'])}
                    </p>
                    <p className="font-guardian text-[10px] md:text-xs lg:text-sm">{member['degree-program']}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </main>
  )
}

export default About
