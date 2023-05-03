import styles from './modal-dialog.module.scss'
import PropTypes from 'prop-types'
import Button, { ButtonType } from 'components/button'
import MenuDropDown, { Align } from './menu-drop-down'
import MenuDropDownItem from './menu-drop-down-item'
import { strings } from 'strings/en.js'

export default function ModalDialog({
    visible,
    title,
    children,
    subtitle,
    className,
    withFooter = false,
    error = '',
    button1Label = '',
    button1Loading = false,
    onClose,
    onArchive,
    onDelete,
    onScroll,
    onButton1Click = () => {
        /* */
    }
}) {
    return visible ? (
        <div className={styles.container}>
            <div className={`${styles.dialog} ${className ? className : ''}`}>
                {(title || onClose) && (
                    <header className={styles.header}>
                        <h1 className={styles.title}>
                            {title}
                            {subtitle && <small>{subtitle}</small>}
                        </h1>

                        {onClose && (
                            <div className={styles.controls}>
                                {(onArchive || onDelete) && (
                                    <MenuDropDown align={Align.RIGHT}>
                                        {onArchive && (
                                            <MenuDropDownItem
                                                id={'archive'}
                                                text={strings.archive}
                                                icon={'icon-archive'}
                                                onClick={onArchive}
                                            />
                                        )}
                                        {onDelete && (
                                            <MenuDropDownItem
                                                id={'delete'}
                                                text={strings.delete}
                                                icon={'icon-bin'}
                                                onClick={onDelete}
                                            />
                                        )}
                                    </MenuDropDown>
                                )}
                                <i className={`${styles.close} icon-cross`} onClick={onClose} />
                            </div>
                        )}
                    </header>
                )}
                <section className={styles.content} onScroll={onScroll}>
                    {children}
                </section>
                {withFooter && (
                    <footer className={styles.footer}>
                        {error && <div className={styles.error}>{error}</div>}
                        {button1Label && (
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={button1Label}
                                loading={button1Loading}
                                onClick={onButton1Click}
                            />
                        )}
                    </footer>
                )}
            </div>
        </div>
    ) : (
        <div />
    )
}

ModalDialog.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.node,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    onClose: PropTypes.func,
    onArchive: PropTypes.func,
    onDelete: PropTypes.func,
    onScroll: PropTypes.func
}
