import cn from 'classnames'

import styles from './Loading.module.css'

type Props = {
  fullWidth: boolean
}

const Loading = ({ fullWidth }: Props) => {
  const classNames = cn(styles.container, { [styles.fullWidth]: fullWidth })

  return (
    <div className={classNames}>
      <div className={styles.loading} />
    </div>
  )
}

export default Loading
