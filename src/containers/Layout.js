export default function Layout({ children }) {
    return (
        <div className="min-h-screen w-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
            {children}
        </div>
    )
}
