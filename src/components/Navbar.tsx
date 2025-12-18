const Navbar = () => {
  return (
    <header className='bg-purple-800 h-full md:h-20 py-5 md:py-0'>
      <nav className='h-full flex flex-col md:flex-row md:justify-between items-center px-10 gap-2'>
        <a href='/' className='text-white text-2xl font-semibold flex flex-row items-center'>
          <img src='/logo.svg' alt='logo' className='h-10 w-10 mr-1' />
          <span className='text-wrap text-center md:text-left leading-6'>Meme Template Generator</span>
        </a>
        <a href='https://github.com/hermooo' className='text-xs text-white' target='_blank' rel='noopener noreferrer'>
          Developed by: <span className='font-bold'>hermooo</span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
