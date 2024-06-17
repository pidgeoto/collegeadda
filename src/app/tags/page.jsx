import dynamic from 'next/dynamic';
const CollegeByTag = dynamic(() => import("@/components/colleges/CollegeByTag"));

const Tags = () => {
  return (
    <div>
      <div className='my-8'>
      <CollegeByTag />
      </div>
    </div>
  )
}

export default Tags