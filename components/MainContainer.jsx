// app/components/MainContainer.jsx
export default function MainContainer({ children, className, params, searchParams }) {
  return (
    <>
      <div className={className}>
        {children}
      </div>
    </>
  )
}
