import ky from "ky";
import { useEffect, useState } from "react";
import { downloadImage } from "../utils/imageDownloader";
import Button from "./Button";
import Meme from "./Meme";

interface MemeItem {
  name: string;
  url: string;
}

export interface SelectedMeme {
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
  const [error, setError] = useState<string | null>(null);

  const fetchMemes = async () => {
    try {
      setError(null);
      const response = await ky
        .get("https://api.imgflip.com/get_memes")
        .json<{ success: boolean; data: { memes: MemeItem[] } }>();

      const memeData = JSON.stringify(response.data.memes);

      localStorage.setItem("memes", memeData);
      setAllMemes(response.data.memes);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(errorMessage);
      setError("Failed to load memes. Please check your connection and try again.");
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
      try {
        setAllMemes(JSON.parse(memes));
      } catch {
        console.error("Failed to parse cached memes, fetching fresh data");
        localStorage.removeItem("memes");
        fetchMemes();
      }
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
    <section className='w-full h-full lg:h-[88dvh] flex flex-col p-5 lg:p-0 lg:flex-row overflow-hidden'>
      <div className='flex-1 flex items-center justify-center lg:justify-start lg:ml-20 bg-white mb-10 lg:mb-0'>
        <div className='w-full max-w-md'>
          <p className='text-center lg:text-left text-xl lg:text-4xl font-bold text-purple-900 mb-1'>
            Welcome to the Random Meme Generator!
          </p>
          <p className='text-sm lg:text-base mb-4'>
            Enter top and bottom text and generate a new meme to customize it. Download your creation when you're done.
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
          {error && <div className='text-red-600 mb-2'>{error}</div>}
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
      <Meme meme={selectedMeme} />
    </section>
  );
};

export default MemeSection;
