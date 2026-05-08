import clsx from 'clsx'

interface AIGeneratedBannerProps {
  notice?: string
}

const defaultNotice =
  '这篇文章有 AI 参与生成。后续我会继续收集 Windows 安装包相关的历史资料，把科普部分换成手写版本。'

const AIGeneratedBanner = ({ notice = defaultNotice }: AIGeneratedBannerProps) => {
  return (
    <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-6 text-primary-dark">
      <span className="mr-2 rounded-md bg-primary-light/60 px-2 py-0.5 text-xs font-semibold text-primary">
        AI
      </span>
      {notice}
    </div>
  )
}

export const AIGeneratedBadge = ({ className }: { className?: string }) => {
  return (
    <span
      className={clsx(
        'inline-flex rounded-md bg-primary-light/70 px-2 py-0.5 text-xs font-semibold text-primary',
        className,
      )}
    >
      AI
    </span>
  )
}

export default AIGeneratedBanner
