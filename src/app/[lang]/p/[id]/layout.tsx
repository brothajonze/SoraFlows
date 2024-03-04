import {getQueryClient} from '@/lib/query-client.server'
import {getArticle} from '@/api/getArticle'
import {Metadata} from 'next'
import {LayoutHeader} from '@/components/Header'
import {getTranslations} from 'next-intl/server'
import Footer from '@/components/Footer'

export const generateMetadata = async (
    props: NextPageParams<{
        id: string
    }>,
) => {
    const queryClient = getQueryClient()
    const {id} = props.params
    const queryKey = ['p', id]
    const article = await queryClient.fetchQuery({
        queryKey,
        queryFn: async () => {
            return await getArticle(id)
        },
    })
    return {
        title: article?.title,
        description: article?.description,
        openGraph: {
            title: article?.title,
            description: article?.description || '',
            images: [
                {
                    url: article?.cover_image || '',
                },
            ],
        },
    } satisfies Metadata
}

export default async function Layout(
    props: NextPageParams<{
        lang: string
        id: string
    }>,
) {
    return (
        <div>
            {props.children}
        </div>
    )
}
