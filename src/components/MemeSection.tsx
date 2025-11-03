import ky from "ky";
import { useEffect, useState } from "react";
import { downloadImage } from "../utils/imageDownloader";
import Button from "./Button";

interface MemeItem {
  name: string;
  url: string;
}

interface SelectedMeme {
  topText: string;
  bottomText: string;
  url: string;
}

const MemeSection = () => {
  const [allMemes, setAllMemes] = useState<MemeItem[]>();
  const [selectedMeme, setSelectedMeme] = useState<SelectedMeme>({
    topText: "",
    bottomText: "",
    url: "",
  });

  const fetchMemes = async () => {
    try {
      const response = await ky
        .get("https://api.imgflip.com/get_memes")
        .json<{ success: boolean; data: { memes: MemeItem[] } }>();

      const memeData = JSON.stringify(response.data.memes);

      localStorage.setItem("memes", memeData);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(String(error));
      }
    }
  };

  const handleGenerateNewMeme = () => {
    if (allMemes && allMemes.length > 0) {
      const randomIdx = Math.floor(Math.random() * allMemes.length);
      const randomMeme = allMemes[randomIdx];
      setSelectedMeme({ ...selectedMeme, url: randomMeme.url, topText: "", bottomText: "" });
    }
  };

  useEffect(() => {
    const memes = localStorage.getItem("memes");

    if (memes) {
      setAllMemes(JSON.parse(memes));
    } else {
      fetchMemes();
    }
  }, []);

  useEffect(() => {
    if (allMemes && allMemes.length > 0) {
      const randomIdx = Math.floor(Math.random() * allMemes.length);
      const randomMeme = allMemes[randomIdx];
      setSelectedMeme({
        topText: "",
        bottomText: "",
        url: randomMeme.url,
      });
    }
  }, [allMemes]);

  return (
    <section className='w-full h-full lg:h-[88dvh] flex flex-col p-5 lg:flex-row overflow-hidden'>
      <div className='flex-1 flex items-center justify-center bg-white mb-10 lg:mb-0'>
        <div className='w-full max-w-md'>
          <p className='text-center lg:text-left text-base sm:text-lg text-gray-700 mb-4'>
            Welcome to the Random Meme Generator!
            <br />
            <span className='text-sm sm:text-sm mt-2'>
              Enter top and bottom text and generate a new meme to customize it. Download your creation when you're
              done.
            </span>
          </p>
          <div className='mb-4'>
            <label className='block text-sm text-gray-600 mb-1' htmlFor='topText'>
              Top Text:
            </label>
            <input
              id='topText'
              type='text'
              className='w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
              placeholder='Enter top text'
              value={selectedMeme.topText}
              onChange={(e) => setSelectedMeme({ ...selectedMeme, topText: e.target.value })}
            />

            <label className='block text-sm text-gray-600 mb-1' htmlFor='bottomText'>
              Bottom Text:
            </label>
            <input
              id='bottomText'
              type='text'
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
              placeholder='Enter bottom text'
              value={selectedMeme.bottomText}
              onChange={(e) => setSelectedMeme({ ...selectedMeme, bottomText: e.target.value })}
            />
          </div>
          <div className='flex flex-col lg:flex-row gap-3'>
            <Button
              styles='bg-purple-700 hover:bg-purple-800'
              label='Generate New Meme'
              onClick={handleGenerateNewMeme}
            />

            <Button
              styles='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
              label='Download Meme'
              onClick={() => downloadImage(selectedMeme)}
            />
          </div>
        </div>
      </div>
      <div className='flex-1 flex justify-center items-center lg:bg-gray-50 lg:border-l-2 lg:border-gray-200 lg:px-5'>
        <div className='h-[80dvh] border-5 border-purple-700 rounded-lg p-4 bg-white flex items-center justify-center'>
          <div className='relative h-full'>
            <img src={selectedMeme.url} alt='meme' className='object-contain max-w-full max-h-full' />
            {selectedMeme.topText && (
              <h2 className='text-overlay top-0' style={{ fontFamily: "Impact, sans-serif" }}>
                {selectedMeme.topText}
              </h2>
            )}
            {selectedMeme.bottomText && (
              <h2 className='text-overlay bottom-0' style={{ fontFamily: "Impact, sans-serif" }}>
                {selectedMeme.bottomText}
              </h2>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeSection;
