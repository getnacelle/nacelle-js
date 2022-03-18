import Link from 'next/link'

const HeaderLogo = () => {
  return (
    <div className="absolute flex lg:relative">
      <Link href="/">
        <span>
          <span className="sr-only">Workflow</span>
          <img
            className="h-8 w-8"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
            alt=""
            height="32"
            width="32"
          />
        </span>
      </Link>
    </div>
  )
}

export default HeaderLogo