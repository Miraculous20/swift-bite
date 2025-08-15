

const CardLoading = () => {
  return (
    <div className='grid gap-1 py-2 bg-white border rounded cursor-pointer lg:p-4 lg:gap-3 min-w-36 lg:min-w-52 animate-pulse'>
      <div className='rounded min-h-24 bg-blue-50'>
      </div>
      <div className='w-20 p-2 rounded lg:p-3 bg-blue-50'>
      </div>
      <div className='p-2 rounded lg:p-3 bg-blue-50'>
      </div>
      <div className='p-2 rounded lg:p-3 bg-blue-50 w-14'>
      </div>

      <div className='flex items-center justify-between gap-3'>
        <div className='w-20 p-2 rounded lg:p-3 bg-blue-50'>
        </div>
        <div className='w-20 p-2 rounded lg:p-3 bg-blue-50'>
        </div>
      </div>

    </div>
  )
}

export default CardLoading
