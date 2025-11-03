import type { SelectedMeme } from "./MemeSection";

interface MemeProps {
  meme: SelectedMeme;
}

const Meme = ({ meme }: MemeProps) => {
  return (
    <div className='flex-1 flex justify-center items-center lg:bg-gray-50 lg:border-l-2 lg:border-gray-200 lg:px-5'>
      <div className='border-5 border-purple-700 rounded-lg p-1 md:p-4 bg-white max-h-[80dvh]'>
        <div className='relative h-full'>
          {!meme.url ? (
            <div className='w-[40dvw] h-[75dvh]' />
          ) : (
            <img src={meme.url} alt='meme' className='object-contain max-w-full max-h-[75dvh]' loading='lazy' />
          )}
          {meme.topText && (
            <h2
              className='text-overlay my-1 xs:my-2 sm:my-4 text-2xl xs:text-3xl top-0'
              style={{ fontFamily: "Impact, sans-serif" }}>
              {meme.topText}
            </h2>
          )}
          {meme.bottomText && (
            <h2
              className='text-overlay  my-1 xs:my-2 sm:my-4 text-2xl xs:text-3xl bottom-0'
              style={{ fontFamily: "Impact, sans-serif" }}>
              {meme.bottomText}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meme;
