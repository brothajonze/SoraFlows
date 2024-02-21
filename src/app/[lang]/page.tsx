'use server'
import MainContent from '@/components/MainContent'
import { LayoutHeader } from '@/components/Header'
import VideoCarousel from '@/components/VideoCarousel'
import Footer from '@/components/Footer'
import { getDictionary } from './dictionaries'
import { Locale } from '@/i18n-config'
import { translations } from '@/config/translations'
import { InView, useInView } from 'react-intersection-observer'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang) // en
    const videos
        = [
        {
            'url': 'https://cdn.openai.com/sora/videos/gold-rush.mp4',
            'prompt': '1'
        }, {
            'url': 'https://cdn.openai.com/sora/videos/zen-garden-gnome.mp4',
            'prompt': '1'
        }, {
            'url': 'https://cdn.openai.com/tmp/s/sampling_4.mp4',
            'prompt': '1'
        }, {
            'url': 'https://cdn.openai.com/tmp/s/an-adorable-kangaroo-wearing-purple-overalls-and-cowboy-boots-taking-a-pleasant-stroll-in-Johannesburg-South-Africa-during-a-winter-storm.mp4',
            'prompt': '1'
        }, {
            'url': 'https://cdn.openai.com/tmp/s/prompting_7.mp4',
            'prompt': '1'
        }, {
            'url': 'https://cdn.openai.com/tmp/s/bike_1.mp4',
            'prompt': '1'
        }
    ]
    const metadata = translations[lang || 'zh-CN']
    return (
        <>
            <header>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </header>
            <main
                className="flex min-h-screen py-auto flex-col items-center justify-center p-24 bg-home-background bg-cover space-y-6">

                <LayoutHeader />
                <div className="top-[10%] left-[15%]">
                    <MainContent dictionary={dictionary} />
                </div>
                {/*<div*/}
                {/*    className="md:w-1/2 md:left-[70%] top-[50%] transform md:-translate-x-1/2 md:-translate-y-1/2">*/}
                <div
                    className="bg-white rounded-2xl border-[14px] border-b-blue-300">
                    <div className="flex flex-col justify-center items-center">
                        <span className="py-10 text-xl md:text-2xl font-bold text-gray-600">Example video generated by Sora</span>
                        <ul>
                            {videos.map((item) => {
                                return (
                                    <li key={item.url}
                                        className="px-[5vh] py-[2vh]  border-y border-y-gray-200 p-2 max-w-2xl">
                                        <VideoCarousel videos={item} />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <Footer year={new Date().getFullYear()} companyName="SoraFlows" />
            </main>
        </>
    )
}
