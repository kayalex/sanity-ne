import { Interface } from 'readline';
import { urlFor } from '../sanity';
import { Post } from '../typings';
import PortableText from 'react-portable-text';
import { Children } from 'react';

interface Props {
  posting: Post;
}

function Posting({ posting }: Props) {
  const { _createdAt, _id, author, mainImage, title, description, body } =
    posting;
  return (
    <>
      <img
        className='w-full h-60 object-cover'
        src={urlFor(mainImage).url()}
        alt='main-image'
      />
      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-4xl mt-10 mb-3'>{title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>
          {' '}
          {description}{' '}
        </h2>

        <div className='flex items-center space-x-2'>
          <img
            className='h-10 w-10 rounded-full'
            src={urlFor(author.image).url()}
            alt='author-image'
          />
          <p className='font-extralight text-sm'>
            Blog post by{' '}
            <span className='font-bold text-green-600'>{author.name}</span>{' '}
            published at {new Date(_createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <PortableText
            className=''
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={body}
            serializers={{
              h1: (props: any) => (
                <h1 className='text-2xl font-bold my-5' {...props} />
              ),
              h2: (props: any) => (
                <h1 className='text-xl font-bold my-5' {...props} />
              ),
              li: ({ children }: any) => (
                <li className='ml-4 list-disc'> {children} </li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className='text-blue-500 hover:underline'>
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
    </>
  );
}

export default Posting;
