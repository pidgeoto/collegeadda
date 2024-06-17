import React from 'react'
import { Skeleton } from '../ui/skeleton'

const Skeleton3x2 = () => {
  return (
    <div><div className="w-80 lg:w-[440px] h-60 flex flex-col overflow-hidden rounded-lg shadow transition hover:shadow-lg">
    <div className="p-2">
      <Skeleton className="h-8" />
      <Skeleton className="h-44 w-full mt-3" />
    </div>
  </div></div>
  )
}

export default Skeleton3x2