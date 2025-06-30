"use client"

const Footer = () => {
  
  return (
    <footer className='bg-background/30 relative mx-auto mb-6 flex max-w-5xl flex-col rounded-2xl p-8 shadow-sm saturate-100 backdrop-blur-[10px]'>
      <div className='mt-20 text-sm flex justify-between items-center'>
        <div>&copy; {new Date().getFullYear()} Benson Yan</div>
      </div>
    </footer>
  )
}

export default Footer