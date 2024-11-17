
export default function LoadingScreen() {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-60 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" />
      </div>
    </div>
  )
}
